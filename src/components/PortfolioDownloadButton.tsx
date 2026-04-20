'use client';

import { useState } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';

export function PortfolioDownloadButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  async function handleDownload() {
    if (state === 'loading') return;
    setState('loading');
    try {
      const res = await fetch('/api/portfolio-pdf');
      if (!res.ok) throw new Error('failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'PIXEL-LOG-Portfolio-2025.pdf';
      a.click();
      URL.revokeObjectURL(url);
      setState('done');
      setTimeout(() => setState('idle'), 3000);
    } catch {
      setState('idle');
    }
  }

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <div
        className={`
          transition-all duration-300 origin-bottom-right
          ${state === 'idle' ? 'opacity-0 scale-95 pointer-events-none' : ''}
          ${state === 'done' ? 'opacity-100 scale-100' : ''}
        `}
      >
        {state === 'done' && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
            다운로드 완료 ✓
          </div>
        )}
      </div>

      <button
        onClick={handleDownload}
        disabled={state === 'loading'}
        aria-label="포트폴리오 PDF 다운로드"
        className={`
          group relative flex items-center gap-0 overflow-hidden
          h-14 rounded-full shadow-2xl
          transition-all duration-500 ease-out
          hover:gap-3 hover:pr-5
          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
          ${state === 'done'
            ? 'bg-emerald-600 pl-4 gap-3 pr-5'
            : 'bg-gradient-to-br from-amber-500 to-amber-600 pl-4'
          }
          disabled:opacity-80
        `}
        style={{ boxShadow: '0 8px 32px rgba(212,160,23,0.45)' }}
      >
        {/* Icon */}
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
          {state === 'loading' ? (
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          ) : state === 'done' ? (
            <FileText className="w-5 h-5 text-white" />
          ) : (
            <Download className="w-5 h-5 text-white group-hover:animate-bounce" />
          )}
        </span>

        {/* Label — slides in on hover */}
        <span
          className={`
            text-white text-sm font-black whitespace-nowrap
            transition-all duration-300 max-w-0 overflow-hidden
            group-hover:max-w-xs
            ${state === 'done' ? 'max-w-xs' : ''}
          `}
        >
          {state === 'done' ? '다운로드 완료' : '포트폴리오 PDF'}
        </span>
      </button>
    </div>
  );
}
