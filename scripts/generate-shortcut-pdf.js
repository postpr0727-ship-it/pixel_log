const path = require('path');
const fs = require('fs');
const React = require('react');
const { Document, Page, View, Text, Link, Image, Font, StyleSheet, renderToBuffer } = require('@react-pdf/renderer');

const ROOT = path.join(__dirname, '..');
const fontPath = path.join(ROOT, 'public', 'fonts', 'NanumGothic-Regular.ttf');
const fontBuf = fs.readFileSync(fontPath);
const fontDataUri = `data:font/truetype;base64,${fontBuf.toString('base64')}`;

Font.register({
  family: 'Nanum',
  fonts: [
    { src: fontDataUri, fontWeight: 400 },
    { src: fontDataUri, fontWeight: 700 },
  ],
});

const SITE_URL = 'https://pixel-log-ten.vercel.app';
const logoRaw = fs.readFileSync(path.join(ROOT, 'public', 'images', 'logo-white.png'));
const logoPath = `data:image/png;base64,${logoRaw.toString('base64')}`;

// ── Colour palette ──────────────────────────────────────────────────
const C = {
  navy:    '#08101F',
  navyMid: '#0E1A30',
  navyCard:'#111E33',
  gold:    '#D4A017',
  goldLight:'#F5C842',
  white:   '#FFFFFF',
  gray:    '#7A8FAA',
  grayLt:  '#B0BFD0',
  divider: '#1C2C46',
  accent:  '#2A6EFF',
};

const s = StyleSheet.create({
  page: {
    fontFamily: 'Nanum',
    backgroundColor: C.navy,
    width: 595,
    height: 842,
    padding: 0,
    position: 'relative',
  },

  // ── Background decoration ───────────────────────────────────────
  decor1: {
    position: 'absolute', width: 420, height: 420, borderRadius: 210,
    backgroundColor: '#0B1828', top: -100, right: -80,
  },
  decor2: {
    position: 'absolute', width: 240, height: 240, borderRadius: 120,
    backgroundColor: '#091422', top: 30, right: 30,
  },
  decor3: {
    position: 'absolute', width: 300, height: 300, borderRadius: 150,
    backgroundColor: '#0A1520', bottom: -60, left: -60,
  },
  // gold ring accent
  ring: {
    position: 'absolute', width: 160, height: 160, borderRadius: 80,
    borderWidth: 1, borderColor: '#D4A01722', borderStyle: 'solid',
    top: 60, right: 60,
  },
  ring2: {
    position: 'absolute', width: 100, height: 100, borderRadius: 50,
    borderWidth: 1, borderColor: '#2A6EFF18', borderStyle: 'solid',
    bottom: 100, left: 80,
  },

  // ── Top bar ─────────────────────────────────────────────────────
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 56, paddingTop: 44, marginBottom: 0,
  },
  logo: { width: 130, height: 40, objectFit: 'contain' },
  topBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#D4A01718', borderWidth: 1, borderColor: '#D4A01740',
    borderStyle: 'solid', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20,
  },
  topBadgeDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: C.gold },
  topBadgeText: { fontSize: 7, color: C.gold, letterSpacing: 2, fontWeight: 700 },

  // ── Gold divider line ───────────────────────────────────────────
  goldLine: {
    height: 1, backgroundColor: '#D4A01725',
    marginHorizontal: 56, marginTop: 32, marginBottom: 0,
  },

  // ── Center hero ─────────────────────────────────────────────────
  hero: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 56, paddingTop: 20, paddingBottom: 20,
  },
  eyebrow: {
    fontSize: 8, color: C.gold, letterSpacing: 5,
    textTransform: 'uppercase', marginBottom: 20, textAlign: 'center',
  },
  headline: {
    fontSize: 52, fontWeight: 700, color: C.white,
    textAlign: 'center', lineHeight: 1.05, letterSpacing: -1,
    marginBottom: 8,
  },
  headlineAccent: { color: C.gold },
  subHeadline: {
    fontSize: 14, color: C.grayLt, textAlign: 'center',
    lineHeight: 1.6, marginBottom: 36, fontWeight: 400,
  },

  // ── Services pill row ───────────────────────────────────────────
  pillRow: {
    flexDirection: 'row', gap: 8, flexWrap: 'wrap',
    justifyContent: 'center', marginBottom: 48,
  },
  pill: {
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 20, borderWidth: 1, borderStyle: 'solid',
  },
  pillText: { fontSize: 8, fontWeight: 700 },

  // ── CTA button ──────────────────────────────────────────────────
  ctaWrap: { alignItems: 'center', marginBottom: 20 },
  ctaButton: {
    backgroundColor: C.gold,
    paddingHorizontal: 40, paddingVertical: 14,
    borderRadius: 32,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    // shadow-like border
    borderWidth: 1, borderColor: C.goldLight, borderStyle: 'solid',
  },
  ctaArrow: { fontSize: 14, color: C.navy, fontWeight: 700 },
  ctaText: { fontSize: 13, fontWeight: 700, color: C.navy, letterSpacing: 1 },
  ctaUrl: {
    fontSize: 9, color: C.gray, marginTop: 12, textAlign: 'center',
    textDecoration: 'underline',
  },

  // ── Stats row ───────────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row', justifyContent: 'center', gap: 0,
    marginTop: 0, marginBottom: 0,
    backgroundColor: C.navyCard,
    borderRadius: 16,
    marginHorizontal: 56,
    borderWidth: 1, borderColor: C.divider, borderStyle: 'solid',
    overflow: 'hidden',
  },
  statItem: {
    flex: 1, alignItems: 'center', paddingVertical: 18,
    borderRightWidth: 1, borderRightColor: C.divider, borderRightStyle: 'solid',
  },
  statItemLast: {
    flex: 1, alignItems: 'center', paddingVertical: 18,
  },
  statNum: { fontSize: 18, fontWeight: 700, color: C.gold, marginBottom: 3 },
  statLabel: { fontSize: 7, color: C.gray, letterSpacing: 1, textTransform: 'uppercase' },

  // ── Bottom bar ──────────────────────────────────────────────────
  bottomBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 56, paddingVertical: 24,
    borderTopWidth: 1, borderTopColor: C.divider, borderTopStyle: 'solid',
  },
  bottomLeft: { fontSize: 7, color: C.gray, lineHeight: 1.6 },
  bottomDots: { flexDirection: 'row', gap: 5 },
});

const SERVICES = [
  { label: '브랜드 디자인', color: '#6C63FF', border: '#6C63FF50' },
  { label: '웹 개발',      color: '#2A6EFF', border: '#2A6EFF50' },
  { label: '온라인 광고',  color: '#10B981', border: '#10B98150' },
  { label: '영상 제작',    color: '#EF4444', border: '#EF444450' },
  { label: '블로그 마케팅',color: '#EC4899', border: '#EC489950' },
];

const STATS = [
  { num: '2023',  label: 'Founded' },
  { num: '100+',  label: 'Projects' },
  { num: '5',     label: 'Services' },
  { num: '24h',   label: 'Response' },
];

function ShortcutPDF() {
  return React.createElement(
    Document,
    { title: 'PIXEL-LOG 홈페이지 바로가기', author: 'PIXEL-LOG' },
    React.createElement(
      Page,
      { size: 'A4', style: s.page },

      // ── Background decor ──
      React.createElement(View, { style: s.decor1 }),
      React.createElement(View, { style: s.decor2 }),
      React.createElement(View, { style: s.decor3 }),
      React.createElement(View, { style: s.ring }),
      React.createElement(View, { style: s.ring2 }),

      // ── Top bar ──
      React.createElement(View, { style: s.topBar },
        React.createElement(Image, { src: logoPath, style: s.logo }),
        React.createElement(View, { style: s.topBadge },
          React.createElement(View, { style: s.topBadgeDot }),
          React.createElement(Text, { style: s.topBadgeText }, 'OFFICIAL SITE'),
        ),
      ),

      // ── Gold divider ──
      React.createElement(View, { style: s.goldLine }),

      // ── Hero center ──
      React.createElement(View, { style: s.hero },

        React.createElement(Text, { style: s.eyebrow }, 'Design · Dev · Marketing · Video'),

        React.createElement(Text, { style: s.headline },
          '픽셀 하나까지\n',
          React.createElement(Text, { style: s.headlineAccent }, '완벽하게.'),
        ),

        React.createElement(Text, { style: s.subHeadline },
          '브랜드 디자인부터 웹 개발, 온라인 광고, 영상 제작까지\n하나의 파트너로 완성하는 원스톱 크리에이티브 솔루션',
        ),

        // ── Service pills ──
        React.createElement(View, { style: s.pillRow },
          ...SERVICES.map((svc) =>
            React.createElement(View, { key: svc.label, style: [s.pill, { backgroundColor: svc.color + '18', borderColor: svc.border }] },
              React.createElement(Text, { style: [s.pillText, { color: svc.color }] }, svc.label),
            )
          ),
        ),

        // ── CTA Button ──
        React.createElement(View, { style: s.ctaWrap },
          React.createElement(Link, { src: SITE_URL, style: { textDecoration: 'none' } },
            React.createElement(View, { style: s.ctaButton },
              React.createElement(Text, { style: s.ctaText }, 'PIXEL-LOG 홈페이지 바로가기'),
              React.createElement(Text, { style: s.ctaArrow }, '→'),
            ),
          ),
          React.createElement(Link, { src: SITE_URL, style: s.ctaUrl },
            SITE_URL,
          ),
        ),
      ),

      // ── Stats bar ──
      React.createElement(View, { style: s.statsRow },
        ...STATS.map((st, i) =>
          React.createElement(View, { key: st.label, style: i < STATS.length - 1 ? s.statItem : s.statItemLast },
            React.createElement(Text, { style: s.statNum }, st.num),
            React.createElement(Text, { style: s.statLabel }, st.label),
          )
        ),
      ),

      // ── Bottom bar ──
      React.createElement(View, { style: s.bottomBar },
        React.createElement(Text, { style: s.bottomLeft },
          'postpr0727@gmail.com   ·   @pixellog',
        ),
        React.createElement(View, { style: s.bottomDots },
          ...[C.gold, C.accent, '#6C63FF', '#10B981'].map((c) =>
            React.createElement(View, { key: c, style: { width: 6, height: 6, borderRadius: 3, backgroundColor: c } })
          ),
        ),
      ),
    ),
  );
}

async function main() {
  const buf = await renderToBuffer(React.createElement(ShortcutPDF));
  const outPath = path.join(ROOT, 'public', 'PIXEL-LOG.pdf');
  fs.writeFileSync(outPath, buf);
  console.log('✓ Generated:', outPath, `(${(buf.length / 1024).toFixed(1)} KB)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
