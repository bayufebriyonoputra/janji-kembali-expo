import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { formatRupiah } from '@/lib/formatRupiah'
import { PaymentChanel, PaymentChanlelData } from '@/types/tripay'
import { TRIPAY_API_KEY } from '@/constants/config'



const PaymentMethods = ({ totalHarga }: { totalHarga: number }) => {


    const [paymentChanel, setPaymentChanel] = useState<PaymentChanlelData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedMethod, setSelectedMethod] = useState<string>("");


    // fetch payment chanels pertama kali
    const fetchPayment = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://tripay.co.id/api-sandbox/merchant/payment-channel', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${TRIPAY_API_KEY}`
                }
            });
            const response: PaymentChanel = await res.json();
            setPaymentChanel(response.data);



        } catch (error) {
            console.error("Error fetching payment channels:", error);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPayment();
    }, []);

    useEffect(() => {

    }, [totalHarga])

    return (
        <>
            {loading ? (
                <View className='flex-row justify-center flex-1 items-center'>
                    <Image source={require("@/assets/images/loading.png")} className='size-24  animate-spin' tintColor={"#f39c12"} />
                </View>
            ) :
                (<View className='mt-4 flex-row gap-2 flex-wrap'>

                    {/* Item Card */}
                    {paymentChanel.map(item => {

                        const fee = Number(item.total_fee.flat || 0) + (Number(item.total_fee.percent || 0) / 100) * totalHarga;

                        return (
                            <Pressable onPress={() => setSelectedMethod(item.code)} className={`w-44 bg-white rounded-md px-2 py-4 flex-row gap-2 items-center ${selectedMethod === item.code ? 'border-2 border-amber-500' : ''}`}>
                                <Image resizeMode='contain' className='size-10' source={{ uri: item.icon_url }} />
                                <View className='ml-2'>
                                    <Text className='mt-2'>{item.code}</Text>
                                    <Text className='mt-2 text-xs text-gray-400'>+ {formatRupiah(fee)}</Text>
                                </View>
                            </Pressable>
                        )
                    })}
                </View>)}
        </>
    )
}

export default PaymentMethods