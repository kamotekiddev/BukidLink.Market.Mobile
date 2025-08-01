import React from "react";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthContextProvider } from "../context/AuthContext";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <Slot />
            </QueryClientProvider>
        </AuthContextProvider>
    );
}
