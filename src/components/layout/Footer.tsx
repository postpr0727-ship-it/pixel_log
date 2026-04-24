import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';

const services = [
  { name: '디자인 서비스', href: '/design' },
  { name: '블로그 마케팅', href: '/blog' },
  { name: '온라인 광고', href: '/online_ad' },
  { name: '웹 개발', href: '/dev' },
  { name: '영상 제작', href: '/video' },
];

const quickLinks = [
  { name: 'About', href: '/about' },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-[0.05] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo_header.png"
                alt="PIXEL-LOG"
                width={150}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6 font-medium italic">
              디자인, 개발, 광고, 영상을 다루는
              <br />
              크리에이터 김경훈의 포트폴리오입니다.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://blog.naver.com/curator-"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="네이버 블로그"
              >
                <span className="text-white text-sm font-black">N</span>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">서비스</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white hover:font-bold text-sm transition-all"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-black mb-4 uppercase tracking-tighter text-white">바로가기</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white hover:font-bold text-sm transition-all"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-black mb-4 uppercase tracking-tighter text-white">문의</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:postpr0727@gmail.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white font-bold text-sm transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>postpr0727@gmail.com</span>
                </a>
              </li>
            </ul>

          </div>
        </div>

        {/* Contact CTA strip */}
        <div className="py-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-3">CONTACT</p>
          <a
            href="mailto:postpr0727@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/50 text-sm font-black transition-all"
          >
            <Mail className="h-4 w-4" />
            postpr0727@gmail.com
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-medium">
            © 2026 김경훈 · PIXEL-LOG. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/40 hover:text-white text-sm transition-colors font-medium">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-white text-sm transition-colors font-medium">
              이용약관
            </Link>
            <Link href="/admin_board" className="text-white/10 hover:text-white/30 text-xs transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
