'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const NAVY = '#0B1222';
const WHITE = '#FFFFFF';

export function PageBackground() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [color, setColor] = useState(isHome ? NAVY : WHITE);

  useEffect(() => {
    if (!isHome) {
      setColor(WHITE);
      return;
    }

    setColor(NAVY);

    const handleScroll = () => {
      const hero = document.getElementById('main-hero');
      if (!hero) return;
      // Start transitioning to white when the last ~200px of the hero is visible
      const heroBottom = hero.getBoundingClientRect().bottom;
      setColor(heroBottom < 200 ? WHITE : NAVY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -2,
        backgroundColor: color,
        transition: 'background-color 0.5s ease',
      }}
    />
  );
}
