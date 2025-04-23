import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { formatRupiah } from '@/lib/formatRupiah';
import { Skeleton } from 'moti/skeleton';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  recipe: string;
  created_at: string;
  updated_at: string;
};



const MenuCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  return (
    <Pressable className='w-1/2 pb-6' onPress={() => router.push({ pathname: "/product/details/[id]", params: { id: product.id } })}>
      <View className='bg-white rounded-lg h-78 h-fit mx-1'>
        <Image style={{ width: "100%", height: 150 }} className='rounded-t-lg' source={product.image ? { uri: product.image } : require("@/assets/images/placeholder.jpg")} resizeMode='cover' />
        <View className='px-2 py-2'>
          <Text className='text-black font-black text-xl'>{product.name}</Text>
          <Text className='text-gray-500 font-normal text-base'>{product.recipe}</Text>
          <View className='flex-row items-center'>
            <Text className='flex-1 text-amber-500 font-bold text-lg'>{formatRupiah(product.price)}</Text>
            <View className='p-2 rounded-full bg-amber-500'>
              <Image className='size-4' source={require("@/assets/images/plus.png")} tintColor={"#ecf0f1"} />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}
MenuCard.Skeleton = () => (
  <View style={{ width: '48%', marginBottom: 16 }}>
    <Skeleton.Group show>
      <Skeleton width="100%" height={150} radius={20} />
      <View style={{ padding: 10 }}>
        <Skeleton height={20} width="60%" radius={10} />
       
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Skeleton height={20} width={80} radius={10} />
          <Skeleton height={24} width={24} radius="round" />
        </View>
      </View>
    </Skeleton.Group>
  </View>
)


export default MenuCard