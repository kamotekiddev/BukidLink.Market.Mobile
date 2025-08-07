import React from "react";
import { Redirect, Tabs } from "expo-router";
import { useAuthContext } from "../../context/AuthContext";
import { Icon } from "@rneui/themed";

export default function MainLayout() {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (!isAuthenticated && !isLoading) return <Redirect href="/login" />;

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: () => <Icon type="feather" name="home" />,
                    tabBarLabel: "Home",
                }}
            />
            <Tabs.Screen
                name="shop"
                options={{
                    tabBarIcon: () => (
                        <Icon type="feather" name="shopping-bag" />
                    ),
                    tabBarLabel: "Shop",
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    tabBarIcon: () => (
                        <Icon type="feather" name="shopping-cart" />
                    ),
                    tabBarLabel: "Cart",
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: () => <Icon type="feather" name="user" />,
                    tabBarLabel: "Profile",
                }}
            />
        </Tabs>
    );
}
