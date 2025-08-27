import React, { useEffect, useState } from "react";
import {
    FlatList,
    SafeAreaView,
    View,
    useWindowDimensions,
    Text,
} from "react-native";

import CategoryFilter from "@/features/home/CategoryFilter";
import ProductCard from "@/features/product/ProductCard";
import ProductCardSkeleton from "@/features/product/ProductCardSkeleton";
import CategoryFilterSkeleton from "@/features/product/CategoryFilterSkeleton";

import { useDelayLoading } from "@/hooks/useDelayLoading";
import { useDebouncedValue } from "@/hooks/useDebounce";
import { useGetProductCategories } from "@/features/product/useGetProductCategories";
import { useGetAllProducts } from "@/features/product/useGetAllProducts";
import { useLocalSearchParams, useRouter } from "expo-router";
import ProductHeader from "@/features/product/ProductHeader";

import { Product } from "@/features/product/types";

const MIN_LOADING_DURATION = 500; // in milliseconds
const MIN_PRODUCT_CARD_WIDTH = 176;
const MIN_NUM_OF_COLUMNS = 2;

type SearchParams = {
    category: string;
};

export default function ShopScreen() {
    const router = useRouter();
    const { category } = useLocalSearchParams<SearchParams>();
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const debouncedSearchQuery = useDebouncedValue(query, 500);

    const { width } = useWindowDimensions();
    const numOfColumns = Math.max(
        MIN_NUM_OF_COLUMNS,
        Math.floor(width / MIN_PRODUCT_CARD_WIDTH)
    );

    useEffect(() => {
        if (category) setActiveCategory(category);
    }, [category]);

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

    const handleProductPres = (item: Product) => {
        router.push(`/product/${item.id}`);
    };

    return (
        <SafeAreaView className="size-full bg-white">
            <View className="px-4 mb-2">
                <ProductHeader
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
                    columnWrapperClassName="gap-4"
                    contentContainerClassName="p-4 h-full gap-4"
                    numColumns={numOfColumns}
                    ListEmptyComponent={
                        <View className="justify-center items-center flex-1">
                            <Text>No Products Found</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <ProductCard
                            item={item}
                            compact={numOfColumns > 2}
                            onPress={() => handleProductPres(item)}
                        />
                    )}
                />
            )}
        </SafeAreaView>
    );
}
