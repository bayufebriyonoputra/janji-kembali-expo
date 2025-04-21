import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import SquareButton from '@/components/SquareButton';
import {Ionicons} from "@expo/vector-icons";

const DetailPage = () => {
  const { id } = useLocalSearchParams();
  const [count, setCount] = React.useState(1);


  return (
    <View>
      <ScrollView>
        <Image style={{ width: '100%', height: 300 }} resizeMode='cover' source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOX2YyS0W1LnrD5eyd-7Q9kvO1JGvE80AXXA&s' }} />


        <View className='px-4 mt-12'>
          <Text className='font-black text-2xl'>Burger Ayam</Text>

          <View className='flex flex-row mt-4 justify-between items-center'>
            <Text className='font-bold text-xl text-amber-500'>Rp. 32.000</Text>

            {/* Plus Button */}
            <View className='flex flex-row items-center gap-4'>
              <SquareButton  onPress={() => {
                if (count > 1) setCount(prev => prev - 1);
              }}> 
                <Ionicons name="remove-outline" size={20} color={"white"} />
              </SquareButton>
              <Text className='text-xl font-bold'>{count}</Text>
              <SquareButton onPress={() => setCount(prev => prev + 1)} > <Ionicons name="add-outline" size={20} color={"white"} /> </SquareButton>
            </View>

          </View>

          <Text className='text-xl font-bold mt-4'>Deskripsi</Text>
          <Text className='text-lg font-normal mt-3'>Burger ayam kami adalah pilihan yang sempurna untuk anda yang ingin menikmati makanan cepat saji yang lezat dan bergizi. Setiap gigitan pada burger ayam kami membrikan pengalaman yang memuaskan dengan kombinasi patty ayam panggang yang juicy, lettuce segar, tomat yang segar, dan saus mayo yang menggugah selera.</Text>

              {/* Masukkan keranjang button */}
              <Pressable className='mt-16'>
                {({ pressed }) => (
                  <View className={`w-full ${pressed ? 'bg-amber-600' : 'bg-amber-500'} rounded-xl`}>
                      <Text className='text-center text-white py-6  font-bold text-2xl'>Masukkan Ke Keranjang</Text>
                  </View>
                )}
              </Pressable>
        </View>
      </ScrollView>

    </View>
  )
}

export default DetailPage