import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';
import '../models/qada_state.dart';
import '../theme/qada_theme.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({
    super.key,
    required this.initialStep,
    required this.state,
  });

  final int initialStep;
  final QadaState state;

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  late final PageController _controller;
  late int _step;

  @override
  void initState() {
    super.initState();
    _step = widget.initialStep;
    _controller = PageController(initialPage: widget.initialStep);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _goToStep(int index) {
    setState(() => _step = index);
    _controller.animateToPage(
      index,
      duration: const Duration(milliseconds: 260),
      curve: Curves.easeOutCubic,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(gradient: QadaTheme.backgroundGradient),
        child: SafeArea(
          child: Column(
            children: [
              Expanded(
                child: PageView(
                  controller: _controller,
                  onPageChanged: (index) => setState(() => _step = index),
                  children: [
                    _StepOneView(
                      step: _step,
                      onSelectStep: _goToStep,
                      onNext: () => _goToStep(1),
                      onSkip: () => Navigator.pushNamed(context, QadaRoutes.signUp),
                    ),
                    _StepTwoView(
                      state: widget.state,
                      step: _step,
                      onSelectStep: _goToStep,
                      onBack: () => _goToStep(0),
                      onNext: () => _goToStep(2),
                      onSkip: () => Navigator.pushNamed(context, QadaRoutes.signUp),
                    ),
                    _StepThreeView(
                      step: _step,
                      onSelectStep: _goToStep,
                      onBack: () => _goToStep(1),
                      onSignUp: () => Navigator.pushNamed(context, QadaRoutes.signUp),
                      onSignIn: () => Navigator.pushNamed(context, QadaRoutes.signIn),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _StepDots extends StatelessWidget {
  const _StepDots({required this.current, required this.onSelect});
  final int current;
  final ValueChanged<int> onSelect;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(3, (idx) {
        final active = current == idx;
        return GestureDetector(
          onTap: () => onSelect(idx),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            margin: const EdgeInsets.symmetric(horizontal: 4),
            width: active ? 28 : 8,
            height: 6,
            decoration: BoxDecoration(
              color: active ? QadaColors.forestDeep : const Color(0xFFBDCAC3),
              borderRadius: BorderRadius.circular(6),
            ),
          ),
        );
      }),
    );
  }
}

class _StepOneView extends StatelessWidget {
  const _StepOneView({
    required this.step,
    required this.onSelectStep,
    required this.onNext,
    required this.onSkip,
  });

  final int step;
  final ValueChanged<int> onSelectStep;
  final VoidCallback onNext;
  final VoidCallback onSkip;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(30),
                  border: Border.all(color: QadaColors.borderSoft),
                ),
                child: const Row(
                  children: [
                    CircleAvatar(
                      radius: 3.5,
                      backgroundColor: QadaColors.forestDeep,
                    ),
                    SizedBox(width: 8),
                    Text(
                      'Step 1 of 3',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: QadaColors.forestDeep,
                      ),
                    ),
                  ],
                ),
              ),
              TextButton(
                onPressed: onSkip,
                child: const Text(
                  'Skip',
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: QadaColors.emerald,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            height: 208,
            width: double.infinity,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(26),
              boxShadow: [
                BoxShadow(
                  color: QadaColors.forestDeep.withValues(alpha: 0.05),
                  blurRadius: 28,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: CustomPaint(painter: _ArchIllustrationPainter()),
          ),
          const SizedBox(height: 18),
          Text(
            'حساب الصلوات الفائتة',
            textDirection: TextDirection.rtl,
            style: GoogleFonts.amiri(fontSize: 18, color: QadaColors.gold),
          ),
          const SizedBox(height: 4),
          Text(
            'Estimate With Peace of Mind',
            textAlign: TextAlign.center,
            style: GoogleFonts.lora(
              fontSize: 26,
              fontWeight: FontWeight.w500,
              color: QadaColors.forestDark,
            ),
          ),
          const SizedBox(height: 10),
          const Text(
            'Uncover exactly where you stand without overwhelm. Enter your age of accountability and missed periods to automatically estimate your lifetime prayer total in minutes.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13.5,
              height: 1.55,
              color: QadaColors.textSecondary,
            ),
          ),
          const SizedBox(height: 18),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(22),
            ),
            child: const Column(
              children: [
                _CheckFeatureRow(
                  title: 'Auto-accounts for illness, travel & pardoned days',
                  subtitle: 'Calculates exemptions with scholar-verified accuracy',
                ),
                SizedBox(height: 14),
                _CheckFeatureRow(
                  title: 'Precise breakdown across daily prayers',
                  subtitle:
                      'Fajr, Dhuhr, Asr, Maghrib, and Isha individually balanced',
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          _StepDots(current: step, onSelect: onSelectStep),
          const SizedBox(height: 14),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: ElevatedButton(
              onPressed: onNext,
              style: ElevatedButton.styleFrom(
                backgroundColor: QadaColors.forestDeep,
                foregroundColor: Colors.white,
                shape: const StadiumBorder(),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Continue', style: TextStyle(fontWeight: FontWeight.w600)),
                  SizedBox(width: 8),
                  Icon(Icons.arrow_forward, size: 18),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          const Text(
            '"Honest intention is the first step."',
            style: TextStyle(
              fontSize: 12,
              fontStyle: FontStyle.italic,
              color: QadaColors.textMuted,
            ),
          ),
        ],
      ),
    );
  }
}

class _StepTwoView extends StatelessWidget {
  const _StepTwoView({
    required this.state,
    required this.step,
    required this.onSelectStep,
    required this.onBack,
    required this.onNext,
    required this.onSkip,
  });

  final QadaState state;
  final int step;
  final ValueChanged<int> onSelectStep;
  final VoidCallback onBack;
  final VoidCallback onNext;
  final VoidCallback onSkip;

  @override
  Widget build(BuildContext context) {
    final perPrayer = state.perPrayerTarget;

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              CircleAvatar(
                backgroundColor: Colors.white,
                child: IconButton(
                  onPressed: onBack,
                  icon: const Icon(Icons.arrow_back, size: 18),
                  color: QadaColors.forestDeep,
                ),
              ),
              const Column(
                children: [
                  Text(
                    'STEP 2 OF 3',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 1.4,
                      color: QadaColors.emerald,
                    ),
                  ),
                  Text(
                    'Intention & Cadence',
                    style: TextStyle(
                      fontSize: 11.5,
                      color: QadaColors.textSecondary,
                    ),
                  ),
                ],
              ),
              TextButton(
                onPressed: onSkip,
                child: const Text(
                  'Skip',
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: QadaColors.textSecondary,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),

          // Orbital Cadence Dial with 5 Orbiting Prayer Badges
          SizedBox(
            height: 230,
            width: double.infinity,
            child: Stack(
              alignment: Alignment.center,
              children: [
                SizedBox(
                  width: 206,
                  height: 206,
                  child: CustomPaint(painter: _OrbitalRingPainter()),
                ),
                Container(
                  width: 130,
                  height: 130,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: QadaColors.forestDeep.withValues(alpha: 0.1),
                        blurRadius: 28,
                      ),
                    ],
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.wb_twilight, color: QadaColors.gold, size: 20),
                      const SizedBox(height: 4),
                      Text(
                        '+$perPrayer Qada',
                        style: const TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.w700,
                          color: QadaColors.forestDark,
                        ),
                      ),
                      const Text(
                        'with each daily Fardh',
                        style: TextStyle(fontSize: 10, color: QadaColors.textMuted),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        state.pace == PaceMode.gentle
                            ? '◷ Balanced Flow'
                            : '◷ Steady Flow',
                        style: const TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w600,
                          color: QadaColors.emerald,
                        ),
                      ),
                    ],
                  ),
                ),
                Positioned(
                  top: 2,
                  child: _OrbitalPill('Fajr', perPrayer, QadaColors.gold),
                ),
                Positioned(
                  top: 52,
                  right: 10,
                  child: _OrbitalPill('Dhuhr', perPrayer, QadaColors.forestDeep),
                ),
                Positioned(
                  bottom: 6,
                  right: 22,
                  child: _OrbitalPill('Asr', perPrayer, QadaColors.emerald),
                ),
                Positioned(
                  bottom: 6,
                  left: 16,
                  child: _OrbitalPill('Maghrib', perPrayer, QadaColors.gold),
                ),
                Positioned(
                  top: 52,
                  left: 10,
                  child: _OrbitalPill('Isha', perPrayer, QadaColors.forestDeep),
                ),
              ],
            ),
          ),

          const SizedBox(height: 6),
          Text(
            'بناء خطة مستدامة',
            textDirection: TextDirection.rtl,
            style: GoogleFonts.amiri(fontSize: 16, color: QadaColors.gold),
          ),
          Text(
            'Build Your Own Sustainable Pace',
            textAlign: TextAlign.center,
            style: GoogleFonts.lora(
              fontSize: 25,
              fontWeight: FontWeight.w500,
              color: QadaColors.forestDark,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Fulfilling past prayers is a journey of consistency, not haste. Choose a comfortable cadence—like praying just +$perPrayer Qada after each Fardh prayer—to complete your goal in a timeline that fits your life.',
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 12.5,
              height: 1.5,
              color: QadaColors.textSecondary,
            ),
          ),
          const SizedBox(height: 14),
          _PaceOptionCard(
            title: 'Gentle Pace',
            rate: '+1 per prayer',
            subtitle: '5 extra prayers daily • 1 Year plan',
            selected: state.pace == PaceMode.gentle,
            progress: 0.62,
            icon: Icons.eco_outlined,
            iconBg: QadaColors.mintSoft,
            onTap: () => state.selectPace(PaceMode.gentle),
          ),
          const SizedBox(height: 10),
          _PaceOptionCard(
            title: 'Steady Devotion',
            rate: '+2 per prayer',
            subtitle: '10 extra prayers daily • 6 Months plan',
            selected: state.pace == PaceMode.steady,
            progress: 1.0,
            icon: Icons.bolt,
            iconBg: const Color(0xFFE6ECF8),
            onTap: () => state.selectPace(PaceMode.steady),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
            ),
            child: const Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  radius: 11,
                  backgroundColor: QadaColors.goldSoft,
                  child: Text(
                    '❞',
                    style: TextStyle(fontSize: 12, color: QadaColors.goldDark),
                  ),
                ),
                SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '“The most beloved deeds to Allah are those done regularly, even if small.”',
                        style: TextStyle(
                          fontSize: 12,
                          fontStyle: FontStyle.italic,
                          color: QadaColors.textPrimary,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'Sahih al-Bukhari',
                        style: TextStyle(fontSize: 10.5, color: QadaColors.textMuted),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Courtyard Banner Image Card
          ClipRRect(
            borderRadius: BorderRadius.circular(18),
            child: SizedBox(
              height: 86,
              width: double.infinity,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  Image.asset(
                    'assets/images/courtyard_peace_banner.jpg',
                    fit: BoxFit.cover,
                  ),
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          const Color(0xFF0F2419).withValues(alpha: 0.85),
                          const Color(0xFF0F2419).withValues(alpha: 0.45),
                          Colors.transparent,
                        ],
                      ),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: const Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'PEACE OF MIND',
                          style: TextStyle(
                            fontSize: 9.5,
                            fontWeight: FontWeight.w600,
                            letterSpacing: 1.4,
                            color: Color(0xFFB8DFC8),
                          ),
                        ),
                        SizedBox(height: 2),
                        Text(
                          'Take it one prayer at a time',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w600,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          _StepDots(current: step, onSelect: onSelectStep),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: ElevatedButton(
              onPressed: onNext,
              style: ElevatedButton.styleFrom(
                backgroundColor: QadaColors.forestDeep,
                foregroundColor: Colors.white,
                shape: const StadiumBorder(),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Continue', style: TextStyle(fontWeight: FontWeight.w600)),
                  SizedBox(width: 8),
                  Icon(Icons.arrow_forward, size: 18),
                ],
              ),
            ),
          ),
          const SizedBox(height: 10),
          const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.tune, size: 14, color: QadaColors.emerald),
              SizedBox(width: 6),
              Text(
                'Custom pacing can be tuned anytime.',
                style: TextStyle(fontSize: 11.5, color: QadaColors.emerald),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _StepThreeView extends StatelessWidget {
  const _StepThreeView({
    required this.step,
    required this.onSelectStep,
    required this.onBack,
    required this.onSignUp,
    required this.onSignIn,
  });

  final int step;
  final ValueChanged<int> onSelectStep;
  final VoidCallback onBack;
  final VoidCallback onSignUp;
  final VoidCallback onSignIn;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
      child: Column(
        children: [
          Row(
            children: [
              CircleAvatar(
                backgroundColor: Colors.white,
                child: IconButton(
                  onPressed: onBack,
                  icon: const Icon(Icons.arrow_back, size: 18),
                  color: QadaColors.forestDeep,
                ),
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(30),
                  border: Border.all(color: QadaColors.borderSoft),
                ),
                child: const Row(
                  children: [
                    CircleAvatar(radius: 3.5, backgroundColor: QadaColors.gold),
                    SizedBox(width: 8),
                    Text(
                      'STEP 3 OF 3',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 1.4,
                        color: QadaColors.forestDeep,
                      ),
                    ),
                  ],
                ),
              ),
              const Spacer(),
              const SizedBox(width: 40),
            ],
          ),
          const SizedBox(height: 14),

          // Scenic Hero Card
          ClipRRect(
            borderRadius: BorderRadius.circular(24),
            child: SizedBox(
              height: 205,
              width: double.infinity,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  Image.asset(
                    'assets/images/spiritual_renewal_hero.jpg',
                    fit: BoxFit.cover,
                  ),
                  Positioned(
                    top: 12,
                    right: 12,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.94),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.auto_awesome, size: 14, color: QadaColors.gold),
                          SizedBox(width: 5),
                          Text(
                            'Spiritual Renewal',
                            style: TextStyle(
                              fontSize: 11.5,
                              fontWeight: FontWeight.w600,
                              color: QadaColors.forestDark,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 12,
                    left: 12,
                    right: 12,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 14,
                        vertical: 10,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.95),
                        borderRadius: BorderRadius.circular(18),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Row(
                            children: [
                              CircleAvatar(
                                radius: 16,
                                backgroundColor: Color(0xFFC7EED8),
                                child: Icon(
                                  Icons.check,
                                  size: 16,
                                  color: QadaColors.forestDeep,
                                ),
                              ),
                              SizedBox(width: 10),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Daily Journey Goal',
                                    style: TextStyle(
                                      fontSize: 10.5,
                                      color: QadaColors.textMuted,
                                    ),
                                  ),
                                  Text(
                                    '5 of 5 Fulfilled',
                                    style: TextStyle(
                                      fontSize: 14.5,
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
                            child: const Text(
                              '+100% Niyyah',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w600,
                                color: QadaColors.goldDark,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 14),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
            decoration: BoxDecoration(
              color: const Color(0xFFDAEAE1),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              'انشراح الصدر والبركة',
              textDirection: TextDirection.rtl,
              style: GoogleFonts.amiri(fontSize: 14, color: QadaColors.emerald),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Track Progress & Find Lightness',
            textAlign: TextAlign.center,
            style: GoogleFonts.lora(
              fontSize: 26,
              fontWeight: FontWeight.w500,
              color: QadaColors.forestDark,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Watch your remaining total decrease prayer by prayer. Celebrate peaceful milestones, receive gentle adhan notifications, and renew your sacred intention every single day.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13,
              height: 1.55,
              color: QadaColors.textSecondary,
            ),
          ),
          const SizedBox(height: 14),
          const _IconFeatureCard(
            icon: Icons.sync,
            iconBg: Color(0xFFCBEEDB),
            iconColor: QadaColors.forestDeep,
            title: 'Cloud backup across your devices',
            subtitle: 'Seamless synchronization, never lose a logged prayer',
          ),
          const SizedBox(height: 10),
          const _IconFeatureCard(
            icon: Icons.lock_outline,
            iconBg: Color(0xFFCBEEDB),
            iconColor: QadaColors.forestDeep,
            title: '100% Private, guilt-free sanctuary',
            subtitle: 'Your worship stays strictly between you and your Creator',
          ),
          const SizedBox(height: 10),
          const _IconFeatureCard(
            icon: Icons.notifications_none,
            iconBg: Color(0xFFFCE9C3),
            iconColor: QadaColors.goldDark,
            title: 'Gentle, mindful reminders',
            subtitle: 'Customized gentle chimes timed for your daily Qada slots',
          ),
          const SizedBox(height: 16),
          _StepDots(current: step, onSelect: onSelectStep),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: ElevatedButton(
              onPressed: onSignUp,
              style: ElevatedButton.styleFrom(
                backgroundColor: QadaColors.forestDeep,
                foregroundColor: Colors.white,
                shape: const StadiumBorder(),
              ),
              child: const Text(
                'Create Free Account / Sign Up →',
                style: TextStyle(fontWeight: FontWeight.w600),
              ),
            ),
          ),
          const SizedBox(height: 10),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: OutlinedButton(
              onPressed: onSignIn,
              style: OutlinedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: QadaColors.forestDeep,
                side: const BorderSide(color: QadaColors.borderSoft),
                shape: const StadiumBorder(),
              ),
              child: const Text(
                'Already have an account? Log In',
                style: TextStyle(fontWeight: FontWeight.w600),
              ),
            ),
          ),
          const SizedBox(height: 10),
          const Text(
            '🌾 By continuing, you begin with a pure Niyyah (intention).',
            style: TextStyle(fontSize: 11, color: QadaColors.textSecondary),
          ),
        ],
      ),
    );
  }
}

class _OrbitalPill extends StatelessWidget {
  const _OrbitalPill(this.name, this.count, this.dotColor);
  final String name;
  final int count;
  final Color dotColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: QadaColors.borderSoft),
        boxShadow: [
          BoxShadow(
            color: QadaColors.forestDeep.withValues(alpha: 0.06),
            blurRadius: 8,
          ),
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          CircleAvatar(radius: 3, backgroundColor: dotColor),
          const SizedBox(width: 5),
          Text(
            name,
            style: const TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: QadaColors.forestDark,
            ),
          ),
          const SizedBox(width: 4),
          Text(
            '+$count',
            style: const TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w500,
              color: QadaColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }
}

class _CheckFeatureRow extends StatelessWidget {
  const _CheckFeatureRow({required this.title, required this.subtitle});
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const CircleAvatar(
          radius: 14,
          backgroundColor: QadaColors.mintCheck,
          child: Icon(Icons.check, size: 16, color: QadaColors.forestDeep),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
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
              const SizedBox(height: 2),
              Text(
                subtitle,
                style: const TextStyle(
                  fontSize: 12,
                  color: QadaColors.textSecondary,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _IconFeatureCard extends StatelessWidget {
  const _IconFeatureCard({
    required this.icon,
    required this.iconBg,
    required this.iconColor,
    required this.title,
    required this.subtitle,
  });

  final IconData icon;
  final Color iconBg;
  final Color iconColor;
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 18,
            backgroundColor: iconBg,
            child: Icon(icon, size: 18, color: iconColor),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
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
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: const TextStyle(
                    fontSize: 11.5,
                    color: QadaColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _PaceOptionCard extends StatelessWidget {
  const _PaceOptionCard({
    required this.title,
    required this.rate,
    required this.subtitle,
    required this.selected,
    required this.progress,
    required this.icon,
    required this.iconBg,
    required this.onTap,
  });

  final String title;
  final String rate;
  final String subtitle;
  final bool selected;
  final double progress;
  final IconData icon;
  final Color iconBg;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(
            color: selected
                ? QadaColors.forestDeep.withValues(alpha: 0.35)
                : Colors.transparent,
          ),
        ),
        child: Column(
          children: [
            Row(
              children: [
                CircleAvatar(
                  radius: 20,
                  backgroundColor: iconBg,
                  child: Icon(icon, color: QadaColors.forestDeep),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '$title • $rate',
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: QadaColors.textPrimary,
                        ),
                      ),
                      Text(
                        subtitle,
                        style: const TextStyle(
                          fontSize: 12,
                          color: QadaColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
                Icon(
                  selected ? Icons.check_circle : Icons.radio_button_unchecked,
                  color: selected ? QadaColors.forestDeep : const Color(0xFFB7C4D8),
                ),
              ],
            ),
            const SizedBox(height: 10),
            ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: LinearProgressIndicator(
                value: progress,
                minHeight: 4,
                backgroundColor: const Color(0xFFE1F0E7),
                color: selected ? QadaColors.forestDeep : const Color(0xFF87AE97),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _OrbitalRingPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width * 0.44;

    final dashedPaint = Paint()
      ..color = const Color(0xFFC2D5CA)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    const dashCount = 36;
    for (int i = 0; i < dashCount; i++) {
      final start = (i / dashCount) * math.pi * 2;
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        start,
        0.09,
        false,
        dashedPaint,
      );
    }

    final solidPaint = Paint()
      ..color = QadaColors.forestDeep
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round
      ..strokeWidth = 2.5;

    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -math.pi / 2,
      math.pi * 1.32,
      false,
      solidPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _ArchIllustrationPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;

    // 8-point star at top
    final starPaint = Paint()..color = const Color(0xFFCBB170);
    canvas.save();
    canvas.translate(cx, 22);
    canvas.drawRect(const Rect.fromLTWH(-5, -5, 10, 10), starPaint);
    canvas.rotate(math.pi / 4);
    canvas.drawRect(const Rect.fromLTWH(-5, -5, 10, 10), starPaint);
    canvas.restore();

    // Inner Gold Arch
    final archPaint = Paint()
      ..color = const Color(0xFFD8C89C)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.4;

    final innerArch = Path()
      ..moveTo(cx - 46, size.height - 16)
      ..lineTo(cx - 46, 94)
      ..arcToPoint(
        Offset(cx + 46, 94),
        radius: const Radius.circular(46),
      )
      ..lineTo(cx + 46, size.height - 16);
    canvas.drawPath(innerArch, archPaint);

    // Mosque base
    final leftWall = Paint()..color = const Color(0xFF3A6347);
    final rightWall = Paint()..color = const Color(0xFF6C9477);

    canvas.drawPath(
      Path()
        ..moveTo(cx - 34, 122)
        ..lineTo(cx, 136)
        ..lineTo(cx, 158)
        ..lineTo(cx - 34, 144)
        ..close(),
      leftWall,
    );
    canvas.drawPath(
      Path()
        ..moveTo(cx, 136)
        ..lineTo(cx + 34, 122)
        ..lineTo(cx + 34, 144)
        ..lineTo(cx, 158)
        ..close(),
      rightWall,
    );

    // Hanging gold key
    final keyPaint = Paint()
      ..color = const Color(0xFFD8B362)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;
    canvas.drawCircle(Offset(cx, 174), 4.5, keyPaint);
    canvas.drawLine(Offset(cx, 178.5), Offset(cx, 193), keyPaint);
    canvas.drawLine(Offset(cx, 187), Offset(cx + 4, 187), keyPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
