'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  ChevronRight,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navigation = [
  { name: '대시보드', href: '/admin_board', icon: LayoutDashboard },
  { name: '포트폴리오 관리', href: '/admin_board/portfolios', icon: FolderOpen },
  { name: '블로그 링크 관리', href: '/admin_board/blog-links', icon: FileText },
  { name: '상담 요청 관리', href: '/admin_board/consultations', icon: MessageSquare },
];

export function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-navy pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <Link href="/admin_board" className="flex items-center flex-shrink-0 px-6 mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center mr-3">
                <span className="text-navy font-bold text-xl">P</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">PIXEL-LOG</h1>
                <p className="text-gray-400 text-xs">관리자 모드</p>
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-gold text-navy'
                      : 'text-gray-300 hover:bg-navy-light hover:text-white'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive ? 'text-navy' : 'text-gray-400 group-hover:text-white'
                    )}
                  />
                  {item.name}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 mt-auto space-y-2">
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-navy-light hover:text-white"
            >
              <Link href="/">
                <Home className="mr-3 h-5 w-5" />
                홈페이지 보기
              </Link>
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-navy-light hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5" />
              로그아웃
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-navy p-0">
            <div className="flex flex-col h-full">
              {/* Logo */}
              <Link
                href="/admin_board"
                className="flex items-center px-6 py-5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center mr-3">
                  <span className="text-navy font-bold text-xl">P</span>
                </div>
                <div>
                  <h1 className="text-white font-bold text-xl">PIXEL-LOG</h1>
                  <p className="text-gray-400 text-xs">관리자 모드</p>
                </div>
              </Link>

              {/* Navigation */}
              <nav className="flex-1 px-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors',
                        isActive
                          ? 'bg-gold text-navy'
                          : 'text-gray-300 hover:bg-navy-light hover:text-white'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'mr-3 h-5 w-5 flex-shrink-0',
                          isActive ? 'text-navy' : 'text-gray-400 group-hover:text-white'
                        )}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Actions */}
              <div className="px-4 pb-4 space-y-2">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:bg-navy-light hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/">
                    <Home className="mr-3 h-5 w-5" />
                    홈페이지 보기
                  </Link>
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:bg-navy-light hover:text-white"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  로그아웃
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center mr-2">
            <span className="text-navy font-bold">P</span>
          </div>
          <h1 className="text-navy font-bold text-lg">PIXEL-LOG 관리자</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="py-8 px-6 sm:px-8 lg:px-12 max-w-7xl">{children}</main>
      </div>
    </div>
  );
}
