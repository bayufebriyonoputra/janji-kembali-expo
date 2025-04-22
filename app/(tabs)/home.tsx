import { View, Text, TextInput, Pressable, Image, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react';
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from 'react-native-reanimated';
import { useRouter } from 'expo-router';


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

  return (
    <View className='flex-1 px-4 py-4 bg-gray-100'>
      <ScrollView>
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
        <View className='flex-row mt-6'>

          {/* Menu Card */}
          <Pressable className='w-1/2' onPress={() => router.push({pathname:"/product/details/[id]", params:{id:1}})}>
            <View className='bg-white rounded-lg h-78 h-full mx-1'>
              <Image style={{ width: "100%", height: 150 }} className='rounded-t-lg' source={{ uri: "https://asset.kompas.com/crops/dJ6juHNfurURWuXvaqPXge-977c=/53x36:933x623/1200x800/data/photo/2021/10/21/6171492e1ea12.jpg" }} resizeMode='cover' />
              <View className='px-2 py-2'>
                <Text className='text-black font-black text-xl'>Burger Ayam</Text>
                <Text className='text-gray-500 font-normal text-base'>Daging Ayam + Gubis + Tomat</Text>
                <View className='flex-row items-center'>
                  <Text className='flex-1 text-amber-500 font-bold text-lg'>Rp. 32.000</Text>
                  <View className='p-2 rounded-full bg-amber-500'>
                    <Image className='size-4' source={require("@/assets/images/plus.png")} tintColor={"#ecf0f1"} />
                  </View>
                </View>
              </View>
            </View>
          </Pressable>

          <Pressable className='w-1/2'>
            <View className='bg-white rounded-lg h-78 h-full mx-1'>
              <Image style={{ width: "100%", height: 150 }} className='rounded-t-lg' source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PmhhsxI4-QDFdej54kckJLMCTffXPHNl1w&s" }} resizeMode='cover' />
              <View className='px-2 py-2'>
                <Text className='text-black font-black text-xl'>Es oyen</Text>
                <Text className='text-gray-500 font-normal text-base'>Es Batu Nearaka + Susu Siksa</Text>
                <View className='flex-row items-center'>
                  <Text className='flex-1 text-amber-500 font-bold text-lg'>Rp. 99.000</Text>
                  <View className='p-2 rounded-full bg-amber-500'>
                    <Image className='size-4' source={require("@/assets/images/plus.png")} tintColor={"#ecf0f1"} />
                  </View>
                </View>
              </View>
            </View>
          </Pressable>

        </View>
      </ScrollView>


    </View>
  )
}

export default HomePage