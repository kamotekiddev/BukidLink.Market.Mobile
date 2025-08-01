import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";

import { Shop } from "../../types/shop";

interface Props {
    shop: Shop;
    onPress: (shopId: Shop["id"]) => void;
}
export default function ShopCard({ shop, onPress }: Props) {
    console.log(shop);

    return (
        <TouchableOpacity style={{ flex: 1 }} onPress={() => onPress(shop.id)}>
            <Card containerStyle={styles.container}>
                <Card.Image source={{ uri: shop.coverPhotoUrl }} />
                <Card.Title style={styles.title}>{shop.name}</Card.Title>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        margin: 0,
        borderRadius: 5,
        overflow: "hidden",
    },
    title: {
        textAlign: "left",
        marginBottom: 0,
        padding: 10,
    },
});
