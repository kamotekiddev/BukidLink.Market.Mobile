import React, { useCallback } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
// import { useAuth } from "../state/auth";
import { UserAvatarCard } from "@/features/account/UserAvatarCard";
import { MenuButton } from "@/features/account/MenuButton";

export default function ProfileScreen() {
    const router = useRouter();
    // const { user, logout } = useAuth();

    const goToOrders = useCallback(() => {
        // Adjust route to match your app
        router.push("/account/orders");
    }, [router]);

    const goToCancellations = useCallback(() => {
        // Adjust route to match your app
        router.push("/account/cancellations");
    }, [router]);

    const goToSettings = useCallback(() => {
        // Adjust route to match your app
        router.push("/account/settings");
    }, [router]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 24 }}
                className="flex-1"
            >
                <View className="px-6 pt-4">
                    <UserAvatarCard
                        user={{
                            avatarUrl: "",
                            id: "1",
                            email: "kamotekid.dev@gmail.com",
                            name: "Joshua Dela Cruz",
                        }}
                    />

                    <View className="mt-8 gap-3">
                        <MenuButton label="Orders" onPress={goToOrders} />
                        <MenuButton
                            label="Cancellations"
                            onPress={goToCancellations}
                        />
                        <MenuButton label="Settings" onPress={goToSettings} />
                    </View>
                    <View className="mt-8 gap-3">
                        <MenuButton
                            label="Logout"
                            variant="destructive"
                            onPress={() => {}}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
