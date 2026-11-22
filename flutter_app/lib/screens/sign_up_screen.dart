import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';
import '../models/qada_state.dart';
import '../theme/qada_theme.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key, required this.state});
  final QadaState state;

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final _nameCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _passwordCtrl = TextEditingController();
  bool _obscure = true;
  bool _agreed = true;
  String? _error;

  @override
  void dispose() {
    _nameCtrl.dispose();
    _emailCtrl.dispose();
    _passwordCtrl.dispose();
    super.dispose();
  }

  int get _strengthLevel {
    final p = _passwordCtrl.text;
    if (p.isEmpty) return 3;
    int score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 8) score++;
    if (RegExp(r'[A-Z]').hasMatch(p) && RegExp(r'[0-9]').hasMatch(p)) score++;
    if (p.length >= 12 || RegExp(r'[^A-Za-z0-9]').hasMatch(p)) score++;
    return score.clamp(1, 4);
  }

  String get _strengthLabel {
    switch (_strengthLevel) {
      case 1:
        return 'Needs more length';
      case 2:
        return 'Fair protection';
      case 3:
        return 'Good sanctuary key';
      default:
        return 'Strong sanctuary key';
    }
  }

  void _submit() {
    if (_nameCtrl.text.trim().isEmpty ||
        !_emailCtrl.text.contains('@') ||
        _passwordCtrl.text.length < 8 ||
        !_agreed) {
      setState(() {
        _error = 'Please fill all fields (8+ char password) and accept terms.';
      });
      return;
    }
    widget.state.signUp(
      name: _nameCtrl.text,
      userEmail: _emailCtrl.text,
    );
    Navigator.pushReplacementNamed(context, QadaRoutes.estimator);
  }

  @override
  Widget build(BuildContext context) {
    final level = _strengthLevel;

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
              'Create Account',
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
                onPressed: () => Navigator.pushNamed(context, QadaRoutes.signIn),
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
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Create Account',
                style: GoogleFonts.lora(
                  fontSize: 28,
                  fontWeight: FontWeight.w500,
                  color: QadaColors.forestDark,
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Create your account to save your prayer records.',
                style: TextStyle(fontSize: 13.5, color: QadaColors.textSecondary),
              ),
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(26),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const _FieldLabel('Full Name'),
                    TextField(
                      controller: _nameCtrl,
                      decoration: _inputDeco(
                        hint: 'e.g. Tariq Ahmad',
                        icon: Icons.person_outline,
                      ),
                    ),
                    const SizedBox(height: 16),
                    const _FieldLabel('Email Address'),
                    TextField(
                      controller: _emailCtrl,
                      keyboardType: TextInputType.emailAddress,
                      decoration: _inputDeco(
                        hint: 'yourname@example.com',
                        icon: Icons.mail_outline,
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _FieldLabel('Password'),
                        Text(
                          '8+ characters',
                          style: TextStyle(fontSize: 11, color: QadaColors.textMuted),
                        ),
                      ],
                    ),
                    TextField(
                      controller: _passwordCtrl,
                      obscureText: _obscure,
                      onChanged: (_) => setState(() {}),
                      decoration: _inputDeco(
                        hint: 'Create a protected passphrase',
                        icon: Icons.lock_outline,
                        suffix: IconButton(
                          icon: Icon(
                            _obscure
                                ? Icons.visibility_outlined
                                : Icons.visibility_off_outlined,
                            size: 18,
                          ),
                          onPressed: () => setState(() => _obscure = !_obscure),
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Row(
                      children: List.generate(4, (idx) {
                        final seg = idx + 1;
                        Color color = const Color(0xFFE3E9F2);
                        if (seg <= level) {
                          color = seg == 3
                              ? QadaColors.forestDeep
                              : const Color(0xFF9BE2BD);
                          if (level == 1) color = const Color(0xFFD69E5C);
                        }
                        return Expanded(
                          child: Container(
                            height: 3.5,
                            margin: EdgeInsets.only(right: idx < 3 ? 6 : 0),
                            decoration: BoxDecoration(
                              color: color,
                              borderRadius: BorderRadius.circular(4),
                            ),
                          ),
                        );
                      }),
                    ),
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          '• Strength: $_strengthLabel',
                          style: const TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                            color: QadaColors.emerald,
                          ),
                        ),
                        const Text(
                          'Encrypted',
                          style: TextStyle(fontSize: 11, color: QadaColors.textMuted),
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),
                    Row(
                      children: [
                        Checkbox(
                          value: _agreed,
                          activeColor: QadaColors.forestDeep,
                          onChanged: (v) => setState(() => _agreed = v ?? false),
                        ),
                        const Expanded(
                          child: Text(
                            'I agree to the Terms of Service & Privacy Policy, keeping my worship private and protected.',
                            style: TextStyle(fontSize: 12, color: QadaColors.textSecondary),
                          ),
                        ),
                      ],
                    ),
                    if (_error != null)
                      Padding(
                        padding: const EdgeInsets.only(top: 8),
                        child: Text(
                          _error!,
                          style: const TextStyle(color: Colors.redAccent, fontSize: 12),
                        ),
                      ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      height: 52,
                      child: ElevatedButton(
                        onPressed: _submit,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: QadaColors.forestDeep,
                          foregroundColor: Colors.white,
                          shape: const StadiumBorder(),
                        ),
                        child: const Text(
                          'Create Account →',
                          style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              Center(
                child: TextButton(
                  onPressed: () =>
                      Navigator.pushReplacementNamed(context, QadaRoutes.signIn),
                  child: const Text(
                    'Already have an account? Log In',
                    style: TextStyle(
                      color: QadaColors.forestDeep,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  InputDecoration _inputDeco({
    required String hint,
    required IconData icon,
    Widget? suffix,
  }) {
    return InputDecoration(
      hintText: hint,
      prefixIcon: Icon(icon, size: 18, color: QadaColors.emerald),
      suffixIcon: suffix,
      filled: true,
      fillColor: QadaColors.inputFill,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide.none,
      ),
    );
  }
}

class _FieldLabel extends StatelessWidget {
  const _FieldLabel(this.text);
  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Text(
        text,
        style: const TextStyle(
          fontSize: 12.5,
          fontWeight: FontWeight.w600,
          color: QadaColors.forestDeep,
        ),
      ),
    );
  }
}
