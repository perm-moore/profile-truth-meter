import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
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
    experienceDepth: { score: number; explanation: string };
    tenureConsistency: { score: number; explanation: string };
    networkCredibility: { score: number; explanation: string };
    skillAlignment: { score: number; explanation: string };
  };
  verdict: "legitimate" | "questionable" | "suspicious";
  summary: string;
}

// Mock analysis function for demo
const analyzeLinkedInProfile = (url: string): AnalysisResult => {
  // Simulate different scores based on URL for demo variety
  const hash = url.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseScore = 50 + (hash % 40);
  
  // Generate mock experiences
  const experienceTitles = [
    { title: "Senior Software Engineer", company: "Tech Corp", duration: "2020 - Present" },
    { title: "Product Manager", company: "Innovation Labs", duration: "2018 - 2020" },
    { title: "UX Designer", company: "Design Studio", duration: "2016 - 2018" },
    { title: "Marketing Specialist", company: "Growth Inc", duration: "2015 - 2016" },
    { title: "Business Analyst", company: "Consulting Group", duration: "2013 - 2015" },
  ];

  const experiences: Experience[] = experienceTitles.map((exp, index) => {
    const expScore = Math.min(100, Math.max(30, baseScore + ((hash * (index + 1)) % 40) - 20));
    
    const getRedFlags = (score: number): string[] => {
      if (score >= 75) return [];
      if (score >= 50) return ["Limited specific achievements mentioned", "Generic job description"];
      return ["Vague responsibilities", "No measurable outcomes", "Inflated title for tenure"];
    };

    const getStrengths = (score: number): string[] => {
      if (score >= 75) return ["Detailed responsibilities", "Measurable achievements", "Industry-relevant skills"];
      if (score >= 50) return ["Clear job description", "Relevant experience"];
      return ["Basic information present"];
    };

    const getAnalysis = (score: number): string => {
      if (score >= 75) return "Strong indicators of genuine expertise. Role description includes specific achievements, technical details, and clear impact metrics that align with the position level.";
      if (score >= 50) return "Moderate credibility. Some details provided but lacking depth in specific accomplishments or technical artifacts that would verify hands-on experience.";
      return "Questionable legitimacy. Description is vague or overly generic with minimal evidence of actual work performed. Title may be inflated relative to tenure and responsibilities.";
    };

    return {
      id: index + 1,
      title: exp.title,
      company: exp.company,
      duration: exp.duration,
      score: expScore,
      analysis: getAnalysis(expScore),
      redFlags: getRedFlags(expScore),
      strengths: getStrengths(expScore),
    };
  });

  const categories = {
    experienceDepth: {
      score: Math.min(100, baseScore + (hash % 20)),
      explanation: "Job descriptions show detailed, specific responsibilities and achievements. Projects and artifacts demonstrate hands-on expertise in claimed domains.",
    },
    tenureConsistency: {
      score: Math.min(100, baseScore + (hash % 15)),
      explanation: "Career timeline shows realistic progression with appropriate time spent at each level. Industry experience aligns with stated expertise and seniority.",
    },
    networkCredibility: {
      score: Math.min(100, baseScore + (hash % 25)),
      explanation: "Connection count is proportional to career stage and role seniority. Network includes relevant industry professionals and colleagues from stated positions.",
    },
    skillAlignment: {
      score: Math.min(100, baseScore - (hash % 10)),
      explanation: "Listed skills directly match job requirements and responsibilities. Endorsements and recommendations support claimed technical and professional competencies.",
    },
  };

  const overallScore = Math.round(
    (categories.experienceDepth.score +
      categories.tenureConsistency.score +
      categories.networkCredibility.score +
      categories.skillAlignment.score) / 4
  );

  let verdict: "legitimate" | "questionable" | "suspicious";
  let summary: string;

  if (overallScore >= 75) {
    verdict = "legitimate";
    summary = "This person appears genuinely skilled with verifiable expertise. Their profile shows consistent depth across experience, tenure, network, and skill alignment—suggesting they truly know their field.";
  } else if (overallScore >= 50) {
    verdict = "questionable";
    summary = "Proceed with caution. While not definitively misleading, this profile shows inconsistencies between claimed expertise and actual evidence. Additional verification recommended.";
  } else {
    verdict = "suspicious";
    summary = "High likelihood of inflated or fabricated credentials. Profile exhibits multiple red flags suggesting limited real-world expertise despite bold claims. Verify thoroughly before engaging.";
  }

  return { overallScore, experiences, categories, verdict, summary };
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
            Are They Really<br />That Skilled?
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Met someone at a networking event? Verify if they're genuinely skilled or just winging it with AI-powered analysis
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
