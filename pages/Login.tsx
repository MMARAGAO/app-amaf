import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

  return (
    <View className="bg-gray-300 flex-1 flex justify-end">
      <View className="bg-gray-900 w-full h-1/2 rounded-t-[50px] shadow-xl p-10">
        <Text className="text-white text-3xl font-bold">Login</Text>
        <Text className="text-gray-200">Continue com o google</Text>
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate("Tab" as never);
          }}
        />
      </View>
    </View>
  );
}
