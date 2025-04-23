import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { deleteToken } from '@/lib/secureStore'
import { useRouter } from 'expo-router'

const SettingsPage = () => {

  const router = useRouter();

  const logout = async () => {
    await deleteToken();
    router.replace("/login");


  }

  return (
    <View>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  )
}

export default SettingsPage