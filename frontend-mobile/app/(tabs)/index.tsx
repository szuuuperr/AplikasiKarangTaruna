import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '../../constants/theme';
import { tutorialAPI } from '../../services/api';
import TutorialCard from '../../components/TutorialCard';
import CategoryCard from '../../components/CategoryCard';

const categories = [
  { name: 'Kayu', count: 3 },
  { name: 'Listrik', count: 1 },
  { name: 'Pipa', count: 1 },
  { name: 'Cat', count: 1 },
];

export default function HomeScreen() {
  const [tutorials, setTutorials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    tutorialAPI.getAll()
      .then((res) => setTutorials(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <View style={s.brand}>
            <Ionicons name="hammer" size={24} color={Colors.accent} />
            <Text style={s.brandText}>TukangKita</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/account')}>
            <Ionicons name="person-circle-outline" size={28} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={s.hero}>
          <Text style={s.heroTitle}>Belajar Bertukang{'\n'}Bersama Karang Taruna</Text>
          <Text style={s.heroSub}>Tutorial DIY untuk semua level keahlian</Text>
          <TouchableOpacity style={s.heroBtn} activeOpacity={0.85} onPress={() => router.push('/tutorials')}>
            <Text style={s.heroBtnText}>Jelajahi Tutorial</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Kategori Populer</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: Spacing.md }}>
            {categories.map((cat) => (
              <CategoryCard key={cat.name} name={cat.name} count={cat.count} />
            ))}
          </ScrollView>
        </View>

        <View style={s.section}>
          <Text style={[s.sectionTitle, { paddingHorizontal: Spacing.md }]}>Tutorial Terbaru</Text>
          {loading ? (
            <Text style={s.loadText}>Memuat tutorial...</Text>
          ) : (
            <View style={{ paddingHorizontal: Spacing.md }}>
              {tutorials.map((t) => <TutorialCard key={t._id} tutorial={t} />)}
            </View>
          )}
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  brandText: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.primary },
  hero: {
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  heroTitle: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.white, marginBottom: Spacing.sm },
  heroSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.75)', marginBottom: Spacing.lg },
  heroBtn: {
    backgroundColor: Colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 4,
    borderRadius: Radius.sm,
  },
  heroBtnText: { color: Colors.white, fontWeight: '700', fontSize: FontSize.sm },
  section: { marginBottom: Spacing.lg },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  loadText: { textAlign: 'center', color: Colors.textLight, paddingVertical: Spacing.xl },
});
