const path = require('path');
const fs = require('fs');
const React = require('react');
const { Document, Page, View, Text, Link, Image, Font, StyleSheet, renderToBuffer } = require('@react-pdf/renderer');

const ROOT = path.join(__dirname, '..');
const fontBuf = fs.readFileSync(path.join(ROOT, 'public', 'fonts', 'NanumGothic-Regular.ttf'));
const fontDataUri = `data:font/truetype;base64,${fontBuf.toString('base64')}`;
Font.register({ family: 'Nanum', fonts: [{ src: fontDataUri, fontWeight: 400 }, { src: fontDataUri, fontWeight: 700 }] });

const SITE_URL = 'https://pixel-log-ten.vercel.app';
const logoRaw = fs.readFileSync(path.join(ROOT, 'public', 'images', 'logo_header.png'));
const logoSrc = `data:image/png;base64,${logoRaw.toString('base64')}`;

const s = StyleSheet.create({
  page: {
    fontFamily: 'Nanum',
    backgroundColor: '#FFFFFF',
    padding: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  // 상단 얇은 컬러 라인
  topAccent: { height: 3, backgroundColor: '#0B1222' },

  // 본문 영역
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 80,
    paddingVertical: 60,
  },

  logo: { width: 140, height: 42, objectFit: 'contain', marginBottom: 24 },

  nameBadge: {
    borderWidth: 1, borderColor: '#CBD5E0', borderStyle: 'solid',
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, marginBottom: 28,
  },
  nameBadgeText: { fontSize: 9, color: '#718096', letterSpacing: 1 },

  // 제목
  title: {
    fontSize: 36,
    fontWeight: 700,
    color: '#0B1222',
    textAlign: 'center',
    lineHeight: 1.2,
    marginBottom: 20,
    letterSpacing: -0.5,
  },

  // 소개
  desc: {
    fontSize: 12,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 1.8,
    marginBottom: 52,
    maxWidth: 340,
  },

  // 구분선
  divider: {
    width: 40,
    height: 2,
    backgroundColor: '#0B1222',
    marginBottom: 52,
  },

  // 바로가기 버튼
  btnWrap: { alignItems: 'center' },
  btn: {
    backgroundColor: '#0B1222',
    paddingHorizontal: 44,
    paddingVertical: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  btnText: { fontSize: 12, fontWeight: 700, color: '#FFFFFF', letterSpacing: 1 },
  btnArrow: { fontSize: 13, color: '#FFFFFF' },
  urlText: {
    fontSize: 9,
    color: '#A0AEC0',
    marginTop: 14,
    textAlign: 'center',
  },

  // 하단 바
  bottomBar: {
    height: 56,
    backgroundColor: '#F7F8FA',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    borderTopStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  bottomDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#CBD5E0' },
  bottomText: { fontSize: 8, color: '#A0AEC0', letterSpacing: 1 },
});

function ShortcutPDF() {
  return React.createElement(
    Document,
    { title: 'PIXEL-LOG 바로가기', author: 'PIXEL-LOG' },
    React.createElement(Page, { size: 'A4', style: s.page },

      // 상단 포인트 라인
      React.createElement(View, { style: s.topAccent }),

      // 본문
      React.createElement(View, { style: s.body },

        // 로고
        React.createElement(Image, { src: logoSrc, style: s.logo }),

        // 이름 배지
        React.createElement(View, { style: s.nameBadge },
          React.createElement(Text, { style: s.nameBadgeText }, '김경훈 포트폴리오'),
        ),

        // 제목
        React.createElement(Text, { style: s.title }, '디자인, 개발, 광고, 영상\n모든 것을 한 곳에서.'),

        // 구분선
        React.createElement(View, { style: s.divider }),

        // 소개
        React.createElement(Text, { style: s.desc },
          '브랜드가 기억되고 선택받을 수 있도록\n픽셀 하나까지 완벽하게 설계합니다.',
        ),

        // 바로가기 버튼
        React.createElement(View, { style: s.btnWrap },
          React.createElement(Link, { src: SITE_URL, style: { textDecoration: 'none' } },
            React.createElement(View, { style: s.btn },
              React.createElement(Text, { style: s.btnText }, 'PIXEL-LOG 바로가기'),
              React.createElement(Text, { style: s.btnArrow }, '→'),
            ),
          ),
          React.createElement(Text, { style: s.urlText }, SITE_URL),
        ),
      ),

      // 하단 바
      React.createElement(View, { style: s.bottomBar },
        React.createElement(View, { style: s.bottomDot }),
        React.createElement(Text, { style: s.bottomText }, 'PIXEL-LOG © 2025'),
        React.createElement(View, { style: s.bottomDot }),
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
