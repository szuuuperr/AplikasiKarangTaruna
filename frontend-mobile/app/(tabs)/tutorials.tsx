import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '../../constants/theme';
import { tutorialAPI } from '../../services/api';
import TutorialCard from '../../components/TutorialCard';

export default function TutorialsScreen() {
    const [tutorials, setTutorials] = useState<any[]>([]);
    const [filtered, setFiltered] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        tutorialAPI.getAll()
            .then((res) => { setTutorials(res.data); setFiltered(res.data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!search.trim()) { setFiltered(tutorials); return; }
        const q = search.toLowerCase();
        setFiltered(tutorials.filter((t: any) =>
            t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
        ));
    }, [search, tutorials]);

    return (
        <SafeAreaView style={s.safe} edges={['top']}>
            <View style={s.header}>
                <Text style={s.title}>Semua Tutorial</Text>
            </View>
            <View style={s.searchWrap}>
                <Ionicons name="search" size={18} color={Colors.textLight} />
                <TextInput
                    style={s.searchInput}
                    placeholder="Cari tutorial..."
                    placeholderTextColor={Colors.textLight}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            {loading ? (
                <Text style={s.loadText}>Memuat...</Text>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <TutorialCard tutorial={item} />}
                    contentContainerStyle={{ padding: Spacing.md }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={s.loadText}>Tutorial tidak ditemukan</Text>}
                />
            )}
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.bg },
    header: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md },
    title: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.primary },
    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.card,
        margin: Spacing.md,
        paddingHorizontal: Spacing.md,
        borderRadius: Radius.sm,
        borderWidth: 1,
        borderColor: Colors.border,
        gap: Spacing.sm,
    },
    searchInput: { flex: 1, paddingVertical: Spacing.sm + 2, fontSize: FontSize.sm, color: Colors.text },
    loadText: { textAlign: 'center', color: Colors.textLight, paddingVertical: Spacing.xl },
});
