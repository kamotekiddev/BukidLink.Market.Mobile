import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Icon } from "@rneui/base";
import { useAuthContext } from "../../context/AuthContext";

export default function Profile() {
    const ctx = useAuthContext();

    const handleLogout = () => ctx.logout();

    return (
        <SafeAreaView>
            <Button
                onPress={handleLogout}
                title="Logout"
                icon={
                    <Icon
                        type="antdesign"
                        name="logout"
                        color="white"
                        size={18}
                        style={{ marginLeft: 10 }}
                    />
                }
                iconRight
            />
        </SafeAreaView>
    );
}
