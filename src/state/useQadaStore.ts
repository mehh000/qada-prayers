import { useCallback, useEffect, useState } from 'react';
import type {
  AppRoute,
  EstimatorSettings,
  PaceMode,
  PrayerCounts,
  PrayerKey,
  QadaAppState,
} from '../types/qada';

const STORAGE_KEY = 'qada_tracker_state_v1';

const DEFAULT_ESTIMATOR: EstimatorSettings = {
  pubertyAge: 14,
  currentAge: 24,
  yearsMissed: 2,
  exemptDaysPerMonth: 0,
  includeTravelIllnessBuffer: true,
  bufferDays: 14,
};

function computePrayersFromEstimator(est: EstimatorSettings): PrayerCounts {
  const effectiveDaysPerYear = Math.max(0, 365 - est.exemptDaysPerMonth * 12);
  const rawDays = Math.round(est.yearsMissed * effectiveDaysPerYear);
  const totalDays = Math.max(0, rawDays - (est.includeTravelIllnessBuffer ? est.bufferDays : 0));
  return {
    fajr: totalDays,
    dhuhr: totalDays,
    asr: totalDays,
    maghrib: totalDays,
    isha: totalDays,
  };
}

const DEFAULT_STATE: QadaAppState = {
  user: null,
  pace: 'gentle',
  estimator: DEFAULT_ESTIMATOR,
  remaining: computePrayersFromEstimator(DEFAULT_ESTIMATOR),
  todayCompleted: {
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
  },
  streakDays: 3,
  totalLoggedLifetime: 15,
  hasConfiguredPlan: false,
};

function loadInitialState(): QadaAppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<QadaAppState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      estimator: { ...DEFAULT_ESTIMATOR, ...(parsed.estimator ?? {}) },
      remaining: { ...DEFAULT_STATE.remaining, ...(parsed.remaining ?? {}) },
      todayCompleted: { ...DEFAULT_STATE.todayCompleted, ...(parsed.todayCompleted ?? {}) },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useQadaStore() {
  const [state, setState] = useState<QadaAppState>(loadInitialState);
  const [routeStack, setRouteStack] = useState<AppRoute[]>(['splash']);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota issues
    }
  }, [state]);

  const currentRoute = routeStack[routeStack.length - 1];

  const navigate = useCallback((next: AppRoute) => {
    setRouteStack((prev) => {
      if (prev[prev.length - 1] === next) return prev;
      return [...prev, next];
    });
  }, []);

  const replaceRoute = useCallback((next: AppRoute) => {
    setRouteStack([next]);
  }, []);

  const goBack = useCallback((fallback: AppRoute = 'splash') => {
    setRouteStack((prev) => {
      if (prev.length <= 1) return [fallback];
      return prev.slice(0, -1);
    });
  }, []);

  const setPace = useCallback((pace: PaceMode) => {
    setState((prev) => ({ ...prev, pace }));
  }, []);

  const updateEstimator = useCallback((patch: Partial<EstimatorSettings>) => {
    setState((prev) => {
      const nextEstimator = { ...prev.estimator, ...patch };
      return {
        ...prev,
        estimator: nextEstimator,
      };
    });
  }, []);

  const applyEstimatorPlan = useCallback((estimator: EstimatorSettings) => {
    const counts = computePrayersFromEstimator(estimator);
    setState((prev) => ({
      ...prev,
      estimator,
      remaining: counts,
      hasConfiguredPlan: true,
    }));
  }, []);

  const signUp = useCallback((fullName: string, email: string) => {
    setState((prev) => ({
      ...prev,
      user: {
        fullName: fullName.trim() || 'Tariq Ahmad',
        email: email.trim(),
        signedIn: true,
      },
    }));
  }, []);

  const signIn = useCallback((email: string) => {
    setState((prev) => {
      const derivedName =
        prev.user?.fullName ||
        email
          .split('@')[0]
          .replace(/[._-]+/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()) ||
        'Believer';
      return {
        ...prev,
        user: {
          fullName: derivedName,
          email: email.trim() || prev.user?.email || 'user@example.com',
          signedIn: true,
        },
      };
    });
  }, []);

  const signOut = useCallback(() => {
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, signedIn: false } : null,
    }));
    setRouteStack(['sign-in']);
  }, []);

  const logPrayer = useCallback((prayer: PrayerKey, delta: 1 | -1) => {
    setState((prev) => {
      const currentRemaining = prev.remaining[prayer];
      const currentToday = prev.todayCompleted[prayer];

      if (delta === 1 && currentRemaining <= 0) return prev;
      if (delta === -1 && currentToday <= 0) return prev;

      return {
        ...prev,
        remaining: {
          ...prev.remaining,
          [prayer]: Math.max(0, currentRemaining - delta),
        },
        todayCompleted: {
          ...prev.todayCompleted,
          [prayer]: Math.max(0, currentToday + delta),
        },
        totalLoggedLifetime: Math.max(0, prev.totalLoggedLifetime + delta),
      };
    });
  }, []);

  const resetToday = useCallback(() => {
    setState((prev) => ({
      ...prev,
      todayCompleted: {
        fajr: 0,
        dhuhr: 0,
        asr: 0,
        maghrib: 0,
        isha: 0,
      },
    }));
  }, []);

  return {
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
  };
}
