import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Moon,
  SlidersHorizontal,
  Sprout,
  Sun,
  Zap,
} from 'lucide-react';
import type { AppRoute, PaceMode } from '../types/qada';

interface OnboardingStep2Props {
  pace: PaceMode;
  onSelectPace: (pace: PaceMode) => void;
  onNavigate: (route: AppRoute) => void;
  onBack: () => void;
}

export const OnboardingStep2: React.FC<OnboardingStep2Props> = ({
  pace,
  onSelectPace,
  onNavigate,
  onBack,
}) => {
  const perPrayer = pace === 'gentle' ? 1 : 2;

  return (
    <div className="qada-bg-gradient min-h-full flex flex-col justify-between px-5 pt-4 pb-6 select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="w-9 h-9 rounded-full bg-white shadow-[0_2px_10px_rgba(20,50,34,0.06)] flex items-center justify-center text-[#193B29] hover:bg-[#F3F8F5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#2E6A4E] uppercase">
            Step 2 of 3
          </p>
          <p className="text-[11.5px] text-[#5B6E64]">Intention &amp; Cadence</p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('sign-up')}
          className="text-[13px] font-semibold text-[#4B5E54] hover:text-[#193B29] px-2 py-1.5 cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Orbital Cadence Diagram */}
      <div className="relative h-[232px] w-full flex items-center justify-center my-2">
        {/* Orbital Ring SVG */}
        <svg className="w-[214px] h-[214px]" viewBox="0 0 220 220" fill="none">
          {/* Dashed Left Arc */}
          <circle
            cx="110"
            cy="110"
            r="92"
            stroke="#C2D5CA"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          {/* Solid Dark Forest Arc */}
          <path
            d="M110 18 A92 92 0 1 1 32 158"
            stroke="#1B3E2C"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Orbital Accent Dots */}
          <circle cx="80" cy="24" r="3.5" fill="#1B3E2C" />
          <circle cx="174" cy="44" r="3.5" fill="#CEAE67" />
          <circle cx="175" cy="176" r="3.5" fill="#467C5E" />
          <circle cx="74" cy="194" r="3.5" fill="#467C5E" />
          <circle cx="24" cy="108" r="3.5" fill="#CEAE67" />
        </svg>

        {/* Center Dial */}
        <div className="absolute w-[132px] h-[132px] rounded-full bg-white shadow-[0_14px_34px_rgba(24,59,41,0.1)] flex flex-col items-center justify-center text-center px-2">
          <div className="flex items-center gap-1 text-[#C8A75E] mb-1">
            <Sun className="w-3.5 h-3.5" />
            <Moon className="w-3 h-3 fill-[#C8A75E]" />
          </div>
          <p className="text-[17px] font-bold text-[#113322] leading-tight">
            +{perPrayer} Qada
          </p>
          <p className="text-[10.5px] text-[#5C6F65] leading-tight mt-0.5">
            with each daily Fardh
          </p>
          <div className="inline-flex items-center gap-1 text-[10px] font-medium text-[#2E6A4E] mt-1.5">
            <Clock className="w-3 h-3" />
            <span>{pace === 'gentle' ? 'Balanced Flow' : 'Steady Flow'}</span>
          </div>
        </div>

        {/* Orbiting Prayer Badges */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-white/95 px-2.5 py-1 rounded-full shadow-sm border border-[#E5EFE9] flex items-center gap-1.5 text-[11px] font-semibold text-[#183827]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A75E]" />
          <span>Fajr</span>
          <span className="text-[#5C6F65] font-medium">+{perPrayer}</span>
        </div>

        <div className="absolute top-[52px] right-3 bg-white/95 px-2.5 py-1 rounded-full shadow-sm border border-[#E5EFE9] flex items-center gap-1.5 text-[11px] font-semibold text-[#183827]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1B3E2C]" />
          <span>Dhuhr</span>
          <span className="text-[#5C6F65] font-medium">+{perPrayer}</span>
        </div>

        <div className="absolute bottom-2 right-5 bg-white/95 px-2.5 py-1 rounded-full shadow-sm border border-[#E5EFE9] flex items-center gap-1.5 text-[11px] font-semibold text-[#183827]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#467C5E]" />
          <span>Asr</span>
          <span className="text-[#5C6F65] font-medium">+{perPrayer}</span>
        </div>

        <div className="absolute bottom-2 left-4 bg-white/95 px-2.5 py-1 rounded-full shadow-sm border border-[#E5EFE9] flex items-center gap-1.5 text-[11px] font-semibold text-[#183827]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A75E]" />
          <span>Maghrib</span>
          <span className="text-[#5C6F65] font-medium">+{perPrayer}</span>
        </div>

        <div className="absolute top-[52px] left-3 bg-white/95 px-2.5 py-1 rounded-full shadow-sm border border-[#E5EFE9] flex items-center gap-1.5 text-[11px] font-semibold text-[#183827]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1B3E2C]" />
          <span>Isha</span>
          <span className="text-[#5C6F65] font-medium">+{perPrayer}</span>
        </div>
      </div>

      {/* Headline & Prose */}
      <div className="text-center space-y-2 mb-3">
        <p className="font-arabic text-[15px] text-[#C8A85F]" dir="rtl">
          بناء خطة مستدامة
        </p>
        <h1 className="font-serif-display text-[25px] leading-[1.18] font-medium text-[#0E2D1D]">
          Build Your Own Sustainable Pace
        </h1>
        <p className="text-[12.5px] leading-[1.55] text-[#4E6157] px-1">
          Fulfilling past prayers is a journey of consistency, not haste. Choose a comfortable
          cadence—like praying just{' '}
          <span className="font-semibold text-[#193B29]">+{perPrayer} Qada</span> after each Fardh
          prayer—to complete your goal in a timeline that fits your life.
        </p>
      </div>

      {/* Selectable Plan Cards */}
      <div className="space-y-2.5 mb-3">
        <button
          type="button"
          onClick={() => onSelectPace('gentle')}
          className={`w-full text-left bg-white rounded-[18px] p-3.5 transition-all cursor-pointer border ${
            pace === 'gentle'
              ? 'border-[#193B29]/25 shadow-[0_10px_24px_rgba(25,59,41,0.09)]'
              : 'border-transparent shadow-[0_6px_18px_rgba(20,50,34,0.04)] opacity-90 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D3EFE0] text-[#193B29] flex items-center justify-center shrink-0">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[14.5px] font-semibold text-[#122D1F]">Gentle Pace</span>
                  <span className="text-[#C8A85F]">•</span>
                  <span className="text-[12px] font-semibold text-[#2E6A4E]">+1 per prayer</span>
                </div>
                <p className="text-[12px] text-[#52655B] mt-0.5">
                  5 extra prayers daily • <span className="font-semibold text-[#122D1F]">1 Year plan</span>
                </p>
              </div>
            </div>

            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                pace === 'gentle'
                  ? 'bg-[#193B29] text-white'
                  : 'bg-[#E3ECE7] text-transparent'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[2.6]" />
            </div>
          </div>

          <div className="mt-3 h-1 w-full rounded-full bg-[#E1F0E7] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                pace === 'gentle' ? 'w-3/5 bg-[#193B29]' : 'w-2/5 bg-[#9BC3AD]'
              }`}
            />
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectPace('steady')}
          className={`w-full text-left bg-white rounded-[18px] p-3.5 transition-all cursor-pointer border ${
            pace === 'steady'
              ? 'border-[#193B29]/25 shadow-[0_10px_24px_rgba(25,59,41,0.09)]'
              : 'border-transparent shadow-[0_6px_18px_rgba(20,50,34,0.04)] opacity-90 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E6ECF8] text-[#284437] flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[14.5px] font-semibold text-[#122D1F]">Steady Devotion</span>
                  <span className="text-[#52655B]">•</span>
                  <span className="text-[12px] font-semibold text-[#2E6A4E]">+2 per prayer</span>
                </div>
                <p className="text-[12px] text-[#52655B] mt-0.5">
                  10 extra prayers daily •{' '}
                  <span className="font-semibold text-[#122D1F]">6 Months plan</span>
                </p>
              </div>
            </div>

            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                pace === 'steady'
                  ? 'bg-[#193B29] text-white'
                  : 'bg-[#E4EBF5] text-[#B7C4D8]'
              }`}
            >
              {pace === 'steady' ? (
                <Check className="w-3.5 h-3.5 stroke-[2.6]" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-[#B7C4D8]" />
              )}
            </div>
          </div>

          <div className="mt-3 h-1 w-full rounded-full bg-[#E1F0E7] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                pace === 'steady' ? 'w-full bg-[#193B29]' : 'w-full bg-[#87AE97]'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Hadith Card */}
      <div className="bg-white rounded-[16px] px-4 py-3 shadow-[0_6px_18px_rgba(20,50,34,0.045)] flex items-start gap-2.5 mb-3">
        <div className="w-5 h-5 rounded-full bg-[#F7E8BE] text-[#9B7729] flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-serif font-bold">
          ❞
        </div>
        <div>
          <p className="text-[12px] italic leading-snug text-[#1E3328]">
            “The most beloved deeds to Allah are those done regularly, even if small.”
          </p>
          <p className="text-[10.5px] text-[#6B7E75] mt-1">Sahih al-Bukhari</p>
        </div>
      </div>

      {/* Courtyard Banner */}
      <div className="relative h-[86px] rounded-[18px] overflow-hidden shadow-[0_10px_24px_rgba(20,50,34,0.12)] mb-4 bg-[#274636]">
        <img
          src="/src/assets/images/courtyard_peace_banner_1795331017564.jpg"
          alt="Serene historic mosque courtyard"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2419]/85 via-[#0F2419]/55 to-transparent flex flex-col justify-center px-4">
          <span className="text-[9.5px] font-semibold tracking-[0.14em] text-[#B8DFC8] uppercase">
            Peace of Mind
          </span>
          <p className="text-[15px] font-semibold text-white leading-tight mt-0.5">
            Take it one prayer at a time
          </p>
        </div>
      </div>

      {/* Pagination & Continue */}
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('onboarding-1')}
            aria-label="Step 1"
            className="w-2 h-1.5 rounded-full bg-[#BDCAC3] hover:bg-[#8DA498] cursor-pointer transition-colors"
          />
          <button
            type="button"
            onClick={() => onNavigate('onboarding-2')}
            aria-label="Step 2"
            className="w-7 h-1.5 rounded-full bg-[#193B29] cursor-pointer"
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
          onClick={() => onNavigate('onboarding-3')}
          className="w-full h-[52px] rounded-full bg-[#193B29] hover:bg-[#132E20] active:scale-[0.985] transition-all text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(25,59,41,0.22)] cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-[#3B6B52]">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Custom pacing can be tuned anytime.</span>
        </div>
      </div>
    </div>
  );
};
