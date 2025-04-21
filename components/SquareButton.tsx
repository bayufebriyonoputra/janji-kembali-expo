import { View, Text, Pressable } from 'react-native'
import  { ReactNode } from 'react'

const SquareButton = ({ children, onPress }: { children: ReactNode, onPress?: () => void }) => {
    return (
        <Pressable onPress={onPress}>
            {({ pressed }) => (
                <View className={`w-12 h-12 flex items-center justify-center rounded-md  ${pressed ? 'bg-amber-600' : 'bg-amber-500'}`}>
                    <Text className='text-white'>{children}</Text>
                </View>
            )}

        </Pressable>
    )
}

export default SquareButton