import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import { formatRupiah } from '@/lib/formatRupiah'


type CartItem = {
    id: number,
    name: string,
    price: number,
    image: string,
    qty: number,
}

interface CartProductProps {
    item: CartItem;
    onRemove: () => void;
    onQtyChange: (id:number, qty:number) => void
}

const CartProduct = ({ item, onRemove, onQtyChange}: CartProductProps) => {


    return (
        <View className='p-2 rounded-xl border border-amber-500  flex-row my-2'>
            <Image className='rounded-md' resizeMode='cover' style={{ width: 100, height: 100 }} source={{ uri: item.image }} />
            <View className='px-4 flex-1'>
                <Text className='font-bold text-lg'>{item.name}</Text>
                <Text className='text-gray-700 font-semibold text-base mt-2'>{formatRupiah(item.price)}</Text>
                <Text className='text-gray-700 font-semibold text-base mt-2'>Sub {formatRupiah(item.qty * item.price)}</Text>
            </View>
            <View className='justify-between items-end'>
                <Pressable onPress={onRemove}>
                    <Ionicons name='trash-outline' size={20} color={'red'} />
                </Pressable>

                {/* Plus Minus button */}
                <View className='flex flex-row gap-2'>
                    <Pressable className='border-1 border-gray-400 rounded-full p-2 bg-amber-500' onPress={() => onQtyChange(item.id, item.qty - 1)}>
                        <Ionicons name='remove-outline' size={10} color={'white'} />
                    </Pressable>
                    <Text>{item.qty}</Text>
                    <Pressable className='border-1 border-gray-400 rounded-full p-2 bg-amber-500' onPress={() => onQtyChange(item.id, item.qty + 1)}>
                        <Ionicons name='add-outline' size={10} color={'white'} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default CartProduct