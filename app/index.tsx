import CustomFullButton from "@/components/CustomFullButton";
import { useRouter } from "expo-router";
import { Button, Image, Pressable, Text, View } from "react-native";

export default function Index() {
  const router =  useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <Image source={require('@/assets/images/img_onboarding.png')} />
      <Text className="text-black font-black text-4xl mt-12">JANJI KEMBALI</Text>
      <Text className="text-sm text-gray-500 font-light text-left mt-4">Cafe dan Coworking Space Kekinian yang membuat nyaman</Text>
      <CustomFullButton className="mt-8" onPress={() => router.push('/register')} />
    </View>
  );
}
