-- PIXEL-LOG Database Schema
-- Run this SQL in the Supabase SQL Editor to create the required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Portfolio Categories Enum
CREATE TYPE portfolio_category AS ENUM (
  'design_branding',
  'design_web',
  'design_print',
  'blog_marketing',
  'online_ad',
  'dev_website',
  'dev_software',
  'video'
);

-- Service Types Enum
CREATE TYPE service_type AS ENUM (
  'branding',
  'web_design',
  'print_design',
  'blog_marketing',
  'online_ad',
  'website_dev',
  'software_dev',
  'video_production',
  'other'
);

-- Consultation Status Enum
CREATE TYPE consultation_status AS ENUM (
  'pending',
  'in_progress',
  'completed',
  'cancelled'
);

-- Video Types Enum
CREATE TYPE video_type AS ENUM (
  'youtube',
  'vimeo',
  'other'
);

-- Portfolios Table
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(100) NOT NULL,
  category portfolio_category NOT NULL,
  thumbnail_url TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  client_name VARCHAR(100),
  project_date VARCHAR(50),
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Consultations Table
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  company VARCHAR(100),
  service_type service_type NOT NULL,
  budget VARCHAR(50),
  message TEXT NOT NULL,
  status consultation_status DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blog Links Table
CREATE TABLE blog_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  description VARCHAR(500),
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Video Links Table
CREATE TABLE video_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  description VARCHAR(500),
  video_type video_type DEFAULT 'youtube',
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update trigger to all tables
CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON portfolios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_links_updated_at
  BEFORE UPDATE ON blog_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_links_updated_at
  BEFORE UPDATE ON video_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better query performance
CREATE INDEX idx_portfolios_category ON portfolios(category);
CREATE INDEX idx_portfolios_is_published ON portfolios(is_published);
CREATE INDEX idx_portfolios_display_order ON portfolios(display_order);

CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created_at ON consultations(created_at DESC);

CREATE INDEX idx_blog_links_is_published ON blog_links(is_published);
CREATE INDEX idx_blog_links_display_order ON blog_links(display_order);

CREATE INDEX idx_video_links_is_published ON video_links(is_published);
CREATE INDEX idx_video_links_display_order ON video_links(display_order);

-- Row Level Security (RLS)
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_links ENABLE ROW LEVEL SECURITY;

-- Public read access for published portfolios
CREATE POLICY "Public can view published portfolios"
  ON portfolios FOR SELECT
  USING (is_published = true);

-- Public can create consultations
CREATE POLICY "Public can create consultations"
  ON consultations FOR INSERT
  WITH CHECK (true);

-- Public read access for published blog links
CREATE POLICY "Public can view published blog links"
  ON blog_links FOR SELECT
  USING (is_published = true);

-- Public read access for published video links
CREATE POLICY "Public can view published video links"
  ON video_links FOR SELECT
  USING (is_published = true);

-- Service role has full access (for admin operations via service role key)
-- Note: Service role bypasses RLS by default

-- Storage bucket for portfolio images
-- Run this in Supabase Dashboard > Storage > Create bucket
-- Name: portfolio-images
-- Public: true

-- Migration: Add affiliation and link_url columns to portfolios
-- Run this if the table was created before these columns were added:
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS affiliation TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS link_url TEXT;
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS project_date VARCHAR(50);
