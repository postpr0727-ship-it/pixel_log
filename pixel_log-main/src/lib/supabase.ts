import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Portfolio, Consultation, BlogLink, VideoLink } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Client-side Supabase client
// Note: Placeholder values are used during build time. Configure real values in .env.local
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client with service role key for admin operations
export function createServerClient(): SupabaseClient {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// Type for portfolio insert/update
type PortfolioInsert = Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>;
type PortfolioUpdate = Partial<PortfolioInsert>;

// Type for consultation insert/update
type ConsultationInsert = Omit<Consultation, 'id' | 'created_at' | 'updated_at' | 'status' | 'admin_notes'>;
type ConsultationUpdate = Partial<Omit<Consultation, 'id' | 'created_at' | 'updated_at'>>;

// Type for blog link insert/update
type BlogLinkInsert = Omit<BlogLink, 'id' | 'created_at' | 'updated_at'>;
type BlogLinkUpdate = Partial<BlogLinkInsert>;

// Type for video link insert/update
type VideoLinkInsert = Omit<VideoLink, 'id' | 'created_at' | 'updated_at'>;
type VideoLinkUpdate = Partial<VideoLinkInsert>;

// Portfolio CRUD operations
export const portfolioService = {
  async getAll(category?: string): Promise<Portfolio[]> {
    let query = supabase
      .from('portfolios')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as Portfolio[];
  },

  async getById(id: string): Promise<Portfolio> {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Portfolio;
  },

  async getAllAdmin(): Promise<Portfolio[]> {
    const serverClient = createServerClient();
    const { data, error } = await serverClient
      .from('portfolios')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return (data || []) as Portfolio[];
  },

  async create(portfolio: PortfolioInsert): Promise<Portfolio> {
    const serverClient = createServerClient();
    const { data, error } = await serverClient
      .from('portfolios')
      .insert(portfolio as Record<string, unknown>)
      .select()
      .single();

    if (error) throw error;
    return data as Portfolio;
  },

  async update(id: string, portfolio: PortfolioUpdate): Promise<Portfolio> {
    const serverClient = createServerClient();
    const { data, error } = await serverClient
      .from('portfolios')
      .update(portfolio as Record<string, unknown>)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Portfolio;
  },

  async delete(id: string): Promise<void> {
    const serverClient = createServerClient();
    const { error } = await serverClient
      .from('portfolios')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get latest portfolio by main category (for homepage recent projects)
  async getLatestByMainCategory(mainCategory: 'design' | 'blog' | 'online_ad' | 'dev'): Promise<Portfolio | null> {
    let categories: string[] = [];

    switch (mainCategory) {
      case 'design':
        categories = ['design_branding', 'design_web', 'design_print'];
        break;
      case 'blog':
        categories = ['blog_marketing'];
        break;
      case 'online_ad':
        categories = ['online_ad'];
        break;
      case 'dev':
        categories = ['dev_website', 'dev_software'];
        break;
    }

    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('is_published', true)
      .in('category', categories)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    return data as Portfolio | null;
  }
};

// Consultation CRUD operations
export const consultationService = {
  async create(consultation: ConsultationInsert): Promise<Consultation> {
    const { data, error } = await supabase
      .from('consultations')
      .insert(consultation as Record<string, unknown>)
      .select()
      .single();

    if (error) throw error;
    return data as Consultation;
  },

  async getAllAdmin(): Promise<Consultation[]> {
    const serverClient = createServerClient();
    const { data, error } = await serverClient
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Consultation[];
  },

  async updateStatus(id: string, status: string, admin_notes?: string): Promise<Consultation> {
    const serverClient = createServerClient();
    const updateData: ConsultationUpdate = { status: status as Consultation['status'] };
    if (admin_notes !== undefined) {
      updateData.admin_notes = admin_notes;
    }

    const { data, error } = await serverClient
      .from('consultations')
      .update(updateData as Record<string, unknown>)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Consultation;
  }
};

// Blog Links CRUD operations
export const blogLinkService = {
  async getAll(): Promise<BlogLink[]> {
    const { data, error } = await supabase
      .from('blog_links')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return (data || []) as BlogLink[];
  },

  async getAllAdmin(): Promise<BlogLink[]> {
    const serverClient = createServerClient();
    const { data, error } = await serverClient
      .from('blog_links')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return (data || []) as BlogLink[];
  },

  async create(blogLink: BlogLinkInsert): Promise<BlogLink> {
    const serverClient = createServerClient();
    const { data, error } = await serverClient
      .from('blog_links')
      .insert(blogLink as Record<string, unknown>)
      .select()
      .single();

    if (error) throw error;
    return data as BlogLink;
  },

  async update(id: string, blogLink: BlogLinkUpdate): Promise<BlogLink> {
    const serverClient = createServerClient();
    const { data, error } = await serverClient
      .from('blog_links')
      .update(blogLink as Record<string, unknown>)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as BlogLink;
  },

  async delete(id: string): Promise<void> {
    const serverClient = createServerClient();
    const { error } = await serverClient
      .from('blog_links')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Video Links CRUD operations
export const videoLinkService = {
  async getAll(): Promise<VideoLink[]> {
    const { data, error } = await supabase
      .from('video_links')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false, nullsFirst: false });

    if (error) throw error;
    return (data || []) as VideoLink[];
  },

  async getAllAdmin(): Promise<VideoLink[]> {
    const serverClient = createServerClient();
    const { data, error } = await serverClient
      .from('video_links')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return (data || []) as VideoLink[];
  },

  async create(videoLink: VideoLinkInsert): Promise<VideoLink> {
    const serverClient = createServerClient();
    const { data, error } = await serverClient
      .from('video_links')
      .insert(videoLink as Record<string, unknown>)
      .select()
      .single();

    if (error) throw error;
    return data as VideoLink;
  },

  async update(id: string, videoLink: VideoLinkUpdate): Promise<VideoLink> {
    const serverClient = createServerClient();
    const { data, error } = await serverClient
      .from('video_links')
      .update(videoLink as Record<string, unknown>)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as VideoLink;
  },

  async delete(id: string): Promise<void> {
    const serverClient = createServerClient();
    const { error } = await serverClient
      .from('video_links')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Dashboard stats
export const dashboardService = {
  async getStats() {
    const serverClient = createServerClient();

    const [portfolios, consultations, pendingConsultations, blogLinks, videoLinks] = await Promise.all([
      serverClient.from('portfolios').select('id', { count: 'exact', head: true }),
      serverClient.from('consultations').select('id', { count: 'exact', head: true }),
      serverClient.from('consultations').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      serverClient.from('blog_links').select('id', { count: 'exact', head: true }),
      serverClient.from('video_links').select('id', { count: 'exact', head: true })
    ]);

    return {
      totalPortfolios: portfolios.count || 0,
      totalConsultations: consultations.count || 0,
      pendingConsultations: pendingConsultations.count || 0,
      totalBlogLinks: blogLinks.count || 0,
      totalVideoLinks: videoLinks.count || 0
    };
  }
};

// Storage helpers
export const storageService = {
  async uploadImage(file: File, bucket: string = 'portfolio-images') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  },

  async deleteImage(url: string, bucket: string = 'portfolio-images') {
    const path = url.split('/').pop();
    if (!path) return;

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  }
};
