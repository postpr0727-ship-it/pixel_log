'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'About', href: '/about' },
  {
    name: '디자인',
    href: '/design',
    children: [
      { name: '브랜드 디자인', href: '/design/branding' },
      { name: '웹 디자인', href: '/design/web' },
      { name: '인쇄 디자인', href: '/design/print' },
    ],
  },
  { name: '블로그 마케팅', href: '/blog' },
  { name: '온라인 광고', href: '/online_ad' },
  {
    name: '개발',
    href: '/dev',
    children: [
      { name: '홈페이지 제작', href: '/dev/website' },
      { name: '프로그램 개발', href: '/dev/software' },
    ],
  },
  { name: '영상 제작', href: '/video' },
  { name: '문의하기', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-100",
        "bg-white shadow-sm"
      )}
    >
      <nav
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative group">
            <Image
              src="/images/logo_header.png"
              alt="PIXEL-LOG"
              width={240}
              height={70}
              className="relative h-14 lg:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
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
                  {item.children && (
                    <ChevronDown className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 py-3 min-w-[200px] overflow-hidden">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              'block px-5 py-2.5 text-sm transition-all hover:pl-6',
                              isActive(child.href)
                                ? 'text-gold font-semibold bg-navy/5'
                                : 'text-navy hover:text-gold'
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button asChild className="rounded-full bg-navy text-white hover:bg-navy-light px-6 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <Link href="/contact">무료 상담</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-navy/5 rounded-full">
                <Menu className="h-6 w-6 text-navy" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-l border-white/20">
              <div className="bg-white/95 backdrop-blur-xl h-full flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
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
                        onClick={() => !item.children && setMobileOpen(false)}
                        className={cn(
                          'flex items-center justify-between text-xl font-bold mb-2 transition-colors',
                          isActive(item.href)
                            ? 'text-gold'
                            : 'text-navy hover:text-gold'
                        )}
                      >
                        {item.name}
                      </Link>
                      {item.children && (
                        <div className="pl-4 space-y-3 mt-2 border-l-2 border-gray-100">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className={cn(
                                'block text-base transition-colors',
                                isActive(child.href)
                                  ? 'text-gold font-medium'
                                  : 'text-navy/60 hover:text-navy'
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="p-6 border-t border-gray-100">
                  <Button asChild className="w-full rounded-xl bg-navy hover:bg-navy-light text-white font-bold h-12 text-lg shadow-xl">
                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                      무료 상담 신청
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
