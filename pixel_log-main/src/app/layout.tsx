import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ConditionalLayout } from '@/components/layout';
import { SessionProvider } from '@/components/providers/SessionProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pixel-log.com'),
  title: {
    default: 'PIXEL-LOG | 디자인, 개발, 마케팅 원스톱 솔루션',
    template: '%s | PIXEL-LOG',
  },
  description:
    '당신의 비즈니스를 픽셀 하나까지 완벽하게. 브랜드 디자인, 웹 개발, 블로그 마케팅, 영상 제작까지 원스톱 솔루션을 제공합니다.',
  keywords: [
    '디자인',
    '브랜딩',
    '웹디자인',
    '홈페이지 제작',
    '블로그 마케팅',
    '온라인 광고',
    '영상 제작',
    '로고 디자인',
    '인쇄 디자인',
    '프로그램 개발',
  ],
  authors: [{ name: 'PIXEL-LOG' }],
  creator: 'PIXEL-LOG',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://pixel-log.com',
    siteName: 'PIXEL-LOG',
    title: 'PIXEL-LOG | 디자인, 개발, 마케팅 원스톱 솔루션',
    description:
      '당신의 비즈니스를 픽셀 하나까지 완벽하게. 브랜드 디자인, 웹 개발, 블로그 마케팅, 영상 제작까지 원스톱 솔루션을 제공합니다.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PIXEL-LOG',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PIXEL-LOG | 디자인, 개발, 마케팅 원스톱 솔루션',
    description:
      '당신의 비즈니스를 픽셀 하나까지 완벽하게. 브랜드 디자인, 웹 개발, 블로그 마케팅, 영상 제작까지 원스톱 솔루션을 제공합니다.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="min-h-screen bg-background antialiased" suppressHydrationWarning>
        <SessionProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
