import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react';
import CartProduct from '@/components/CartProduct';
import { Ionicons } from '@expo/vector-icons';
import DatePickerInput from '@/components/DatePickerInput';
import { formatRupiah } from '@/lib/formatRupiah';


const Cart = () => {
    const [cartItems, setCartItems] = React.useState([
        {
            id: 1,
            name: 'Burger Ayam',
            price: 300000,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOX2YyS0W1LnrD5eyd-7Q9kvO1JGvE80AXXA&s',
            qty: 1,
        },
        {
            id: 2,
            name: 'Sate Ayam',
            price: 300000,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmrh1hYk4gaPv9JTXZwZuDX8RCgXar-1vqyw&s',
            qty: 12,
        },
        {
            id: 3,
            name: 'Burger Ayam',
            price: 300000,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOX2YyS0W1LnrD5eyd-7Q9kvO1JGvE80AXXA&s',
            qty: 1,
        },
        {
            id: 4,
            name: 'Sate Ayam',
            price: 300000,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmrh1hYk4gaPv9JTXZwZuDX8RCgXar-1vqyw&s',
            qty: 12,
        },
        // bisa tambah item lain
    ]);
    const [isTunai, setIsTunasi] = React.useState(true);
    const [isDinein, setIsDinein] = React.useState(true);

    const [date, setDate] = React.useState<Date>(new Date());

    const totalHarga = cartItems.reduce((total, item) => total + item.qty * item.price, 0);


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


    return (
        <View className='flex-1'>
            <ScrollView contentContainerStyle={{paddingBottom:100}}>
                <View className='flex-1 px-6'>
                    <Text className='mx-auto text-lg font-semibold text-black mt-5'>Items in the cart</Text>

                    {/* Cart View */}
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
                </View>

            </ScrollView>
            <View className='flex-row h-20 bg-white p-0 w-full absolute bottom-0'>
                <View className='px-8 pt-2 flex-1'>
                    <Text className='font-black text-2xl'>Total Pesanan</Text>
                    <Text className='text-gray-700 font-bold text-xl'>{formatRupiah(totalHarga)}</Text>
                </View>

                <Pressable className='h-full bg-amber-500 justify-center px-6'>
                    <View className='flex-row gap-3'>
                        <Ionicons name='cart-outline' size={30} color={'white'}/>
                        <Text className='text-white text-xl font-black'>Checkout</Text>
                    </View>
                </Pressable>
            </View>
        </View>

    )
}

export default Cart