import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

export default function AccountScreen() {
    const { isLoggedIn, user, logout } = useAuth();
    const router = useRouter();

    if (!isLoggedIn) {
        return (
            <SafeAreaView style={s.safe} edges={['top']}>
                <View style={s.center}>
                    <View style={s.iconWrap}>
                        <Ionicons name="person-outline" size={48} color={Colors.primary} />
                    </View>
                    <Text style={s.heading}>Masuk ke Akunmu</Text>
                    <Text style={s.sub}>Login untuk mengakses tutorial lengkap dan menyimpan progres belajarmu</Text>
                    <TouchableOpacity style={s.btnPrimary} onPress={() => router.push('/login')}>
                        <Ionicons name="log-in-outline" size={20} color={Colors.white} />
                        <Text style={s.btnPrimaryText}>Masuk</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.btnOutline} onPress={() => router.push('/register')}>
                        <Ionicons name="person-add-outline" size={20} color={Colors.primary} />
                        <Text style={s.btnOutlineText}>Daftar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={s.safe} edges={['top']}>
            <View style={s.center}>
                <View style={s.avatar}>
                    <Text style={s.avatarText}>{user?.fullname?.charAt(0).toUpperCase()}</Text>
                </View>
                <Text style={s.heading}>{user?.fullname}</Text>
                <Text style={s.sub}>{user?.email}</Text>
                <TouchableOpacity style={s.btnOutline} onPress={logout}>
                    <Ionicons name="log-out-outline" size={20} color={Colors.error} />
                    <Text style={[s.btnOutlineText, { color: Colors.error }]}>Keluar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.bg },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },
    iconWrap: {
        width: 96, height: 96, borderRadius: 48,
        backgroundColor: '#EDF2F7', alignItems: 'center', justifyContent: 'center',
        marginBottom: Spacing.lg,
    },
    avatar: {
        width: 96, height: 96, borderRadius: 48,
        backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
        marginBottom: Spacing.lg,
    },
    avatarText: { fontSize: 36, fontWeight: '800', color: Colors.white },
    heading: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text, marginBottom: Spacing.xs },
    sub: { fontSize: FontSize.sm, color: Colors.textLight, textAlign: 'center', marginBottom: Spacing.xl },
    btnPrimary: {
        flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
        backgroundColor: Colors.accent, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm + 4,
        borderRadius: Radius.sm, width: '100%', justifyContent: 'center', marginBottom: Spacing.md,
    },
    btnPrimaryText: { color: Colors.white, fontWeight: '700', fontSize: FontSize.md },
    btnOutline: {
        flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
        borderWidth: 1.5, borderColor: Colors.border,
        paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm + 4,
        borderRadius: Radius.sm, width: '100%', justifyContent: 'center',
    },
    btnOutlineText: { fontWeight: '700', fontSize: FontSize.md, color: Colors.primary },
});
