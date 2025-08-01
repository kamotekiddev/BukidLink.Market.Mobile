import React from "react";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import { Header, Icon } from "@rneui/base";

export default function Products() {
    const router = useRouter();
    return (
        <>
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
            <Text>Products</Text>
        </>
    );
}
