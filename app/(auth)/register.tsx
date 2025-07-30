import {
    Text,
    SafeAreaView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import React from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/form-elements/FormInput";
import { Button } from "@rneui/base";
import { register } from "../../services/auth";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "expo-router";

const validationSchema = z.object({
    email: z.email("Please enter a valid email."),
    password: z.string().min(8).max(16),
    name: z.string().min(4).max(40),
});

type RegisterFormFields = z.infer<typeof validationSchema>;

const defaultValues: RegisterFormFields = { email: "", password: "", name: "" };

export default function Register() {
    const ctx = useAuthContext();
    const form = useForm<RegisterFormFields>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    });

    const handlePress = form.handleSubmit(async (values) => {
        try {
            const res = await register(values);
            ctx.login(res.data);
        } catch (err) {
            console.error(err);
        }
    });

    return (
        <FormProvider {...form}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={20}
                    style={{ width: "100%", padding: 10 }}
                >
                    <FormInput
                        autoCapitalize="none"
                        name="email"
                        label="Email"
                        placeholder="example@email.com"
                    />
                    <FormInput
                        name="name"
                        label="Full Name"
                        placeholder="Last Name, First Name, Middle Name"
                    />
                    <FormInput
                        name="password"
                        secureTextEntry
                        placeholder="Enter your password"
                    />
                    <Text style={{ marginVertical: 10 }}>
                        Already have an account?{" "}
                        <Link href="/login" style={styles.link}>
                            Login
                        </Link>
                    </Text>
                    <Button title="Create Account" onPress={handlePress} />
                </KeyboardAvoidingView>
            </SafeAreaView>
        </FormProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    link: {
        fontWeight: "bold",
        color: "blue",
    },
});
