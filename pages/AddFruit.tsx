import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AddFruit() {
  const [view, setView] = useState("");
  const [formDataFruit, setFormDataFruit] = useState({
    name: "",
    id: "",
    family: "",
    order: "",
    genus: "",
    colheita: "",
    nutritions: {
      calories: "",
      fat: "",
      sugar: "",
      carbohydrates: "",
      protein: "",
    },
  });

  const [formDataLocation, setFormDataLocation] = useState({
    id_fruit: "",
    location: {
      latitude: "",
      longitude: "",
    },
  });

  return <View className="flex-1 flex-col"></View>;
}
