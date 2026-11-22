import React, { useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, X } from 'lucide-react';
import type { AppRoute } from '../types/qada';
import { AuthTopBar } from './AuthTopBar';

interface SignInScreenProps {
  onBack: () => void;
  onNavigate: (route: AppRoute) => void;
  onSignIn: (email: string) => void;
  defaultEmail?: string;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onBack,
  onNavigate,
  onSignIn,
  defaultEmail = '',
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setError(null);
    onSignIn(email);
    onNavigate('dashboard');
  };

  return (
    <div className="qada-bg-soft min-h-full flex flex-col">
      <AuthTopBar
        title="Sign In"
        onBack={onBack}
        onProfileAction={() => onNavigate('sign-up')}
        profileTooltip="Switch to Create Account"
      />

      <div className="flex-1 flex flex-col justify-between px-5 pt-6 pb-8">
        <div>
          {/* Centered Mihrab Arch Icon & Welcome Back */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-white shadow-[0_8px_24px_rgba(20,50,34,0.08)] flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 20V11C6 7.68629 8.68629 5 12 5C15.3137 5 18 7.68629 18 11V20"
                  stroke="#193B29"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M9 20V12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12V20"
                  stroke="#193B29"
                  strokeWidth="1.5"
                />
                <path d="M5 20H19" stroke="#193B29" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="12" cy="7" r="1" fill="#CEAB5F" />
              </svg>
            </div>

            <h1 className="font-serif-display text-[30px] leading-tight font-medium text-[#113322]">
              Welcome Back
            </h1>
            <p className="text-[13.5px] text-[#53665C] mt-1">
              Sign in to track your prayers.
            </p>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[26px] p-5 shadow-[0_14px_34px_rgba(20,50,34,0.06)] space-y-4"
            noValidate
          >
            {/* Email Address */}
            <div>
              <label
                htmlFor="signin-email"
                className="block text-[11px] font-bold tracking-[0.06em] text-[#193B29] uppercase mb-1.5"
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-[#4C7A60] absolute left-3.5 pointer-events-none" />
                <input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  className="w-full h-[46px] rounded-[12px] bg-[#F2F5FA] border border-transparent focus:border-[#2E6A4E]/40 focus:bg-white outline-none pl-10 pr-4 text-[14px] text-[#113322] placeholder:text-[#98A4B3] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="signin-password"
                  className="text-[11px] font-bold tracking-[0.06em] text-[#193B29] uppercase"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetSent(false);
                    setShowForgotModal(true);
                  }}
                  className="text-[11.5px] font-medium text-[#2E6A4E] hover:text-[#193B29] cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-[#4C7A60] absolute left-3.5 pointer-events-none" />
                <input
                  id="signin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-[46px] rounded-[12px] bg-[#F2F5FA] border border-transparent focus:border-[#2E6A4E]/40 focus:bg-white outline-none pl-10 pr-11 text-[14px] text-[#113322] placeholder:text-[#7E8C9D] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 w-8 h-8 flex items-center justify-center text-[#5A6C63] hover:text-[#193B29] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me & Encrypted Session */}
            <div className="flex items-center justify-between pt-0.5">
              <button
                type="button"
                onClick={() => setRememberMe((prev) => !prev)}
                className="inline-flex items-center gap-2 cursor-pointer"
              >
                <span
                  className={`w-5 h-5 rounded-[5px] flex items-center justify-center transition-colors ${
                    rememberMe
                      ? 'bg-[#193B29] text-white'
                      : 'bg-[#F2F5FA] border border-[#C7D3CC] text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.6]" />
                </span>
                <span className="text-[13px] text-[#4C5F55]">Remember me</span>
              </button>

              <div className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-[#2E6A4E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#77D0A0]" />
                <span>Encrypted Session</span>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="text-[12px] text-[#9E3A2E] bg-[#FDF1EF] border border-[#F3D2CC] rounded-xl px-3 py-2"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full h-[54px] rounded-full bg-[#193B29] hover:bg-[#132E20] active:scale-[0.985] transition-all text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(25,59,41,0.22)] cursor-pointer mt-2"
            >
              <span>Sign In</span>
              <span className="text-[#8AB49D] font-normal">/</span>
              <span className="font-arabic text-[16px]" dir="rtl">
                متابعة
              </span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="space-y-4 pt-6">
          <div className="text-center text-[13.5px] text-[#53665C]">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('sign-up')}
              className="font-bold text-[#2E6A4E] hover:text-[#193B29] cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-[#5D7066]">
            <Lock className="w-3.5 h-3.5 text-[#3B6B52]" />
            <span>End-to-end encrypted &amp; private</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-[#0F2419]/45 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-5 shadow-2xl space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-display text-[20px] font-medium text-[#113322]">
                Reset Passphrase
              </h3>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                aria-label="Close"
                className="w-8 h-8 rounded-full bg-[#F1F6F3] flex items-center justify-center text-[#193B29] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {resetSent ? (
              <p className="text-[13px] leading-relaxed text-[#2E6A4E] bg-[#EEF8F2] p-3 rounded-xl">
                A quiet recovery link has been prepared for{' '}
                <span className="font-semibold">{email || 'your email'}</span>.
              </p>
            ) : (
              <>
                <p className="text-[13px] leading-relaxed text-[#4E6157]">
                  Enter your email address and we&apos;ll send instructions to restore access to
                  your private Qada log.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  className="w-full h-11 rounded-xl bg-[#F2F5FA] px-3.5 text-[13.5px] text-[#113322] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setResetSent(true)}
                  className="w-full h-11 rounded-full bg-[#193B29] text-white text-[13.5px] font-semibold cursor-pointer"
                >
                  Send Recovery Link
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
