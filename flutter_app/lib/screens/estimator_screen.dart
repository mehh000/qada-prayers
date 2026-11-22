import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';
import '../models/qada_state.dart';
import '../theme/qada_theme.dart';

class EstimatorScreen extends StatelessWidget {
  const EstimatorScreen({super.key, required this.state});
  final QadaState state;

  @override
  Widget build(BuildContext context) {
    final perPrayer = state.computeEstimatedPerPrayer();
    final total = perPrayer * 5;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: QadaColors.forestDeep),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Qada Estimator',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: QadaColors.forestDark,
          ),
        ),
        centerTitle: true,
      ),
      body: Container(
        decoration: const BoxDecoration(gradient: QadaTheme.backgroundGradient),
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Text(
              'حساب الصلوات الفائتة',
              textDirection: TextDirection.rtl,
              style: GoogleFonts.amiri(fontSize: 18, color: QadaColors.gold),
            ),
            Text(
              'Personal Prayer Estimate',
              style: GoogleFonts.lora(
                fontSize: 25,
                fontWeight: FontWeight.w500,
                color: QadaColors.forestDark,
              ),
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
                  _StepperRow(
                    title: 'Years to Make Up',
                    subtitle: 'Accountability period',
                    value: '${state.yearsMissed}y',
                    onMinus: () =>
                        state.updateEstimator(years: state.yearsMissed - 0.5),
                    onPlus: () =>
                        state.updateEstimator(years: state.yearsMissed + 0.5),
                  ),
                  const Divider(height: 24),
                  _StepperRow(
                    title: 'Monthly Pardoned Days',
                    subtitle: 'Exemptions excluded',
                    value: '${state.exemptDaysPerMonth}d',
                    onMinus: () => state.updateEstimator(
                      exemptPerMonth: state.exemptDaysPerMonth - 1,
                    ),
                    onPlus: () => state.updateEstimator(
                      exemptPerMonth: state.exemptDaysPerMonth + 1,
                    ),
                  ),
                  const Divider(height: 24),
                  SwitchListTile(
                    contentPadding: EdgeInsets.zero,
                    title: const Text(
                      'Travel & Illness Buffer',
                      style: TextStyle(
                        fontSize: 13.5,
                        fontWeight: FontWeight.w600,
                        color: QadaColors.textPrimary,
                      ),
                    ),
                    subtitle: Text(
                      'Deduct ${state.bufferDays} shortened/exempt days',
                      style: const TextStyle(
                        fontSize: 12,
                        color: QadaColors.textSecondary,
                      ),
                    ),
                    value: state.includeBuffer,
                    activeColor: QadaColors.forestDeep,
                    onChanged: (val) => state.updateEstimator(useBuffer: val),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: QadaColors.forestDeep,
                borderRadius: BorderRadius.circular(22),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'ESTIMATED TOTAL',
                    style: TextStyle(
                      fontSize: 11,
                      letterSpacing: 1.2,
                      color: Color(0xFFA8D5BA),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '$total prayers',
                    style: GoogleFonts.lora(
                      fontSize: 28,
                      fontWeight: FontWeight.w500,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    '$perPrayer per prayer across Fajr, Dhuhr, Asr, Maghrib & Isha',
                    style: const TextStyle(
                      fontSize: 12.5,
                      color: Color(0xFFD3EFE0),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              height: 52,
              child: ElevatedButton(
                onPressed: () {
                  state.applyEstimatorPlan();
                  Navigator.pushReplacementNamed(context, QadaRoutes.dashboard);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: QadaColors.forestDeep,
                  foregroundColor: Colors.white,
                  shape: const StadiumBorder(),
                ),
                child: const Text(
                  'Save Plan & Open Tracker →',
                  style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StepperRow extends StatelessWidget {
  const _StepperRow({
    required this.title,
    required this.subtitle,
    required this.value,
    required this.onMinus,
    required this.onPlus,
  });

  final String title;
  final String subtitle;
  final String value;
  final VoidCallback onMinus;
  final VoidCallback onPlus;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontSize: 13.5,
                fontWeight: FontWeight.w600,
                color: QadaColors.textPrimary,
              ),
            ),
            Text(
              subtitle,
              style: const TextStyle(fontSize: 11.5, color: QadaColors.textMuted),
            ),
          ],
        ),
        Row(
          children: [
            IconButton(onPressed: onMinus, icon: const Icon(Icons.remove_circle_outline)),
            Text(
              value,
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w700,
                color: QadaColors.forestDark,
              ),
            ),
            IconButton(
              onPressed: onPlus,
              icon: const Icon(Icons.add_circle, color: QadaColors.forestDeep),
            ),
          ],
        ),
      ],
    );
  }
}
