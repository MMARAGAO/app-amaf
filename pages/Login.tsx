import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// navegacao
import { useNavigation } from "@react-navigation/native";
import HelloWord from "../components/HelloWord";
import { useAppContext } from "../context/AppContext";

export default function Login() {
  const navigation = useNavigation();
  const { isFirstVisit, setIsFirstVisit } = useAppContext(); // Usar o contexto

  // se teste for true, renderiza o componente HelloWord
  if (isFirstVisit) {
    return <HelloWord />;
  } else {
    return (
      <View className="flex-1 justify-center px-8 space-y-4 bg-white">
        <View className="space-y-4 mb-16">
          <View className="flex flex-row justify-center items-center">
            <Image source={require("../assets/logo.png")} className="w-6 h-6" />
            <Text className="font-bold text-3xl">AMAF</Text>
          </View>
          <Text className="text-gray-700 text-lg text-center">
            Trabalhe em equilíbrio.
          </Text>
        </View>
        <View className="space-y-6">
          <View className="space-y-2">
            <Text className="text-gray-800 text-lg font-bold">
              Seu Endereço de e-mail
            </Text>
            <TextInput
              placeholder="amafdf@gmail.com"
              placeholderTextColor={"#9ca3af"}
              className="border border-gray-400 w-full rounded-full border-gray-300 px-4 py-3 focus:outline-none focus:border-[#A0F482]"
            />
          </View>
          <View className="space-y-2">
            <Text className="text-gray-800 text-lg font-bold">
              Digite sua senha
            </Text>
            <TextInput
              placeholder="min. 8 caracteres"
              placeholderTextColor={"#9ca3af"}
              secureTextEntry
              className="border border-gray-400 w-full rounded-full border-gray-300 px-4 py-3 focus:outline-none focus:border-[#A0F482]"
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Tab" as never)}
            className="bg-[#A0F482] rounded-full px-6 py-3 mt-8"
          >
            <Text className="text-lg text-gray-800 text-center font-bold">
              Continue
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row justify-center items-center space-x-10 py-2 ">
            <View className="w-1/3 h-[1px] bg-gray-200"></View>
            <Text className="text-gray-400">ou</Text>
            <View className="w-1/3 h-[1px] bg-gray-200"></View>
          </View>
          {/* botoes para fazer login com o google */}
          <View className="flex flex-row mt-4">
            <TouchableOpacity className="bg-white w-full border border-gray-300 shadow-2xl rounded-full px-6 py-3 flex flex-row justify-center space-x-2">
              <Image
                source={require("../assets/google.png")}
                className="w-6 h-6 mt-1"
              />
              <Text className="text-lg text-gray-800 font-bold">
                Sign in with Google
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row">
            {/* Cadastre-se */}
            <Text className="text-gray-800 text-center">
              Não tem uma conta?
            </Text>
            <TouchableOpacity>
              <Text className="text-[#A0F482] text-center font-bold ml-1">
                Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
