import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, XCircle } from "lucide-react";
import { AnalysisResult } from "./LinkedInAnalyzer";

interface ScoreCardProps {
  result: AnalysisResult;
}

export const ScoreCard = ({ result }: ScoreCardProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // Animate score counting up
    const timer = setTimeout(() => {
      let current = 0;
      const increment = result.overallScore / 30;
      const interval = setInterval(() => {
        current += increment;
        if (current >= result.overallScore) {
          setDisplayScore(result.overallScore);
          clearInterval(interval);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, 20);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, [result.overallScore]);

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 75) return "from-success to-secondary";
    if (score >= 50) return "from-warning to-destructive";
    return "from-destructive to-destructive/70";
  };

  const getIcon = () => {
    if (result.verdict === "legitimate")
      return <Shield className="h-16 w-16 text-success" />;
    if (result.verdict === "questionable")
      return <AlertTriangle className="h-16 w-16 text-warning" />;
    return <XCircle className="h-16 w-16 text-destructive" />;
  };

  const getVerdictText = () => {
    if (result.verdict === "legitimate") return "Legitimate Profile";
    if (result.verdict === "questionable") return "Questionable Profile";
    return "Suspicious Profile";
  };

  const getVerdictBg = () => {
    if (result.verdict === "legitimate") return "bg-success/10 border-success/20";
    if (result.verdict === "questionable") return "bg-warning/10 border-warning/20";
    return "bg-destructive/10 border-destructive/20";
  };

  return (
    <Card className="p-8 bg-gradient-card shadow-medium animate-scale-in">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Score Circle */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${getScoreGradient(result.overallScore)} rounded-full blur-xl opacity-20`} />
            <div className="relative w-48 h-48 rounded-full border-8 border-muted flex items-center justify-center bg-card">
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(displayScore)}`}>
                  {displayScore}
                </div>
                <div className="text-sm text-muted-foreground font-medium mt-1">
                  Legitimacy Score
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verdict & Summary */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            {getIcon()}
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {getVerdictText()}
              </h2>
              <div className={`inline-block mt-2 px-4 py-1 rounded-full border ${getVerdictBg()}`}>
                <span className={`text-sm font-medium ${getScoreColor(result.overallScore)}`}>
                  {result.verdict.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {result.summary}
          </p>

          {/* Score Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Authenticity</span>
              <span className={`font-semibold ${getScoreColor(result.overallScore)}`}>
                {result.overallScore}%
              </span>
            </div>
            <Progress 
              value={displayScore} 
              className="h-3"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
