export type AppRoute =
  | 'splash'
  | 'onboarding-1'
  | 'onboarding-2'
  | 'onboarding-3'
  | 'sign-up'
  | 'sign-in'
  | 'estimator'
  | 'dashboard';

export type PaceMode = 'gentle' | 'steady';

export type PrayerKey = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerCounts {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
}

export interface EstimatorSettings {
  pubertyAge: number;
  currentAge: number;
  yearsMissed: number;
  exemptDaysPerMonth: number;
  includeTravelIllnessBuffer: boolean;
  bufferDays: number;
}

export interface UserProfile {
  fullName: string;
  email: string;
  signedIn: boolean;
}

export interface QadaAppState {
  user: UserProfile | null;
  pace: PaceMode;
  estimator: EstimatorSettings;
  remaining: PrayerCounts;
  todayCompleted: PrayerCounts;
  streakDays: number;
  totalLoggedLifetime: number;
  hasConfiguredPlan: boolean;
}
