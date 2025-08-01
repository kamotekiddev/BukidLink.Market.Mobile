import React from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import ShopCard from "../../feature/shops/ShopCard";
import { useGetAllShopsQuery } from "../../hooks/useGetAllShopsQuery";

export default function ShopsScreen() {
    const router = useRouter();
    const { data: shops } = useGetAllShopsQuery();

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.container}
                data={shops}
                renderItem={({ item }) => (
                    <ShopCard
                        shop={item}
                        onPress={() => router.push(`/shops/${item.id}`)}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ gap: 5 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
