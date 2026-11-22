import 'package:flutter/foundation.dart';

enum PaceMode { gentle, steady }

enum PrayerType {
  fajr('Fajr', 'الفجر', '2 Fardh'),
  dhuhr('Dhuhr', 'الظهر', '4 Fardh'),
  asr('Asr', 'العصر', '4 Fardh'),
  maghrib('Maghrib', 'المغرب', '3 Fardh'),
  isha('Isha', 'العشاء', '4 Fardh');

  const PrayerType(this.label, this.arabic, this.rakaat);
  final String label;
  final String arabic;
  final String rakaat;
}

class QadaState extends ChangeNotifier {
  String fullName = 'Tariq Ahmad';
  String email = '';
  bool signedIn = false;

  PaceMode pace = PaceMode.gentle;
  double yearsMissed = 2.0;
  int exemptDaysPerMonth = 0;
  bool includeBuffer = true;
  int bufferDays = 14;

  final Map<PrayerType, int> remaining = {
    for (final p in PrayerType.values) p: 716,
  };

  final Map<PrayerType, int> todayCompleted = {
    for (final p in PrayerType.values) p: 0,
  };

  int totalLoggedLifetime = 15;
  int streakDays = 3;

  int get perPrayerTarget => pace == PaceMode.gentle ? 1 : 2;
  int get dailyGoal => perPrayerTarget * 5;

  int get todayTotal =>
      todayCompleted.values.fold(0, (sum, count) => sum + count);

  int get remainingTotal =>
      remaining.values.fold(0, (sum, count) => sum + count);

  void selectPace(PaceMode next) {
    pace = next;
    notifyListeners();
  }

  void updateEstimator({
    double? years,
    int? exemptPerMonth,
    bool? useBuffer,
  }) {
    if (years != null) yearsMissed = years.clamp(0.5, 40.0);
    if (exemptPerMonth != null) {
      exemptDaysPerMonth = exemptPerMonth.clamp(0, 15);
    }
    if (useBuffer != null) includeBuffer = useBuffer;
    notifyListeners();
  }

  int computeEstimatedPerPrayer() {
    final effectiveDaysPerYear = (365 - exemptDaysPerMonth * 12).clamp(0, 365);
    final raw = (yearsMissed * effectiveDaysPerYear).round();
    final adjusted = raw - (includeBuffer ? bufferDays : 0);
    return adjusted < 0 ? 0 : adjusted;
  }

  void applyEstimatorPlan() {
    final perPrayer = computeEstimatedPerPrayer();
    for (final prayer in PrayerType.values) {
      remaining[prayer] = perPrayer;
    }
    notifyListeners();
  }

  void signUp({required String name, required String userEmail}) {
    fullName = name.trim().isEmpty ? 'Tariq Ahmad' : name.trim();
    email = userEmail.trim();
    signedIn = true;
    notifyListeners();
  }

  void signIn({required String userEmail}) {
    email = userEmail.trim();
    signedIn = true;
    notifyListeners();
  }

  void signOut() {
    signedIn = false;
    notifyListeners();
  }

  void logPrayer(PrayerType prayer, int delta) {
    final left = remaining[prayer] ?? 0;
    final done = todayCompleted[prayer] ?? 0;
    if (delta > 0 && left <= 0) return;
    if (delta < 0 && done <= 0) return;

    remaining[prayer] = (left - delta).clamp(0, 999999);
    todayCompleted[prayer] = (done + delta).clamp(0, 999);
    totalLoggedLifetime = (totalLoggedLifetime + delta).clamp(0, 999999);
    notifyListeners();
  }
}
