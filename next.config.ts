import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@react-pdf/renderer'],
  turbopack: {},
  async redirects() {
    return [
      { source: '/design/print',    destination: '/design', permanent: true },
      { source: '/design/web',      destination: '/design', permanent: true },
      { source: '/design/branding', destination: '/design', permanent: true },
      { source: '/dev/website',     destination: '/dev',    permanent: true },
      { source: '/dev/software',    destination: '/dev',    permanent: true },
    ];
  },
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
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
