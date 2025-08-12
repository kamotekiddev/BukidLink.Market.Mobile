import React from "react";
import { View, ScrollView } from "react-native";
import ProductCard from "./ProductCard";
import { Produce } from "@/features/produce/types";

type ExtendedProduce = Produce & {
    imageUrl?: string;
    category?: string;
    isFeatured?: boolean;
    discountPercentage?: number;
    price?: number;
};

type Props = {
    data: ExtendedProduce[];
    layout?: "grid" | "horizontal";
    onAddToCart?: (item: ExtendedProduce) => void;
};

export default function ProductList({
    data,
    layout = "grid",
    onAddToCart,
}: Props) {
    if (layout === "horizontal") {
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
                className="mt-1"
            >
                {data.map((item) => (
                    <ProductCard
                        key={item.id}
                        item={item}
                        onAddToCart={onAddToCart}
                        compact={true}
                    />
                ))}
            </ScrollView>
        );
    }

    return (
        <View className="mt-2 px-1">
            <View className="flex-row flex-wrap justify-between gap-y-3 px-3">
                {data.map((item) => (
                    <ProductCard
                        key={item.id}
                        item={item}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </View>
        </View>
    );
}
