import { z } from 'zod';

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요.').max(50, '이름은 50자 이하로 입력해주세요.'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
  phone: z.string()
    .min(10, '연락처를 정확히 입력해주세요.')
    .max(15, '연락처를 정확히 입력해주세요.')
    .regex(/^[0-9-]+$/, '연락처는 숫자와 하이픈만 입력 가능합니다.'),
  company: z.string().max(100, '회사명은 100자 이하로 입력해주세요.').optional(),
  service_type: z.enum([
    'branding',
    'web_design',
    'print_design',
    'blog_marketing',
    'online_ad',
    'website_dev',
    'software_dev',
    'video_production',
    'other'
  ], { message: '서비스 종류를 선택해주세요.' }),
  budget: z.string().optional(),
  message: z.string()
    .min(10, '문의 내용은 10자 이상 입력해주세요.')
    .max(2000, '문의 내용은 2000자 이하로 입력해주세요.')
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

// Portfolio Form Schema
export const portfolioFormSchema = z.object({
  title: z.string().min(2, '제목은 2자 이상 입력해주세요.').max(100, '제목은 100자 이하로 입력해주세요.'),
  category: z.enum([
    'design',
    'blog_marketing',
    'online_ad',
    'dev',
    'video'
  ], { message: '카테고리를 선택해주세요.' }),
  thumbnail_url: z.string().url('올바른 URL을 입력해주세요.').optional().or(z.literal('')),
  images: z.array(z.string().url('올바른 URL을 입력해주세요.')).default([]),
  description: z.string().max(2000, '설명은 2000자 이하로 입력해주세요.').optional(),
  client_name: z.string().max(100, '클라이언트명은 100자 이하로 입력해주세요.').optional(),
  project_date: z.string().optional(),
  affiliation: z.string().max(100, '소속은 100자 이하로 입력해주세요.').optional(),
  link_url: z.string().url('올바른 URL을 입력해주세요.').optional().or(z.literal('')),
  is_published: z.boolean().default(false),
});

export type PortfolioFormSchema = z.infer<typeof portfolioFormSchema>;

// Blog Link Form Schema
export const blogLinkFormSchema = z.object({
  title: z.string().min(2, '제목은 2자 이상 입력해주세요.').max(200, '제목은 200자 이하로 입력해주세요.'),
  url: z.string().url('올바른 URL을 입력해주세요.'),
  thumbnail_url: z.string().url('올바른 URL을 입력해주세요.').optional().or(z.literal('')),
  description: z.string().max(500, '설명은 500자 이하로 입력해주세요.').optional(),
  is_published: z.boolean().default(false),
  display_order: z.number().int().min(0).default(0)
});

export type BlogLinkFormSchema = z.infer<typeof blogLinkFormSchema>;

// Video Link Form Schema
export const videoLinkFormSchema = z.object({
  title: z.string().min(2, '제목은 2자 이상 입력해주세요.').max(200, '제목은 200자 이하로 입력해주세요.'),
  url: z.string().url('올바른 URL을 입력해주세요.'),
  thumbnail_url: z.string().url('올바른 URL을 입력해주세요.').optional().or(z.literal('')),
  description: z.string().max(500, '설명은 500자 이하로 입력해주세요.').optional(),
  video_type: z.enum(['youtube', 'vimeo', 'other']).default('youtube'),
  published_at: z.string().optional().or(z.literal('')),
  is_published: z.boolean().default(false),
  display_order: z.number().int().min(0).default(0)
});

export type VideoLinkFormSchema = z.infer<typeof videoLinkFormSchema>;

// Consultation Status Update Schema
export const consultationStatusSchema = z.object({
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
  admin_notes: z.string().max(1000, '메모는 1000자 이하로 입력해주세요.').optional()
});

export type ConsultationStatusSchema = z.infer<typeof consultationStatusSchema>;

// Service type labels for display
export const serviceTypeLabels: Record<string, string> = {
  branding: '브랜드 디자인',
  web_design: '웹 디자인',
  print_design: '인쇄 디자인',
  blog_marketing: '블로그 마케팅',
  online_ad: '온라인 광고',
  website_dev: '홈페이지 개발',
  software_dev: '프로그램 개발',
  video_production: '영상 제작',
  other: '기타'
};

// Portfolio category labels for display
export const portfolioCategoryLabels: Record<string, string> = {
  design: '디자인',
  blog_marketing: '블로그 마케팅',
  online_ad: '온라인 광고',
  dev: '개발',
  video: '영상 제작'
};

// Consultation status labels for display
export const consultationStatusLabels: Record<string, string> = {
  pending: '대기중',
  in_progress: '진행중',
  completed: '완료',
  cancelled: '취소'
};

// Budget options for contact form
export const budgetOptions = [
  { value: 'under_500k', label: '50만원 미만' },
  { value: '500k_1m', label: '50만원 ~ 100만원' },
  { value: '1m_3m', label: '100만원 ~ 300만원' },
  { value: '3m_5m', label: '300만원 ~ 500만원' },
  { value: '5m_10m', label: '500만원 ~ 1000만원' },
  { value: 'over_10m', label: '1000만원 이상' },
  { value: 'negotiable', label: '협의 필요' }
];
