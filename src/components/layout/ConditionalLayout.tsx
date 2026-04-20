'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { PortfolioDownloadButton } from '@/components/PortfolioDownloadButton';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Header and Footer on admin pages
  const isAdminPage = pathname.startsWith('/admin_board') || pathname.startsWith('/admin_login');

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <PortfolioDownloadButton />
    </>
  );
}
