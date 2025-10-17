import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ScoreCard } from "@/components/ScoreCard";
import { ExperienceBreakdown } from "@/components/ExperienceBreakdown";
import { CategoryBreakdown } from "@/components/CategoryBreakdown";
import type { AnalysisResult } from "@/components/LinkedInAnalyzer";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Get the result from location state
    if (location.state?.result) {
      setResult(location.state.result);
    } else {
      // If no result, redirect back to home
      navigate("/");
    }
  }, [location, navigate]);

  if (!result) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-primary-foreground hover:bg-primary-foreground/10 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Analyze Another Profile
          </Button>
          <h1 className="text-4xl font-bold text-primary-foreground">
            Profile Analysis Results
          </h1>
        </div>
      </div>

      {/* Results Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <ScoreCard result={result} />
        <ExperienceBreakdown experiences={result.experiences} />
        <CategoryBreakdown categories={result.categories} />
      </div>
    </div>
  );
};

export default Results;

