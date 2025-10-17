import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Building2, Briefcase, Award, Users } from "lucide-react";

interface Category {
  score: number;
  explanation: string;
}

interface CategoryBreakdownProps {
  categories: {
    companyVerification: Category;
    artifactsCredentials: Category;
    experienceAnalysis: Category;
    networkPatterns: Category;
  };
}

const categoryConfig = {
  companyVerification: {
    icon: Building2,
    title: "Company Verification",
    description: "Validity of listed companies and roles",
  },
  artifactsCredentials: {
    icon: Award,
    title: "Artifacts & Credentials",
    description: "Tangible work products and certifications",
  },
  experienceAnalysis: {
    icon: Briefcase,
    title: "Experience Analysis",
    description: "Career progression and role details",
  },
  networkPatterns: {
    icon: Users,
    title: "Network Patterns",
    description: "Connection quality for career level",
  },
};

export const CategoryBreakdown = ({ categories }: CategoryBreakdownProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Detailed Analysis
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(categories).map(([key, data], index) => {
          const config = categoryConfig[key as keyof typeof categoryConfig];
          const Icon = config.icon;
          
          return (
            <Card
              key={key}
              className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-foreground">
                      {config.title}
                    </h4>
                    <span className={`text-2xl font-bold ${getScoreColor(data.score)}`}>
                      {data.score}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {config.description}
                  </p>
                  
                  <Progress value={data.score} className="h-2 mb-3" />
                  
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {data.explanation}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
