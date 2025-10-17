import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

    setIsAnalyzing(true);
    
    toast({
      title: "Analyzing profile...",
      description: "Processing LinkedIn data with AI",
    });

    // Simulate AI analysis with delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Static demo data for Adam Mohib
    const demoResult: AnalysisResult = {
      overallScore: 87,
      verdict: "legitimate",
      summary: "Strong academic profile with consistent progression in data science. Demonstrates genuine commitment through multiple concurrent roles and research involvement. Profile shows authentic growth trajectory with verifiable academic credentials and practical experience.",
      categories: {
        companyVerification: {
          score: 90,
          explanation: "UC Santa Barbara is a well-established research university with verifiable programs. Daily Nexus is the official UCSB student newspaper. All organizations are legitimate and align with student status."
        },
        artifactsCredentials: {
          score: 82,
          explanation: "Currently pursuing BS in Data Science & Mathematics at UCSB (2024-2028). Dual enrollment at Diablo Valley College demonstrates early academic initiative. Active research involvement in PSTAT Department adds credibility."
        },
        experienceAnalysis: {
          score: 88,
          explanation: "Career trajectory shows logical progression from tutoring to research and data analysis roles. Multiple concurrent positions are typical for ambitious undergraduates. Research assistant role at UCSB PSTAT Department indicates genuine academic engagement."
        },
        networkPatterns: {
          score: 85,
          explanation: "500+ connections is appropriate for an active undergraduate. Following influential figures like Sal Khan and Lex Fridman shows genuine interest in educational technology and AI. Network composition aligns with academic and data science focus."
        }
      },
      experiences: [
        {
          id: 1,
          title: "Research Assistant",
          company: "UC Santa Barbara - PSTAT Department",
          duration: "Oct 2024 - Present (1 yr 1 mo)",
          score: 92,
          analysis: "Research position in the Statistics department is highly credible. Academic research roles require faculty approval and demonstrate genuine academic capability. Timeline is consistent with sophomore year involvement.",
          redFlags: [],
          strengths: [
            "Official university research position",
            "Academic department affiliation adds credibility",
            "Demonstrates research aptitude"
          ]
        },
        {
          id: 2,
          title: "Data Reporting Analyst",
          company: "Daily Nexus",
          duration: "Oct 2024 - Present (1 yr 1 mo)",
          score: 88,
          analysis: "Daily Nexus is UCSB's official student newspaper. Data reporting analyst role is legitimate and aligns with data science major. Part-time position fits student schedule.",
          redFlags: [],
          strengths: [
            "Official student publication",
            "Role aligns with academic focus",
            "Practical application of data skills"
          ]
        },
        {
          id: 3,
          title: "Contributing Member",
          company: "Data Science UCSB",
          duration: "Sep 2024 - Present (1 yr 2 mos)",
          score: 85,
          analysis: "Active involvement in data science student organization shows genuine interest beyond coursework. Contributing member status is appropriate for active participants.",
          redFlags: [],
          strengths: [
            "Student organization involvement",
            "Demonstrates community engagement",
            "Aligns with major and career goals"
          ]
        },
        {
          id: 4,
          title: "Freelance Tutor",
          company: "Self Employed",
          duration: "Aug 2023 - Present (2 yrs 3 mos)",
          score: 83,
          analysis: "Tutoring math, English, and computer science demonstrates teaching ability and subject mastery. Self-employment is common for tutors and shows entrepreneurial initiative.",
          redFlags: [],
          strengths: [
            "Long-term consistency",
            "Multiple subject expertise",
            "Helped students improve grades and confidence"
          ]
        },
        {
          id: 5,
          title: "Software Engineer Intern",
          company: "Swing Phi",
          duration: "May 2025 - Aug 2025 (4 mos)",
          score: 86,
          analysis: "Summer internship timeline is typical for software engineering roles. 4-month duration is standard for internships. Future-dated position (May 2025) indicates secured opportunity.",
          redFlags: [],
          strengths: [
            "Secured software engineering internship",
            "Standard internship timeline",
            "Demonstrates technical competency"
          ]
        }
      ]
    };

    setResult(demoResult);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis complete!",
      description: `Overall score: ${demoResult.overallScore}/100`,
    });
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
