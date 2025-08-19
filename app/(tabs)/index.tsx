import { FlatList, ScrollView, View } from "react-native";
import React, { useMemo, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "@/features/home/HomeHeader";
import CategoryFilter from "@/features/home/CategoryFilter";
import SectionHeader from "@/features/home/SectionHeader";

import { useHomeFilters } from "@/features/home/useHomeFilters";
import { mockProducts, HOME_CATEGORIES } from "@/features/home/mock";
import type { Product } from "@/features/product/types";
import ProductCard from "@/features/home/ProductCard"; // Adjust path if needed

// Extend your Produce type non-destructively so this UI can work with a variety of shapes.
type ExtendedProduce = Product & {
    imageUrl?: string;
    category?: string;
    isFeatured?: boolean;
    discountPercentage?: number;
    price?: number;
};

export default function HomeScreen() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [cartCount, setCartCount] = useState(0);

    const products = mockProducts as ExtendedProduce[];

    const { filtered, featured, discounted } = useHomeFilters<ExtendedProduce>({
        products,
        query,
        category: activeCategory,
        categories: HOME_CATEGORIES,
        categoryKey: "category",
        featuredKey: "isFeatured",
        discountKey: "discountPercentage",
        searchableKeys: ["name"],
    });

    const handleAddToCart = useCallback(() => {
        setCartCount((c) => c + 1);
    }, []);

    const handleCartPress = useCallback(() => {
        // Navigate to cart route if using a router
        // router.push("/cart");
    }, []);

    const showFeatured = useMemo(() => featured.length > 0, [featured]);
    const showDiscounted = useMemo(() => discounted.length > 0, [discounted]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-4 mb-2">
                <HomeHeader
                    query={query}
                    onChangeQuery={setQuery}
                    cartCount={cartCount}
                    onPressCart={handleCartPress}
                />
                <CategoryFilter
                    categories={["all", ...HOME_CATEGORIES]}
                    active={activeCategory}
                    onChange={setActiveCategory}
                />
            </View>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                {showFeatured && (
                    <View className="mt-2">
                        <SectionHeader title="Featured" />
                        <FlatList
                            horizontal
                            keyExtractor={(item) => item.id}
                            data={featured}
                            renderItem={({ item }) => (
                                <ProductCard
                                    item={item}
                                    onAddToCart={handleAddToCart}
                                    compact
                                />
                            )}
                            className="px-4"
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName="gap-x-4"
                        />
                    </View>
                )}

                <View className="mt-4">
                    <SectionHeader title="New Stock" />
                    <FlatList
                        horizontal
                        keyExtractor={(item) => item.id}
                        data={filtered}
                        renderItem={({ item }) => (
                            <ProductCard
                                item={item}
                                onAddToCart={handleAddToCart}
                                compact
                            />
                        )}
                        className="px-4"
                        showsHorizontalScrollIndicator={false}
                        contentContainerClassName="gap-x-4"
                    />
                </View>

                {showDiscounted && (
                    <View className="mt-4">
                        <SectionHeader title="On Sale" />
                        <FlatList
                            horizontal
                            keyExtractor={(item) => item.id}
                            data={discounted}
                            renderItem={({ item }) => (
                                <ProductCard
                                    item={item}
                                    onAddToCart={handleAddToCart}
                                    compact
                                />
                            )}
                            className="px-4"
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName="gap-x-4"
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
