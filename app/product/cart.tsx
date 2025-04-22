import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react';
import CartProduct from '@/components/CartProduct';
import { Ionicons } from '@expo/vector-icons';
import DatePickerInput from '@/components/DatePickerInput';


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
        // bisa tambah item lain
    ]);
    const [isTunai, setIsTunasi] = React.useState(true);
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
        <ScrollView>
            <View className='flex-1 px-6'>
                <Text className='mx-auto text-lg font-semibold text-black mt-5'>Items in the cart</Text>

                {/* Cart View */}
                {cartItems.map(item => (
                    <CartProduct key={item.id} item={item} onQtyChange={handleQtyChange} onRemove={() => handleRemove(item.id)} />
                ))}

                <View className='flex-row justify-between mt-3'>
                    <Text className='font-bold text-lg'>Total Harga :</Text>
                    <Text className='font-bold text-lg'>Rp {totalHarga}</Text>
                </View>

                <Text className='text-2xl font-bold text-black mt-8'>Isi Detail Berikut</Text>

                <View className='flex-row justify-center rounded-xl bg-white p-4 mt-4 android:elevation-lg gap-2'>
                    {/* Item metode */}
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

                    <DatePickerInput 
                        value={date}
                        onChange={(val) => setDate(val)}
                    />

                </View>
            </View>
        </ScrollView>
    )
}

export default Cart