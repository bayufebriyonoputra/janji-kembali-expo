import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import SquareButton from '@/components/SquareButton';
import { Ionicons } from "@expo/vector-icons";
import { API_BASE_URL } from '@/constants/config';
import { ProductResponse, SingleResponseApi } from '@/types/responseApi';
import { formatRupiah } from '@/lib/formatRupiah';
import ToastManager, { Toast } from 'toastify-react-native'
import { CartItem } from '@/types/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailPage = () => {
  const { id } = useLocalSearchParams();
  const [count, setCount] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<ProductResponse | null>(null);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);


  const handleAddCart = async () => {
    try {
      if (!data) throw new Error("Product data not found");
      setCartItems(prev => {
        const existingId = prev.find(item => item.id === parseInt(id as string));

        // jika barang sudah ada
        if (existingId) {
          return prev.map(item =>
            item.id === existingId.id ? { ...item, qty: item.qty + count } : item
          )
        } else {
          return [...prev, {
            id: parseInt(id as string),
            image: data.image,
            name: data.name,
            price: data.price,
            qty: count
          }]
        }
      })

      Toast.success("Berhasil menambahkan ke keranjang");

    } catch (err: any) {
      Toast.error(err.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/product/${id}`, {
          method: "GET",
          cache: "no-store"
        });
        const result = await response.json() as SingleResponseApi<ProductResponse>;
        setData(result.data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const loadCartItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@cart_items');
        
        if (jsonValue != null) {
          setCartItems(JSON.parse(jsonValue) as CartItem[]);
        }
      } catch (e) {
        console.error('Failed to load cart items:', e);
      }
    };
    loadCartItems();

    fetchData();
  }, []);

  useEffect(() => {
    const setCard = async () => {
      await AsyncStorage.setItem("@cart_items", JSON.stringify(cartItems));
    }
    setCard();

  }, [cartItems]);

  return (
    <>
      {loading ? (
        <View className='flex-row justify-center flex-1 items-center'>
          <Image source={require("@/assets/images/loading.png")} className='size-24  animate-spin' tintColor={"#f39c12"} />
        </View>
      ) : (
        <View>
          <ScrollView>
            <Image style={{ width: '100%', height: 300 }} resizeMode='cover' source={data?.image ? { uri: data.image } : require("@/assets/images/placeholder.jpg")} />


            <View className='px-4 mt-12'>
              <Text className='font-black text-2xl'>{data?.name}</Text>

              <View className='flex flex-row mt-4 justify-between items-center'>
                <Text className='font-bold text-xl text-amber-500'>{formatRupiah(data?.price ?? 0)}</Text>

                {/* Plus Button */}
                <View className='flex flex-row items-center gap-4'>
                  <SquareButton onPress={() => {
                    if (count > 1) setCount(prev => prev - 1);
                  }}>
                    <Ionicons name="remove-outline" size={20} color={"white"} />
                  </SquareButton>
                  <Text className='text-xl font-bold'>{count}</Text>
                  <SquareButton onPress={() => setCount(prev => prev + 1)} > <Ionicons name="add-outline" size={20} color={"white"} /> </SquareButton>
                </View>

              </View>

              <Text className='text-xl font-bold mt-4'>Deskripsi</Text>
              <Text className='text-lg font-normal mt-3'>{data?.desc}</Text>

              {/* Masukkan keranjang button */}
              <Pressable className='mt-16' onPress={handleAddCart}>
                {({ pressed }) => (
                  <View className={`w-full ${pressed ? 'bg-amber-600' : 'bg-amber-500'} rounded-xl`}>
                    <Text className='text-center text-white py-6  font-bold text-2xl'>Masukkan Ke Keranjang</Text>
                  </View>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </View>
      )}
      <ToastManager />
    </>
  )
}

export default DetailPage