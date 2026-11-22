import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';
import '../models/qada_state.dart';
import '../theme/qada_theme.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key, required this.state});
  final QadaState state;

  @override
  Widget build(BuildContext context) {
    final dailyGoal = state.dailyGoal;
    final todayTotal = state.todayTotal;
    final progress = (todayTotal / dailyGoal).clamp(0.0, 1.0);
    final pct = (progress * 100).round();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        automaticallyImplyLeading: false,
        title: Row(
          children: [
            Text(
              'Qada',
              style: GoogleFonts.lora(
                fontSize: 20,
                fontWeight: FontWeight.w600,
                color: QadaColors.forestDark,
              ),
            ),
            const SizedBox(width: 8),
            Text(
              'قضاء',
              textDirection: TextDirection.rtl,
              style: GoogleFonts.amiri(
                fontSize: 18,
                color: QadaColors.emerald,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            tooltip: 'Estimator',
            icon: const Icon(Icons.calculate_outlined, color: QadaColors.forestDeep),
            onPressed: () => Navigator.pushNamed(context, QadaRoutes.estimator),
          ),
          IconButton(
            tooltip: 'Sign Out',
            icon: const Icon(Icons.logout, color: QadaColors.forestDeep),
            onPressed: () {
              state.signOut();
              Navigator.pushReplacementNamed(context, QadaRoutes.signIn);
            },
          ),
        ],
      ),
      body: Container(
        decoration: const BoxDecoration(gradient: QadaTheme.backgroundGradient),
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'ASSALAMU ALAIKUM, ${state.fullName.split(' ').first.toUpperCase()}',
                      style: const TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 1.1,
                        color: QadaColors.emerald,
                      ),
                    ),
                    Text(
                      "Today's Sanctuary",
                      style: GoogleFonts.lora(
                        fontSize: 25,
                        fontWeight: FontWeight.w500,
                        color: QadaColors.forestDark,
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    const Text(
                      'Remaining',
                      style: TextStyle(fontSize: 11, color: QadaColors.textMuted),
                    ),
                    Text(
                      '${state.remainingTotal}',
                      style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w700,
                        color: QadaColors.forestDeep,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(22),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          CircleAvatar(
                            radius: 20,
                            backgroundColor: todayTotal >= dailyGoal
                                ? QadaColors.forestDeep
                                : QadaColors.mintSoft,
                            child: Icon(
                              Icons.check,
                              color: todayTotal >= dailyGoal
                                  ? Colors.white
                                  : QadaColors.forestDeep,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Daily Journey Goal',
                                style: TextStyle(
                                  fontSize: 11.5,
                                  color: QadaColors.textMuted,
                                ),
                              ),
                              Text(
                                '$todayTotal of $dailyGoal Fulfilled',
                                style: const TextStyle(
                                  fontSize: 17,
                                  fontWeight: FontWeight.w700,
                                  color: QadaColors.forestDark,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 10,
                          vertical: 5,
                        ),
                        decoration: BoxDecoration(
                          color: QadaColors.goldSoft,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          '$pct% Niyyah',
                          style: const TextStyle(
                            fontSize: 11.5,
                            fontWeight: FontWeight.w600,
                            color: QadaColors.goldDark,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(6),
                    child: LinearProgressIndicator(
                      value: progress,
                      minHeight: 7,
                      backgroundColor: const Color(0xFFE5F2EA),
                      color: QadaColors.forestDeep,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),
            ...PrayerType.values.map((prayer) {
              final done = state.todayCompleted[prayer] ?? 0;
              final left = state.remaining[prayer] ?? 0;
              return Container(
                margin: const EdgeInsets.only(bottom: 10),
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              prayer.label,
                              style: const TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.w600,
                                color: QadaColors.textPrimary,
                              ),
                            ),
                            const SizedBox(width: 6),
                            Text(
                              prayer.arabic,
                              textDirection: TextDirection.rtl,
                              style: GoogleFonts.amiri(
                                fontSize: 14,
                                color: QadaColors.emerald,
                              ),
                            ),
                          ],
                        ),
                        Text(
                          '${prayer.rakaat} • $left left',
                          style: const TextStyle(
                            fontSize: 12,
                            color: QadaColors.textMuted,
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        IconButton(
                          onPressed: done > 0 ? () => state.logPrayer(prayer, -1) : null,
                          icon: const Icon(Icons.remove_circle_outline),
                        ),
                        Text(
                          '+$done',
                          style: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w700,
                            color: QadaColors.forestDark,
                          ),
                        ),
                        IconButton(
                          onPressed: left > 0 ? () => state.logPrayer(prayer, 1) : null,
                          icon: const Icon(Icons.add_circle, color: QadaColors.forestDeep),
                        ),
                      ],
                    ),
                  ],
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
