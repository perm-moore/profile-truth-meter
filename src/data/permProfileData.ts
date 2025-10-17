// Hardcoded analysis data for https://www.linkedin.com/in/perm/
export const permProfileData = {
  overallScore: 92,
  verdict: "legitimate" as const,
  summary: "Perm Moore demonstrates an exceptional and highly credible professional profile with extensive experience at tier-1 tech companies including Google and YouTube. Her career trajectory shows consistent growth from technical roles to strategic leadership positions in AI/ML, policy, and compliance. The profile exhibits strong evidence of legitimate expertise in AI governance, machine learning operations, and product management with verifiable employment at major technology companies.",
  categories: {
    companyVerification: {
      score: 98,
      explanation: "Outstanding company verification with employment at Google, YouTube, and National Services Group. All companies are real, verifiable, and well-established organizations. The progression from Cloud Support Engineer to roles at YouTube/Google (7+ years) to Head of ML demonstrates authentic career growth. Company sizes and industries align perfectly with the described responsibilities. Google and YouTube are tier-1 tech companies with rigorous hiring standards, lending significant credibility to the profile."
    },
    artifactsCredentials: {
      score: 88,
      explanation: "Strong evidence of concrete work products and credentials. The profile mentions specific projects including Collaba ML (current venture), system monitoring with New Relic, Dark Matter Research at University of Louisville, and Pakedge Device & Software project. Educational credentials include a Bachelor of Science in Physics and Astrophysics from University of Louisville (2006-2011), providing a solid technical foundation. The combination of astrophysics background with AI/ML work is unique and credible. Top skills listed include Product Management and Python programming."
    },
    experienceAnalysis: {
      score: 90,
      explanation: "Excellent career progression showing logical advancement from technical support roles to strategic leadership. Started as Cloud Support Engineer (2014), moved to YouTube Product Support Team Lead and Policy/Compliance roles (2015-2016), then spent significant time at Google in Trust & Safety (2022-2024), and recently transitioned to ML leadership at National Services Group and founded Collaba ML. The 7+ years at Google/YouTube demonstrates stability and growth. Responsibilities are detailed, realistic, and align with role titles. The transition from astrophysics to tech to AI/ML shows intellectual depth and adaptability."
    },
    networkPatterns: {
      score: 92,
      explanation: "Network metrics show 219 followers and 183 connections, which is modest but appropriate for someone focused on deep work rather than social media presence. The profile demonstrates authentic community engagement through volunteering as Site Lead for Asian Google Network at multiple locations (Playa Vista, Beverly Hills, Santa Barbara) from 2017-2020, showing 3 years of consistent community leadership. This internal networking at Google is a strong indicator of genuine employment and cultural contribution. The follower-to-connection ratio is natural and not inflated."
    }
  },
  experiences: [
    {
      id: 1,
      title: "Founder",
      company: "Collaba ML",
      duration: "Jun 2025 – Present · 5 mos",
      score: 95,
      analysis: "Current entrepreneurial venture in machine learning and AI. As founder, Perm is leading Marketing/GTM efforts for Collaba ML, a full-time hybrid role based in Playa Vista, CA. The venture focuses on Google Cloud Platform (GCP) and Product Management, with specific technical implementations including system monitoring and guardrails using New Relic for orchestration and A/B testing. The project has 11 other contributors, indicating a real team and active development. This represents a natural evolution from her Head of ML role, leveraging her extensive experience in AI/ML systems.",
      redFlags: [],
      strengths: [
        "Entrepreneurial initiative after building ML expertise",
        "Specific technical stack mentioned (New Relic, GCP)",
        "Real team with 11 contributors",
        "Clear focus on product management and GTM strategy"
      ]
    },
    {
      id: 2,
      title: "Head of ML",
      company: "National Services Group, Inc.",
      duration: "Jun 2025 – Oct 2025 · 5 mos",
      score: 88,
      analysis: "Led enterprise machine learning strategy and execution across finance, operations, and compliance at National Services Group. Responsibilities included building production-grade ML systems and forecasting models from conception to deployment. This role demonstrates C-level technical leadership and strategic thinking. The 5-month duration suggests either a contract role or rapid transition to founding Collaba ML. Skills include Machine Learning, Artificial Intelligence, and 10+ additional technical competencies.",
      redFlags: [
        "Relatively short 5-month duration for a Head of ML role"
      ],
      strengths: [
        "C-suite level ML leadership experience",
        "End-to-end ML system development",
        "Cross-functional impact (finance, operations, compliance)",
        "Production-grade system deployment experience"
      ]
    },
    {
      id: 3,
      title: "Machine Learning Specialist",
      company: "National Services Group, Inc.",
      duration: "Mar 2025 – May 2025 · 3 mos",
      score: 85,
      analysis: "Drove AI/ML automation across organization-wide operations and compliance to improve efficiency and risk management. Owned models, deployed them, built pipelines, and validated mined data. This role shows hands-on technical ML work before promotion to Head of ML. The 3-month duration indicates rapid advancement based on strong performance. Skills include Automation, Machine Learning, and 3+ additional competencies.",
      redFlags: [
        "Very short 3-month duration before promotion"
      ],
      strengths: [
        "Hands-on ML pipeline development",
        "Data validation and model ownership",
        "Compliance automation expertise",
        "Rapid promotion to leadership demonstrates strong performance"
      ]
    },
    {
      id: 4,
      title: "Trust & Safety Product Operations Manager",
      company: "Google",
      duration: "2022 - 2024 · 2 yrs",
      score: 98,
      analysis: "Managed policy operations, risk & compliance, and legal/FTC ad enforcement at Google. Dedicated to combating misinformation, hate speech, harassment, and harmful content on Google's platform. This is a highly credible role at one of the world's most prestigious tech companies. The 2-year duration shows stability and impact. Trust & Safety is a critical function at Google requiring deep policy knowledge, technical understanding, and stakeholder management. Skills include Product Operations, Product Support, and 6+ additional competencies.",
      redFlags: [],
      strengths: [
        "Employment at Google (tier-1 verification)",
        "Critical trust & safety responsibilities",
        "Policy and compliance expertise",
        "Legal and regulatory enforcement experience",
        "2-year tenure showing stability and impact"
      ]
    },
    {
      id: 5,
      title: "Policy, Risk and Compliance Operations Lead",
      company: "YouTube",
      duration: "Mar 2015 - Jun 2016 · 1 yr 4 mos",
      score: 96,
      analysis: "Led policy development, risk management, compliance oversight, and product support management at YouTube. This role at a Google subsidiary demonstrates high-level operational leadership in content policy and platform safety. The 16-month duration is substantial and shows successful delivery. Responsibilities align perfectly with YouTube's content moderation and policy enforcement needs. Skills include Product Operations, Content Management, and 3+ additional competencies.",
      redFlags: [],
      strengths: [
        "Leadership role at YouTube (Google subsidiary)",
        "Policy development and risk management",
        "Compliance oversight experience",
        "Foundation for later Google Trust & Safety role"
      ]
    },
    {
      id: 6,
      title: "Product Support Team Lead",
      company: "YouTube",
      duration: "Mar 2015 - Dec 2015 · 10 mos",
      score: 94,
      analysis: "Managed product support for YouTube's in-house content moderation, overseeing 90%+ of the ecosystem for integration. This role shows leadership in YouTube's critical content operations infrastructure. The overlap with the Policy/Compliance role suggests either a dual role or transition period, which is common in fast-paced tech environments. The scale (90% of ecosystem) indicates significant responsibility and impact.",
      redFlags: [
        "Overlaps with Policy, Risk and Compliance Operations Lead role"
      ],
      strengths: [
        "Team leadership at YouTube",
        "Massive scale (90% of content moderation ecosystem)",
        "Content operations expertise",
        "Foundation for policy and compliance work"
      ]
    },
    {
      id: 7,
      title: "Cloud Support Engineer",
      company: "Residco",
      duration: "Jan 2014 - Jan 2015 · 1 yr 1 mo",
      score: 88,
      analysis: "Managed and regulated bugs, fixes, and post-mortems for cloud database systems. Responsible for ensuring product and system protection to improve UI. This entry-level technical role provided foundational cloud infrastructure and support experience. The 13-month duration is appropriate for an early-career role. Specific project work on Pakedge Device & Software adds credibility. Skills include User Experience (UX), Software Development, and 3+ additional competencies.",
      redFlags: [],
      strengths: [
        "Technical foundation in cloud infrastructure",
        "Bug management and post-mortem analysis",
        "Specific project deliverable (Pakedge)",
        "Appropriate duration for early career role",
        "Led to YouTube opportunity"
      ]
    }
  ]
};

