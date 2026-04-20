import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
  Font,
  Link,
  Image,
} from '@react-pdf/renderer';
import React from 'react';
import { portfolioService, blogLinkService, videoLinkService } from '@/lib/supabase';
import type { Portfolio, BlogLink, VideoLink } from '@/types';

let fontRegistered = false;
function ensureFont() {
  if (fontRegistered) return;
  const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NanumGothic-Regular.ttf');
  const buf = fs.readFileSync(fontPath);
  const dataUri = `data:font/truetype;base64,${buf.toString('base64')}`;
  Font.register({
    family: 'Nanum',
    fonts: [
      { src: dataUri, fontWeight: 400 },
      { src: dataUri, fontWeight: 700 },
    ],
  });
  fontRegistered = true;
}

const C = {
  navy: '#0B1222',
  navyMid: '#121A2F',
  navyCard: '#0F1828',
  gold: '#D4A017',
  goldLight: '#F5C842',
  white: '#FFFFFF',
  gray: '#8A9BB0',
  grayLight: '#B8C5D3',
  accent: '#2A6EFF',
  green: '#10B981',
  red: '#EF4444',
  divider: '#1E2D47',
  lightBg: '#F4F6FA',
  lightCard: '#FFFFFF',
  lightBorder: '#E2E8F0',
  lightText: '#1A202C',
  lightMuted: '#4A5568',
  lightFaint: '#718096',
};

const CATEGORY_META: Record<string, { label: string; color: string; icon: string }> = {
  video:          { label: '영상 제작', color: '#EF4444', icon: '▶' },
  blog_marketing: { label: '블로그 마케팅', color: '#EC4899', icon: '✎' },
  design:         { label: '브랜드 디자인', color: '#6C63FF', icon: '✦' },
  dev:            { label: '웹 개발', color: '#2A6EFF', icon: '◈' },
  online_ad:      { label: '온라인 광고', color: '#10B981', icon: '◎' },
};

const CATEGORY_ORDER = ['video', 'blog_marketing', 'design', 'dev', 'online_ad'];

const s = StyleSheet.create({
  // ── Cover ──────────────────────────────────────
  coverPage: { fontFamily: 'Nanum', backgroundColor: C.navy, padding: 0 },
  coverWrap: { flex: 1, padding: 60, justifyContent: 'space-between' },
  coverDecor1: { width: 260, height: 260, borderRadius: 130, backgroundColor: '#141F35', position: 'absolute', right: 40, top: 60 },
  coverDecor2: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#0C1626', position: 'absolute', right: 130, top: 180 },
  coverTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  coverLogo: { width: 110, height: 34, objectFit: 'contain' },
  coverYear: { fontSize: 9, color: C.gray, letterSpacing: 2 },
  coverCenter: { flex: 1, justifyContent: 'center', paddingVertical: 50 },
  coverEye: { fontSize: 8, color: C.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 18 },
  coverTitle: { fontSize: 46, fontWeight: 700, color: C.white, lineHeight: 1.1, marginBottom: 14 },
  coverAccent: { color: C.gold },
  coverDivider: { width: 56, height: 2, backgroundColor: C.gold, marginVertical: 24 },
  coverSub: { fontSize: 12, color: C.grayLight, lineHeight: 1.7, maxWidth: 360 },
  coverTags: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginTop: 24 },
  coverTag: { fontSize: 8, color: C.gold, borderWidth: 1, borderColor: C.gold, borderStyle: 'solid', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  coverFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  coverContact: { fontSize: 8, color: C.gray, lineHeight: 1.8 },

  // ── Page shell ─────────────────────────────────
  page: { fontFamily: 'Nanum', backgroundColor: C.lightBg, padding: 0 },
  pageBody: { flex: 1, padding: 46 },
  pageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#CBD5E0', borderBottomStyle: 'solid' },
  pageHeaderLabel: { fontSize: 8, color: C.lightFaint, letterSpacing: 3, textTransform: 'uppercase' },
  pageNum: { fontSize: 8, color: C.lightFaint },

  // ── Section header ─────────────────────────────
  sectionEye: { fontSize: 7, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 6 },
  sectionTitle: { fontSize: 22, fontWeight: 700, color: C.lightText, marginBottom: 4 },
  sectionDesc: { fontSize: 9, color: C.lightMuted, lineHeight: 1.7, marginBottom: 20 },

  // ── Category heading ───────────────────────────
  catRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, marginTop: 6 },
  catDot: { width: 8, height: 8, borderRadius: 4 },
  catLabel: { fontSize: 10, fontWeight: 700, color: C.lightText, letterSpacing: 1 },
  catCount: { fontSize: 8, color: C.lightFaint, marginLeft: 4 },

  // ── Portfolio item card ────────────────────────
  itemCard: { backgroundColor: C.lightCard, borderRadius: 10, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: C.lightBorder, borderStyle: 'solid' },
  itemRow: { flexDirection: 'row', gap: 14 },
  itemThumb: { width: 80, height: 54, borderRadius: 6, backgroundColor: '#E2E8F0', objectFit: 'cover', flexShrink: 0 },
  itemThumbPlaceholder: { width: 80, height: 54, borderRadius: 6, backgroundColor: '#E2E8F0', flexShrink: 0, justifyContent: 'center', alignItems: 'center' },
  itemThumbIcon: { fontSize: 18, color: '#A0AEC0' },
  itemBody: { flex: 1 },
  itemTitle: { fontSize: 11, fontWeight: 700, color: C.lightText, marginBottom: 3 },
  itemMeta: { flexDirection: 'row', gap: 10, marginBottom: 6 },
  itemMetaText: { fontSize: 7, color: C.lightFaint },
  itemDesc: { fontSize: 8, color: C.lightMuted, lineHeight: 1.5, marginBottom: 8 },
  itemLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  itemLinkDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.accent },
  itemLink: { fontSize: 8, color: C.accent, textDecoration: 'underline' },

  // ── Video card ─────────────────────────────────
  videoCard: { backgroundColor: '#0F1828', borderRadius: 10, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#1E2D47', borderStyle: 'solid', flexDirection: 'row', gap: 14 },
  videoThumb: { width: 100, height: 60, borderRadius: 6, backgroundColor: '#1A2840', objectFit: 'cover', flexShrink: 0 },
  videoThumbPH: { width: 100, height: 60, borderRadius: 6, backgroundColor: '#1A2840', flexShrink: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#2A3D56', borderStyle: 'solid' },
  videoThumbIcon: { fontSize: 22, color: '#EF4444' },
  videoBody: { flex: 1 },
  videoTitle: { fontSize: 11, fontWeight: 700, color: C.white, marginBottom: 4 },
  videoDesc: { fontSize: 8, color: C.grayLight, lineHeight: 1.5, marginBottom: 8 },
  videoLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  videoLinkDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#EF4444' },
  videoLink: { fontSize: 8, color: '#FC8181', textDecoration: 'underline' },

  // ── Blog card ──────────────────────────────────
  blogCard: { backgroundColor: C.lightCard, borderRadius: 10, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: C.lightBorder, borderStyle: 'solid', flexDirection: 'row', alignItems: 'center', gap: 12 },
  blogAccent: { width: 3, height: 40, borderRadius: 2 },
  blogBody: { flex: 1 },
  blogTitle: { fontSize: 10, fontWeight: 700, color: C.lightText, marginBottom: 4 },
  blogDesc: { fontSize: 8, color: C.lightMuted, lineHeight: 1.4, marginBottom: 5 },
  blogLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  blogLinkDot: { width: 4, height: 4, borderRadius: 2 },
  blogLink: { fontSize: 8, color: C.accent, textDecoration: 'underline' },

  // ── Contact ────────────────────────────────────
  contactCard: { backgroundColor: C.lightCard, borderRadius: 10, padding: 18, marginBottom: 10, borderWidth: 1, borderColor: C.lightBorder, borderStyle: 'solid', width: '48%' },
  contactLabel: { fontSize: 7, fontWeight: 700, color: C.lightFaint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  contactValue: { fontSize: 12, fontWeight: 700, color: C.accent, marginBottom: 2 },
  contactNote: { fontSize: 7, color: C.lightFaint },
  ctaBanner: { backgroundColor: C.navy, borderRadius: 12, padding: 24, alignItems: 'center', marginTop: 16 },
  ctaTitle: { fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 6, textAlign: 'center' },
  ctaDesc: { fontSize: 8, color: C.grayLight, textAlign: 'center', lineHeight: 1.6, marginBottom: 12 },
  ctaEmail: { backgroundColor: C.gold, paddingHorizontal: 20, paddingVertical: 6, borderRadius: 16 },
  ctaEmailText: { fontSize: 8, fontWeight: 700, color: C.navy },
});

// ─────────────────────────────────────────────────────────
// Cover Page
// ─────────────────────────────────────────────────────────
function CoverPage() {
  const logoPath = path.join(process.cwd(), 'public', 'images', 'logo-white.png');
  const logoExists = fs.existsSync(logoPath);
  return (
    <Page size="A4" style={s.coverPage}>
      <View style={s.coverDecor1} />
      <View style={s.coverDecor2} />
      <View style={s.coverWrap}>
        <View style={s.coverTop}>
          {logoExists
            ? <Image src={logoPath} style={s.coverLogo} />
            : <Text style={{ fontSize: 18, fontWeight: 700, color: C.white }}>PIXEL-LOG</Text>
          }
          <Text style={s.coverYear}>2025 PORTFOLIO</Text>
        </View>
        <View style={s.coverCenter}>
          <Text style={s.coverEye}>Company Portfolio</Text>
          <Text style={s.coverTitle}>
            {'픽셀 하나까지\n'}
            <Text style={s.coverAccent}>완벽하게.</Text>
          </Text>
          <View style={s.coverDivider} />
          <Text style={s.coverSub}>
            {'디자인 · 개발 · 온라인 광고 · 영상 제작까지\n하나의 파트너로 완성하는 브랜드 솔루션'}
          </Text>
          <View style={s.coverTags}>
            {['Brand Design', 'Web Dev', 'Online AD', 'Video', 'Blog Marketing'].map((t) => (
              <View key={t} style={s.coverTag}><Text>{t}</Text></View>
            ))}
          </View>
        </View>
        <View style={s.coverFooter}>
          <Text style={s.coverContact}>{'postpr0727@gmail.com\npixel-log-ten.vercel.app'}</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {[C.gold, C.accent, '#6C63FF'].map((c) => (
              <View key={c} style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: c }} />
            ))}
          </View>
        </View>
      </View>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────
// Video Links Page (YouTube)
// ─────────────────────────────────────────────────────────
function VideoPage({ videos, pageNum }: { videos: VideoLink[]; pageNum: number }) {
  return (
    <Page size="A4" style={{ fontFamily: 'Nanum', backgroundColor: C.navyCard, padding: 0 }}>
      <View style={s.pageBody}>
        <View style={[s.pageHeader, { borderBottomColor: C.divider }]}>
          <Text style={[s.pageHeaderLabel, { color: C.gray }]}>PIXEL-LOG · 영상 포트폴리오</Text>
          <Text style={[s.pageNum, { color: C.gray }]}>{String(pageNum).padStart(2, '0')}</Text>
        </View>
        <Text style={[s.sectionEye, { color: '#EF4444' }]}>Video Production</Text>
        <Text style={[s.sectionTitle, { color: C.white, marginBottom: 6 }]}>영상 포트폴리오</Text>
        <Text style={[s.sectionDesc, { color: C.grayLight }]}>
          아래 링크를 클릭하면 YouTube에서 직접 확인하실 수 있습니다.
        </Text>
        {videos.map((v) => {
          const thumbUrl = v.thumbnail_url || (
            v.url.includes('youtube.com') || v.url.includes('youtu.be')
              ? `https://img.youtube.com/vi/${extractYoutubeId(v.url)}/mqdefault.jpg`
              : undefined
          );
          return (
            <View key={v.id} style={s.videoCard}>
              {thumbUrl
                ? <Image src={thumbUrl} style={s.videoThumb} />
                : (
                  <View style={s.videoThumbPH}>
                    <Text style={s.videoThumbIcon}>▶</Text>
                  </View>
                )
              }
              <View style={s.videoBody}>
                <Text style={s.videoTitle}>{v.title}</Text>
                {v.description ? (
                  <Text style={s.videoDesc}>{v.description.slice(0, 80)}{v.description.length > 80 ? '…' : ''}</Text>
                ) : null}
                <View style={s.videoLinkRow}>
                  <View style={s.videoLinkDot} />
                  <Link src={v.url} style={s.videoLink}>{v.url}</Link>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </Page>
  );
}

function extractYoutubeId(url: string): string {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : '';
}

// ─────────────────────────────────────────────────────────
// Blog Links Page
// ─────────────────────────────────────────────────────────
function BlogPage({ blogs, pageNum }: { blogs: BlogLink[]; pageNum: number }) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.pageBody}>
        <View style={s.pageHeader}>
          <Text style={s.pageHeaderLabel}>PIXEL-LOG · 블로그 마케팅</Text>
          <Text style={s.pageNum}>{String(pageNum).padStart(2, '0')}</Text>
        </View>
        <Text style={[s.sectionEye, { color: '#EC4899' }]}>Blog Marketing</Text>
        <Text style={s.sectionTitle}>블로그 포트폴리오</Text>
        <Text style={s.sectionDesc}>
          네이버 블로그 최적화 · 바이럴 마케팅 · SEO 콘텐츠 기획 실적입니다.
        </Text>
        {blogs.map((b) => (
          <View key={b.id} style={s.blogCard}>
            <View style={[s.blogAccent, { backgroundColor: '#EC4899' }]} />
            <View style={s.blogBody}>
              <Text style={s.blogTitle}>{b.title}</Text>
              {b.description ? (
                <Text style={s.blogDesc}>{b.description.slice(0, 100)}{b.description.length > 100 ? '…' : ''}</Text>
              ) : null}
              <View style={s.blogLinkRow}>
                <View style={[s.blogLinkDot, { backgroundColor: '#EC4899' }]} />
                <Link src={b.url} style={[s.blogLink, { color: '#B83280' }]}>{b.url}</Link>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────
// Portfolio Category Page (design / dev / online_ad)
// ─────────────────────────────────────────────────────────
function PortfolioPage({ category, items, pageNum }: { category: string; items: Portfolio[]; pageNum: number }) {
  const meta = CATEGORY_META[category] ?? { label: category, color: C.accent, icon: '◆' };
  return (
    <Page size="A4" style={s.page}>
      <View style={s.pageBody}>
        <View style={s.pageHeader}>
          <Text style={s.pageHeaderLabel}>PIXEL-LOG · {meta.label}</Text>
          <Text style={s.pageNum}>{String(pageNum).padStart(2, '0')}</Text>
        </View>
        <Text style={[s.sectionEye, { color: meta.color }]}>{meta.icon}  {meta.label.toUpperCase()}</Text>
        <Text style={s.sectionTitle}>{meta.label} 포트폴리오</Text>

        {items.map((item) => (
          <View key={item.id} style={s.itemCard}>
            <View style={s.itemRow}>
              {item.thumbnail_url ? (
                <Image src={item.thumbnail_url} style={s.itemThumb} />
              ) : (
                <View style={s.itemThumbPlaceholder}>
                  <Text style={s.itemThumbIcon}>{meta.icon}</Text>
                </View>
              )}
              <View style={s.itemBody}>
                <Text style={s.itemTitle}>{item.title}</Text>
                <View style={s.itemMeta}>
                  {item.client_name ? <Text style={s.itemMetaText}>클라이언트: {item.client_name}</Text> : null}
                  {item.project_date ? <Text style={s.itemMetaText}>{item.project_date}</Text> : null}
                  {item.affiliation ? <Text style={s.itemMetaText}>{item.affiliation}</Text> : null}
                </View>
                {item.description ? (
                  <Text style={s.itemDesc}>{item.description.slice(0, 120)}{item.description.length > 120 ? '…' : ''}</Text>
                ) : null}
                {item.link_url ? (
                  <View style={s.itemLinkRow}>
                    <View style={[s.itemLinkDot, { backgroundColor: meta.color }]} />
                    <Link src={item.link_url} style={s.itemLink}>{item.link_url}</Link>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        ))}
      </View>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────
// Contact Page
// ─────────────────────────────────────────────────────────
function ContactPage({ pageNum }: { pageNum: number }) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.pageBody}>
        <View style={s.pageHeader}>
          <Text style={s.pageHeaderLabel}>PIXEL-LOG · Contact</Text>
          <Text style={s.pageNum}>{String(pageNum).padStart(2, '0')}</Text>
        </View>
        <Text style={[s.sectionEye, { color: C.accent }]}>Get In Touch</Text>
        <Text style={s.sectionTitle}>문의하기</Text>
        <Text style={s.sectionDesc}>
          아이디어가 있으신가요? 지금 바로 연락주세요. 무료 상담을 통해 최적의 솔루션을 제안해 드립니다.
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          {[
            { label: '이메일', value: 'postpr0727@gmail.com', note: '24시간 내 답변' },
            { label: '카카오톡', value: '@pixellog', note: '실시간 상담 가능' },
            { label: '웹사이트', value: 'pixel-log-ten.vercel.app', note: '포트폴리오 & 문의' },
            { label: '응답시간', value: '24시간 이내', note: '평균 응답 시간' },
          ].map((item) => (
            <View key={item.label} style={s.contactCard}>
              <Text style={s.contactLabel}>{item.label}</Text>
              <Text style={s.contactValue}>{item.value}</Text>
              <Text style={s.contactNote}>{item.note}</Text>
            </View>
          ))}
        </View>
        <View style={s.ctaBanner}>
          <Text style={s.ctaTitle}>프로젝트를 함께 시작해볼까요?</Text>
          <Text style={s.ctaDesc}>
            {'디자인, 개발, 광고, 영상 — 어떤 분야든 환영합니다.\n지금 문의하시면 무료 상담을 받으실 수 있습니다.'}
          </Text>
          <View style={s.ctaEmail}>
            <Text style={s.ctaEmailText}>postpr0727@gmail.com</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 24 }}>
          {[C.gold, C.accent, '#6C63FF', C.green].map((c) => (
            <View key={c} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c }} />
          ))}
          <Text style={{ fontSize: 7, color: C.lightFaint, marginLeft: 4 }}>PIXEL-LOG © 2025</Text>
        </View>
      </View>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────
// Document assembly
// ─────────────────────────────────────────────────────────
interface DocProps {
  portfolios: Portfolio[];
  videos: VideoLink[];
  blogs: BlogLink[];
}

function PortfolioDocument({ portfolios, videos, blogs }: DocProps) {
  // Group portfolios by category
  const grouped: Record<string, Portfolio[]> = {};
  for (const p of portfolios) {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  }

  const pages: React.ReactElement[] = [React.createElement(CoverPage, { key: 'cover' })];
  let pageNum = 2;

  if (videos.length > 0) {
    pages.push(React.createElement(VideoPage, { key: 'video', videos, pageNum }));
    pageNum++;
  }

  if (blogs.length > 0) {
    pages.push(React.createElement(BlogPage, { key: 'blog', blogs, pageNum }));
    pageNum++;
  }

  for (const cat of CATEGORY_ORDER) {
    const items = grouped[cat];
    if (!items || items.length === 0) continue;
    // Split into chunks of 4 items per page
    for (let i = 0; i < items.length; i += 4) {
      const chunk = items.slice(i, i + 4);
      pages.push(
        React.createElement(PortfolioPage, {
          key: `${cat}-${i}`,
          category: cat,
          items: chunk,
          pageNum,
        })
      );
      pageNum++;
    }
  }

  pages.push(React.createElement(ContactPage, { key: 'contact', pageNum }));

  return React.createElement(
    Document,
    { title: 'PIXEL-LOG 포트폴리오', author: 'PIXEL-LOG', creator: 'PIXEL-LOG' },
    ...pages
  );
}

// ─────────────────────────────────────────────────────────
// Route handler
// ─────────────────────────────────────────────────────────
export async function GET() {
  try {
    ensureFont();

    // Fetch data in parallel
    const [portfolios, videos, blogs] = await Promise.all([
      portfolioService.getAll().catch(() => [] as Portfolio[]),
      videoLinkService.getAll().catch(() => [] as VideoLink[]),
      blogLinkService.getAll().catch(() => [] as BlogLink[]),
    ]);

    const docElement = React.createElement(PortfolioDocument, { portfolios, videos, blogs });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await renderToBuffer(docElement as any);

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="PIXEL-LOG-Portfolio-2025.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('PDF generation error:', message);
    return NextResponse.json({ error: 'PDF 생성 실패', details: message }, { status: 500 });
  }
}
