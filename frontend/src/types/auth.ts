// src/types/auth.ts
export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// src/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateData {
  name?: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

// src/types/portfolio.ts
export interface Portfolio {
  id: number;
  userId: number;
  template: string;
  title: string;
  description: string;
  skills: string[];
  shareableLink: string;
  createdAt: string;
  updatedAt: string;
  projects?: Project[];
  certificates?: Certificate[];
}

export interface PortfolioCreateData {
  template: string;
  title: string;
  description: string;
  skills: string[];
}

// src/types/project.ts
export interface Project {
  id: number;
  userId: number;
  title: string;
  description: string;
  repoUrl: string | null;
  demoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCreateData {
  title: string;
  description: string;
  repoUrl?: string;
  demoUrl?: string;
}

// src/types/certificate.ts
export interface Certificate {
  id: number;
  userId: number;
  title: string;
  issuer: string;
  issueDate: string;
  url: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateCreateData {
  title: string;
  issuer: string;
  issueDate: string;
  url?: string;
}
