import { z } from "zod";
import { useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Icon } from "@rneui/themed";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "../../components/form-elements/FormInput";
import { login } from "../../services/auth";
import { useRouter } from "expo-router";

const validationSchema = z.object({
    email: z.email("Please enter a valid email address."),
    password: z.string().min(1),
});

type LoginFormFields = z.infer<typeof validationSchema>;

const defaultValues: LoginFormFields = { email: "", password: "" };

export default function LoginScreen() {
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const form = useForm<LoginFormFields>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    });

    const handlePress = form.handleSubmit(async (values) => {
        try {
            const res = await login(values);
            form.reset(defaultValues);
            console.log(res.data);
            router.push("/");
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
                    style={{ width: "100%", padding: 10 }}
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
                    <Button title="Login" type="solid" onPress={handlePress} />
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
});
