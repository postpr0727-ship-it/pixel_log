# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for PIXEL-LOG showcasing design, development, marketing, and video production services. The site includes a secure admin panel for content management.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Site Structure

The website follows a hierarchical structure defined in `sitemap-structure.json`:

**Main Site Pages:**
- `/` - Main page with hero section and service category visualization
- `/about` - About PIXEL-LOG with blog post cards (dynamically updatable via admin)
- `/design` - Design services parent page
  - `/design/branding` - Brand design portfolio
  - `/design/web` - Web design portfolio
  - `/design/print` - Print design portfolio
- `/blog` - Blog marketing services and portfolio
- `/online_ad` - Online advertising services
- `/dev` - Web development parent page
  - `/dev/website` - Website development portfolio
  - `/dev/software` - Software development portfolio
- `/video` - Video production portfolio (video links)
- `/contact` - Contact form, pricing, email

**Admin Pages:**
- `/admin_login87865678798` - Admin login (Google OAuth)
- `/admin_board` - Admin dashboard with category management and consultation requests

## Admin Authentication

Admin access is restricted to a single Google account: `postpr0727@gmail.com`. The authentication must:
- Use Google OAuth
- Only allow access to the specified email address
- Block all other Google accounts
- Protect admin routes from unauthorized access

## Content Management

Portfolio pages are designed for continuous updates through the admin panel:
- Blog post links (about page)
- Design portfolios (branding, web, print)
- Development portfolios (website, software)
- Video links (video production)
- Marketing case studies (blog marketing)

Each portfolio section follows a pattern:
1. High-attention hero section
2. PIXEL-LOG's approach/philosophy for that service
3. Structured portfolio items with admin-managed updates
