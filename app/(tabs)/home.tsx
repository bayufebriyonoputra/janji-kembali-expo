import { View, Text, TextInput, Pressable, Image, ScrollView, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '@/constants/config';
import { ProductResponse, ResponseApi } from '@/types/responseApi';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MenuCard from '@/components/MenuCard';


const data: { id: number, image: string }[] = [
  { id: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNCo7OHXCi5o1jkKUw3qOg3bozTAZpBUTNg&s" },
  { id: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAbrxMVS8J1FADMRspm6i3gvtY_4zAuAZ7tA&s" },
  { id: 3, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyaljGdPg-Ysjkebu4bqW_1U21ZxUMAc6Ccq8ieeC4GWKfWyOyCyRU1vHcSMlz5s88_M&usqp=CAU" }
];

const { width } = Dimensions.get("window");

const HomePage = () => {
  const progressValue = useSharedValue(0);
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [product, setProduct] = useState<ProductResponse[]>([]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoadingProduct(true);

        const response = await fetch(`${API_BASE_URL}/products?take=6`, {
          method: "GET",
          cache:'no-store'
        });
        const result = await response.json() as ResponseApi<ProductResponse>;
        setProduct(result.data);
      } catch (error) {

      } finally {
        setLoadingProduct(false);
      }
    };
    fetchData();
  }, []);

  const safeProductData = loadingProduct
    ? Array(6).fill({})
    : product.filter(p => p && p.id);

  return (
    <FlatList
      data={safeProductData}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      renderItem={({ item }) =>
       <MenuCard product={item}/>

      }
      ListHeaderComponent={
        <View className='flex-1 px-4 py-4 bg-gray-100'>

          {/* Home Atas */}
          <Text className='font-light text-base text-black'>Selamat Datang</Text>
          <Text className='font-bold text-xl text-black'>Bayu Febriyono</Text>

          <Text className='text-black font-black text-3xl mt-6'>Pesan Makanan</Text>
          <Text className='text-black font-black text-3xl'>Kini Lebih Mudah</Text>

          <View className='flex-row px-2 mt-7 gap-8 items-center'>
            <TextInput
              placeholder='Cari menu...'
              className='w-full flex-1 border border-orange-400 rounded-lg bg-gray-100 pl-4'
            />
            <Pressable className='bg-amber-500 px-3 py-3 rounded-xl' onPress={() => router.push('/product/cart')}>
              <Image source={require("@/assets/images/cart.png")} tintColor={"#ecf0f1"} className='size-8' />
            </Pressable>
          </View>

          {/* Carousel */}
          <View className='mt-8'>
            <Carousel
              loop
              width={width * 0.9}
              height={200}
              autoPlay
              data={data}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => {
                setActiveIndex(index);
              }}
              renderItem={({ item }) => (
                <View className='px-4'>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: "100%", borderRadius: 15 }}
                    resizeMode="cover"
                  />
                </View>
              )}
            />
          </View>

          {/* Dot indicator */}
          <View className='mt-6 flex-row justify-center items-center'>
            {data.map((_, index) => (
              <View
                key={index}
                style={{
                  width: activeIndex === index ? 12 : 8,
                  height: activeIndex === index ? 12 : 8,
                  borderRadius: 6,
                  marginHorizontal: 4,
                  backgroundColor: activeIndex === index ? "#fbbf24" : "#d1d5db", // kuning & abu
                }}
              />
            ))}
          </View>

          {/* Popular Menus */}
          <Text className='text-black font-bold text-lg mt-6'>Most Popoular Menu</Text>
        </View>
      }
      ListFooterComponent={
        <View className='flex-row flex-1 justify-center'>
          <Text>Load More</Text>
        </View>
      }

    />
  )
}

export default HomePage

