import { type ReactNode } from "react";
import { TextInputProps } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import Input from "@/components/inputs/Input";

interface Props
    extends Omit<TextInputProps, "value" | "onChangeText" | "onBlur"> {
    name: string;
    label?: string;
    required?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export default function FormInput({ name, ...props }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Input
                    {...props}
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={(_e) => field.onBlur()}
                    errorMessage={error?.message}
                />
            )}
        />
    );
}
