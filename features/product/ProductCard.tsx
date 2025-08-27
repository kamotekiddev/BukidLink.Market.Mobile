import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Product } from "@/features/product/types";

type ExtendedProduce = Product & {
    isFeatured?: boolean;
    discountPercentage?: number;
    price?: number;
};

type Props = {
    item: ExtendedProduce;
    compact?: boolean;
    onPress: () => void;
};

export default function ProductCard({ item, compact, onPress }: Props) {
    const price = item.price ?? 0;
    const discount = item.discountPercentage ?? 0;
    const hasDiscount = discount > 0;
    const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

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
                    {hasDiscount ? (
                        <>
                            <Text className="text-green-700 font-semibold">
                                ${finalPrice.toFixed(2)}
                            </Text>
                            <Text className="text-gray-400 line-through">
                                ${price.toFixed(2)}
                            </Text>
                        </>
                    ) : (
                        <Text className="text-gray-900 font-semibold">
                            ${price.toFixed(2)}
                        </Text>
                    )}
                </View>
            </View>
        </Pressable>
    );
}
