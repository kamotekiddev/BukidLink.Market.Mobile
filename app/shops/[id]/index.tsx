import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Header, Icon } from "@rneui/base";
import { useGetShopDetailsQuery } from "../../../hooks/useGetShopDetailsQuery";

export default function Index() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const { data: shop } = useGetShopDetailsQuery(id);

    if (!shop) return;

    return (
        <>
            <ImageBackground
                resizeMode="cover"
                style={styles.img}
                source={{ uri: shop.coverPhotoUrl }}
            />
            <Header
                backgroundColor="transparent"
                leftComponent={
                    <Icon
                        type="feather"
                        name="arrow-left"
                        size={20}
                        onPress={() => router.back()}
                    />
                }
            />
            <View style={styles.container}>
                <Text style={{ color: "black" }}>{shop.name}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    img: {
        height: 250,
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        paddingTop: 160,
        paddingHorizontal: 10,
        flex: 1,
    },
});
