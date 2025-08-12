import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "./useCart";
import type { CartItem } from "./types";
import { formatCurrency } from "@/utils";

type Props = {
    onCheckout?: (selectedItems: CartItem[]) => void;
};

export function CartSummary({ onCheckout }: Props) {
    const { items, selectedItems, selectedSubtotal, selectAll } = useCart();

    const allSelected = useMemo(
        () => items.length > 0 && items.every((i) => i.selected),
        [items]
    );

    const canCheckout = selectedItems.length > 0;

    return (
        <View style={styles.container}>
            <View style={styles.total}>
                <Text style={styles.totalLabel}>Subtotal:</Text>
                <Text style={styles.totalValue}>
                    {formatCurrency(selectedSubtotal)}
                </Text>
            </View>

            <Pressable
                onPress={() => onCheckout?.(selectedItems)}
                disabled={!canCheckout}
                style={[
                    styles.checkoutBtn,
                    !canCheckout && styles.checkoutBtnDisabled,
                ]}
                accessibilityRole="button"
                accessibilityState={{ disabled: !canCheckout }}
            >
                <Text style={styles.checkoutText}>Checkout</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        padding: 12,
        backgroundColor: "#ffffff",
        gap: 10,
    },
    total: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    totalLabel: { fontSize: 16, color: "#374151" },
    totalValue: { fontSize: 18, fontWeight: "700", color: "#111827" },
    checkoutBtn: {
        marginTop: 6,
        backgroundColor: "#0ea5e9",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    checkoutBtnDisabled: {
        backgroundColor: "#93c5fd",
    },
    checkoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
