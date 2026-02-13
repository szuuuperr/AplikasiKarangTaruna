import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';

type Tutorial = {
    _id: string;
    title: string;
    category: string;
    difficulty: string;
    duration: string;
    thumbnail: string;
};

const categoryIconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    Kayu: 'hammer',
    Listrik: 'flash',
    Pipa: 'water',
    Cat: 'color-palette',
};

export default function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
    const router = useRouter();
    const catIcon = categoryIconMap[tutorial.category] || 'construct';

    return (
        <TouchableOpacity
            style={s.card}
            activeOpacity={0.85}
            onPress={() => router.push(`/tutorial/${tutorial._id}`)}
        >
            <Image source={{ uri: tutorial.thumbnail }} style={s.thumb} contentFit="cover" transition={300} />
            <View style={s.badge}>
                <Ionicons name={catIcon} size={12} color={Colors.white} />
                <Text style={s.badgeText}>{tutorial.category}</Text>
            </View>
            <View style={s.info}>
                <Text style={s.title} numberOfLines={2}>{tutorial.title}</Text>
                <View style={s.meta}>
                    <View style={s.metaItem}>
                        <Ionicons name="time-outline" size={14} color={Colors.textLight} />
                        <Text style={s.metaText}>{tutorial.duration}</Text>
                    </View>
                    <View style={s.metaItem}>
                        <Ionicons name="star" size={14} color={Colors.accent} />
                        <Text style={s.metaText}>{tutorial.difficulty}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderRadius: Radius.lg,
        overflow: 'hidden',
        marginBottom: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    thumb: {
        width: '100%',
        height: 180,
    },
    badge: {
        position: 'absolute',
        top: Spacing.sm,
        left: Spacing.sm,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: Radius.sm,
    },
    badgeText: {
        color: Colors.white,
        fontSize: FontSize.xs,
        fontWeight: '700',
    },
    info: {
        padding: Spacing.md,
    },
    title: {
        fontSize: FontSize.md,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    meta: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: FontSize.xs,
        color: Colors.textLight,
    },
});
