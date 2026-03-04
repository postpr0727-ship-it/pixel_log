import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'PIXEL-LOG | 디자인, 개발, 마케팅 원스톱 솔루션';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#040b16', // navy base color
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        fontSize: 140,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        letterSpacing: '-2px',
                    }}
                >
                    PIXEL-LOG
                </div>
                <div
                    style={{
                        fontSize: 50,
                        fontWeight: 'bold',
                        color: '#d4af37', // gold
                        marginTop: '30px',
                        marginBottom: '40px',
                        letterSpacing: '-1px',
                    }}
                >
                    디자인, 개발, 마케팅 원스톱 솔루션
                </div>
                <div
                    style={{
                        fontSize: 32,
                        color: '#9ca3af',
                    }}
                >
                    당신의 비즈니스를 픽셀 하나까지 완벽하게
                </div>
            </div>
        ),
        { ...size }
    );
}
