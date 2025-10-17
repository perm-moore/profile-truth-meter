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
        console.log('Attempting to scrape with Firecrawl - enhanced mobile user agent...');
        const scrapeResult = await firecrawl.scrapeUrl(fullUrl, {
          formats: ['markdown', 'html'],
          onlyMainContent: false,
          waitFor: 8000,
          timeout: 90000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://www.google.com/',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none'
          },
          actions: [
            { type: 'wait', milliseconds: 4000 },
            { type: 'scroll', direction: 'down' },
            { type: 'wait', milliseconds: 3000 },
            { type: 'scroll', direction: 'down' },
            { type: 'wait', milliseconds: 2000 }
          ]
        });

        console.log('Scrape result success:', scrapeResult.success);

        if (scrapeResult.success && (scrapeResult.markdown || scrapeResult.html)) {
          finalContent = scrapeResult.markdown || scrapeResult.html;
          console.log('Successfully scraped profile with Firecrawl, content length:', finalContent.length);
        } else {
          console.log('Scrape succeeded but no content returned');
        }
      } catch (scrapeError: any) {
        console.error('Firecrawl scraping failed:', scrapeError?.message);
        // Don't throw - just log and continue to ask for manual paste
        finalContent = null;
      }
    }

    if (!finalContent) {
      // Return success response with clear instructions
      return new Response(
        JSON.stringify({ 
          needsManualPaste: true,
          error: '⚠️ LinkedIn blocked automatic scraping. Please:\n\n1. Visit the LinkedIn profile in your browser\n2. Select all text (Ctrl+A or Cmd+A)\n3. Copy it (Ctrl+C or Cmd+C)\n4. Paste it in the text area above\n5. Click Analyze again'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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
    console.error('=== FULL ERROR DETAILS ===');
    console.error('Error in analyze-linkedin:', error);
    console.error('Error type:', typeof error);
    console.error('Error instanceof Error:', error instanceof Error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    console.error('Error stringified:', JSON.stringify(error, null, 2));
    console.error('=== END ERROR DETAILS ===');
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze profile';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : String(error)
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
