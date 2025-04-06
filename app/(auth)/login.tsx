import { View, Text, TextInput, Pressable, Image } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import React from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema, signInValues } from '@/validation/login';
import { useRouter } from 'expo-router';


const LoginPage = () => {

    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema),
        defaultValues:{
            email:"bayu.f.p.09@gmail.com",
            password:"password"
        }
    })

    const onSubmit = (data: signInValues) => {
        router.dismissAll();
        router.replace("/home");
    }

    return (
      
            <View className="flex-1 justify-center bg-gray-100 px-6">
                <View className='items-center'>
                    <Image source={require('@/assets/images/img_janjikembali.png')} resizeMode='contain' />
                </View>
                <Text className="text-2xl font-black text-gray-900 mt-12">Masuk Menggunakan Akun Anda</Text>
                

                <View className="w-full bg-white p-6 rounded-2xl shadow-md mt-8">
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
                        <Text className="text-white font-semibold text-lg">Continue</Text>
                    </Pressable>
                </View>

                <Pressable className='mt-12' onPress={() => router.push('/register')}>
                    <Text className='mx-auto text-gray-600 font-light text-lg underline'>Create New Account</Text>
                </Pressable>
            </View>
        
    )
}

export default LoginPage