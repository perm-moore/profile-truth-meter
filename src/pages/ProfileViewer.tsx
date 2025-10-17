import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

const ProfileViewer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1b1f23]">
      {/* Header */}
      <div className="bg-gradient-hero py-6 px-4 sticky top-0 z-10 border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>
          <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
            <ExternalLink className="h-4 w-4" />
            <span>Viewing LinkedIn Profile</span>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {/* Profile Header Section */}
          <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-gray-800 shadow-xl">
            <img
              src="/profile-images/profile-header.png"
              alt="Perm Moore LinkedIn Profile Header"
              className="w-full h-auto"
            />
          </div>

          {/* Experience Section 1 */}
          <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-gray-800 shadow-xl">
            <img
              src="/profile-images/profile-experience-1.png"
              alt="Perm Moore LinkedIn Experience Section 1"
              className="w-full h-auto"
            />
          </div>

          {/* Experience Section 2 */}
          <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-gray-800 shadow-xl">
            <img
              src="/profile-images/profile-experience-2.png"
              alt="Perm Moore LinkedIn Experience Section 2"
              className="w-full h-auto"
            />
          </div>

          {/* Projects Section */}
          <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-gray-800 shadow-xl">
            <img
              src="/profile-images/profile-projects.png"
              alt="Perm Moore LinkedIn Projects Section"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            This is a snapshot of the analyzed LinkedIn profile
          </p>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mt-4"
          >
            Return to Analysis Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewer;

