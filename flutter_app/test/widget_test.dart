import 'package:flutter_test/flutter_test.dart';
import 'package:qada_tracker/main.dart';

void main() {
  testWidgets('Qada app boots to Splash Screen and navigates to Onboarding',
      (WidgetTester tester) async {
    await tester.pumpWidget(const QadaTrackerApp());
    await tester.pumpAndSettle();

    expect(find.text('Qada'), findsOneWidget);
    expect(find.text('Begin Your Journey'), findsOneWidget);

    await tester.tap(find.text('Begin Your Journey'));
    await tester.pumpAndSettle();

    expect(find.text('Estimate With Peace of Mind'), findsOneWidget);
  });
}
