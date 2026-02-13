import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) { setError('Semua field wajib diisi'); return; }
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            router.replace('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={s.safe}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
                    <TouchableOpacity style={s.backRow} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={22} color={Colors.primary} />
                    </TouchableOpacity>

                    <View style={s.brandWrap}>
                        <Ionicons name="hammer" size={36} color={Colors.accent} />
                        <Text style={s.brandText}>TukangKita</Text>
                    </View>

                    <Text style={s.heading}>Selamat Datang!</Text>
                    <Text style={s.sub}>Masuk untuk melanjutkan belajar</Text>

                    {error ? <Text style={s.error}>{error}</Text> : null}

                    <View style={s.inputWrap}>
                        <Ionicons name="mail-outline" size={18} color={Colors.textLight} />
                        <TextInput style={s.input} placeholder="Email" placeholderTextColor={Colors.textLight}
                            value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                    </View>

                    <View style={s.inputWrap}>
                        <Ionicons name="lock-closed-outline" size={18} color={Colors.textLight} />
                        <TextInput style={s.input} placeholder="Password" placeholderTextColor={Colors.textLight}
                            value={password} onChangeText={setPassword} secureTextEntry={!showPw} />
                        <TouchableOpacity onPress={() => setShowPw(!showPw)}>
                            <Ionicons name={showPw ? 'eye-off-outline' : 'eye-outline'} size={20} color={Colors.textLight} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={[s.btn, loading && { opacity: 0.6 }]} onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
                        <Text style={s.btnText}>{loading ? 'Memproses...' : 'Masuk'}</Text>
                    </TouchableOpacity>

                    <View style={s.footer}>
                        <Text style={s.footerText}>Belum punya akun? </Text>
                        <TouchableOpacity onPress={() => router.replace('/register')}>
                            <Text style={s.link}>Daftar sekarang</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.bg },
    scroll: { flexGrow: 1, padding: Spacing.xl, justifyContent: 'center' },
    backRow: { position: 'absolute', top: 0, left: 0 },
    brandWrap: { alignItems: 'center', marginBottom: Spacing.lg },
    brandText: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.primary, marginTop: Spacing.sm },
    heading: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text, textAlign: 'center' },
    sub: { fontSize: FontSize.sm, color: Colors.textLight, textAlign: 'center', marginBottom: Spacing.xl },
    error: {
        backgroundColor: '#FEE2E2', color: '#991B1B', fontSize: FontSize.xs,
        padding: Spacing.sm, borderRadius: Radius.sm, marginBottom: Spacing.md, textAlign: 'center',
    },
    inputWrap: {
        flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
        backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border,
        borderRadius: Radius.sm, paddingHorizontal: Spacing.md, marginBottom: Spacing.md,
    },
    input: { flex: 1, paddingVertical: Spacing.sm + 4, fontSize: FontSize.sm, color: Colors.text },
    btn: {
        backgroundColor: Colors.accent, borderRadius: Radius.sm,
        paddingVertical: Spacing.sm + 6, alignItems: 'center', marginTop: Spacing.sm, marginBottom: Spacing.lg,
    },
    btnText: { color: Colors.white, fontWeight: '700', fontSize: FontSize.md },
    footer: { flexDirection: 'row', justifyContent: 'center' },
    footerText: { fontSize: FontSize.sm, color: Colors.textLight },
    link: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: '700' },
});
