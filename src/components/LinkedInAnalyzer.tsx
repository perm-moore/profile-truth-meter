import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setError("");
    
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

    // Check which profile to show
    const isAdamProfile = url.includes('adamsmohib');
    const isHoshangProfile = url.includes('hoshangv');
    const isAshleyProfile = url.includes('ashweaver');

    let demoResult: AnalysisResult;

    if (isAdamProfile) {
      // Static demo data for Adam Mohib (good example)
      demoResult = {
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
    } else if (isHoshangProfile) {
      // Static demo data for Hoshang (bad example)
      demoResult = {
        overallScore: 42,
        verdict: "questionable",
        summary: "Profile shows multiple red flags including numerous overlapping executive positions, vague job descriptions, and inconsistent timeline patterns. Claims of massive team sizes and global presence cannot be verified. Heavy use of buzzwords without concrete achievements.",
        categories: {
          companyVerification: {
            score: 35,
            explanation: "Multiple companies with unclear verification status. MindHind Consulting claims '500+ Global Team' but lacks verifiable proof. Revenue Rushy claims '100+ experts' with limited online presence. Multiple companies founded simultaneously raises concerns."
          },
          artifactsCredentials: {
            score: 45,
            explanation: "Harvard Business School Online certification listed as MBA is misleading - these are online certificate courses, not degree programs. Education timeline conflicts with claimed work experience. Multiple degrees from distance education programs."
          },
          experienceAnalysis: {
            score: 38,
            explanation: "Impossible overlap of full-time executive positions - claims to be EVP, CTO, CGO, and Co-Founder at multiple companies simultaneously. Job descriptions are generic with buzzwords but lack specific achievements. Short tenure at many positions (8 months, 1 year)."
          },
          networkPatterns: {
            score: 50,
            explanation: "11,487 followers but limited engagement on posts. Following patterns show generic tech influencers. Network connections don't align with claimed senior executive positions at major corporations like JP Morgan Chase and UN."
          }
        },
        experiences: [
          {
            id: 1,
            title: "Chief Growth Officer",
            company: "Revenue Rushy Inc.",
            duration: "Dec 2023 - Present (1 yr 11 mos)",
            score: 35,
            analysis: "Claims 100+ team members for a lead generation agency with minimal online presence. Company website and verifiable client testimonials are lacking. Timeline overlaps with multiple other C-level positions.",
            redFlags: [
              "Unverifiable team size claims",
              "Overlaps with 3 other executive positions",
              "Limited digital footprint for claimed scale"
            ],
            strengths: []
          },
          {
            id: 2,
            title: "Executive Vice President",
            company: "MindHind Consulting Group",
            duration: "Jul 2023 - Present (2 yrs 4 mos)",
            score: 40,
            analysis: "Claims '500+ Global Team Strength' and 'Global Presence in America, Europe, Australia, Middle East & Asia' but company lacks verifiable evidence of this scale. Generic descriptions without specific achievements or measurable results.",
            redFlags: [
              "Unverifiable global team claims",
              "Promoted from SVP to EVP in just 1 year",
              "Vague responsibilities and achievements"
            ],
            strengths: [
              "Long tenure at one company"
            ]
          },
          {
            id: 3,
            title: "Chief Technology Officer",
            company: "Ayuryog Healing Products",
            duration: "Jul 2022 - Present (3 yrs 4 mos)",
            score: 38,
            analysis: "CTO role at wellness products company while holding multiple other executive tech positions. No technical achievements or product launches mentioned. Role description is minimal.",
            redFlags: [
              "Unclear how this relates to claimed tech expertise",
              "No specific technical accomplishments listed",
              "Overlaps with multiple other positions"
            ],
            strengths: []
          },
          {
            id: 4,
            title: "Co-Founder",
            company: "LumioAI",
            duration: "Apr 2024 - Nov 2024 (8 mos)",
            score: 45,
            analysis: "Very short 8-month tenure ending in 'Ownership Liquidation' - typically indicates failure. Founded while holding 3 other executive positions. Generic AI company description with no unique value proposition.",
            redFlags: [
              "Ownership liquidation after 8 months suggests failure",
              "Founded during multiple other C-level roles",
              "No concrete achievements or products mentioned"
            ],
            strengths: []
          },
          {
            id: 5,
            title: "IT Advisor/Consultant",
            company: "Office of Vice President of India",
            duration: "Jul 2022 - Dec 2023 (1 yr 6 mos)",
            score: 50,
            analysis: "High-profile government position claim is difficult to verify. No specific projects or achievements mentioned. 'Member of Technical Growth Advisory Board' is vague and unverifiable through official government channels.",
            redFlags: [
              "Unverifiable government position",
              "No specific projects or outcomes",
              "Overlaps with 3 other positions"
            ],
            strengths: []
          }
        ]
      };
    } else if (isAshleyProfile) {
      // Static demo data for Ashley Weaver (good example)
      demoResult = {
        overallScore: 89,
        verdict: "legitimate",
        summary: "Exceptional profile demonstrating genuine technical expertise and career progression in developer advocacy and solutions engineering. Active thought leadership in AI/ML space with verifiable work history at established tech companies. Strong authenticity signals across all categories.",
        categories: {
          companyVerification: {
            score: 92,
            explanation: "All companies (WRITER, Stytch, Skyflow) are verifiable, well-established tech organizations with legitimate online presence. Company transitions show logical career progression in the auth/security and AI space."
          },
          artifactsCredentials: {
            score: 90,
            explanation: "BS in Computer Science from University of Colorado Boulder (2019-2023) with verified coursework in algorithms, databases, and web development. LinkedIn certifications in JavaScript and React.js add credibility. Recent technical content demonstrates deep expertise."
          },
          experienceAnalysis: {
            score: 88,
            explanation: "Clear career progression from Solutions Engineer roles to Developer Advocate. Concrete projects documented (Chrome extension, demo infrastructure, RAG-MCP implementation). Active technical writing and open-source contributions validate expertise."
          },
          networkPatterns: {
            score: 86,
            explanation: "907 followers with authentic engagement patterns. Network includes verified colleagues from WRITER, Stytch, and Skyflow. Technical posts receive meaningful engagement from industry professionals, indicating genuine influence."
          }
        },
        experiences: [
          {
            id: 1,
            title: "Developer Advocate",
            company: "WRITER",
            duration: "Jun 2025 - Present (5 mos)",
            score: 94,
            analysis: "Current role at established AI company with active thought leadership. Recent posts demonstrate deep technical expertise in RAG-MCP, context engineering, and LLM tooling. Open-source contributions and technical writing validate role.",
            redFlags: [],
            strengths: [
              "Active technical content creation on AI/ML topics",
              "Verified company affiliation",
              "Clear expertise in RAG and context engineering",
              "Open-source contributions to MCP implementations"
            ]
          },
          {
            id: 2,
            title: "Solutions Engineer",
            company: "Stytch",
            duration: "Mar 2024 - Jun 2025 (1 yr 4 mos)",
            score: 91,
            analysis: "Well-documented tenure at authentication platform. Role aligns perfectly with technical background in security and APIs. Standard duration for solutions engineering before advancing to developer advocacy.",
            redFlags: [],
            strengths: [
              "Clear transition timeline",
              "Relevant industry experience in auth/security",
              "Technical depth matches role requirements",
              "Logical step to Developer Advocate role"
            ]
          },
          {
            id: 3,
            title: "Solutions Engineer",
            company: "Skyflow",
            duration: "Aug 2023 - Jan 2024 (6 mos)",
            score: 88,
            analysis: "Demonstrated concrete technical achievements including Chrome extension development using HTML, JavaScript, and APIs. Created centralized demo repository that improved team efficiency. Documented use of Python, AWS Lambda, and API Gateways.",
            redFlags: [
              "Shorter tenure of 6 months"
            ],
            strengths: [
              "Concrete project examples with technical details",
              "Built Chrome extension for sensitive data detection",
              "Cross-functional impact on sales and engineering teams",
              "Specific technologies documented (Python, JavaScript, AWS)"
            ]
          },
          {
            id: 4,
            title: "Frontend Developer",
            company: "T9Hacks Hackathon",
            duration: "Oct 2022 - Aug 2023 (11 mos)",
            score: 85,
            analysis: "Seasonal role leading website redesign for university hackathon. Demonstrates community involvement and practical application of web development skills during college.",
            redFlags: [],
            strengths: [
              "Leadership in student organization",
              "Practical web development experience",
              "Community engagement and event organization"
            ]
          },
          {
            id: 5,
            title: "Library Student Worker",
            company: "University of Colorado Boulder",
            duration: "May 2022 - May 2023 (1 yr 1 mo)",
            score: 80,
            analysis: "Part-time student work during college. Shows consistent employment while studying. Typical student job that demonstrates work ethic.",
            redFlags: [],
            strengths: [
              "Demonstrates work ethic during studies",
              "Consistent year-long employment",
              "Balance of work and academic commitments"
            ]
          }
        ]
      };
    } else {
      // Default error for other URLs
      setIsAnalyzing(false);
      setError("Please use one of the demo profiles: adamsmohib (good), ashweaver (good), or hoshangv (questionable)");
      return;
    }

    setIsAnalyzing(false);
    
    toast({
      title: "Analysis complete!",
      description: `Overall score: ${demoResult.overallScore}/100`,
    });

    // Navigate to results page
    navigate("/results", { state: { result: demoResult } });
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
