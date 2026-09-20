export interface Skill {
  name: string;
  icon: string;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  images?: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description?: string;
}

export interface Experience {
  id: string;
  role: string;
  company?: string;
  period: string;
  description: string;
  technologies?: string[];
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email';
  url: string;
  label: string;
}

export interface PortfolioData {
  brand: string;
  greeting: string;
  title: string;
  subtitle: string;
  avatarUrl: string;
  resumeUrl?: string;
  statusBadge?: {
    available: boolean;
    text: string;
  };
  codeSnippet?: {
    language: string;
    lines: string[];
  };
  socials: SocialLink[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  experience: Experience[];
  cta: {
    heading: string;
    buttonText: string;
  };
}
