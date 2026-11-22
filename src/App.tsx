import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { DashboardScreen } from './components/DashboardScreen';
import { EstimatorScreen } from './components/EstimatorScreen';
import { OnboardingStep1 } from './components/OnboardingStep1';
import { OnboardingStep2 } from './components/OnboardingStep2';
import { OnboardingStep3 } from './components/OnboardingStep3';
import { SignInScreen } from './components/SignInScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { SplashScreen } from './components/SplashScreen';
import { useQadaStore } from './state/useQadaStore';
import type { AppRoute } from './types/qada';

const ROUTE_LIST: { route: AppRoute; title: string; subtitle: string }[] = [
  { route: 'splash', title: 'Splash Screen', subtitle: 'Sacred Intention & Reflection' },
  { route: 'onboarding-1', title: 'Step 1 · Estimate', subtitle: 'Calculate missed prayers' },
  { route: 'onboarding-2', title: 'Step 2 · Cadence', subtitle: 'Build sustainable pace' },
  { route: 'onboarding-3', title: 'Step 3 · Milestones', subtitle: 'Track progress & auth' },
  { route: 'sign-up', title: 'Create Account', subtitle: 'Passphrase strength & privacy' },
  { route: 'sign-in', title: 'Welcome Back', subtitle: 'Encrypted sign in' },
  { route: 'estimator', title: 'Qada Estimator', subtitle: 'Interactive prayer calculator' },
  { route: 'dashboard', title: 'Daily Tracker', subtitle: 'Log fulfilled Qada prayers' },
];

export default function App() {
  const {
    state,
    currentRoute,
    navigate,
    replaceRoute,
    goBack,
    setPace,
    updateEstimator,
    applyEstimatorPlan,
    signUp,
    signIn,
    signOut,
    logPrayer,
    resetToday,
    computePrayersFromEstimator,
  } = useQadaStore();

  const renderScreen = () => {
    switch (currentRoute) {
      case 'splash':
        return <SplashScreen onNavigate={navigate} />;
      case 'onboarding-1':
        return <OnboardingStep1 onNavigate={navigate} />;
      case 'onboarding-2':
        return (
          <OnboardingStep2
            pace={state.pace}
            onSelectPace={setPace}
            onNavigate={navigate}
            onBack={() => goBack('onboarding-1')}
          />
        );
      case 'onboarding-3':
        return (
          <OnboardingStep3
            onNavigate={navigate}
            onBack={() => goBack('onboarding-2')}
          />
        );
      case 'sign-up':
        return (
          <SignUpScreen
            onBack={() => goBack('onboarding-3')}
            onNavigate={navigate}
            onSignUp={signUp}
          />
        );
      case 'sign-in':
        return (
          <SignInScreen
            onBack={() => goBack('splash')}
            onNavigate={navigate}
            onSignIn={signIn}
            defaultEmail={state.user?.email ?? ''}
          />
        );
      case 'estimator':
        return (
          <EstimatorScreen
            estimator={state.estimator}
            pace={state.pace}
            onUpdateEstimator={updateEstimator}
            onSelectPace={setPace}
            onApplyPlan={applyEstimatorPlan}
            onBack={() => goBack('sign-up')}
            onNavigate={navigate}
            computeCounts={computePrayersFromEstimator}
          />
        );
      case 'dashboard':
        return (
          <DashboardScreen
            state={state}
            onLogPrayer={logPrayer}
            onResetToday={resetToday}
            onNavigate={navigate}
            onSignOut={signOut}
          />
        );
      default:
        return <SplashScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#E5EFE9] lg:py-8 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-[1120px] lg:grid lg:grid-cols-[1fr_402px] lg:gap-10 items-center">
        {/* Desktop Navigation & Flow Companion Panel (hidden on mobile so mobile stays 100% pure screen) */}
        <aside className="hidden lg:flex flex-col justify-between bg-white/75 backdrop-blur-md border border-[#D4E4DA] rounded-[28px] p-7 shadow-[0_18px_48px_rgba(20,50,34,0.06)]">
          <div>
            <div className="flex items-baseline gap-2.5">
              <h2 className="font-serif-display text-[32px] font-medium text-[#113322]">
                Qada
              </h2>
              <span className="font-arabic text-[22px] text-[#2E6A4E]" dir="rtl">
                قضاء
              </span>
            </div>
            <p className="text-[14px] text-[#4E6157] mt-1 leading-relaxed">
              Interactive screen flow and live prayer tracker. Navigate naturally inside the app or
              jump directly to any screen below.
            </p>

            <div className="grid grid-cols-2 gap-2.5 mt-6">
              {ROUTE_LIST.map((item, idx) => {
                const active = currentRoute === item.route;
                return (
                  <button
                    key={item.route}
                    type="button"
                    onClick={() => replaceRoute(item.route)}
                    className={`text-left rounded-2xl px-4 py-3 transition-all cursor-pointer border ${
                      active
                        ? 'bg-[#193B29] text-white border-[#193B29] shadow-[0_8px_20px_rgba(25,59,41,0.18)]'
                        : 'bg-white/90 hover:bg-white text-[#122D1F] border-[#E0ECE5]'
                    }`}
                  >
                    <p
                      className={`text-[11px] font-semibold tracking-wide ${
                        active ? 'text-[#A6D7BA]' : 'text-[#2E6A4E]'
                      }`}
                    >
                      0{idx + 1}. {item.title}
                    </p>
                    <p
                      className={`text-[12px] mt-0.5 truncate ${
                        active ? 'text-white/85' : 'text-[#5C6F65]'
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-[#DFECE4] flex items-center justify-between text-[12.5px] text-[#4E6157]">
            <span>
              Selected Cadence:{' '}
              <strong className="text-[#113322]">
                {state.pace === 'gentle' ? 'Gentle Pace (+1/prayer)' : 'Steady Devotion (+2/prayer)'}
              </strong>
            </span>
            <span className="tabular-nums font-semibold text-[#2E6A4E]">
              {(
                state.remaining.fajr +
                state.remaining.dhuhr +
                state.remaining.asr +
                state.remaining.maghrib +
                state.remaining.isha
              ).toLocaleString()}{' '}
              remaining
            </span>
          </div>
        </aside>

        {/* App Viewport (Matches Shared Mobile Screens 1:1) */}
        <main className="w-full min-h-screen lg:min-h-0 lg:h-[844px] lg:max-h-[90vh] lg:w-[402px] mx-auto bg-[#F6FBF8] lg:rounded-[34px] lg:shadow-[0_24px_64px_rgba(18,45,31,0.16)] lg:border lg:border-white overflow-y-auto overflow-x-hidden qada-scrollbar-hide relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentRoute}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-full flex flex-col"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
