import React, { useMemo } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { useCart } from "./useCart";
import type { CartItem } from "./types";
import { CartItemRow } from "./CartItemRow";

export function CartList() {
    const { items, toggleSelect, increaseQty, decreaseQty, removeFromCart } =
        useCart();

    const renderItem: ListRenderItem<CartItem> = ({ item }) => (
        <CartItemRow
            item={item}
            onToggleSelect={toggleSelect}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            onRemove={removeFromCart}
        />
    );

    const isEmpty = useMemo(() => items.length === 0, [items.length]);

    if (isEmpty) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyTitle}>Your cart is empty</Text>
                <Text style={styles.emptySub}>Add items to get started</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.content}
        />
    );
}

const styles = StyleSheet.create({
    content: { backgroundColor: "#fff" },
    separator: { height: 1, backgroundColor: "#f3f4f6" },
    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    emptyTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
    emptySub: { marginTop: 8, color: "#6b7280" },
});
