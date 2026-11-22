import 'package:flutter/material.dart';
import 'models/qada_state.dart';
import 'screens/dashboard_screen.dart';
import 'screens/estimator_screen.dart';
import 'screens/onboarding_screen.dart';
import 'screens/sign_in_screen.dart';
import 'screens/sign_up_screen.dart';
import 'screens/splash_screen.dart';
import 'theme/qada_theme.dart';

void main() {
  runApp(const QadaTrackerApp());
}

class QadaRoutes {
  static const splash = '/';
  static const onboarding1 = '/onboarding-1';
  static const onboarding2 = '/onboarding-2';
  static const onboarding3 = '/onboarding-3';
  static const signUp = '/sign-up';
  static const signIn = '/sign-in';
  static const estimator = '/estimator';
  static const dashboard = '/dashboard';
}

class QadaTrackerApp extends StatefulWidget {
  const QadaTrackerApp({super.key});

  @override
  State<QadaTrackerApp> createState() => _QadaTrackerAppState();
}

class _QadaTrackerAppState extends State<QadaTrackerApp> {
  final QadaState _state = QadaState();

  @override
  void dispose() {
    _state.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: _state,
      builder: (context, _) {
        return MaterialApp(
          title: 'Qada — Mindful Prayer Tracker',
          debugShowCheckedModeBanner: false,
          theme: QadaTheme.light,
          initialRoute: QadaRoutes.splash,
          routes: {
            QadaRoutes.splash: (_) => const SplashScreen(),
            QadaRoutes.onboarding1: (_) => OnboardingScreen(
                  initialStep: 0,
                  state: _state,
                ),
            QadaRoutes.onboarding2: (_) => OnboardingScreen(
                  initialStep: 1,
                  state: _state,
                ),
            QadaRoutes.onboarding3: (_) => OnboardingScreen(
                  initialStep: 2,
                  state: _state,
                ),
            QadaRoutes.signUp: (_) => SignUpScreen(state: _state),
            QadaRoutes.signIn: (_) => SignInScreen(state: _state),
            QadaRoutes.estimator: (_) => EstimatorScreen(state: _state),
            QadaRoutes.dashboard: (_) => DashboardScreen(state: _state),
          },
        );
      },
    );
  }
}
