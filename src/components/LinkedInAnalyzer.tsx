import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { ScoreCard } from "./ScoreCard";
import { CategoryBreakdown } from "./CategoryBreakdown";

export interface AnalysisResult {
  overallScore: number;
  categories: {
    companies: { score: number; explanation: string };
    experience: { score: number; explanation: string };
    artifacts: { score: number; explanation: string };
    network: { score: number; explanation: string };
  };
  verdict: "legitimate" | "questionable" | "suspicious";
  summary: string;
}

// Mock analysis function for demo
const analyzeLinkedInProfile = (url: string): AnalysisResult => {
  // Simulate different scores based on URL for demo variety
  const hash = url.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseScore = 50 + (hash % 40);
  
  const categories = {
    companies: {
      score: Math.min(100, baseScore + (hash % 20)),
      explanation: "Work history shows consistent employment at verified companies with industry-standard progression.",
    },
    experience: {
      score: Math.min(100, baseScore + (hash % 15)),
      explanation: "Years of experience align with educational background. Skills match job descriptions realistically.",
    },
    artifacts: {
      score: Math.min(100, baseScore - (hash % 10)),
      explanation: "Projects, certifications, and publications are verifiable and relevant to claimed expertise.",
    },
    network: {
      score: Math.min(100, baseScore + (hash % 25)),
      explanation: "Network size and connections are proportional to career stage. Engagement patterns appear organic.",
    },
  };

  const overallScore = Math.round(
    (categories.companies.score +
      categories.experience.score +
      categories.artifacts.score +
      categories.network.score) / 4
  );

  let verdict: "legitimate" | "questionable" | "suspicious";
  let summary: string;

  if (overallScore >= 75) {
    verdict = "legitimate";
    summary = "This profile demonstrates strong authenticity markers across all categories. Employment history, skills, and network activity align with genuine professional development.";
  } else if (overallScore >= 50) {
    verdict = "questionable";
    summary = "This profile shows some inconsistencies that warrant further verification. While not definitively fraudulent, certain aspects require additional scrutiny.";
  } else {
    verdict = "suspicious";
    summary = "Multiple red flags detected. This profile exhibits patterns commonly associated with misleading or fabricated information. Recommend thorough verification before proceeding.";
  }

  return { overallScore, categories, verdict, summary };
};

export const LinkedInAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = () => {
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
    
    // Simulate API delay
    setTimeout(() => {
      const analysis = analyzeLinkedInProfile(url);
      setResult(analysis);
      setIsAnalyzing(false);
    }, 2000);
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
            LinkedIn Profile<br />Legitimacy Detector
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Verify profile authenticity using advanced analysis of work history, credentials, and network patterns
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="url"
                placeholder="Enter LinkedIn profile URL (e.g., linkedin.com/in/username)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                className="flex-1 h-12 bg-card/90 backdrop-blur-sm border-primary-foreground/20 text-foreground placeholder:text-muted-foreground"
              />
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
              <span className="text-sm">Company Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">Experience Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">Network Patterns</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">Artifact Validation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="max-w-6xl mx-auto px-4 py-12 animate-slide-up">
          <ScoreCard result={result} />
          <CategoryBreakdown categories={result.categories} />
        </div>
      )}
    </div>
  );
};
