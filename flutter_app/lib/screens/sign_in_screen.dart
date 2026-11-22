import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';
import '../models/qada_state.dart';
import '../theme/qada_theme.dart';

class SignInScreen extends StatefulWidget {
  const SignInScreen({super.key, required this.state});
  final QadaState state;

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  final _emailCtrl = TextEditingController();
  final _passwordCtrl = TextEditingController();
  bool _obscure = true;
  bool _rememberMe = true;
  String? _error;

  @override
  void dispose() {
    _emailCtrl.dispose();
    _passwordCtrl.dispose();
    super.dispose();
  }

  void _submit() {
    if (!_emailCtrl.text.contains('@') || _passwordCtrl.text.isEmpty) {
      setState(() => _error = 'Please enter your email and password.');
      return;
    }
    widget.state.signIn(userEmail: _emailCtrl.text);
    Navigator.pushReplacementNamed(context, QadaRoutes.dashboard);
  }

  void _showForgotDialog() {
    showDialog<void>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Reset Passphrase'),
        content: const Text(
          'Enter your registered email address to receive instructions to restore access to your Qada log.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: QadaColors.forestDeep),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.mosque_outlined, size: 19, color: QadaColors.emerald),
            SizedBox(width: 8),
            Text(
              'Sign In',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: QadaColors.forestDark,
              ),
            ),
          ],
        ),
        centerTitle: true,
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: CircleAvatar(
              radius: 17,
              backgroundColor: QadaColors.forestDeep,
              child: IconButton(
                icon: const Icon(Icons.person_outline, size: 16, color: Colors.white),
                onPressed: () => Navigator.pushNamed(context, QadaRoutes.signUp),
              ),
            ),
          ),
        ],
      ),
      body: Container(
        decoration: const BoxDecoration(gradient: QadaTheme.backgroundGradient),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              const SizedBox(height: 10),
              Container(
                width: 56,
                height: 56,
                decoration: BoxDecoration(
                  color: Colors.white,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: QadaColors.forestDeep.withValues(alpha: 0.08),
                      blurRadius: 20,
                    ),
                  ],
                ),
                child: CustomPaint(painter: _MihrabIconPainter()),
              ),
              const SizedBox(height: 14),
              Text(
                'Welcome Back',
                style: GoogleFonts.lora(
                  fontSize: 28,
                  fontWeight: FontWeight.w500,
                  color: QadaColors.forestDark,
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Sign in to track your prayers.',
                style: TextStyle(fontSize: 13.5, color: QadaColors.textSecondary),
              ),
              const SizedBox(height: 22),
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(26),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'EMAIL ADDRESS',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 0.8,
                        color: QadaColors.forestDeep,
                      ),
                    ),
                    const SizedBox(height: 6),
                    TextField(
                      controller: _emailCtrl,
                      keyboardType: TextInputType.emailAddress,
                      decoration: InputDecoration(
                        hintText: 'yourname@example.com',
                        prefixIcon: const Icon(
                          Icons.mail_outline,
                          size: 18,
                          color: QadaColors.emerald,
                        ),
                        filled: true,
                        fillColor: QadaColors.inputFill,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide.none,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'PASSWORD',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 0.8,
                            color: QadaColors.forestDeep,
                          ),
                        ),
                        GestureDetector(
                          onTap: _showForgotDialog,
                          child: const Text(
                            'Forgot Password?',
                            style: TextStyle(
                              fontSize: 11.5,
                              fontWeight: FontWeight.w500,
                              color: QadaColors.emerald,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    TextField(
                      controller: _passwordCtrl,
                      obscureText: _obscure,
                      decoration: InputDecoration(
                        hintText: '••••••••••••',
                        prefixIcon: const Icon(
                          Icons.lock_outline,
                          size: 18,
                          color: QadaColors.emerald,
                        ),
                        suffixIcon: IconButton(
                          icon: Icon(
                            _obscure
                                ? Icons.visibility_outlined
                                : Icons.visibility_off_outlined,
                            size: 18,
                          ),
                          onPressed: () => setState(() => _obscure = !_obscure),
                        ),
                        filled: true,
                        fillColor: QadaColors.inputFill,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide.none,
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Checkbox(
                              value: _rememberMe,
                              activeColor: QadaColors.forestDeep,
                              onChanged: (v) =>
                                  setState(() => _rememberMe = v ?? false),
                            ),
                            const Text(
                              'Remember me',
                              style: TextStyle(
                                fontSize: 13,
                                color: QadaColors.textSecondary,
                              ),
                            ),
                          ],
                        ),
                        const Text(
                          '• Encrypted Session',
                          style: TextStyle(
                            fontSize: 11.5,
                            fontWeight: FontWeight.w600,
                            color: QadaColors.emerald,
                          ),
                        ),
                      ],
                    ),
                    if (_error != null)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: Text(
                          _error!,
                          style: const TextStyle(color: Colors.redAccent, fontSize: 12),
                        ),
                      ),
                    const SizedBox(height: 12),
                    SizedBox(
                      width: double.infinity,
                      height: 54,
                      child: ElevatedButton(
                        onPressed: _submit,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: QadaColors.forestDeep,
                          foregroundColor: Colors.white,
                          shape: const StadiumBorder(),
                        ),
                        child: const Text(
                          'Sign In  /  متابعة  →',
                          style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              TextButton(
                onPressed: () =>
                    Navigator.pushReplacementNamed(context, QadaRoutes.signUp),
                child: const Text(
                  "Don't have an account? Sign Up",
                  style: TextStyle(
                    color: QadaColors.emerald,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              const SizedBox(height: 6),
              const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.lock_outline, size: 14, color: QadaColors.emerald),
                  SizedBox(width: 6),
                  Text(
                    'End-to-end encrypted & private',
                    style: TextStyle(fontSize: 11.5, color: QadaColors.textMuted),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _MihrabIconPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final paint = Paint()
      ..color = QadaColors.forestDeep
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.6
      ..strokeCap = StrokeCap.round;

    final outer = Path()
      ..moveTo(cx - 8, 36)
      ..lineTo(cx - 8, 25)
      ..arcToPoint(Offset(cx + 8, 25), radius: const Radius.circular(8))
      ..lineTo(cx + 8, 36);
    canvas.drawPath(outer, paint);

    final inner = Path()
      ..moveTo(cx - 4, 36)
      ..lineTo(cx - 4, 27)
      ..arcToPoint(Offset(cx + 4, 27), radius: const Radius.circular(4))
      ..lineTo(cx + 4, 36);
    canvas.drawPath(inner, paint);

    canvas.drawLine(Offset(cx - 10, 36), Offset(cx + 10, 36), paint);
    canvas.drawCircle(
      Offset(cx, 20),
      1.5,
      Paint()..color = QadaColors.gold,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
