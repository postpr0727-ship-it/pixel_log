'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'About', href: '/about' },
  { name: '디자인', href: '/design' },
  { name: '블로그 마케팅', href: '/blog' },
  { name: '온라인 광고', href: '/online_ad' },
  { name: '웹 개발', href: '/dev' },
  { name: '영상 제작', href: '/video' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-navy/10",
        "bg-white shadow-sm"
      )}
    >
      <nav
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 relative group">
            <Image
              src="/images/logo_header.png"
              alt="PIXEL-LOG"
              width={240}
              height={70}
              className="relative h-14 lg:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 text-base font-medium transition-colors group flex items-center',
                    isActive(item.href)
                      ? 'text-navy'
                      : 'text-navy/70 hover:text-navy'
                  )}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-navy/5 rounded-full">
                <Menu className="h-6 w-6 text-navy" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-l border-navy/20">
              <div className="bg-white h-full flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-navy/10">
                  <Image
                    src="/images/logo_header.png"
                    alt="PIXEL-LOG"
                    width={140}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex-1 px-6 py-8 overflow-y-auto">
                  {navigation.map((item) => (
                    <div key={item.name} className="mb-4">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'flex items-center justify-between text-xl font-black mb-2 transition-colors',
                          isActive(item.href)
                            ? 'text-navy'
                            : 'text-navy/60 hover:text-navy'
                        )}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
