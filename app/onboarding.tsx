import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomFullButton from '@/components/CustomFullButton'

const onboarding = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <Image source={require('@/assets/images/img_onboarding.png')} />
            <Text className="text-black font-black text-4xl mt-12">JANJI KEMBALI</Text>
            <Text className="text-sm text-gray-500 font-light text-left mt-4">Cafe dan Coworking Space Kekinian yang membuat nyaman</Text>
            <CustomFullButton className="mt-8" />
        </View>
    )
}

export default onboarding