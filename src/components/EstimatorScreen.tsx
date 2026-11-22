import React, { useMemo } from 'react';
import { ArrowLeft, ArrowRight, Calculator, Calendar, Check, Minus, Plus } from 'lucide-react';
import type { AppRoute, EstimatorSettings, PaceMode, PrayerCounts } from '../types/qada';

interface EstimatorScreenProps {
  estimator: EstimatorSettings;
  pace: PaceMode;
  onUpdateEstimator: (patch: Partial<EstimatorSettings>) => void;
  onSelectPace: (pace: PaceMode) => void;
  onApplyPlan: (estimator: EstimatorSettings) => void;
  onBack: () => void;
  onNavigate: (route: AppRoute) => void;
  computeCounts: (est: EstimatorSettings) => PrayerCounts;
}

export const EstimatorScreen: React.FC<EstimatorScreenProps> = ({
  estimator,
  pace,
  onUpdateEstimator,
  onSelectPace,
  onApplyPlan,
  onBack,
  onNavigate,
  computeCounts,
}) => {
  const previewCounts = useMemo(() => computeCounts(estimator), [computeCounts, estimator]);
  const totalPrayers =
    previewCounts.fajr +
    previewCounts.dhuhr +
    previewCounts.asr +
    previewCounts.maghrib +
    previewCounts.isha;

  const dailyExtra = pace === 'gentle' ? 5 : 10;
  const estimatedDays = Math.ceil(totalPrayers / dailyExtra);
  const estimatedMonths = Math.max(1, Math.round(estimatedDays / 30));

  const handleSave = () => {
    onApplyPlan(estimator);
    onNavigate('dashboard');
  };

  return (
    <div className="qada-bg-soft min-h-full flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-[#E5EFE9] px-4 h-[56px] flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#1B4A32] hover:bg-[#F1F7F3] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#2E6A4E]" />
          <span className="text-[16px] font-semibold text-[#113322]">Qada Estimator</span>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="text-[12.5px] font-semibold text-[#2E6A4E] hover:text-[#193B29] cursor-pointer"
        >
          Tracker
        </button>
      </header>

      <div className="flex-1 px-5 pt-5 pb-7 space-y-4">
        <div>
          <p className="font-arabic text-[16px] text-[#C6A75F]" dir="rtl">
            حساب الصلوات الفائتة
          </p>
          <h1 className="font-serif-display text-[25px] leading-tight font-medium text-[#113322] mt-0.5">
            Personal Prayer Estimate
          </h1>
          <p className="text-[13px] text-[#53665C] mt-1">
            Adjust your years missed and exemptions to build your calm daily plan.
          </p>
        </div>

        {/* Years Missed & Ages Card */}
        <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_28px_rgba(20,50,34,0.055)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-[#122D1F]">Years to Make Up</p>
              <p className="text-[11.5px] text-[#5C6F65]">
                Accountability from age {estimator.pubertyAge}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onUpdateEstimator({ yearsMissed: Math.max(0.5, estimator.yearsMissed - 0.5) })
                }
                aria-label="Decrease years"
                className="w-9 h-9 rounded-full bg-[#EFF5F1] hover:bg-[#DFECE5] text-[#193B29] flex items-center justify-center cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-14 text-center text-[16px] font-bold tabular-nums text-[#113322]">
                {estimator.yearsMissed}y
              </span>
              <button
                type="button"
                onClick={() =>
                  onUpdateEstimator({ yearsMissed: Math.min(40, estimator.yearsMissed + 0.5) })
                }
                aria-label="Increase years"
                className="w-9 h-9 rounded-full bg-[#193B29] hover:bg-[#132E20] text-white flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="border-t border-[#EDF3EF] pt-3.5 flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-[#122D1F]">
                Monthly Pardoned Days
              </p>
              <p className="text-[11.5px] text-[#5C6F65]">
                Exemptions excluded from total
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onUpdateEstimator({
                    exemptDaysPerMonth: Math.max(0, estimator.exemptDaysPerMonth - 1),
                  })
                }
                aria-label="Decrease pardoned days"
                className="w-9 h-9 rounded-full bg-[#EFF5F1] hover:bg-[#DFECE5] text-[#193B29] flex items-center justify-center cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-14 text-center text-[15px] font-bold tabular-nums text-[#113322]">
                {estimator.exemptDaysPerMonth}d
              </span>
              <button
                type="button"
                onClick={() =>
                  onUpdateEstimator({
                    exemptDaysPerMonth: Math.min(15, estimator.exemptDaysPerMonth + 1),
                  })
                }
                aria-label="Increase pardoned days"
                className="w-9 h-9 rounded-full bg-[#EFF5F1] hover:bg-[#DFECE5] text-[#193B29] flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="border-t border-[#EDF3EF] pt-3.5 flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-[#122D1F]">
                Travel &amp; Illness Buffer
              </p>
              <p className="text-[11.5px] text-[#5C6F65]">
                Deduct {estimator.bufferDays} shortened/exempt days
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onUpdateEstimator({
                  includeTravelIllnessBuffer: !estimator.includeTravelIllnessBuffer,
                })
              }
              aria-label="Toggle travel and illness buffer"
              className={`w-6 h-6 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                estimator.includeTravelIllnessBuffer
                  ? 'bg-[#193B29] text-white'
                  : 'bg-[#F2F5FA] border border-[#C7D3CC] text-transparent'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[2.6]" />
            </button>
          </div>
        </div>

        {/* Cadence Toggle */}
        <div className="bg-white rounded-[20px] p-3.5 shadow-[0_8px_22px_rgba(20,50,34,0.045)]">
          <p className="text-[11.5px] font-bold tracking-[0.08em] uppercase text-[#2E6A4E] mb-2">
            Daily Cadence
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSelectPace('gentle')}
              className={`rounded-xl py-2.5 px-3 text-left transition-all cursor-pointer border ${
                pace === 'gentle'
                  ? 'bg-[#EEF8F2] border-[#193B29] text-[#113322]'
                  : 'bg-[#F6F9F7] border-transparent text-[#52655B]'
              }`}
            >
              <p className="text-[13px] font-semibold">Gentle Pace</p>
              <p className="text-[11px] opacity-80">+1 / prayer (5/day)</p>
            </button>
            <button
              type="button"
              onClick={() => onSelectPace('steady')}
              className={`rounded-xl py-2.5 px-3 text-left transition-all cursor-pointer border ${
                pace === 'steady'
                  ? 'bg-[#EEF8F2] border-[#193B29] text-[#113322]'
                  : 'bg-[#F6F9F7] border-transparent text-[#52655B]'
              }`}
            >
              <p className="text-[13px] font-semibold">Steady Devotion</p>
              <p className="text-[11px] opacity-80">+2 / prayer (10/day)</p>
            </button>
          </div>
        </div>

        {/* Breakdown Summary */}
        <div className="bg-[#193B29] text-white rounded-[22px] p-4 shadow-[0_12px_28px_rgba(25,59,41,0.2)] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#A8D5BA]">
                Estimated Total
              </p>
              <p className="font-serif-display text-[28px] font-medium tabular-nums leading-tight">
                {totalPrayers.toLocaleString()} prayers
              </p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 bg-white/12 rounded-full px-3 py-1 text-[11.5px] font-medium text-[#FDF1D6]">
                <Calendar className="w-3.5 h-3.5" />
                <span>~{estimatedMonths} mo</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1.5 pt-2 border-t border-white/12 text-center">
            {(
              [
                ['Fajr', previewCounts.fajr],
                ['Dhuhr', previewCounts.dhuhr],
                ['Asr', previewCounts.asr],
                ['Maghrib', previewCounts.maghrib],
                ['Isha', previewCounts.isha],
              ] as const
            ).map(([label, count]) => (
              <div key={label} className="bg-white/8 rounded-xl py-1.5 px-1">
                <p className="text-[10px] text-[#B7DFC7]">{label}</p>
                <p className="text-[12.5px] font-bold tabular-nums mt-0.5">{count}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="w-full h-[52px] rounded-full bg-[#193B29] hover:bg-[#132E20] active:scale-[0.985] transition-all text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(25,59,41,0.22)] cursor-pointer"
        >
          <span>Save Plan &amp; Open Tracker</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
