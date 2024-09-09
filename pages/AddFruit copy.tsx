import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import fruitDataJson from "../Fruit.json"; // Importe o arquivo JSON localmente

// Definindo a interface para os dados da fruta
interface FruitData {
  name: string;
  family: string;
  genus: string;
  order: string;
  colheita: string;
  nutritions: {
    calories: number;
    fat: number;
    sugar: number;
    carbohydrates: number;
    protein: number;
  };
}

export default function AddFruit() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("en");
  const [fruitData, setFruitData] = useState<FruitData | null>(null);
  const [isFruitNameUpdated, setIsFruitNameUpdated] = useState(false);

  const translateText = async (text: string): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=pt|${language}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const translatedTextResult = data.responseData.translatedText;
      setTranslatedText(translatedTextResult);
      setIsFruitNameUpdated(true);
      return translatedTextResult;
    } catch (error) {
      console.error("Error translating text:", error);
      return null;
    }
  };

  const fetchFruitData = (fruitName: string) => {
    const fruit = fruitDataJson.find(
      (fruit) => fruit.name.toLowerCase() === fruitName.toLowerCase()
    );

    if (fruit) {
      setFruitData(fruit as FruitData);
      setIsFruitNameUpdated(false);
    } else {
      console.error("Fruit not found");
    }
  };

  const handleTranslateAndFetch = async () => {
    const translatedName = await translateText(inputText);
    if (translatedName) {
      fetchFruitData(translatedName);
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-100 mt-10">
      <TextInput
        className="mb-4 p-3 bg-white border border-gray-300 rounded-lg shadow-sm"
        value={inputText}
        onChangeText={setInputText}
        placeholder="Digite o nome da fruta"
      />
      <TouchableOpacity
        className="mb-4 p-3 bg-green-400 rounded-lg shadow-md"
        onPress={handleTranslateAndFetch}
      >
        <Text className="text-white text-center font-semibold">Buscar</Text>
      </TouchableOpacity>
      {fruitData ? (
        <View className="bg-white p-4 rounded-lg shadow-md">
          <Text className="font-bold text-lg mb-2">Informações da Fruta</Text>
          <Text className="text-gray-800 mb-1">
            Nome em EN:
            {fruitData.name}
          </Text>
          <Text className="text-gray-800 mb-1">
            Família: {fruitData.family}
          </Text>
          <Text className="text-gray-800 mb-1">Gênero: {fruitData.genus}</Text>
          <Text className="text-gray-800 mb-1">Ordem: {fruitData.order}</Text>
          <Text className="text-gray-800 mb-1">
            Calorias:{" "}
            <Text className="font-semibold">
              {fruitData.nutritions.calories} kcal
            </Text>
          </Text>
          <Text className="text-gray-800 mb-1">
            Gordura:{" "}
            <Text className="font-semibold">{fruitData.nutritions.fat} g</Text>
          </Text>
          <Text className="text-gray-800 mb-1">
            Açúcar:{" "}
            <Text className="font-semibold">
              {fruitData.nutritions.sugar} g
            </Text>
          </Text>
          <Text className="text-gray-800 mb-1">
            Carboidratos:{" "}
            <Text className="font-semibold">
              {fruitData.nutritions.carbohydrates} g
            </Text>
          </Text>
          <Text className="text-gray-800 mb-1">
            Proteína:{" "}
            <Text className="font-semibold">
              {fruitData.nutritions.protein} g
            </Text>
          </Text>
          <Text className="text-gray-800 mb-1">
            Data de colheita:{" "}
            <Text className="font-semibold">{fruitData.colheita}</Text>
          </Text>
        </View>
      ) : null}
    </View>
  );
}
