import { View, Text, TextInput, Pressable, Image, ScrollView } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import React, { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signUpFormData, signUpSchema } from '@/validation/register';
import { useRouter } from 'expo-router';
import ToastManager, { Toast } from 'toastify-react-native'
import { API_BASE_URL } from '@/constants/config';
import { saveToken } from '@/lib/secureStore';


const RegisterPage = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
    })

    const onSubmit = async (data: signUpFormData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (response.ok && result.data?.token) {
                await saveToken(result.data.token);
                router.dismissAll();
                router.push('/home');
            } else {
                Toast.error("Terjadi kesalahan!")
            }

        } catch (error) {
            Toast.error("Terjadi kesalahan!")
        } finally {
            setLoading(false)
        }

    }

    return (

        <>
            <View className="flex-1 justify-center bg-gray-100 px-6">
                <View className='items-center'>
                    <Image source={require('@/assets/images/img_janjikembali.png')} resizeMode='contain' />
                </View>
                <Text className="text-2xl font-black text-gray-900 mt-12">Bergabung Bersama Kami</Text>
                <Text className='text-base font-light text-gray-800'>Silhakan buat akun terlebih dahulu</Text>

                <View className="w-full bg-white p-6 rounded-2xl shadow-md mt-8">
                    {/* Full Name */}
                    <Text className="text-gray-700 mb-2">Full Name</Text>
                    <Controller
                        control={control}
                        name="fullname"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="w-full border border-gray-300 p-3 rounded-md"
                                placeholder="Enter your full name"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.fullname && <Text className="text-red-500 text-sm mt-1">{errors.fullname.message}</Text>}

                    {/* Email */}
                    <Text className="text-gray-700 mt-4 mb-2">Email Address</Text>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="w-full border border-gray-300 p-3 rounded-md"
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.email && <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>}

                    {/* Password */}
                    <Text className="text-gray-700 mt-4 mb-2">Password</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="w-full border border-gray-300 p-3 rounded-md"
                                placeholder="Enter your password"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.password && <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>}

                    {/* Continue Button */}
                    <Pressable onPress={handleSubmit(onSubmit)} className="bg-yellow-400 rounded-full py-3 items-center mt-12">
                        {loading ? (
                            <Image source={require("@/assets/images/loading.png")} className='size-8 animate-spin' tintColor={"#FFFFFF"} />
                        ) : (
                            <Text className="text-white font-semibold text-lg">Continue</Text>
                        )}
                    </Pressable>
                </View>

                <Pressable className='mt-12' onPress={() => router.push('/login')}>
                    <Text className='mx-auto text-gray-600 font-light text-lg underline'>Sign In</Text>
                </Pressable>
            </View>
            <ToastManager />
        </>

    )
}

export default RegisterPage