import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ScoreCard } from "./ScoreCard";
import { ExperienceBreakdown } from "./ExperienceBreakdown";
import { CategoryBreakdown } from "./CategoryBreakdown";

export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  score: number;
  analysis: string;
  redFlags: string[];
  strengths: string[];
}

export interface AnalysisResult {
  overallScore: number;
  experiences: Experience[];
  categories: {
    companyVerification: { score: number; explanation: string };
    artifactsCredentials: { score: number; explanation: string };
    experienceAnalysis: { score: number; explanation: string };
    networkPatterns: { score: number; explanation: string };
  };
  verdict: "legitimate" | "questionable" | "suspicious";
  summary: string;
}

export const LinkedInAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [pastedContent, setPastedContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setError("");
    
    if (!url.trim()) {
      setError("Please enter a LinkedIn URL");
      return;
    }

    if (!url.includes("linkedin.com")) {
      setError("Please enter a valid LinkedIn URL");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Try scraping first, use pasted content as fallback
      const hasPastedContent = pastedContent.trim().length > 0;
      
      if (!hasPastedContent) {
        toast({
          title: "Scraping profile...",
          description: "Attempting to fetch profile data automatically",
        });
      } else {
        toast({
          title: "Analyzing profile...",
          description: "Using your pasted content",
        });
      }

      // Call the edge function to analyze with pasted content
      const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-linkedin', {
        body: { 
          profileUrl: url,
          profileContent: hasPastedContent ? pastedContent : undefined
        }
      });

      if (analysisError) {
        console.error('Supabase function error:', analysisError);
        throw analysisError;
      }

      // Check if we need manual paste
      if (analysisData?.needsManualPaste) {
        setError(analysisData.error);
        toast({
          title: "Manual input required",
          description: "Please paste the profile content in the text area",
          variant: "destructive",
          duration: 10000,
        });
        setIsAnalyzing(false);
        return;
      }

      if (analysisData?.error) {
        console.error('Analysis returned error:', analysisData.error);
        throw new Error(analysisData.error);
      }

      if (!analysisData) {
        console.error('No data returned from analysis');
        throw new Error('No data returned from analysis');
      }

      toast({
        title: "Analysis complete!",
        description: `Overall score: ${analysisData.overallScore}/100`,
      });
      
      // Navigate to results page with the analysis data
      navigate("/results", { state: { result: analysisData } });

    } catch (err) {
      console.error('Full analysis error:', err);
      console.error('Error details:', JSON.stringify(err, null, 2));
      
      let errorMessage = 'Failed to analyze profile';
      if (err instanceof Error) {
        errorMessage = err.message;
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
      }
      
      setError(errorMessage);
      
      toast({
        title: "Analysis failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
            <Shield className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">AI-Powered Profile Verification</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4">
            Are They Really<br />That Skilled?
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Met someone at a networking event? Verify if they're genuinely skilled or just winging it with AI-powered analysis
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col gap-3">
              <Input
                type="url"
                placeholder="Enter LinkedIn profile URL (e.g., linkedin.com/in/username)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12 bg-card/90 backdrop-blur-sm border-primary-foreground/20 text-foreground placeholder:text-muted-foreground"
              />
              
              <div className="space-y-2">
                <p className="text-sm text-primary-foreground/80 font-medium">
                  Optional: If automatic scraping fails, paste the profile content here:
                </p>
                <textarea
                  placeholder="Paste LinkedIn profile content here (optional - will try automatic scraping first)..."
                  value={pastedContent}
                  onChange={(e) => setPastedContent(e.target.value)}
                  className="w-full min-h-[200px] px-4 py-3 rounded-md bg-card/90 backdrop-blur-sm border border-primary-foreground/20 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                size="lg"
                className="h-12 px-8 bg-card hover:bg-card/90 text-primary font-semibold shadow-lg"
              >
                {isAnalyzing ? (
                  <>
                    <TrendingUp className="h-5 w-5 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Analyze Profile
                  </>
                )}
              </Button>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-destructive-foreground bg-destructive/20 backdrop-blur-sm rounded-lg px-4 py-3 mt-4">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">Experience Depth</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">Tenure Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">Network Credibility</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">Skill Alignment</span>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};
