import React from "react";
import { Redirect, Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Feather";

import { useAuthContext } from "@/context/AuthContext";

export default function MainLayout() {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (!isAuthenticated && !isLoading) return <Redirect href="/login" />;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                // tabBarInactiveTintColor: theme.colors.background,
                // tabBarActiveTintColor: theme.colors.primary,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon size={20} name="home" color={color} />
                    ),
                    tabBarLabel: "Home",
                }}
            />
            <Tabs.Screen
                name="shop"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon size={20} name="shopping-bag" color={color} />
                    ),
                    tabBarLabel: "Shop",
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon size={20} name="user" color={color} />
                    ),
                    tabBarLabel: "Account",
                }}
            />
        </Tabs>
    );
}
