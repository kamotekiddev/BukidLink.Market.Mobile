import React from 'react';
import { Image, Text, View } from 'react-native';
import type { AccountUser } from './types';

type Props = {
  user: AccountUser;
};

function getInitials(name: string) {
  const parts = name.split(' ').filter(Boolean);
  const initials = parts.slice(0, 2).map(p => p[0]?.toUpperCase() ?? '').join('');
  return initials || 'U';
}

export function UserAvatarCard({ user }: Props) {
  const hasAvatar = !!user.avatarUrl;

  return (
    <View className="w-full items-center gap-3">
      {hasAvatar ? (
        <Image
          source={{ uri: user.avatarUrl }}
          accessibilityLabel={`${user.name} avatar`}
          className="h-24 w-24 rounded-full"
        />
      ) : (
        <View className="h-24 w-24 items-center justify-center rounded-full bg-gray-200">
          <Text className="text-2xl font-semibold text-gray-700">{getInitials(user.name)}</Text>
        </View>
      )}

      <View className="items-center">
        <Text className="text-lg font-semibold text-gray-900">{user.name}</Text>
        <Text className="text-gray-500">{user.email}</Text>
      </View>
    </View>
  );
}
