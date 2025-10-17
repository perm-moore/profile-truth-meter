import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.7.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profileUrl, profileContent } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Ensure URL has proper protocol
    let fullUrl = profileUrl;
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = 'https://' + fullUrl;
    }

    console.log('Processing LinkedIn profile:', fullUrl);

    // Use pasted content if provided, otherwise try Firecrawl
    let finalContent = profileContent;
    
    if (!finalContent && FIRECRAWL_API_KEY) {
      const firecrawl = new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY });
      
      try {
        console.log('Attempting to scrape with Firecrawl...');
        const scrapeResult = await firecrawl.scrapeUrl(fullUrl, {
          formats: ['markdown'],
          timeout: 30000,
        });

        if (scrapeResult.success && scrapeResult.markdown) {
          finalContent = scrapeResult.markdown;
          console.log('Successfully scraped profile with Firecrawl');
        }
      } catch (scrapeError) {
        // If Firecrawl fails due to LinkedIn blocking (403), log but continue with pasted content requirement
        if (scrapeError instanceof Error && scrapeError.message.includes('403')) {
          console.log('LinkedIn blocked Firecrawl scraping (403)');
          return new Response(
            JSON.stringify({ 
              error: 'LinkedIn blocked the scraper. Please visit the profile, copy all text (Ctrl+A/Cmd+A), and paste it in the text area.'
            }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        console.error('Firecrawl error:', scrapeError);
        throw scrapeError;
      }
    }

    if (!finalContent) {
      throw new Error('No profile content provided. Please paste the LinkedIn profile content.');
    }

    console.log('Analyzing profile with AI...');

    const systemPrompt = `You are an expert LinkedIn profile analyzer. Analyze the provided LinkedIn profile content and score it on legitimacy and credibility.

Focus on these four key areas:
1. Company Verification - Are the companies real and verifiable? Do job descriptions match company size/industry?
2. Artifacts & Credentials - Are there specific projects, certifications, publications, or tangible work products mentioned?
3. Experience Analysis - Does the career progression make sense? Are responsibilities detailed and realistic for the roles?
4. Network Patterns - Based on what's visible, does the profile suggest appropriate connections for their career level?

Return a JSON object with this exact structure:
{
  "overallScore": <number 0-100>,
  "verdict": "<legitimate|questionable|suspicious>",
  "summary": "<2-3 sentence overall assessment>",
  "categories": {
    "companyVerification": {
      "score": <number 0-100>,
      "explanation": "<detailed explanation>"
    },
    "artifactsCredentials": {
      "score": <number 0-100>,
      "explanation": "<detailed explanation>"
    },
    "experienceAnalysis": {
      "score": <number 0-100>,
      "explanation": "<detailed explanation>"
    },
    "networkPatterns": {
      "score": <number 0-100>,
      "explanation": "<detailed explanation>"
    }
  },
  "experiences": [
    {
      "title": "<job title>",
      "company": "<company name>",
      "duration": "<time period>",
      "score": <number 0-100>,
      "analysis": "<detailed analysis of this specific role>",
      "redFlags": ["<red flag 1>", "<red flag 2>"],
      "strengths": ["<strength 1>", "<strength 2>"]
    }
  ]
}

Be thorough, specific, and honest in your assessment. Look for concrete evidence vs vague claims.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this LinkedIn profile:\n\n${finalContent}` }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    // Parse the JSON response from the AI
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse AI response as JSON');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    
    console.log('Analysis complete:', analysis.overallScore);

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-linkedin:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze profile';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
