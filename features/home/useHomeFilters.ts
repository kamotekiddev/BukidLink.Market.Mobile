import { useMemo } from "react";

type UseHomeFiltersArgs<T> = {
    products: T[];
    query: string;
    category: string;
    categories: string[];
    categoryKey: keyof T | string;
    featuredKey?: keyof T | string;
    discountKey?: keyof T | string;
    searchableKeys?: (keyof T | string)[];
};

export function useHomeFilters<T>({
    products,
    query,
    category,
    categories,
    categoryKey,
    featuredKey,
    discountKey,
    searchableKeys = [],
}: UseHomeFiltersArgs<T>) {
    const normalizedCategory = category.toLowerCase();

    const filtered = useMemo(() => {
        let list = products;

        // Category filter
        if (
            normalizedCategory !== "all" &&
            categories.includes(normalizedCategory)
        ) {
            list = list.filter(
                (p: any) =>
                    (p?.[categoryKey as any]?.toLowerCase?.() ?? "") ===
                    normalizedCategory
            );
        }

        // Search filter
        if (query.trim()) {
            const q = query.trim().toLowerCase();
            list = list.filter((p: any) =>
                searchableKeys.some((k) =>
                    (
                        p?.[k as any]?.toString?.().toLowerCase?.() ?? ""
                    ).includes(q)
                )
            );
        }

        return list;
    }, [
        products,
        query,
        normalizedCategory,
        categories,
        categoryKey,
        searchableKeys,
    ]);

    const featured = useMemo(() => {
        if (!featuredKey) return [];
        return products.filter((p: any) => Boolean(p?.[featuredKey as any]));
    }, [products, featuredKey]);

    const discounted = useMemo(() => {
        if (!discountKey) return [];
        return products.filter(
            (p: any) => Number(p?.[discountKey as any] ?? 0) > 0
        );
    }, [products, discountKey]);

    return { filtered, featured, discounted };
}
