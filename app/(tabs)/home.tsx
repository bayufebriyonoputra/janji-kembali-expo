import { View, Text, TextInput, Pressable, Image, ScrollView, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '@/constants/config';
import { BannerResponse, ProductResponse, ResponseApi } from '@/types/responseApi';
import MenuCard from '@/components/MenuCard';







const { width } = Dimensions.get("window");

const HomePage = () => {
  const progressValue = useSharedValue(0);
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [product, setProduct] = useState<ProductResponse[]>([]);
  const [banner, setBanner] = useState<BannerResponse[]>([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingProduct(true);

        // Get Product
        const response = await fetch(`${API_BASE_URL}/products?take=6`, {
          method: "GET",
          cache: 'no-store'
        });
        const result = await response.json() as ResponseApi<ProductResponse>;
        setProduct(result.data);
        
        const bannerResponse = await fetch(`${API_BASE_URL}/banners`, {
          method: "GET",
          cache: "no-store"
        });
        const bannerResult = await bannerResponse.json() as ResponseApi<BannerResponse>
        setBanner(bannerResult.data);
      } catch (error:any) {
     

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
    <>
      <FlatList
        data={safeProductData}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8 }}
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 16 }}
        numColumns={2}
        renderItem={({ item }) =>
          loadingProduct ? (
            <MenuCard.Skeleton />
          ) :
            (
              <MenuCard product={item} />
            )

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
              {banner.length > 0 ? (
                <Carousel
                  loop
                  width={width * 0.9}
                  height={200}
                  autoPlay
                  data={banner}
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
              ) : (
                <>
                  <Text>Tidak ada data banner</Text>
                </>
              )}
            </View>

            {/* Dot indicator */}
            <View className='mt-6 flex-row justify-center items-center'>
              {banner.map((_, index) => (
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
    </>
  )
}

export default HomePage

