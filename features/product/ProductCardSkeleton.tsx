// ProductCardSkeleton.tsx
import React from "react";
import { View } from "react-native";

type Props = {
    compact?: boolean;
};

export default function ProductCardSkeleton({ compact = false }: Props) {
    // Sizes roughly match typical ProductCard proportions
    const imageHeight = compact ? 110 : 150;

    return (
        <View
            className={`bg-white rounded-2xl border border-gray-100 overflow-hidden ${
                compact ? "w-[160px]" : "w-full"
            }`}
        >
            <View className="animate-pulse">
                {/* Image placeholder */}
                <View
                    className="bg-gray-200 w-full"
                    style={{ height: imageHeight }}
                />

                {/* Content */}
                <View className="p-3">
                    {/* Title line */}
                    <View className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    {/* Subtitle/description line */}
                    <View className="h-3 bg-gray-200 rounded w-1/2 mb-3" />

                    <View className="flex-row items-center justify-between">
                        {/* Price */}
                        <View className="h-5 bg-gray-200 rounded w-16" />
                        {/* Button pill */}
                        <View className="h-8 bg-gray-200 rounded-xl w-16" />
                    </View>
                </View>
            </View>
        </View>
    );
}
