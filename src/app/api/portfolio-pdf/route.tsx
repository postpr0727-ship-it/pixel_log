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
  Image,
} from '@react-pdf/renderer';
import React from 'react';

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
  gold: '#D4A017',
  goldLight: '#F5C842',
  white: '#FFFFFF',
  gray: '#8A9BB0',
  grayLight: '#B8C5D3',
  accent: '#2A6EFF',
  divider: '#1E2D47',
};

const s = StyleSheet.create({
  page: { fontFamily: 'Nanum', backgroundColor: C.navy, color: C.white, padding: 0 },
  pageLight: { fontFamily: 'Nanum', backgroundColor: '#F4F6FA', color: C.navy, padding: 0 },

  // Cover
  coverContainer: { flex: 1, padding: 60, justifyContent: 'space-between' },
  coverTopBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 },
  coverLogo: { width: 120, height: 36, objectFit: 'contain' },
  coverYear: { fontSize: 10, color: C.gray, letterSpacing: 2 },
  coverCenter: { flex: 1, justifyContent: 'center', paddingVertical: 60 },
  coverEyebrow: { fontSize: 9, color: C.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20 },
  coverTitle: { fontSize: 48, fontWeight: 700, color: C.white, lineHeight: 1.1, marginBottom: 16 },
  coverTitleAccent: { color: C.gold },
  coverSubtitle: { fontSize: 13, color: C.grayLight, lineHeight: 1.6, maxWidth: 380 },
  coverDivider: { width: 60, height: 2, backgroundColor: C.gold, marginVertical: 28 },
  coverServices: { flexDirection: 'row', gap: 16, flexWrap: 'wrap', marginTop: 8 },
  coverServiceTag: { fontSize: 9, color: C.gold, borderWidth: 1, borderColor: C.gold, borderStyle: 'solid', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  coverFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  coverContact: { fontSize: 9, color: C.gray, lineHeight: 1.8 },
  coverDecor: { width: 200, height: 200, borderRadius: 100, backgroundColor: '#1A2840', position: 'absolute', right: 50, top: 80 },
  coverDecor2: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#0F1E35', position: 'absolute', right: 130, top: 160 },
  coverGoldDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.gold },

  // Section common
  sectionPage: { flex: 1, padding: 50 },
  pageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: C.divider, borderBottomStyle: 'solid' },
  pageHeaderTitle: { fontSize: 9, color: C.gray, letterSpacing: 3, textTransform: 'uppercase' },
  pageNum: { fontSize: 9, color: C.gray },

  sectionEyebrow: { fontSize: 8, color: C.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 },
  sectionTitle: { fontSize: 26, fontWeight: 700, color: C.white, marginBottom: 6 },
  sectionTitleDark: { fontSize: 26, fontWeight: 700, color: C.navy, marginBottom: 6 },
  sectionDesc: { fontSize: 10, color: C.grayLight, lineHeight: 1.7, marginBottom: 32 },
  sectionDescDark: { fontSize: 10, color: '#4A5568', lineHeight: 1.7, marginBottom: 32 },

  // Service cards
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  serviceCard: { width: '47%', backgroundColor: C.navyMid, borderRadius: 12, padding: 20, borderWidth: 1, borderColor: C.divider, borderStyle: 'solid' },
  serviceCardAccent: { height: 3, borderRadius: 2, marginBottom: 16 },
  serviceCardIcon: { fontSize: 22, marginBottom: 10 },
  serviceCardName: { fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 4 },
  serviceCardNameEn: { fontSize: 7, color: C.gray, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 },
  serviceCardDesc: { fontSize: 9, color: C.grayLight, lineHeight: 1.6, marginBottom: 12 },
  serviceCardTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  serviceCardTag: { fontSize: 7, color: C.gray, borderWidth: 1, borderColor: C.divider, borderStyle: 'solid', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },

  // Cert section
  certContainer: { backgroundColor: '#0D1828', borderRadius: 16, padding: 32, borderWidth: 1, borderColor: '#2A3D56', borderStyle: 'solid', flexDirection: 'row', alignItems: 'center', gap: 28, marginBottom: 24 },
  certBadge: { width: 90, height: 90, borderRadius: 45, borderWidth: 2.5, borderColor: C.gold, borderStyle: 'solid', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A1200', flexShrink: 0 },
  certStar: { fontSize: 20, marginBottom: 2 },
  certLevel: { fontSize: 8, fontWeight: 700, color: C.gold, letterSpacing: 1 },
  certGrade: { fontSize: 11, fontWeight: 700, color: C.white },
  certBody: { flex: 1 },
  certOrg: { fontSize: 8, color: C.gold, letterSpacing: 3, marginBottom: 6 },
  certName: { fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 6 },
  certDesc: { fontSize: 9, color: C.grayLight, lineHeight: 1.6 },
  certPills: { flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap' },
  certPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#141F30', borderWidth: 1, borderColor: '#2A3D56', borderStyle: 'solid', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  certPillDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: C.gold },
  certPillLabel: { fontSize: 7, color: C.gray },
  certPillValue: { fontSize: 7, color: C.grayLight, fontWeight: 700 },

  // Contact page
  contactGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 32 },
  contactCard: { width: '47%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, borderWidth: 1, borderColor: '#E2E8F0', borderStyle: 'solid' },
  contactCardTitle: { fontSize: 9, fontWeight: 700, color: C.navy, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  contactCardValue: { fontSize: 13, fontWeight: 700, color: C.accent, marginBottom: 2 },
  contactCardNote: { fontSize: 8, color: '#718096' },

  ctaBanner: { backgroundColor: C.navy, borderRadius: 14, padding: 28, alignItems: 'center', marginTop: 8 },
  ctaTitle: { fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 8, textAlign: 'center' },
  ctaDesc: { fontSize: 9, color: C.grayLight, textAlign: 'center', lineHeight: 1.6, marginBottom: 16 },
  ctaBtn: { backgroundColor: C.gold, paddingHorizontal: 24, paddingVertical: 8, borderRadius: 20 },
  ctaBtnText: { fontSize: 9, fontWeight: 700, color: C.navy },
});

const services = [
  { name: '브랜드 디자인', nameEn: 'BRAND DESIGN', color: '#6C63FF', icon: '✦', desc: '로고, CI/BI, 명함, 브로셔 등 브랜드 아이덴티티를 완성합니다.', tags: ['로고 디자인', 'CI/BI', '브로셔', '패키지'] },
  { name: '웹 개발', nameEn: 'WEB DEVELOPMENT', color: '#2A6EFF', icon: '◈', desc: '반응형 웹사이트부터 맞춤 소프트웨어까지 개발합니다.', tags: ['반응형 웹', 'Next.js', '쇼핑몰', '관리자'] },
  { name: '온라인 광고', nameEn: 'ONLINE ADVERTISING', color: '#10B981', icon: '◎', desc: '네이버·구글·카카오·인스타그램 등 멀티채널 광고를 운영합니다.', tags: ['검색광고', 'SNS광고', 'GA분석', '리타겟팅'] },
  { name: '영상 제작', nameEn: 'VIDEO PRODUCTION', color: '#F59E0B', icon: '▶', desc: '홍보영상, 릴스, 유튜브 콘텐츠 등 영상을 기획·제작합니다.', tags: ['홍보영상', '릴스', '유튜브', '모션그래픽'] },
  { name: '블로그 마케팅', nameEn: 'BLOG MARKETING', color: '#EC4899', icon: '✎', desc: '네이버 블로그 최적화를 통해 자연 유입을 극대화합니다.', tags: ['네이버 블로그', 'SEO', '콘텐츠 기획', '바이럴'] },
  { name: '인쇄 디자인', nameEn: 'PRINT DESIGN', color: '#8B5CF6', icon: '❐', desc: '명함, 현수막, 전단지 등 오프라인 인쇄물을 디자인합니다.', tags: ['명함', '현수막', '전단지', '포스터'] },
];

function CoverPage() {
  const logoPath = path.join(process.cwd(), 'public/images/logo-white.png');
  return (
    <Page size="A4" style={s.page}>
      <View style={s.coverDecor} />
      <View style={s.coverDecor2} />
      <View style={s.coverContainer}>
        <View style={s.coverTopBar}>
          <Image src={logoPath} style={s.coverLogo} />
          <Text style={s.coverYear}>2025 PORTFOLIO</Text>
        </View>

        <View style={s.coverCenter}>
          <Text style={s.coverEyebrow}>Company Portfolio</Text>
          <Text style={s.coverTitle}>
            {'픽셀 하나까지\n'}
            <Text style={s.coverTitleAccent}>완벽하게.</Text>
          </Text>
          <View style={s.coverDivider} />
          <Text style={s.coverSubtitle}>
            {'디자인 · 개발 · 온라인 광고 · 영상 제작까지\n하나의 파트너로 완성하는 브랜드 솔루션'}
          </Text>
          <View style={s.coverServices}>
            {['Brand Design', 'Web Dev', 'Online AD', 'Video', 'Blog'].map((t) => (
              <View key={t} style={s.coverServiceTag}>
                <Text>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={s.coverFooter}>
          <Text style={s.coverContact}>
            {'postpr0727@gmail.com\npixel-log-ten.vercel.app'}
          </Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {[C.gold, C.accent, '#6C63FF'].map((c) => (
              <View key={c} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c }} />
            ))}
          </View>
        </View>
      </View>
    </Page>
  );
}

function ServicesPage() {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.sectionPage}>
        <View style={s.pageHeader}>
          <Text style={s.pageHeaderTitle}>PIXEL-LOG · Services</Text>
          <Text style={s.pageNum}>02</Text>
        </View>
        <Text style={s.sectionEyebrow}>What We Do</Text>
        <Text style={s.sectionTitle}>제공 서비스</Text>
        <Text style={s.sectionDesc}>비즈니스 성장에 필요한 모든 디지털 솔루션을 원스톱으로 제공합니다.</Text>
        <View style={s.serviceGrid}>
          {services.map((svc) => (
            <View key={svc.name} style={s.serviceCard}>
              <View style={[s.serviceCardAccent, { backgroundColor: svc.color }]} />
              <Text style={s.serviceCardIcon}>{svc.icon}</Text>
              <Text style={s.serviceCardName}>{svc.name}</Text>
              <Text style={s.serviceCardNameEn}>{svc.nameEn}</Text>
              <Text style={s.serviceCardDesc}>{svc.desc}</Text>
              <View style={s.serviceCardTags}>
                {svc.tags.map((tag) => (
                  <View key={tag} style={s.serviceCardTag}>
                    <Text>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  );
}

function CertPage() {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.sectionPage}>
        <View style={s.pageHeader}>
          <Text style={s.pageHeaderTitle}>PIXEL-LOG · Credentials</Text>
          <Text style={s.pageNum}>03</Text>
        </View>
        <Text style={s.sectionEyebrow}>Certified Expertise</Text>
        <Text style={s.sectionTitle}>공인 자격 & 전문성</Text>
        <Text style={s.sectionDesc}>국가공인기관이 인증한 전문 자격을 바탕으로 체계적이고 효율적인 광고 운영을 제공합니다.</Text>

        <View style={s.certContainer}>
          <View style={s.certBadge}>
            <Text style={s.certStar}>★</Text>
            <Text style={s.certLevel}>검색광고</Text>
            <Text style={s.certGrade}>1급</Text>
          </View>
          <View style={s.certBody}>
            <Text style={s.certOrg}>KAIT 한국정보통신진흥협회 공인</Text>
            <Text style={s.certName}>검색광고마케터 1급</Text>
            <Text style={s.certDesc}>
              {'검색광고 전략 수립부터 실무 운영·분석까지 전 과정을\n국가공인기관이 검증한 최고 등급 자격증입니다.'}
            </Text>
            <View style={s.certPills}>
              {[
                { label: '발급기관', value: 'KAIT' },
                { label: '등급', value: '1급 (최고)' },
                { label: '분야', value: '검색광고 전략·분석' },
              ].map((p) => (
                <View key={p.label} style={s.certPill}>
                  <View style={s.certPillDot} />
                  <Text style={s.certPillLabel}>{p.label}  </Text>
                  <Text style={s.certPillValue}>{p.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* About section below cert */}
        <View style={{ backgroundColor: C.navyMid, borderRadius: 12, padding: 24, borderWidth: 1, borderColor: C.divider, borderStyle: 'solid' }}>
          <Text style={[s.sectionEyebrow, { marginBottom: 10 }]}>Why PIXEL-LOG</Text>
          <Text style={{ fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 12 }}>원스톱 파트너의 강점</Text>
          {[
            { title: '통합 전략', desc: '기획부터 디자인, 개발, 광고 운영까지 하나의 팀이 일관된 방향으로 진행합니다.' },
            { title: '데이터 기반', desc: 'GA4, 네이버 애널리틱스 등 실데이터를 기반으로 광고와 콘텐츠를 최적화합니다.' },
            { title: '빠른 커뮤니케이션', desc: '카카오톡 채널을 통한 실시간 소통으로 신속하게 대응합니다.' },
          ].map((item) => (
            <View key={item.title} style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: C.gold, marginTop: 5 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 10, fontWeight: 700, color: C.white, marginBottom: 2 }}>{item.title}</Text>
                <Text style={{ fontSize: 9, color: C.grayLight, lineHeight: 1.6 }}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  );
}

function ContactPage() {
  return (
    <Page size="A4" style={s.pageLight}>
      <View style={s.sectionPage}>
        <View style={[s.pageHeader, { borderBottomColor: '#CBD5E0' }]}>
          <Text style={[s.pageHeaderTitle, { color: '#4A5568' }]}>PIXEL-LOG · Contact</Text>
          <Text style={[s.pageNum, { color: '#4A5568' }]}>04</Text>
        </View>
        <Text style={[s.sectionEyebrow, { color: C.accent }]}>Get In Touch</Text>
        <Text style={s.sectionTitleDark}>문의하기</Text>
        <Text style={s.sectionDescDark}>아이디어가 있으신가요? 지금 바로 연락주세요. 무료 상담을 통해 최적의 솔루션을 제안해 드립니다.</Text>

        <View style={s.contactGrid}>
          {[
            { title: '이메일', value: 'postpr0727@gmail.com', note: '24시간 내 답변' },
            { title: '카카오톡', value: '@pixellog', note: '실시간 상담 가능' },
            { title: '웹사이트', value: 'pixel-log-ten.vercel.app', note: '포트폴리오 & 문의' },
            { title: '응답시간', value: '24시간 이내', note: '평균 응답 시간' },
          ].map((item) => (
            <View key={item.title} style={s.contactCard}>
              <Text style={s.contactCardTitle}>{item.title}</Text>
              <Text style={s.contactCardValue}>{item.value}</Text>
              <Text style={s.contactCardNote}>{item.note}</Text>
            </View>
          ))}
        </View>

        <View style={s.ctaBanner}>
          <Text style={s.ctaTitle}>프로젝트를 함께 시작해볼까요?</Text>
          <Text style={s.ctaDesc}>
            {'디자인, 개발, 광고, 영상 — 어떤 분야든 환영합니다.\n지금 문의하시면 무료 상담을 받으실 수 있습니다.'}
          </Text>
          <View style={s.ctaBtn}>
            <Text style={s.ctaBtnText}>postpr0727@gmail.com</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 28 }}>
          {[C.gold, C.accent, '#6C63FF', '#10B981'].map((c) => (
            <View key={c} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c }} />
          ))}
          <Text style={{ fontSize: 8, color: '#A0AEC0', marginLeft: 4 }}>PIXEL-LOG © 2025</Text>
        </View>
      </View>
    </Page>
  );
}

function PortfolioDocument() {
  return React.createElement(
    Document,
    { title: 'PIXEL-LOG 포트폴리오', author: 'PIXEL-LOG', subject: '서비스 소개서', creator: 'PIXEL-LOG', producer: 'PIXEL-LOG' },
    React.createElement(CoverPage, null),
    React.createElement(ServicesPage, null),
    React.createElement(CertPage, null),
    React.createElement(ContactPage, null),
  );
}

export async function GET() {
  try {
    ensureFont();
    const buffer = await renderToBuffer(React.createElement(PortfolioDocument));
    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="PIXEL-LOG-Portfolio-2025.pdf"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('PDF generation error:', message);
    return NextResponse.json({ error: 'PDF 생성 실패', details: message }, { status: 500 });
  }
}
