import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import type { AppRoute } from '../types/qada';

interface SplashScreenProps {
  onNavigate: (route: AppRoute) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onNavigate }) => {
  return (
    <div className="qada-bg-gradient min-h-full flex flex-col justify-between px-6 pt-5 pb-6 select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1C4731]" />
          <span className="text-[11px] font-semibold tracking-[0.22em] text-[#60736A] uppercase">
            Niyyah
          </span>
        </div>
        <div
          className="text-[#6F857A] flex items-center justify-center"
          aria-hidden="true"
        >
          {/* Delicate 3-petal lotus botanical icon */}
          <svg width="20" height="18" viewBox="0 0 24 22" fill="none">
            <path
              d="M12 2C14.5 6.2 14.5 11.2 12 15.5C9.5 11.2 9.5 6.2 12 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M12 15.5C8.5 14.5 5 11.5 3.5 7.5C7 8 10 10.5 12 15.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M12 15.5C15.5 14.5 19 11.5 20.5 7.5C17 8 14 10.5 12 15.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 18.5H15.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Bismillah & Sacred Intention */}
      <div className="text-center mt-4">
        <p
          className="font-arabic text-[22px] text-[#CFB26F] tracking-wide leading-relaxed"
          dir="rtl"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <div className="flex items-center justify-center gap-2.5 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#92BA9F]" />
          <span className="text-[10px] font-semibold tracking-[0.26em] text-[#6B7E75] uppercase">
            Sacred Intention
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#92BA9F]" />
        </div>
      </div>

      {/* Central Medallion + Title */}
      <div className="flex flex-col items-center my-4">
        <div className="relative w-40 h-40 rounded-full bg-white p-[7px] shadow-[0_18px_42px_rgba(24,59,41,0.08)] flex items-center justify-center">
          {/* Top & Bottom subtle RK gold emblems */}
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 bg-white/90 px-1.5 rounded-full flex items-center gap-0.5 text-[9px] font-semibold text-[#D6B875] tracking-wider">
            <span>⚘</span>
            <span>RK</span>
          </div>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#DDF4E7] via-[#FAFBF9] to-[#FCEBD2] border border-[#F0F5F2]" />
          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 bg-white/90 px-1.5 rounded-full flex items-center gap-0.5 text-[9px] font-semibold text-[#D6B875] tracking-wider">
            <span>⚘</span>
            <span>RK</span>
          </div>
        </div>

        {/* App Title */}
        <div className="flex items-baseline justify-center gap-2.5 mt-5">
          <h1 className="font-serif-display text-[42px] leading-none font-medium text-[#113322] tracking-tight">
            Qada
          </h1>
          <span className="font-arabic text-[26px] text-[#2E6A4E] leading-none" dir="rtl">
            قضاء
          </span>
        </div>
        <div className="w-9 h-[2px] bg-[#D8BC7C] rounded-full mt-2 mb-3.5" />
        <p className="text-[14px] leading-[1.55] text-[#4C5F55] text-center max-w-[260px]">
          Your mindful, unhurried journey to fulfilling every past prayer
        </p>
      </div>

      {/* Reflection Card & Actions */}
      <div className="space-y-5">
        <div className="relative bg-white rounded-[20px] px-5 py-4 shadow-[0_10px_28px_rgba(20,50,34,0.055)] overflow-hidden">
          <div
            className="absolute left-0 top-3.5 bottom-3.5 w-[3.5px] rounded-r-full bg-[#DEC07D]"
            aria-hidden="true"
          />
          <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#6B7E75] uppercase mb-1.5">
            <span className="text-[#1D402D] font-serif text-sm leading-none">❞</span>
            <span>Reflection</span>
          </div>
          <p className="text-[13.5px] italic leading-[1.55] text-[#1A3024]">
            “Indeed, prayer has been decreed upon the believers a decree of specified times.”
          </p>
          <p className="text-right text-[11px] font-semibold text-[#2E6A4E] mt-2">
            Surah An-Nisa • 4:103
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('onboarding-1')}
          className="w-full h-[54px] rounded-full bg-[#193B29] hover:bg-[#132E20] active:scale-[0.985] transition-all text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(25,59,41,0.22)] cursor-pointer"
        >
          <span>Begin Your Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center text-[13px] text-[#4C5F55]">
          Already tracking your prayers?{' '}
          <button
            type="button"
            onClick={() => onNavigate('sign-in')}
            className="font-semibold text-[#2E6A4E] hover:text-[#193B29] underline underline-offset-4 cursor-pointer"
          >
            Resume Log
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A8D83] pt-1">
          <span>v1.0</span>
          <span>•</span>
          <span>Crafted with devotion</span>
          <Heart className="w-3 h-3 text-[#2E6A4E]" />
        </div>
      </div>
    </div>
  );
};
