import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Product } from "@/features/product/types";

type ExtendedProduce = Product & {
    imageUrl?: string;
    category?: string;
    isFeatured?: boolean;
    discountPercentage?: number;
    price?: number;
};

type Props = {
    item: ExtendedProduce;
    onAddToCart?: (item: ExtendedProduce) => void;
    compact?: boolean;
};

export default function ProductCard({ item, onAddToCart, compact }: Props) {
    const price = item.price ?? 0;
    const discount = item.discountPercentage ?? 0;
    const hasDiscount = discount > 0;
    const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

    return (
        <View
            className={`rounded-2xl border border-gray-200 ${compact ? "w-40" : "w-[48%]"} bg-white overflow-hidden`}
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

                <Pressable
                    onPress={() => onAddToCart?.(item)}
                    className="mt-3 flex-row items-center justify-center rounded-xl bg-green-600 h-10"
                >
                    <Ionicons name="add" size={18} color="#fff" />
                    <Text className="text-white font-semibold ml-1">Add</Text>
                </Pressable>
            </View>
        </View>
    );
}
