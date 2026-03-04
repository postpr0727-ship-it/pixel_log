// Portfolio Category Types
export type PortfolioCategory =
  | 'design_branding'
  | 'design_web'
  | 'design_print'
  | 'blog_marketing'
  | 'online_ad'
  | 'dev_website'
  | 'dev_software'
  | 'video';

// Service Type for consultation form
export type ServiceType =
  | 'branding'
  | 'web_design'
  | 'print_design'
  | 'blog_marketing'
  | 'online_ad'
  | 'website_dev'
  | 'software_dev'
  | 'video_production'
  | 'other';

// Consultation Status
export type ConsultationStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

// Portfolio Item
export interface Portfolio {
  id: string;
  title: string;
  category: PortfolioCategory;
  thumbnail_url: string;
  images: string[];
  description: string;
  client_name?: string;
  project_date?: string;
  affiliation?: string;
  link_url?: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Consultation Request
export interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service_type: ServiceType;
  budget?: string;
  message: string;
  status: ConsultationStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

// Blog Link (for about page)
export interface BlogLink {
  id: string;
  title: string;
  url: string;
  thumbnail_url?: string;
  description?: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Video Link (for video page)
export interface VideoLink {
  id: string;
  title: string;
  url: string;
  thumbnail_url?: string;
  description?: string;
  video_type: 'youtube' | 'vimeo' | 'other';
  published_at?: string; // YouTube upload date
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Service Category Display Info
export interface ServiceCategory {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  href: string;
  icon: string;
  gradient: string;
}

// Navigation Item
export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

// Form Input Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service_type: ServiceType;
  budget?: string;
  message: string;
}

export interface PortfolioFormData {
  title: string;
  category: PortfolioCategory;
  thumbnail_url: string;
  images: string[];
  description: string;
  client_name?: string;
  project_date?: string;
  affiliation?: string;
  link_url?: string;
  is_published: boolean;
  display_order: number;
}

export interface BlogLinkFormData {
  title: string;
  url: string;
  thumbnail_url?: string;
  description?: string;
  is_published: boolean;
  display_order: number;
}

export interface VideoLinkFormData {
  title: string;
  url: string;
  thumbnail_url?: string;
  description?: string;
  video_type: 'youtube' | 'vimeo' | 'other';
  published_at?: string; // YouTube upload date
  is_published: boolean;
  display_order: number;
}

// Dashboard Stats
export interface DashboardStats {
  totalPortfolios: number;
  totalConsultations: number;
  pendingConsultations: number;
  totalBlogLinks: number;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
