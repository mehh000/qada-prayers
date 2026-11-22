import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, User, X } from 'lucide-react';
import type { AppRoute } from '../types/qada';
import { AuthTopBar } from './AuthTopBar';

interface SignUpScreenProps {
  onBack: () => void;
  onNavigate: (route: AppRoute) => void;
  onSignUp: (fullName: string, email: string) => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onBack,
  onNavigate,
  onSignUp,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  const strength = useMemo(() => {
    if (!password) {
      return { level: 3, label: 'Good sanctuary key' };
    }
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score += 1;

    const clamped = Math.max(1, Math.min(4, score));
    const labels: Record<number, string> = {
      1: 'Needs more length',
      2: 'Fair protection',
      3: 'Good sanctuary key',
      4: 'Strong sanctuary key',
    };
    return { level: clamped, label: labels[clamped] };
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Please create a password with at least 8 characters.');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }
    setError(null);
    onSignUp(fullName, email);
    onNavigate('estimator');
  };

  return (
    <div className="qada-bg-soft min-h-full flex flex-col">
      <AuthTopBar
        title="Create Account"
        onBack={onBack}
        onProfileAction={() => onNavigate('sign-in')}
        profileTooltip="Switch to Sign In"
      />

      <div className="flex-1 flex flex-col justify-between px-5 pt-6 pb-8">
        <div>
          <div className="mb-5">
            <h1 className="font-serif-display text-[29px] leading-tight font-medium text-[#113322]">
              Create Account
            </h1>
            <p className="text-[13.5px] text-[#53665C] mt-1">
              Create your account to save your prayer records.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[26px] p-5 shadow-[0_14px_34px_rgba(20,50,34,0.06)] space-y-4"
            noValidate
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="block text-[12.5px] font-semibold text-[#193B29] mb-1.5"
              >
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-[#4C7A60] absolute left-3.5 pointer-events-none" />
                <input
                  id="signup-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tariq Ahmad"
                  className="w-full h-[46px] rounded-[12px] bg-[#F2F5FA] border border-transparent focus:border-[#2E6A4E]/40 focus:bg-white outline-none pl-10 pr-4 text-[14px] text-[#113322] placeholder:text-[#98A4B3] transition-colors"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="signup-email"
                className="block text-[12.5px] font-semibold text-[#193B29] mb-1.5"
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-[#4C7A60] absolute left-3.5 pointer-events-none" />
                <input
                  id="signup-email"
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
                  htmlFor="signup-password"
                  className="text-[12.5px] font-semibold text-[#193B29]"
                >
                  Password
                </label>
                <span className="text-[11px] text-[#5C6F65]">8+ characters</span>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-[#4C7A60] absolute left-3.5 pointer-events-none" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a protected passphrase"
                  className="w-full h-[46px] rounded-[12px] bg-[#F2F5FA] border border-transparent focus:border-[#2E6A4E]/40 focus:bg-white outline-none pl-10 pr-11 text-[14px] text-[#113322] placeholder:text-[#98A4B3] transition-colors"
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

              {/* Password Strength Bars */}
              <div className="grid grid-cols-4 gap-1.5 mt-2.5">
                {[1, 2, 3, 4].map((segment) => {
                  let bg = 'bg-[#E3E9F2]';
                  if (segment <= strength.level) {
                    bg = segment === 3 ? 'bg-[#193B29]' : 'bg-[#9BE2BD]';
                    if (strength.level === 1) bg = 'bg-[#D69E5C]';
                    if (strength.level === 4 && segment === 4) bg = 'bg-[#193B29]';
                  }
                  return (
                    <div
                      key={segment}
                      className={`h-[3.5px] rounded-full transition-colors ${bg}`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-1.5 text-[11px]">
                <span className="flex items-center gap-1.5 font-semibold text-[#2E6A4E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E6A4E]" />
                  <span>Strength: {strength.label}</span>
                </span>
                <span className="text-[#788A80]">Encrypted</span>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2.5 pt-1">
              <button
                type="button"
                role="checkbox"
                aria-checked={agreed}
                onClick={() => setAgreed((prev) => !prev)}
                className={`w-5 h-5 rounded-[5px] flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
                  agreed
                    ? 'bg-[#193B29] text-white'
                    : 'bg-[#F2F5FA] border border-[#C7D3CC] text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[2.6]" />
              </button>
              <p className="text-[12px] leading-[1.45] text-[#4C5F55]">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setLegalModal('terms')}
                  className="text-[#2E6A4E] underline underline-offset-2 font-medium cursor-pointer"
                >
                  Terms of Service
                </button>{' '}
                &amp;{' '}
                <button
                  type="button"
                  onClick={() => setLegalModal('privacy')}
                  className="text-[#2E6A4E] underline underline-offset-2 font-medium cursor-pointer"
                >
                  Privacy Policy
                </button>
                , keeping my worship private and protected.
              </p>
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
              className="w-full h-[52px] rounded-full bg-[#193B29] hover:bg-[#132E20] active:scale-[0.985] transition-all text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(25,59,41,0.22)] cursor-pointer mt-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="text-center text-[13.5px] text-[#53665C] pt-6">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('sign-in')}
            className="font-bold text-[#193B29] underline underline-offset-4 cursor-pointer"
          >
            Log In
          </button>
        </div>
      </div>

      {/* Terms / Privacy Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-[#0F2419]/45 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-display text-[20px] font-medium text-[#113322]">
                {legalModal === 'terms' ? 'Terms of Service' : 'Privacy Sanctuary'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                aria-label="Close"
                className="w-8 h-8 rounded-full bg-[#F1F6F3] flex items-center justify-center text-[#193B29] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[13px] leading-relaxed text-[#4E6157]">
              {legalModal === 'terms'
                ? 'Qada is your personal devotional companion. Your prayer estimates, cadence goals, and daily fulfilled counts remain strictly private for your personal spiritual accountability.'
                : 'Your worship records belong solely to you. All prayer totals and cadence preferences are stored securely and are never shared with third parties or advertisers.'}
            </p>
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              className="w-full h-11 rounded-full bg-[#193B29] text-white text-[13.5px] font-semibold cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
