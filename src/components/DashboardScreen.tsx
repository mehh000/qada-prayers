import React, { useState } from 'react';
import {
  Award,
  Calculator,
  Check,
  LogOut,
  Minus,
  Moon,
  Plus,
  RotateCcw,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
} from 'lucide-react';
import type { AppRoute, PrayerKey, QadaAppState } from '../types/qada';

interface DashboardScreenProps {
  state: QadaAppState;
  onLogPrayer: (prayer: PrayerKey, delta: 1 | -1) => void;
  onResetToday: () => void;
  onNavigate: (route: AppRoute) => void;
  onSignOut: () => void;
}

const PRAYERS: {
  key: PrayerKey;
  label: string;
  arabic: string;
  rakaat: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { key: 'fajr', label: 'Fajr', arabic: 'الفجر', rakaat: '2 Fardh', icon: Sunrise },
  { key: 'dhuhr', label: 'Dhuhr', arabic: 'الظهر', rakaat: '4 Fardh', icon: Sun },
  { key: 'asr', label: 'Asr', arabic: 'العصر', rakaat: '4 Fardh', icon: Sun },
  { key: 'maghrib', label: 'Maghrib', arabic: 'المغرب', rakaat: '3 Fardh', icon: Sunset },
  { key: 'isha', label: 'Isha', arabic: 'العشاء', rakaat: '4 Fardh', icon: Moon },
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  state,
  onLogPrayer,
  onResetToday,
  onNavigate,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState<'today' | 'milestones'>('today');

  const targetPerPrayer = state.pace === 'gentle' ? 1 : 2;
  const dailyGoal = targetPerPrayer * 5;
  const todayTotal =
    state.todayCompleted.fajr +
    state.todayCompleted.dhuhr +
    state.todayCompleted.asr +
    state.todayCompleted.maghrib +
    state.todayCompleted.isha;

  const remainingTotal =
    state.remaining.fajr +
    state.remaining.dhuhr +
    state.remaining.asr +
    state.remaining.maghrib +
    state.remaining.isha;

  const goalPct = Math.min(100, Math.round((todayTotal / dailyGoal) * 100));
  const firstName = state.user?.fullName?.split(' ')[0] || 'Believer';

  return (
    <div className="qada-bg-soft min-h-full flex flex-col justify-between">
      {/* Top AppBar */}
      <header className="bg-white border-b border-[#E5EFE9] px-4 h-[56px] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2E6A4E]" />
          <span className="font-serif-display text-[19px] font-medium text-[#113322]">
            Qada
          </span>
          <span className="font-arabic text-[16px] text-[#2E6A4E]" dir="rtl">
            قضاء
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onNavigate('estimator')}
            aria-label="Open Prayer Estimator"
            title="Prayer Estimator"
            className="w-9 h-9 rounded-full bg-[#F1F7F3] hover:bg-[#E1EFE6] text-[#193B29] flex items-center justify-center cursor-pointer transition-colors"
          >
            <Calculator className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onSignOut}
            aria-label="Sign Out"
            title="Sign Out"
            className="w-9 h-9 rounded-full bg-[#193B29] hover:bg-[#132E20] text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Scrollable Area */}
      <div className="flex-1 px-5 pt-4 pb-6 space-y-4">
        {/* Greeting + Daily Goal Card */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[#2E6A4E]">
              Assalamu Alaikum, {firstName}
            </p>
            <h1 className="font-serif-display text-[25px] leading-tight font-medium text-[#113322]">
              {activeTab === 'today' ? 'Today’s Sanctuary' : 'Spiritual Milestones'}
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[10.5px] text-[#5C6F65]">Remaining</p>
            <p className="text-[16px] font-bold tabular-nums text-[#193B29]">
              {remainingTotal.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Daily Journey Goal Card (matches Step 3 hero overlay style) */}
        <div className="bg-white rounded-[22px] p-4 shadow-[0_12px_28px_rgba(20,50,34,0.06)] space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  todayTotal >= dailyGoal
                    ? 'bg-[#193B29] text-white'
                    : 'bg-[#C7EED8] text-[#1C5537]'
                }`}
              >
                <Check className="w-5 h-5 stroke-[2.4]" />
              </div>
              <div>
                <p className="text-[11px] text-[#5B6E64]">Daily Journey Goal</p>
                <p className="text-[17px] font-bold text-[#122D1F] tabular-nums">
                  {todayTotal} of {dailyGoal} Fulfilled
                </p>
              </div>
            </div>

            <div className="bg-[#FDF1D6] text-[#B98730] px-3 py-1 rounded-full text-[11.5px] font-semibold whitespace-nowrap">
              {goalPct}% Niyyah
            </div>
          </div>

          <div className="h-2 w-full rounded-full bg-[#E5F2EA] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#193B29] transition-all duration-300"
              style={{ width: `${goalPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11.5px] text-[#5C6F65]">
            <span>
              Cadence:{' '}
              <strong className="text-[#193B29]">
                {state.pace === 'gentle' ? 'Gentle Pace (+1)' : 'Steady Devotion (+2)'}
              </strong>
            </span>
            {todayTotal > 0 && (
              <button
                type="button"
                onClick={onResetToday}
                className="inline-flex items-center gap-1 text-[#2E6A4E] hover:text-[#193B29] font-medium cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset day</span>
              </button>
            )}
          </div>
        </div>

        {activeTab === 'today' ? (
          /* 5 Daily Prayer Loggers */
          <div className="space-y-2.5">
            {PRAYERS.map(({ key, label, arabic, rakaat, icon: Icon }) => {
              const doneToday = state.todayCompleted[key];
              const left = state.remaining[key];
              const metGoal = doneToday >= targetPerPrayer;

              return (
                <div
                  key={key}
                  className="bg-white rounded-[18px] px-4 py-3 shadow-[0_6px_18px_rgba(20,50,34,0.045)] flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        metGoal
                          ? 'bg-[#193B29] text-white'
                          : 'bg-[#E6F4EC] text-[#2E6A4E]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[14.5px] font-semibold text-[#122D1F]">
                          {label}
                        </span>
                        <span className="font-arabic text-[13px] text-[#2E6A4E]" dir="rtl">
                          {arabic}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-[#5C6F65] tabular-nums">
                        {rakaat} • {left.toLocaleString()} left
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onLogPrayer(key, -1)}
                      disabled={doneToday <= 0}
                      aria-label={`Undo one ${label} prayer`}
                      className="w-8 h-8 rounded-full bg-[#F1F6F3] text-[#193B29] disabled:opacity-35 flex items-center justify-center hover:bg-[#E0EDE5] transition-colors cursor-pointer disabled:cursor-default"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-9 text-center text-[13px] font-bold tabular-nums text-[#113322]">
                      +{doneToday}
                    </span>

                    <button
                      type="button"
                      onClick={() => onLogPrayer(key, 1)}
                      disabled={left <= 0}
                      aria-label={`Log one ${label} Qada prayer`}
                      className="w-9 h-9 rounded-full bg-[#193B29] hover:bg-[#132E20] active:scale-95 text-white disabled:opacity-35 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Milestones View */
          <div className="space-y-3">
            <div className="bg-white rounded-[20px] p-4 shadow-[0_8px_22px_rgba(20,50,34,0.045)] grid grid-cols-2 gap-3">
              <div className="bg-[#F3FAF6] rounded-2xl p-3">
                <p className="text-[11px] text-[#5C6F65]">Lifetime Fulfilled</p>
                <p className="font-serif-display text-[24px] font-medium text-[#113322] tabular-nums mt-0.5">
                  {state.totalLoggedLifetime}
                </p>
              </div>
              <div className="bg-[#FDF8EC] rounded-2xl p-3">
                <p className="text-[11px] text-[#7D6633]">Mindful Streak</p>
                <p className="font-serif-display text-[24px] font-medium text-[#113322] tabular-nums mt-0.5">
                  {state.streakDays} days
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-4 shadow-[0_8px_22px_rgba(20,50,34,0.045)] space-y-3">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-[#122D1F]">
                <Award className="w-4 h-4 text-[#C8A75E]" />
                <span>Gentle Milestones</span>
              </div>
              {[
                {
                  title: 'Pure Intention (Niyyah)',
                  desc: 'Started your unhurried Qada plan',
                  unlocked: true,
                },
                {
                  title: 'First 5 Fulfilled',
                  desc: 'Completed a full day of Qada prayers',
                  unlocked: state.totalLoggedLifetime >= 5,
                },
                {
                  title: 'Steady Heart (50 Prayers)',
                  desc: 'Consistent devotion across daily slots',
                  unlocked: state.totalLoggedLifetime >= 50,
                },
              ].map((m) => (
                <div
                  key={m.title}
                  className="flex items-center justify-between gap-3 py-1.5 border-b border-[#F0F5F2] last:border-none"
                >
                  <div>
                    <p className="text-[13px] font-semibold text-[#122D1F]">{m.title}</p>
                    <p className="text-[11.5px] text-[#5C6F65]">{m.desc}</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10.5px] font-semibold ${
                      m.unlocked
                        ? 'bg-[#CBEEDB] text-[#17402B]'
                        : 'bg-[#F0F4F2] text-[#7C8E84]'
                    }`}
                  >
                    {m.unlocked ? 'Unlocked' : 'In Progress'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tab Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-t border-[#E5EFE9] px-4 h-[60px] grid grid-cols-3 items-center shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab('today')}
          className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold cursor-pointer ${
            activeTab === 'today' ? 'text-[#193B29]' : 'text-[#7B8E84]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Today</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('estimator')}
          className="flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-[#7B8E84] hover:text-[#193B29] cursor-pointer"
        >
          <Calculator className="w-4 h-4" />
          <span>Estimator</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('milestones')}
          className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold cursor-pointer ${
            activeTab === 'milestones' ? 'text-[#193B29]' : 'text-[#7B8E84]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Milestones</span>
        </button>
      </nav>
    </div>
  );
};
