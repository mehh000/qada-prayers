import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  Lock,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import type { AppRoute } from '../types/qada';

interface OnboardingStep3Props {
  onNavigate: (route: AppRoute) => void;
  onBack: () => void;
}

export const OnboardingStep3: React.FC<OnboardingStep3Props> = ({ onNavigate, onBack }) => {
  return (
    <div className="qada-bg-gradient min-h-full flex flex-col justify-between px-5 pt-4 pb-6 select-none">
      {/* Top Bar */}
      <div className="relative flex items-center justify-center">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="absolute left-0 w-9 h-9 rounded-full bg-white shadow-[0_2px_10px_rgba(20,50,34,0.06)] flex items-center justify-center text-[#193B29] hover:bg-[#F3F8F5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-[0_2px_10px_rgba(20,50,34,0.05)] border border-[#E7F0EB]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CEAD65]" />
          <span className="text-[11px] font-bold tracking-[0.14em] text-[#234935] uppercase">
            Step 3 of 3
          </span>
        </div>
      </div>

      {/* Scenic Hero Image Card */}
      <div className="relative h-[205px] rounded-[24px] overflow-hidden shadow-[0_14px_32px_rgba(24,59,41,0.09)] my-3 bg-[#D7ECE0]">
        <img
          src="/src/assets/images/spiritual_renewal_hero_1795331017876.jpg"
          alt="Pathway toward tranquil minaret at golden dawn"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#183827]/25 via-transparent to-transparent" />

        {/* Top-Right Spiritual Renewal Pill */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm flex items-center gap-1.5 text-[11.5px] font-semibold text-[#183B29]">
          <Sparkles className="w-3.5 h-3.5 text-[#C8A456]" />
          <span>Spiritual Renewal</span>
        </div>

        {/* Bottom Floating Daily Journey Goal Card */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-[18px] px-3.5 py-2.5 shadow-[0_8px_22px_rgba(18,45,31,0.12)] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C7EED8] text-[#1C5537] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[2.4]" />
            </div>
            <div>
              <p className="text-[10.5px] text-[#5B6E64] leading-none">Daily Journey Goal</p>
              <p className="text-[14.5px] font-bold text-[#122D1F] leading-tight mt-0.5">
                5 of 5 Fulfilled
              </p>
            </div>
          </div>

          <div className="bg-[#FDF1D6] text-[#B98730] px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap">
            +100% Niyyah
          </div>
        </div>
      </div>

      {/* Arabic Badge & Headline */}
      <div className="text-center space-y-2 mb-3">
        <div className="inline-block bg-[#DAEAE1] text-[#2B6247] px-3.5 py-1 rounded-full font-arabic text-[13px]">
          انشراح الصدر والبركة
        </div>
        <h1 className="font-serif-display text-[26px] leading-[1.18] font-medium text-[#0E2D1D]">
          Track Progress &amp; Find Lightness
        </h1>
        <p className="text-[13px] leading-[1.55] text-[#4E6157] px-1">
          Watch your remaining total decrease prayer by prayer. Celebrate peaceful milestones,
          receive gentle adhan notifications, and renew your sacred intention every single day.
        </p>
      </div>

      {/* Feature List Cards */}
      <div className="space-y-2.5 mb-4">
        <div className="bg-white rounded-[18px] px-4 py-3 shadow-[0_6px_20px_rgba(20,50,34,0.045)] flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#CBEEDB] text-[#1A4B31] flex items-center justify-center shrink-0">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[13.5px] font-semibold text-[#122D1F]">
              Cloud backup across your devices
            </h2>
            <p className="text-[11.5px] text-[#5B6E64] leading-snug mt-0.5">
              Seamless synchronization, never lose a logged prayer
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[18px] px-4 py-3 shadow-[0_6px_20px_rgba(20,50,34,0.045)] flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#CBEEDB] text-[#1A4B31] flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[13.5px] font-semibold text-[#122D1F]">
              100% Private, guilt-free sanctuary
            </h2>
            <p className="text-[11.5px] text-[#5B6E64] leading-snug mt-0.5">
              Your worship stays strictly between you and your Creator
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[18px] px-4 py-3 shadow-[0_6px_20px_rgba(20,50,34,0.045)] flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#FCE9C3] text-[#8E6520] flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[13.5px] font-semibold text-[#122D1F]">
              Gentle, mindful reminders
            </h2>
            <p className="text-[11.5px] text-[#5B6E64] leading-snug mt-0.5">
              Customized gentle chimes timed for your daily Qada slots
            </p>
          </div>
        </div>
      </div>

      {/* Pagination & Auth CTAs */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-center gap-2 pb-1">
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
            className="w-2 h-1.5 rounded-full bg-[#BDCAC3] hover:bg-[#8DA498] cursor-pointer transition-colors"
          />
          <button
            type="button"
            onClick={() => onNavigate('onboarding-3')}
            aria-label="Step 3"
            className="w-7 h-1.5 rounded-full bg-[#193B29] cursor-pointer"
          />
        </div>

        <button
          type="button"
          onClick={() => onNavigate('sign-up')}
          className="w-full h-[52px] rounded-full bg-[#193B29] hover:bg-[#132E20] active:scale-[0.985] transition-all text-white font-semibold text-[14.5px] flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(25,59,41,0.22)] cursor-pointer"
        >
          <span>Create Free Account / Sign Up</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('sign-in')}
          className="w-full h-[48px] rounded-full bg-white hover:bg-[#F5FAF7] active:scale-[0.985] transition-all text-[#163826] font-semibold text-[14px] border border-[#DCE8E0] shadow-sm cursor-pointer"
        >
          Already have an account? Log In
        </button>

        <p className="text-center text-[11px] text-[#5B6E64] pt-1">
          🌾 By continuing, you begin with a pure <span className="italic">Niyyah</span> (intention).
        </p>
      </div>
    </div>
  );
};
