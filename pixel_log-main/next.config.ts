import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'youtu.be',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'blogpfthumb-phinf.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'postfiles.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: '**.pstatic.net',
      },
    ],
  },
};

export default nextConfig;
