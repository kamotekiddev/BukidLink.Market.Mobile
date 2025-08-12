import React, { memo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { CartItem } from "./types";
import { formatCurrency } from "@/utils";

type Props = {
    item: CartItem;
    onToggleSelect: (id: string) => void;
    onIncrease: (id: string) => void;
    onDecrease: (id: string) => void;
    onRemove: (id: string) => void;
};

function CartItemRowBase({
    item,
    onToggleSelect,
    onIncrease,
    onDecrease,
    onRemove,
}: Props) {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => onToggleSelect(item.id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: item.selected }}
                style={[
                    styles.checkbox,
                    item.selected && styles.checkboxSelected,
                ]}
            >
                {item.selected ? (
                    <Text style={styles.checkboxTick}>✓</Text>
                ) : null}
            </Pressable>

            {item.photoUrl ? (
                <Image source={{ uri: item.photoUrl }} style={styles.image} />
            ) : (
                <View style={[styles.image, styles.imagePlaceholder]}>
                    <Text style={styles.imagePlaceholderText}>IMG</Text>
                </View>
            )}

            <View style={styles.info}>
                <Text numberOfLines={1} style={styles.title}>
                    {item.name}
                </Text>
                <Text style={styles.price}>{formatCurrency(item.price)}</Text>

                <View style={styles.row}>
                    <View style={styles.qtyControl}>
                        <Pressable
                            onPress={() => onDecrease(item.id)}
                            style={styles.qtyBtn}
                            hitSlop={8}
                        >
                            <Text style={styles.qtyBtnText}>−</Text>
                        </Pressable>
                        <Text style={styles.qtyText}>{item.quantity}</Text>
                        <Pressable
                            onPress={() => onIncrease(item.id)}
                            style={styles.qtyBtn}
                            hitSlop={8}
                        >
                            <Text style={styles.qtyBtnText}>＋</Text>
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={() => onRemove(item.id)}
                        style={styles.removeBtn}
                        hitSlop={8}
                    >
                        <Text style={styles.removeText}>Remove</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export const CartItemRow = memo(CartItemRowBase);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 12,
        gap: 12,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 1.5,
        borderColor: "#ccc",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxSelected: {
        backgroundColor: "#0ea5e9",
        borderColor: "#0ea5e9",
    },
    checkboxTick: {
        color: "#fff",
        fontWeight: "600",
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        backgroundColor: "#f3f4f6",
    },
    imagePlaceholder: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    imagePlaceholderText: { color: "#9ca3af", fontSize: 12 },
    info: { flex: 1, gap: 6 },
    title: { fontSize: 16, fontWeight: "600", color: "#111827" },
    price: { fontSize: 14, color: "#374151" },
    row: {
        marginTop: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    qtyControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        borderRadius: 8,
        overflow: "hidden",
    },
    qtyBtn: { paddingHorizontal: 10, paddingVertical: 6 },
    qtyBtnText: { fontSize: 16, fontWeight: "700", color: "#111827" },
    qtyText: { width: 32, textAlign: "center", fontSize: 14, color: "#111827" },
    removeBtn: { paddingHorizontal: 8, paddingVertical: 6 },
    removeText: { color: "#ef4444", fontWeight: "600" },
});
