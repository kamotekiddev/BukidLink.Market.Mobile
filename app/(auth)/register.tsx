import { Link } from "expo-router";
import {
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import React from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/services/auth";
import { useAuthContext } from "@/context/AuthContext";
import FormInput from "@/components/form-elements/FormInput";
import ThemedButton from "@/components/button";

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
            <SafeAreaView className="flex-1 justify-center">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={20}
                >
                    <ScrollView contentContainerClassName="gap-y-4 p-5">
                        <FormInput
                            autoCapitalize="none"
                            name="email"
                            label="Email*"
                            placeholder="Enter your email"
                        />
                        <FormInput
                            name="name"
                            label="Full Name*"
                            placeholder="Enter your full name"
                        />
                        <FormInput
                            label="Password*"
                            name="password"
                            secureTextEntry
                            placeholder="Enter your password"
                        />
                        <Text style={{ marginVertical: 10 }}>
                            Already have an account?{" "}
                            <Link href="/login">Login</Link>
                        </Text>
                        <ThemedButton
                            title="Create Account"
                            onPress={handlePress}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </FormProvider>
    );
}
