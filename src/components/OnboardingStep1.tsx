import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { AppRoute } from '../types/qada';

interface OnboardingStep1Props {
  onNavigate: (route: AppRoute) => void;
}

export const OnboardingStep1: React.FC<OnboardingStep1Props> = ({ onNavigate }) => {
  return (
    <div className="qada-bg-gradient min-h-full flex flex-col justify-between px-5 pt-4 pb-6 select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-3.5 py-1.5 shadow-[0_2px_10px_rgba(20,50,34,0.05)] border border-[#E7F0EB]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1C4731]" />
          <span className="text-[12px] font-medium text-[#1F4A34]">Step 1 of 3</span>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('sign-up')}
          className="text-[13px] font-semibold text-[#2E6A4E] hover:text-[#193B29] px-2 py-1.5 cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center my-3 space-y-4">
        {/* Architectural Illustration Card */}
        <div className="w-full bg-white/95 rounded-[26px] p-4 shadow-[0_12px_32px_rgba(20,50,34,0.05)] flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 42%, rgba(203, 236, 217, 0.45) 0%, rgba(255, 255, 255, 0) 68%)',
            }}
          />
          <svg
            viewBox="0 0 240 205"
            className="w-[210px] h-[180px] relative z-10"
            fill="none"
          >
            {/* 8-Point Islamic Star at Top */}
            <g transform="translate(120, 22)">
              <rect
                x="-6"
                y="-6"
                width="12"
                height="12"
                fill="#A3B9A6"
                opacity="0.7"
              />
              <rect
                x="-6"
                y="-6"
                width="12"
                height="12"
                transform="rotate(45)"
                fill="#CBB170"
                opacity="0.75"
              />
              <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
            </g>

            {/* Outer Dotted Arch */}
            <path
              d="M62 190 V102 C62 67 88 42 120 42 C152 42 178 67 178 102 V190"
              stroke="#BFCFBF"
              strokeWidth="1.6"
              strokeDasharray="3 4.5"
              strokeLinecap="round"
            />

            {/* Inner Gold Arch */}
            <path
              d="M73 190 V106 C73 78 94 56 120 56 C146 56 167 78 167 106 V190"
              stroke="#D8C89C"
              strokeWidth="1.3"
            />

            {/* Small Gold Dot Inside Arch Apex */}
            <circle cx="120" cy="76" r="2.2" fill="#D5B976" />
            <circle cx="164" cy="96" r="1.8" fill="#D5B976" />
            <circle cx="76" cy="96" r="1.8" fill="#D5B976" />

            {/* Soft Dome Backdrop Behind Book */}
            <path
              d="M84 134 C84 114 100 100 120 100 C140 100 156 114 156 134 Z"
              fill="#EEF6F0"
            />

            {/* Green Geometric Mosque Base / Stand */}
            <path
              d="M84 128 L120 144 L156 128 V152 L120 168 L84 152 Z"
              fill="#628C6F"
            />
            <path
              d="M84 128 L120 144 V168 L84 152 Z"
              fill="#3A6347"
            />
            <path
              d="M120 144 L156 128 V152 L120 168 Z"
              fill="#6C9477"
            />
            {/* Diamond Accent at Base Center */}
            <path
              d="M120 152 L129 161 L120 170 L111 161 Z"
              fill="#F3F7F4"
            />

            {/* Open Book / Ledger Pages */}
            <path
              d="M91 124 C99 119 110 120 120 126 C130 120 141 119 149 124 L154 133 C143 128 131 129 120 135 C109 129 97 128 86 133 Z"
              fill="#FFFFFF"
              stroke="#DDE8DF"
              strokeWidth="1"
            />
            <path
              d="M94 120 C102 116 112 117 120 123 C128 117 138 116 146 120 L149 127 C139 122 129 123 120 129 C111 123 101 122 91 127 Z"
              fill="#F8FBF8"
            />
            {/* Gold Lines on Book Pages */}
            <path d="M98 122 L113 120" stroke="#D7BC7B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M97 126 L111 124" stroke="#CFDCD2" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M127 120 L142 122" stroke="#D7BC7B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M129 124 L143 126" stroke="#CFDCD2" strokeWidth="1.3" strokeLinecap="round" />

            {/* Flanking Olive/Forest Dots */}
            <circle cx="67" cy="147" r="4" fill="#6D9477" />
            <circle cx="81" cy="159" r="3.6" fill="#234730" />
            <circle cx="96" cy="171" r="3" fill="#6D9477" />
            <circle cx="173" cy="147" r="4" fill="#6D9477" />
            <circle cx="159" cy="159" r="3.6" fill="#234730" />
            <circle cx="144" cy="171" r="3" fill="#6D9477" />

            {/* Hanging Gold Key / Tassel */}
            <circle cx="120" cy="178" r="5" stroke="#D8B362" strokeWidth="2.2" />
            <line x1="120" y1="183" x2="120" y2="198" stroke="#D8B362" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="120" y1="191" x2="124" y2="191" stroke="#D8B362" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Arabic Heading & Title */}
        <div className="text-center space-y-1.5 px-1">
          <p className="font-arabic text-[17px] text-[#C6A75F]" dir="rtl">
            حساب الصلوات الفائتة
          </p>
          <h1 className="font-serif-display text-[26px] leading-[1.2] font-medium text-[#0E2D1D]">
            Estimate With Peace of Mind
          </h1>
          <p className="text-[13.5px] leading-[1.58] text-[#4E6157] max-w-[320px] mx-auto pt-1">
            Uncover exactly where you stand without overwhelm. Enter your age of accountability and
            missed periods to automatically estimate your lifetime prayer total in minutes.
          </p>
        </div>

        {/* Checklist Card */}
        <div className="w-full bg-white rounded-[22px] p-4 shadow-[0_10px_28px_rgba(20,50,34,0.055)] space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-[#B4E8CD] text-[#17402B] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-[13.5px] font-semibold text-[#122D1F] leading-snug">
                Auto-accounts for illness, travel &amp; pardoned days
              </h2>
              <p className="text-[12px] text-[#5C6F65] leading-relaxed mt-0.5">
                Calculates exemptions with scholar-verified accuracy
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-[#B4E8CD] text-[#17402B] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-[13.5px] font-semibold text-[#122D1F] leading-snug">
                Precise breakdown across daily prayers
              </h2>
              <p className="text-[12px] text-[#5C6F65] leading-relaxed mt-0.5">
                Fajr, Dhuhr, Asr, Maghrib, and Isha individually balanced
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="space-y-4 pt-2">
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('onboarding-1')}
            aria-label="Step 1"
            className="w-7 h-1.5 rounded-full bg-[#193B29] cursor-pointer"
          />
          <button
            type="button"
            onClick={() => onNavigate('onboarding-2')}
            aria-label="Step 2"
            className="w-2 h-1.5 rounded-full bg-[#BDCAC3] hover:bg-[#8DA498] cursor-pointer transition-colors"
          />
          <button
            type="button"
            onClick={() => onNavigate('onboarding-3')}
            aria-label="Step 3"
            className="w-2 h-1.5 rounded-full bg-[#BDCAC3] hover:bg-[#8DA498] cursor-pointer transition-colors"
          />
        </div>

        <button
          type="button"
          onClick={() => onNavigate('onboarding-2')}
          className="w-full h-[54px] rounded-full bg-[#193B29] hover:bg-[#132E20] active:scale-[0.985] transition-all text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(25,59,41,0.22)] cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-[12px] italic text-[#66796F]">
          &ldquo;Honest intention is the first step.&rdquo;
        </p>
      </div>
    </div>
  );
};
