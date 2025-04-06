import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'


const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false
      }}>

      <Tabs.Screen
        name='home'
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            if (focused) return <Image source={require("@/assets/images/home-fill.png")} className='size-8' tintColor={"#F6B93B"} />
            return <Image source={require("@/assets/images/home.png")} className='size-8' tintColor={"#F6B93B"} />
          },

        }}
      />
      <Tabs.Screen
        name='reward'
        options={{
          title: "Reward",
          tabBarIcon: ({ focused }) => {
            if (focused) return <Image source={require("@/assets/images/gift-fill.png")} className='size-8' tintColor={"#F6B93B"} />
            return <Image source={require("@/assets/images/gift.png")} className='size-8' tintColor={"#F6B93B"} />
          },

        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => {
            if (focused) return <Image source={require("@/assets/images/settings-fill.png")} className='size-8' tintColor={"#F6B93B"} />
            return <Image source={require("@/assets/images/settings.png")} className='size-8' tintColor={"#F6B93B"} />
          },

        }}
      />
    </Tabs>
  )
}

export default _layout