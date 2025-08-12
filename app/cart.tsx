import React from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { CartList, CartProvider, CartSummary, CartItem } from "@/features/cart";
import { CartHeader } from "@/features/cart/CartHeader";
import { CartSelectAllButton } from "@/features/cart/CartSelectAllButton";

export default function CartScreen() {
    const handleCheckout = (selectedItems: CartItem[]) => {
        // Replace with your own navigation or checkout logic.
        // Example: navigate("Checkout", { items: selectedItems });
        Alert.alert(
            "Checkout",
            `Proceeding with ${selectedItems.length} item(s).`
        );
    };

    return (
        <CartProvider>
            <SafeAreaView style={styles.safe}>
                <CartHeader
                    title="Your Cart"
                    fallbackPath="/"
                    right={<CartSelectAllButton />}
                />
                <View style={styles.container}>
                    <View style={styles.list}>
                        <CartList />
                    </View>
                    <CartSummary onCheckout={handleCheckout} />
                </View>
            </SafeAreaView>
        </CartProvider>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#fff" },
    container: { flex: 1 },
    list: { flex: 1 },
});
