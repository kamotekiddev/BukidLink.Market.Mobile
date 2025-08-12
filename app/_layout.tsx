import React from "react";
import { Stack } from "expo-router";
import { AuthContextProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </AuthContextProvider>
        </QueryClientProvider>
    );
}
