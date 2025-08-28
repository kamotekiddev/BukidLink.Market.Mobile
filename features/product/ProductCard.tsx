import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Product } from "@/features/product/types";
import { formatCurrency } from "@/utils";

type ExtendedProduce = Product & {
    isFeatured?: boolean;
    discountPercentage?: number;
};

type Props = {
    item: ExtendedProduce;
    compact?: boolean;
    onPress: () => void;
};

export default function ProductCard({ item, compact, onPress }: Props) {
    const discount = item.discountPercentage ?? 0;
    const hasDiscount = discount > 0;

    return (
        <Pressable
            className={`rounded-2xl border border-gray-200 ${compact ? "w-44" : "flex-1"} bg-white overflow-hidden`}
            onPress={onPress}
        >
            <View className="relative">
                <Image
                    source={{ uri: item.photoUrl }}
                    className={`${compact ? "h-28" : "h-32"} w-full`}
                    resizeMode="cover"
                />
                {hasDiscount && (
                    <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full">
                        <Text className="text-white text-xs font-semibold">
                            -{discount}%
                        </Text>
                    </View>
                )}
            </View>
            <View className="p-3">
                <Text numberOfLines={1} className="text-gray-900 font-medium">
                    {(item as any)?.name ?? "Unnamed"}
                </Text>
                <View className="flex-row items-center gap-2 mt-1">
                    <Text className="text-green-700 font-semibold">
                        {formatCurrency(item.priceRange?.[0] || 0)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}
