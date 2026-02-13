import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';
import * as Haptics from 'expo-haptics';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    Kayu: 'hammer',
    Listrik: 'flash',
    Pipa: 'water',
    Cat: 'color-palette',
};

type Props = { name: string; count: number };

export default function CategoryCard({ name, count }: Props) {
    const icon = iconMap[name] || 'construct';

    return (
        <TouchableOpacity
            style={s.card}
            activeOpacity={0.8}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        >
            <View style={s.iconWrap}>
                <Ionicons name={icon} size={24} color={Colors.primary} />
            </View>
            <Text style={s.name}>{name}</Text>
            <Text style={s.count}>{count} tutorial</Text>
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderRadius: Radius.md,
        padding: Spacing.md,
        alignItems: 'center',
        width: 90,
        marginRight: Spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    iconWrap: {
        width: 48,
        height: 48,
        borderRadius: Radius.full,
        backgroundColor: '#EDF2F7',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.sm,
    },
    name: {
        fontSize: FontSize.sm,
        fontWeight: '700',
        color: Colors.text,
    },
    count: {
        fontSize: FontSize.xs,
        color: Colors.textLight,
        marginTop: 2,
    },
});
