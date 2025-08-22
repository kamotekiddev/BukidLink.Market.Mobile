// CategoryFilterSkeleton.tsx
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";

type Props = {
    count?: number; // number of placeholder pills
    minWidth?: number; // min pill width
    maxWidth?: number; // max pill width
    showLeadingAll?: boolean; // show a slightly wider first pill
};

export default function CategoryFilterSkeleton({
    count = 8,
    minWidth = 60,
    maxWidth = 110,
    showLeadingAll = true,
}: Props) {
    const widths = useMemo(() => {

        return Array.from({ length: count }, (_, i) => {
            if (showLeadingAll && i === 0) return Math.max(maxWidth, 100);

            return Math.floor(
                Math.random() * (maxWidth - minWidth + 1) + minWidth
            );
        });
    }, [count, minWidth, maxWidth, showLeadingAll]);

    return (
        <View className="mt-3">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                    {widths.map((w, idx) => (
                        <View
                            key={idx}
                            className="animate-pulse bg-gray-200 rounded-full h-9"
                            style={{ width: w }}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
