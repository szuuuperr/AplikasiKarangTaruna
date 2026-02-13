import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '../../constants/theme';
import { tutorialAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import TutorialCard from '../../components/TutorialCard';

const catIconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    Kayu: 'hammer', Listrik: 'flash', Pipa: 'water', Cat: 'color-palette',
};

export default function DetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const [tutorial, setTutorial] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isLoggedIn) { router.replace('/login'); return; }
        tutorialAPI.getById(id!)
            .then((res) => setTutorial(res.data))
            .catch(() => setError('Tutorial tidak ditemukan'))
            .finally(() => setLoading(false));
    }, [id, isLoggedIn]);

    if (loading) {
        return (
            <SafeAreaView style={s.safe}><View style={s.center}>
                <Text style={s.loadText}>Memuat...</Text>
            </View></SafeAreaView>
        );
    }

    if (error || !tutorial) {
        return (
            <SafeAreaView style={s.safe}><View style={s.center}>
                <Text style={s.errorText}>{error || 'Tidak ditemukan'}</Text>
                <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
                    <Text style={s.backBtnText}>Kembali</Text>
                </TouchableOpacity>
            </View></SafeAreaView>
        );
    }

    const catIcon = catIconMap[tutorial.category] || 'construct';
    const related = tutorial.relatedIds || [];

    return (
        <SafeAreaView style={s.safe} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={s.headerBack} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color={Colors.primary} />
                    <Text style={s.headerBackText}>Kembali</Text>
                </TouchableOpacity>

                <View style={s.heroWrap}>
                    <Image source={{ uri: tutorial.image }} style={s.heroImg} contentFit="cover" transition={300} />
                    <View style={s.playOverlay}>
                        <View style={s.playBtn}>
                            <Ionicons name="play" size={28} color={Colors.white} />
                        </View>
                    </View>
                </View>

                <View style={s.content}>
                    <Text style={s.title}>{tutorial.title}</Text>
                    <View style={s.badges}>
                        <View style={[s.badge, { backgroundColor: '#EDF2F7' }]}>
                            <Ionicons name="star" size={14} color={Colors.accent} />
                            <Text style={s.badgeText}>{tutorial.difficulty}</Text>
                        </View>
                        <View style={[s.badge, { backgroundColor: '#EDF2F7' }]}>
                            <Ionicons name="time-outline" size={14} color={Colors.primary} />
                            <Text style={s.badgeText}>{tutorial.duration}</Text>
                        </View>
                        <View style={[s.badge, { backgroundColor: '#EDF2F7' }]}>
                            <Ionicons name={catIcon} size={14} color={Colors.primary} />
                            <Text style={s.badgeText}>{tutorial.category}</Text>
                        </View>
                    </View>

                    <Text style={s.sectionTitle}>Deskripsi</Text>
                    <Text style={s.desc}>{tutorial.description}</Text>

                    <Text style={s.sectionTitle}>Alat & Bahan</Text>
                    {tutorial.tools.map((tool: string, i: number) => (
                        <View key={i} style={s.toolRow}>
                            <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
                            <Text style={s.toolText}>{tool}</Text>
                        </View>
                    ))}

                    <Text style={s.sectionTitle}>Langkah-Langkah</Text>
                    {tutorial.steps.map((step: any, i: number) => (
                        <View key={i} style={s.stepRow}>
                            <View style={s.stepNum}><Text style={s.stepNumText}>{i + 1}</Text></View>
                            <View style={s.stepContent}>
                                <Text style={s.stepTitle}>{step.title}</Text>
                                <Text style={s.stepDesc}>{step.desc}</Text>
                            </View>
                        </View>
                    ))}

                    {related.length > 0 && (
                        <>
                            <Text style={s.sectionTitle}>Tutorial Terkait</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {related.map((t: any) => (
                                    <View key={t._id} style={{ width: 280, marginRight: Spacing.md }}>
                                        <TutorialCard tutorial={t} />
                                    </View>
                                ))}
                            </ScrollView>
                        </>
                    )}

                    <View style={{ height: Spacing.xxl }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.bg },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },
    loadText: { color: Colors.textLight, fontSize: FontSize.md },
    errorText: { color: Colors.error, fontSize: FontSize.lg, fontWeight: '700', marginBottom: Spacing.md },
    backBtn: { backgroundColor: Colors.accent, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm, borderRadius: Radius.sm },
    backBtnText: { color: Colors.white, fontWeight: '700' },
    headerBack: {
        flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
        paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    },
    headerBackText: { fontSize: FontSize.md, color: Colors.primary, fontWeight: '600' },
    heroWrap: { position: 'relative' },
    heroImg: { width: '100%', height: 220 },
    playOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    playBtn: {
        width: 56, height: 56, borderRadius: 28,
        backgroundColor: Colors.accent, justifyContent: 'center', alignItems: 'center',
    },
    content: { padding: Spacing.md },
    title: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text, marginBottom: Spacing.md },
    badges: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg, flexWrap: 'wrap' },
    badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: Spacing.sm + 4, paddingVertical: 6, borderRadius: Radius.full },
    badgeText: { fontSize: FontSize.xs, fontWeight: '600', color: Colors.text },
    sectionTitle: { fontSize: FontSize.lg, fontWeight: '800', color: Colors.primary, marginTop: Spacing.lg, marginBottom: Spacing.md },
    desc: { fontSize: FontSize.sm, color: Colors.textLight, lineHeight: 22 },
    toolRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
    toolText: { fontSize: FontSize.sm, color: Colors.text },
    stepRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
    stepNum: {
        width: 32, height: 32, borderRadius: 16,
        backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center',
    },
    stepNumText: { color: Colors.white, fontWeight: '800', fontSize: FontSize.sm },
    stepContent: { flex: 1 },
    stepTitle: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text, marginBottom: 4 },
    stepDesc: { fontSize: FontSize.sm, color: Colors.textLight, lineHeight: 20 },
});
