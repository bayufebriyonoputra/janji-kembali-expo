import { View, Text, TextInput, Pressable, Image } from 'react-native'
import React from 'react'

const HomePage = () => {
  return (
    <View className='flex-1 px-4 py-4'>
      <Text className='font-light text-base text-black'>Selamat Datang</Text>
      <Text className='font-bold text-xl text-black'>Bayu Febriyono</Text>

      <Text className='text-black font-black text-3xl mt-6'>Pesan Makanan</Text>
      <Text className='text-black font-black text-3xl'>Kini Lebih Mudah</Text>

      <View className='flex-row px-2 mt-7 gap-8 items-center'>
        <TextInput
          placeholder='Cari menu...'
          className='w-full flex-1 border border-orange-400 rounded-lg bg-gray-100 pl-4'
        />
        <Pressable className='bg-amber-500 px-3 py-3 rounded-xl'>
          <Image source={require("@/assets/images/cart.png")} tintColor={"#ecf0f1"} className='size-8' />
        </Pressable>
      </View>
    </View>
  )
}

export default HomePage