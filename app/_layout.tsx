import React from "react";
import { Stack } from "expo-router";
import { AuthContextProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="cart"
                        options={{ presentation: "modal" }}
                    />
                    <Stack.Screen name="tabs" />
                </Stack>
            </AuthContextProvider>
        </QueryClientProvider>
    );
}
