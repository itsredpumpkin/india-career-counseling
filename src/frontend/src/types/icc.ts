export interface Course {
  id: string;
  title: string;
  description: string;
  stream: string;
  duration: string;
  level: string;
  fees: number;
  eligibility: string;
  colleges: string[];
  highlights: string[];
  careerProspects: string[];
  createdAt: bigint;
  updatedAt: bigint;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl: string;
  publishedAt: bigint;
  updatedAt: bigint;
}

export interface Testimonial {
  id: string;
  studentName: string;
  course: string;
  college: string;
  year: string;
  message: string;
  rating: number;
  avatarUrl: string;
  createdAt: bigint;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  isRead: boolean;
  createdAt: bigint;
}

export type ServiceKey =
  | "career-counseling"
  | "stream-selection"
  | "entrance-exam"
  | "study-abroad"
  | "diploma-placement";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface AdminSession {
  token: string;
  username: string;
  expiresAt: number;
}
