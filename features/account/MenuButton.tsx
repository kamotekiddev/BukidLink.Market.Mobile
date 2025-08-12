import React from 'react';
import { Pressable, Text, View } from 'react-native';

type Props = {
  label: string;
  onPress: () => void | Promise<void>;
  variant?: 'default' | 'destructive';
};

export function MenuButton({ label, onPress, variant = 'default' }: Props) {
  const isDestructive = variant === 'destructive';
  return (
    <Pressable
      onPress={onPress}
      className={`w-full rounded-xl border p-4 ${
        isDestructive
          ? 'border-red-300 bg-red-50 active:bg-red-100'
          : 'border-gray-200 bg-white active:bg-gray-50'
      }`}
    >
      <View className="flex-row items-center justify-between">
        <Text className={`text-base ${isDestructive ? 'text-red-700' : 'text-gray-900'}`}>
          {label}
        </Text>
        <Text className={`text-xl ${isDestructive ? 'text-red-700' : 'text-gray-400'}`}>›</Text>
      </View>
    </Pressable>
  );
}
