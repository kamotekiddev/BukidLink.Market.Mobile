import React, { useState } from "react";
import {
    FlatList,
    SafeAreaView,
    View,
    useWindowDimensions,
    Text,
} from "react-native";

import HomeHeader from "@/features/home/HomeHeader";
import CategoryFilter from "@/features/home/CategoryFilter";
import ProductCard from "@/features/product/ProductCard";
import ProductCardSkeleton from "@/features/product/ProductCardSkeleton";
import CategoryFilterSkeleton from "@/features/product/CategoryFilterSkeleton";

import { useDelayLoading } from "@/hooks/useDelayLoading";
import { useDebouncedValue } from "@/hooks/useDebounce";
import { useGetProductCategories } from "@/features/product/useGetProductCategories";
import { useGetAllProducts } from "@/features/product/useGetAllProducts";

const MIN_LOADING_DURATION = 500; // in milliseconds

export default function ShopScreen() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const debouncedSearchQuery = useDebouncedValue(query, 500);

    const MIN_WIDTH = 160;
    const { width } = useWindowDimensions();
    const numOfColumns = Math.floor(width / MIN_WIDTH);

    const { data: categories, isLoading: isCategoriesFetching } =
        useGetProductCategories();

    const { data: products, isLoading: isProductsFetching } = useGetAllProducts(
        {
            categoryId:
                activeCategory === "All"
                    ? ""
                    : categories?.find((c) => c.name == activeCategory)?.id!,
            search: debouncedSearchQuery,
        }
    );

    const showCategoriesSkeleton = useDelayLoading(isCategoriesFetching, {
        minDuration: MIN_LOADING_DURATION,
    });

    const showProductsSkeleton = useDelayLoading(isProductsFetching, {
        minDuration: MIN_LOADING_DURATION,
    });

    return (
        <SafeAreaView className="size-full bg-white">
            <View className="px-4 mb-2">
                <HomeHeader
                    query={query}
                    onChangeQuery={setQuery}
                    cartCount={10}
                    onPressCart={() => {}}
                />
                {showCategoriesSkeleton ? (
                    <CategoryFilterSkeleton />
                ) : (
                    <CategoryFilter
                        categories={[
                            "All",
                            ...(categories || []).map((c) => c.name),
                        ]}
                        active={activeCategory}
                        onChange={setActiveCategory}
                    />
                )}
            </View>
            {showProductsSkeleton ? (
                <FlatList
                    data={Array.from({ length: numOfColumns * 4 })}
                    renderItem={() => (
                        <View className="flex-1">
                            <ProductCardSkeleton />
                        </View>
                    )}
                    numColumns={numOfColumns}
                    columnWrapperClassName="gap-x-4"
                    contentContainerClassName="p-4"
                />
            ) : (
                <FlatList
                    key={numOfColumns}
                    data={products}
                    columnWrapperClassName="gap-x-4"
                    contentContainerClassName="p-4 h-full"
                    numColumns={numOfColumns}
                    ListEmptyComponent={
                        <View className="justify-center items-center flex-1">
                            <Text>No Products Found</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <ProductCard item={item} compact={numOfColumns >= 3} />
                    )}
                />
            )}
        </SafeAreaView>
    );
}
