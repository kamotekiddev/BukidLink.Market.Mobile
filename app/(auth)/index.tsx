import {
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import React, { useState } from "react";
import { Input, Button, Icon } from "@rneui/themed";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handlePress = () => {
        console.log(JSON.stringify({ email, password }, null, 2));
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={20}
                style={{ width: "100%", padding: 10 }}
            >
                <Input
                    label="Email"
                    placeholder="example@email.com"
                    onChangeText={setEmail}
                />
                <Input
                    label="Password"
                    secureTextEntry={!isPasswordVisible}
                    placeholder="Your Password"
                    rightIcon={
                        <Icon
                            type="feather"
                            name={isPasswordVisible ? "eye" : "eye-off"}
                            onPress={() =>
                                setIsPasswordVisible((prev) => !prev)
                            }
                        />
                    }
                    onChangeText={setPassword}
                />
                <Button title="Login" type="solid" onPress={handlePress} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
