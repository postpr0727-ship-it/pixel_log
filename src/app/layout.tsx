import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ConditionalLayout } from '@/components/layout';
import { PageBackground } from '@/components/layout/PageBackground';
import { SessionProvider } from '@/components/providers/SessionProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pixel-log-ten.vercel.app'),
  title: {
    default: '김경훈 포트폴리오 | PIXEL-LOG',
    template: '%s | PIXEL-LOG',
  },
  description:
    '김경훈의 개인 포트폴리오. 브랜드 디자인, 웹 개발, 온라인 광고, 블로그 마케팅, 영상 제작까지 다양한 실무 작업물을 소개합니다.',
  keywords: [
    '김경훈',
    '포트폴리오',
    '디자인',
    '브랜딩',
    '웹디자인',
    '블로그 마케팅',
    '온라인 광고',
    '영상 제작',
    '웹 개발',
    'PIXEL-LOG',
  ],
  authors: [{ name: '김경훈' }],
  creator: '김경훈',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pixel-log-ten.vercel.app',
    siteName: 'PIXEL-LOG',
    title: 'PIXEL-LOG | 디자인, 개발, 마케팅 원스톱 솔루션',
    description:
      '당신의 비즈니스를 픽셀 하나까지 완벽하게. 브랜드 디자인, 웹 개발, 블로그 마케팅, 영상 제작까지 원스톱 솔루션을 제공합니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PIXEL-LOG | 디자인, 개발, 마케팅 원스톱 솔루션',
    description:
      '당신의 비즈니스를 픽셀 하나까지 완벽하게. 브랜드 디자인, 웹 개발, 블로그 마케팅, 영상 제작까지 원스톱 솔루션을 제공합니다.',
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
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <SessionProvider>
          <PageBackground />
          <ConditionalLayout>{children}</ConditionalLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
