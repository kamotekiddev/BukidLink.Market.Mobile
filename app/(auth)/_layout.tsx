import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuthContext } from "../../context/AuthContext";

export default function AuthLayout() {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (!isLoading && isAuthenticated) return <Redirect href="/" />;

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="forgot-password" />
            <Stack.Screen name="register" />
        </Stack>
    );
}
