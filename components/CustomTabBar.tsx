import React from "react";
import { View, Text } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Path,
} from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import { LinearGradient } from "expo-linear-gradient";

const CustomTabBar = () => {
  return (
    <View className="w-full h-28 relative justify-center items-center px-2">
      <LinearGradient
        colors={["#77B84D", "#83C056", "#8EC95F", "#99D169", "#A4DA73"]}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full absolute -top-2 justify-center items-center"
      >
        <AntDesign name="plus" size={34} color="white" />
      </LinearGradient>
      <View className="flex flex-row justify-between items-center px-12 w-full">
        <View className="w-16 h-16 z-20 rounded-full justify-center items-center">
          <AntDesign name="home" size={34} color="#b5f5a1" />
        </View>
        <View className="w-16 h-16 z-20 rounded-full justify-center items-center">
          <Octicons name="gear" size={34} color="#b5f5a1" />
        </View>
      </View>
      <Svg className="absolute z-10" viewBox="0 0 430 94" fill="none">
        <Path
          d="M215 59C240.405 59 261 38.4052 261 13V13C261 6.41726 265.732 0 272.315 0H279L385 3.5H387.5C410.972 3.5 430 22.528 430 46C430 69.472 410.972 88.5 387.5 88.5H385L215 94L45 88.5H42.5C19.028 88.5 0 69.472 0 46C0 22.528 19.028 3.5 42.5 3.5H45L151 0H157.685C164.268 0 169 6.41726 169 13V13C169 38.4052 189.595 59 215 59Z"
          fill="url(#paint0_linear_20_60)"
          fillOpacity="0.8"
        />
        <Defs>
          <SvgLinearGradient
            id="paint0_linear_20_60"
            x1="0"
            y1="47"
            x2="430"
            y2="47"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#6BAF45" />
            <Stop offset="0.5" stopColor="#77B84D" />
            <Stop offset="0.75" stopColor="#83C056" />
            <Stop offset="0.875" stopColor="#8EC95F" />
            <Stop offset="0.9375" stopColor="#99D169" />
            <Stop offset="1" stopColor="#A4DA73" />
          </SvgLinearGradient>
        </Defs>
      </Svg>
    </View>
  );
};

export default CustomTabBar;
