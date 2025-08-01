import React from "react";
import { Tabs } from "expo-router";
import { Icon } from "@rneui/themed";

export default function _Layout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: "Store",
                    tabBarIcon: () => (
                        <Icon type="feather" name="shopping-bag" />
                    ),
                }}
            />
            <Tabs.Screen
                name="products"
                options={{
                    tabBarLabel: "Products",
                    tabBarIcon: () => <Icon type="featuer" name="list" />,
                }}
            />
        </Tabs>
    );
}
