import React from "react";
import { Input, type InputProps } from "@rneui/themed";
import { Controller, useFormContext } from "react-hook-form";

interface Props extends Omit<InputProps, "value" | "onChangeText"> {
    name: string;
}

export default function FormInput({ name, ...props }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Input
                    {...props}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    errorMessage={error?.message}
                />
            )}
            name={name}
        />
    );
}
