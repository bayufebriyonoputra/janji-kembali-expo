import { View, Text, Pressable } from 'react-native'
import React from 'react'

const CustomFullButton = ({ className, onPress }: { className?: string, onPress?: () => void }) => {
    return (
        <Pressable className={`w-full px-12 ${className}`} onPress={onPress}>
            {({ pressed }) => (
                <View className={`w-full text-cente px-4 py-2 rounded-lg min-h-16 justify-center ${pressed? 'bg-amber-400' : 'bg-amber-500'}`}>
                    <Text className="text-white text-center font-semibold text-2xl">GET STARTED</Text>
                </View>
            )}

        </Pressable>
    )
}

export default CustomFullButton