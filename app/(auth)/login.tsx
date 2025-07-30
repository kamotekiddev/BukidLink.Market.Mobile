import { z } from "zod";
import { useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Text,
} from "react-native";
import { Link } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Icon } from "@rneui/themed";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "../../components/form-elements/FormInput";
import { login } from "../../services/auth";
import { useAuthContext } from "../../context/AuthContext";

const validationSchema = z.object({
    email: z.email("Please enter a valid email address."),
    password: z.string().min(1),
});

type LoginFormFields = z.infer<typeof validationSchema>;

const defaultValues: LoginFormFields = { email: "", password: "" };

export default function LoginScreen() {
    const ctx = useAuthContext();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const form = useForm<LoginFormFields>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    });

    const handlePress = form.handleSubmit(async (values) => {
        try {
            const res = await login(values);
            ctx.login(res.data);
            form.reset(defaultValues);
        } catch (err) {
            console.log(err);
        }
    });

    return (
        <FormProvider {...form}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={20}
                    style={styles.itemsContainer}
                >
                    <FormInput
                        name="email"
                        label="Email*"
                        placeholder="example@email.com"
                        autoCapitalize="none"
                    />
                    <FormInput
                        name="password"
                        label="Password*"
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
                    />
                    <Link href="/forgot-password" style={styles.link}>
                        Forgot Password?
                    </Link>
                    <Button title="Login" onPress={handlePress} />
                    <Text>
                        Doesn't have an account?{" "}
                        <Link href="/register" style={styles.link}>
                            Create
                        </Link>
                    </Text>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </FormProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    itemsContainer: { rowGap: 10, width: "100%", padding: 10 },
    link: {
        fontWeight: "bold",
        color: "blue",
    },
});
