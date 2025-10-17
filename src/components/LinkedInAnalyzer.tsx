import { useState } from "react";
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
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleAnalyze = async () => {
    setError("");
    setResult(null);
    
    if (!url.trim()) {
      setError("Please enter a LinkedIn URL");
      return;
    }

    if (!url.includes("linkedin.com")) {
      setError("Please enter a valid LinkedIn URL");
      return;
    }

    if (!pastedContent.trim()) {
      setError("Please paste the LinkedIn profile content below");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      toast({
        title: "Analyzing profile...",
        description: "AI is evaluating credibility",
      });

      // Call the edge function to analyze with pasted content
      const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-linkedin', {
        body: { 
          profileUrl: url,
          profileContent: pastedContent
        }
      });

      if (analysisError) {
        throw analysisError;
      }

      if (analysisData.error) {
        throw new Error(analysisData.error);
      }

      setResult(analysisData);
      
      toast({
        title: "Analysis complete!",
        description: `Overall score: ${analysisData.overallScore}/100`,
      });

    } catch (err) {
      console.error('Analysis error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze profile';
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
                  LinkedIn blocks automated scrapers. Please visit the profile, select all text (Ctrl+A or Cmd+A), copy it, and paste below:
                </p>
                <textarea
                  placeholder="Paste the full LinkedIn profile content here..."
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

      {/* Results Section */}
      {result && (
        <div className="max-w-6xl mx-auto px-4 py-12 animate-slide-up">
          <ScoreCard result={result} />
          <ExperienceBreakdown experiences={result.experiences} />
          <CategoryBreakdown categories={result.categories} />
        </div>
      )}
    </div>
  );
};
