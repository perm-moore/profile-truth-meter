import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Briefcase, AlertTriangle, CheckCircle } from "lucide-react";
import type { Experience } from "./LinkedInAnalyzer";

interface ExperienceBreakdownProps {
  experiences: Experience[];
}

export const ExperienceBreakdown = ({ experiences }: ExperienceBreakdownProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return "bg-success/10";
    if (score >= 50) return "bg-warning/10";
    return "bg-destructive/10";
  };

  const getVerdictText = (score: number) => {
    if (score >= 75) return "Highly Credible";
    if (score >= 50) return "Moderately Credible";
    return "Low Credibility";
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="h-6 w-6 text-primary" />
        <h3 className="text-2xl font-bold text-foreground">
          Experience Analysis
        </h3>
      </div>
      
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <Card
            key={experience.id}
            className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold text-muted-foreground">
                      #{experience.id}
                    </span>
                    <h4 className="text-xl font-bold text-foreground">
                      {experience.title}
                    </h4>
                  </div>
                  <p className="text-base text-muted-foreground">
                    {experience.company} • {experience.duration}
                  </p>
                </div>
                
                <div className={`flex flex-col items-end gap-2 ${getScoreBgColor(experience.score)} rounded-lg px-4 py-2`}>
                  <span className={`text-3xl font-bold ${getScoreColor(experience.score)}`}>
                    {experience.score}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {getVerdictText(experience.score)}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <Progress value={experience.score} className="h-2" />

              {/* Analysis */}
              <p className="text-sm text-foreground/80 leading-relaxed">
                {experience.analysis}
              </p>

              {/* Strengths and Red Flags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {experience.strengths.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-semibold">Strengths</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {experience.strengths.map((strength, idx) => (
                        <Badge key={idx} variant="outline" className="bg-success/10 text-success border-success/20">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {experience.redFlags.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm font-semibold">Red Flags</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {experience.redFlags.map((flag, idx) => (
                        <Badge key={idx} variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                          {flag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
