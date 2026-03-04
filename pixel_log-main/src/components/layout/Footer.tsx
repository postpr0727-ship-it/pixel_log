import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, ExternalLink } from 'lucide-react';

const services = [
  { name: '브랜드 디자인', href: '/design/branding' },
  { name: '웹 디자인', href: '/design/web' },
  { name: '인쇄 디자인', href: '/design/print' },
  { name: '블로그 마케팅', href: '/blog' },
  { name: '온라인 광고', href: '/online_ad' },
  { name: '홈페이지 제작', href: '/dev/website' },
  { name: '프로그램 개발', href: '/dev/software' },
  { name: '영상 제작', href: '/video' },
];

const quickLinks = [
  { name: 'About', href: '/about' },
  { name: '포트폴리오', href: '/design' },
  { name: '문의하기', href: '/contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-white.png"
                alt="PIXEL-LOG"
                width={150}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              당신의 비즈니스를 픽셀 하나까지 완벽하게.
              <br />
              디자인부터 개발, 마케팅까지 원스톱 솔루션을 제공합니다.
            </p>

            <div className="mb-6 bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-gold text-sm font-semibold mb-1">Business Info</p>
              <p className="text-white/80 text-sm font-medium mb-1">준앤준솔루션 (Jun & Jun Solution)</p>
              <div className="text-white/60 text-xs leading-relaxed space-y-1">
                <p>PIXEL-LOG는 준앤준솔루션의 전문 디자인/개발 브랜드입니다.</p>
                <p>계약 및 세금계산서 발행은 준앤준솔루션 명의로 진행됩니다.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://blog.naver.com/curator-"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
                aria-label="네이버 블로그"
              >
                <span className="text-sm font-bold">N</span>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">서비스</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-gold text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">바로가기</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-gold text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">문의</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:postpr0727@gmail.com"
                  className="flex items-center gap-3 text-white/70 hover:text-gold text-sm transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>postpr0727@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:010-0000-0000"
                  className="flex items-center gap-3 text-white/70 hover:text-gold text-sm transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>010-0000-0000</span>
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                무료 상담 신청
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} PIXEL-LOG. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/50 hover:text-white/70 text-sm transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-white/70 text-sm transition-colors">
              이용약관
            </Link>
            <Link href="/admin_board" className="text-white/20 hover:text-white/40 text-xs transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
