export function NaverYearBlogBadge({ className = "" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 360"
            className={className}
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="shield-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F3E5B5" />
                    <stop offset="40%" stopColor="#D4A056" />
                    <stop offset="100%" stopColor="#8B6931" />
                </linearGradient>
                <linearGradient id="shield-dark" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2A2A2A" />
                    <stop offset="100%" stopColor="#111111" />
                </linearGradient>
                <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Main Shield Outline */}
            <path
                d="M20,20 H280 Q290,20 290,30 V180 Q290,300 150,350 Q10,300 10,180 V30 Q10,20 20,20 Z"
                fill="url(#shield-dark)"
                stroke="url(#shield-gold)"
                strokeWidth="6"
            />

            {/* Inner Decorative Line */}
            <path
                d="M35,35 H265 Q270,35 270,40 V175 Q270,280 150,330 Q30,280 30,175 V40 Q30,35 35,35 Z"
                fill="none"
                stroke="url(#shield-gold)"
                strokeWidth="1.5"
                opacity="0.5"
            />

            {/* Text: "올해의 blog" */}
            <text x="150" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="bold" letterSpacing="1" style={{ fontFamily: 'sans-serif' }}>
                올해의 blog
            </text>

            {/* Text: "2024" (Large) */}
            <text x="150" y="190" textAnchor="middle" fill="url(#shield-gold)" fontSize="100" fontWeight="900" letterSpacing="-2" style={{ fontFamily: 'Arial, sans-serif', filter: 'url(#glow-gold)' }}>
                2024
            </text>

            {/* Laurel Wreath (Simplified) */}
            <path
                d="M80,260 Q60,240 70,220 M220,260 Q240,240 230,220"
                stroke="url(#shield-gold)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
            />

            {/* Text: "100" */}
            <text x="150" y="270" textAnchor="middle" fill="#FFFFFF" fontSize="28" fontWeight="bold" letterSpacing="4">
                100
            </text>

            {/* Sparkles */}
            <circle cx="280" cy="40" r="4" fill="white" className="animate-pulse" />
            <circle cx="20" cy="180" r="2" fill="#F3E5B5" className="animate-pulse-slow" />
        </svg>
    );
}
