import { useRouter } from "expo-router";
import { FlatList } from "react-native";

import { useGetAllProducts } from "./useGetAllProducts";
import ProductCard from "./ProductCard";

export default function ProductList() {
    const router = useRouter();
    const { data: produce } = useGetAllProducts();

    return (
        <FlatList
            data={produce}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ProductCard
                    produce={item}
                    onPress={() => router.push(`/produce/${item.id}`)}
                />
            )}
            numColumns={2}
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={{ padding: 10 }}
        />
    );
}
