import CustomFullButton from "@/components/CustomFullButton";
import { checkTokenValid } from "@/lib/auth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {  Image,  Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkingUser = async () => {
      try {
        const isValid = await checkTokenValid();
        if (isValid) {
          router.replace('/home');
        } else {
          setLoading(false);
        }

      } catch (error) {
        console.log(error);
      }
    }
    // checkingUser();

  }, [])

  return (
    <View className="flex-1 items-center justify-center">
      {loading ? (
        <Image source={require("@/assets/images/img_janjikembali.png")} className="size-48" resizeMode="contain" />
      ) : (
        <>
          <Image source={require('@/assets/images/img_onboarding.png')} />
          <Text className="text-black font-black text-4xl mt-12">JANJI KEMBALI</Text>
          <Text className="text-sm text-gray-500 font-light text-left mt-4">Cafe dan Coworking Space Kekinian yang membuat nyaman</Text>
          <CustomFullButton className="mt-8" onPress={() => router.push('/register')} />
        </>
      )}

    </View>
  );
}
