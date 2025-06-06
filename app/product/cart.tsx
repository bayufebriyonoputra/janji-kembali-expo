import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import React, { useEffect } from 'react';
import CartProduct from '@/components/CartProduct';
import { Ionicons } from '@expo/vector-icons';
import { formatRupiah } from '@/lib/formatRupiah';
import { CartItem } from '@/types/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import ToastManager, { Toast } from 'toastify-react-native'
import { API_BASE_URL, TRIPAY_API_KEY, TRIPAY_MERCHANT_CODE, TRIPAY_PRIVATE_KEY } from '@/constants/config';
import { getToken } from '@/lib/secureStore';
import PaymentMethods from '@/components/PaymentMethods';
import { usePaymentStore, useTotalStore } from '@/stores/paymentStore';
import { useUserInfo } from '@/hooks/useUserInfo';
import { generateTripayCloseSignature } from '@/lib/utils';
import { TripayOrder } from '@/types/tripayOrder';
import { useRouter } from 'expo-router';


const Cart = () => {
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
    const [isTunai, setIsTunasi] = React.useState(true);
    const [isDinein, setIsDinein] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const { user } = useUserInfo(`${API_BASE_URL}/me`);
    const router = useRouter();

    const payment = usePaymentStore(state => state.payment);
    const total = useTotalStore(state => state.total);
    const setTotal = useTotalStore(state => state.setTotal);

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

    // Saat pertama kali render, ambil data dari AsyncStorage
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

    // set total jika totalharga berubah
    useEffect(() => {
        setTotal(totalHarga);
    }, [totalHarga])

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

    const orderTripay = async (order_ref: string) => {

        const signature = generateTripayCloseSignature({
                amount: total,
                merchantCode: TRIPAY_MERCHANT_CODE,
                merchantRef: order_ref,
                secretKey: TRIPAY_PRIVATE_KEY
            });

                

        const data = {
            method: payment,
            merchant_ref: order_ref,
            amount: total,
            customer_name: user?.fullname || "Anonymous",
            customer_email: user?.email || "",
            order_items: cartItems.map(item => ({
                sku: item.id,
                name: item.name,
                price: item.price,
                quantity: item.qty
            })),
            signature: generateTripayCloseSignature({
                amount: total,
                merchantCode: TRIPAY_MERCHANT_CODE,
                merchantRef: order_ref,
                secretKey: TRIPAY_PRIVATE_KEY
            })
        }

        try {
            const res = await fetch("https://tripay.co.id/api-sandbox/transaction/create", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${TRIPAY_API_KEY}`
                    , "Content-Type": "application/json"
                },
                body: JSON.stringify(data)

            });

            if (res.ok) {
                const json: TripayOrder = await res.json();
                const url = json.data.checkout_url;

                router.push({ pathname: '/product/payment/[url]/[ref]', params: { url: encodeURIComponent(url), ref:json.data.reference } });

            } else {
                const errorData = await res.json();
                Toast.error("Terjadi kesalahan saat membuat transaksi di Tripay");
            }
        } catch (error) {
            throw error;
        }
    }

    // Handle orders
    const handleOrder = async () => {
        if (cartItems.length <= 0) {
            Toast.error("Belum ada item");
        }
        try {
            setLoading(true);
            const ref = `order-${format(new Date(), "yyyyMMddHHmmss")}`;

            const data = {
                tgl_order: format(new Date(), "yyyy-MM-dd"),
                order_ref: ref,
                jenis_pembayaran: isTunai ? "tunai" : payment,
                detail: cartItems.map(({ id, image, name, ...rest }) => ({
                    product_id: id,
                    ...rest
                })),
            };

            // set data local
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


            //insert into tripay



            if (response.ok) {
                await AsyncStorage.removeItem("@cart_items");
                setCartItems([]);
                if (isTunai) {

                    Toast.success("Order berhasil silahkan bayar di kasir");
                } else {
                    orderTripay(ref);
                }
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
                                    <View className='flex-row justify-center gap-2 pb-4 '>
                                        <Pressable onPress={() => setIsTunasi(false)}>
                                            <View className={`${isTunai ? '' : 'bg-amber-500'} ml-4 w-40 px-4 py-2 border-[0.5px] rounded-md border-gray-500 items-center`}>
                                                <View className={`flex-row gap-2 items-center`}>
                                                    <Ionicons name='card-outline' size={20} color={isTunai ? 'black' : 'white'} />
                                                    <Text className={`${isTunai ? '' : 'text-white'}`}>Non Tunai</Text>
                                                </View>
                                            </View>
                                        </Pressable>

                                        <Pressable onPress={() => setIsTunasi(true)}>
                                            <View className={`${isTunai ? 'bg-amber-500' : ''} w-40 mr-4 px-4 py-2 border-[0.5px] rounded-md border-gray-500 items-center`}>
                                                <View className={`flex-row gap-2 items-center`}>
                                                    <Ionicons name='cash-outline' size={20} color={isTunai ? 'white' : 'black'} />
                                                    <Text className={`${isTunai ? 'text-white' : ''}`}>Tunai</Text>
                                                </View>
                                            </View>
                                        </Pressable>
                                    </View>

                                </View>

                                {/* Item metode non tunai */}
                                {!isTunai && (
                                    // <View className="mt-4">
                                    //     <Text className="mb-2 text-gray-500">Pilih Pembayaran</Text>
                                    //     <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
                                    //         <Picker
                                    //             selectedValue={metodeNonTunai}
                                    //             onValueChange={(itemValue) => setMetodeNonTunai(itemValue)}
                                    //         >
                                    //             <Picker.Item label="Pilih Metode..." value="" />
                                    //             <Picker.Item label="BRI" value="1" />
                                    //             <Picker.Item label="Mandiri" value="2" />
                                    //             <Picker.Item label="Q RIS" value="3" />
                                    //             {/* Tambahkan opsi meja sesuai kebutuhan */}
                                    //         </Picker>
                                    //     </View>
                                    // </View>

                                    <PaymentMethods totalHarga={totalHarga} />
                                )}




                                {/* Item Dine in */}
                                <View className=' rounded-xl bg-white px-4 mt-4 android:elevation-lg '>
                                    <Text className='my-3 text-gray-400 text-xs'>Dine In / Take a Way</Text>
                                    <View className='flex-row justify-center gap-2 pb-4'>
                                        <Pressable onPress={() => setIsDinein(true)}>
                                            <View className={`${isDinein ? 'bg-amber-500' : ''} w-40 ml-4 px-4 py-2 border-[0.5px] rounded-md border-gray-500 items-center`}>
                                                <View className={`flex-row gap-2 items-center`}>
                                                    <Ionicons name='restaurant-outline' size={20} color={isDinein ? 'white' : 'black'} />
                                                    <Text className={`${isDinein ? 'text-white' : ''}`}>Dine In</Text>
                                                </View>
                                            </View>
                                        </Pressable>

                                        <Pressable onPress={() => setIsDinein(false)}>
                                            <View className={`${isDinein ? '' : 'bg-amber-500'} w-40 mr-4 px-4 py-2 border-[0.5px] rounded-md border-gray-500 items-center`}>
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
                        <Text className='text-gray-700 font-bold text-xl'>{formatRupiah(total)}</Text>
                    </View>

                    <Pressable className='h-full bg-amber-500 justify-center px-6' onPress={handleOrder}>
                        <View className='flex-row gap-3'>
                            {loading ? (
                                <>
                                    <Image source={require("@/assets/images/loading.png")} tintColor={"#FFFFFF"} className='size-6 animate-spin' />
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