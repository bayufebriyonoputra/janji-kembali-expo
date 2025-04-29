import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import React, { useEffect } from 'react';
import CartProduct from '@/components/CartProduct';
import { Ionicons } from '@expo/vector-icons';
import DatePickerInput from '@/components/DatePickerInput';
import { formatRupiah } from '@/lib/formatRupiah';
import { CartItem } from '@/types/cart';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import ToastManager, { Toast } from 'toastify-react-native'
import { API_BASE_URL } from '@/constants/config';
import { getToken } from '@/lib/secureStore';


const Cart = () => {
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
    const [isTunai, setIsTunasi] = React.useState(true);
    const [isDinein, setIsDinein] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const [date, setDate] = React.useState<Date>(new Date());

    const totalHarga = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.qty * item.price, 0) : 0;


    const handleQtyChange = (id: number, newQty: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, qty: Math.max(newQty, 1) } : item
            )
        )
    };

    const handleRemove = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        const saveCartItems = async () => {
            try {
                await AsyncStorage.setItem('@cart_items', JSON.stringify(cartItems));
            } catch (e) {
                console.error('Failed to save cart items:', e);
            }
        };
        saveCartItems();
    }, [cartItems])

    // Handle orders
    const handleOrder = async () => {
        if (cartItems.length <= 0) {
            Toast.error("Belum ada item");
        }
        try {
            setLoading(true);
            const data = {
                tgl_order: format(new Date(), "yyyy-MM-dd"),
                detail: cartItems.map(({ id, image, name, ...rest }) => ({
                    product_id: id,
                    ...rest
                })),
            };

            console.log('data:', data);
            const token = await getToken();
            if (!token) Toast.error("Terjadi kesalahan silahkan relogin");

            const response = await fetch(`${API_BASE_URL}/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log(result);

            if (response.ok) {
                await AsyncStorage.removeItem("@cart_items");
                setCartItems([]);
                Toast.success("Order berhasil silahkan bayar di kasir");
            }
        } catch (error: any) {
            console.log(error.message);
            Toast.error("Terjadi kesalahan!")
        } finally {
            setLoading(false);
        }
    }



    return (
        <>
            <View className='flex-1'>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <View className='flex-1 px-6'>
                        <Text className='mx-auto text-lg font-semibold text-black mt-5'>Items in the cart</Text>

                        {/* Cart View */}
                        {cartItems.length > 0 ? (
                            <>
                                {cartItems.map(item => (
                                    <CartProduct key={item.id} item={item} onQtyChange={handleQtyChange} onRemove={() => handleRemove(item.id)} />
                                ))}


                                <Text className='text-2xl font-bold text-black mt-8'>Isi Detail Berikut</Text>

                                {/* Item metode */}
                                <View className=' rounded-xl bg-white px-4 mt-4 android:elevation-lg '>
                                    <Text className='my-3 text-gray-400 text-xs'>Pilih Metode Pembayaran</Text>
                                    <View className='flex-row justify-center gap-2 pb-4'>
                                        <Pressable onPress={() => setIsTunasi(false)}>
                                            <View className={`${isTunai ? '' : 'bg-amber-500'} w-44 px-4 py-2 border-[0.5px] rounded-md border-gray-500 items-center`}>
                                                <View className={`flex-row gap-2 items-center`}>
                                                    <Ionicons name='card-outline' size={20} color={isTunai ? 'black' : 'white'} />
                                                    <Text className={`${isTunai ? '' : 'text-white'}`}>Non Tunai</Text>
                                                </View>
                                            </View>
                                        </Pressable>

                                        <Pressable onPress={() => setIsTunasi(true)}>
                                            <View className={`${isTunai ? 'bg-amber-500' : ''} w-44 px-4 py-2 border-[0.5px] rounded-md border-gray-500 items-center`}>
                                                <View className={`flex-row gap-2 items-center`}>
                                                    <Ionicons name='cash-outline' size={20} color={isTunai ? 'white' : 'black'} />
                                                    <Text className={`${isTunai ? 'text-white' : ''}`}>Tunai</Text>
                                                </View>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>


                                <DatePickerInput
                                    label='Pilih Tanggal dan Waktu'
                                    className='mt-4'
                                    value={date}
                                    onChange={(val) => setDate(val)}
                                />

                                {/* Item Dine in */}
                                <View className=' rounded-xl bg-white px-4 mt-4 android:elevation-lg '>
                                    <Text className='my-3 text-gray-400 text-xs'>Dine In / Take a Way</Text>
                                    <View className='flex-row justify-center gap-2 pb-4'>
                                        <Pressable onPress={() => setIsDinein(true)}>
                                            <View className={`${isDinein ? 'bg-amber-500' : ''} w-44 px-4 py-2 border-[0.5px] rounded-md border-gray-500 items-center`}>
                                                <View className={`flex-row gap-2 items-center`}>
                                                    <Ionicons name='restaurant-outline' size={20} color={isDinein ? 'white' : 'black'} />
                                                    <Text className={`${isDinein ? 'text-white' : ''}`}>Dine In</Text>
                                                </View>
                                            </View>
                                        </Pressable>

                                        <Pressable onPress={() => setIsDinein(false)}>
                                            <View className={`${isDinein ? '' : 'bg-amber-500'} w-44 px-4 py-2 border-[0.5px] rounded-md border-gray-500 items-center`}>
                                                <View className={`flex-row gap-2 items-center`}>
                                                    <Ionicons name='cube-outline' size={20} color={isDinein ? 'black' : 'white'} />
                                                    <Text className={`${isDinein ? '' : 'text-white'}`}>Take a Way</Text>
                                                </View>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>
                            </>
                        ) : (
                            <Text className='text-center mt-4'>Anda belum order apapun :(</Text>
                        )}
                    </View>

                </ScrollView>
                <View className='flex-row h-20 bg-white p-0 w-full absolute bottom-0'>
                    <View className='px-8 pt-2 flex-1'>
                        <Text className='font-black text-2xl'>Total Pesanan</Text>
                        <Text className='text-gray-700 font-bold text-xl'>{formatRupiah(totalHarga)}</Text>
                    </View>

                    <Pressable className='h-full bg-amber-500 justify-center px-6' onPress={handleOrder}>
                        <View className='flex-row gap-3'>
                            {loading ? (
                                <>
                                <Image source={require("@/assets/images/loading.png")} tintColor={"#FFFFFF"} className='size-6 animate-spin'/>
                                </>
                            ) : (
                                <>
                                    <Ionicons name='cart-outline' size={30} color={'white'} />
                                    <Text className='text-white text-xl font-black'>Checkout</Text>
                                </>
                            )}
                        </View>
                    </Pressable>
                </View >
            </View >

            <ToastManager />
        </>

    )
}

export default Cart