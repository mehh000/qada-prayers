import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class QadaColors {
  static const Color bgTop = Color(0xFFF8FCFA);
  static const Color bgMid = Color(0xFFEEF6F1);
  static const Color bgBottom = Color(0xFFDCEBE3);

  static const Color forestDeep = Color(0xFF193B29);
  static const Color forestDark = Color(0xFF113322);
  static const Color emerald = Color(0xFF2E6A4E);
  static const Color mintSoft = Color(0xFFD3EFE0);
  static const Color mintCheck = Color(0xFFB4E8CD);

  static const Color gold = Color(0xFFC8A75E);
  static const Color goldSoft = Color(0xFFFDF1D6);
  static const Color goldDark = Color(0xFFB98730);

  static const Color inputFill = Color(0xFFF2F5FA);
  static const Color textPrimary = Color(0xFF122D1F);
  static const Color textSecondary = Color(0xFF52655B);
  static const Color textMuted = Color(0xFF75887E);
  static const Color borderSoft = Color(0xFFE5EFE9);
}

class QadaTheme {
  static const LinearGradient backgroundGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [
      QadaColors.bgTop,
      QadaColors.bgMid,
      QadaColors.bgBottom,
    ],
  );

  static ThemeData get light {
    final base = ThemeData.light(useMaterial3: true);
    return base.copyWith(
      scaffoldBackgroundColor: QadaColors.bgTop,
      colorScheme: ColorScheme.fromSeed(
        seedColor: QadaColors.forestDeep,
        primary: QadaColors.forestDeep,
        secondary: QadaColors.emerald,
        surface: Colors.white,
      ),
      textTheme: GoogleFonts.plusJakartaSansTextTheme(base.textTheme).copyWith(
        displayMedium: GoogleFonts.lora(
          color: QadaColors.forestDark,
          fontWeight: FontWeight.w500,
        ),
        headlineMedium: GoogleFonts.lora(
          color: QadaColors.forestDark,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
