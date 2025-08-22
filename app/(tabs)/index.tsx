import { FlatList, ScrollView, View } from "react-native";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "@/features/home/HomeHeader";
import CategoryFilter from "@/features/home/CategoryFilter";
import SectionHeader from "@/features/home/SectionHeader";

import { HOME_CATEGORIES } from "@/features/home/mock";
import ProductCard from "@/features/product/ProductCard";
import { useGetAllProducts } from "@/features/product/useGetAllProducts";

export default function HomeScreen() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [cartCount, setCartCount] = useState(0);

    const { data: products, isLoading } = useGetAllProducts();

    const handleAddToCart = useCallback(() => {
        setCartCount((c) => c + 1);
    }, []);

    if (isLoading) return null;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-4 mb-2">
                <HomeHeader
                    query={query}
                    onChangeQuery={setQuery}
                    cartCount={cartCount}
                    onPressCart={() => {}}
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
                <View className="mt-2">
                    <SectionHeader title="Featured" />
                    <FlatList
                        horizontal
                        keyExtractor={(item) => item.id}
                        data={products}
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

                <View className="mt-4">
                    <SectionHeader title="New Stock" />
                    <FlatList
                        horizontal
                        keyExtractor={(item) => item.id}
                        data={products}
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

                <View className="mt-4">
                    <SectionHeader title="On Sale" />
                    <FlatList
                        horizontal
                        keyExtractor={(item) => item.id}
                        data={products}
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
            </ScrollView>
        </SafeAreaView>
    );
}
