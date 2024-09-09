import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import locations from "../location.json";
import fruits from "../Fruit.json";

interface CombinedData {
  id_fruta: number;
  local: {
    lat: number;
    long: number;
  };
  name: string;
  id: number;
  family: string;
  order: string;
  genus: string;
  nutritions: {
    calories: number;
    fat: number;
    sugar: number;
    carbohydrates: number;
    protein: number;
  };
}

export default function Home() {
  const [data, setData] = useState<CombinedData[]>([]);

  // armazenar a duas listas em uma só lista pelo id e id_fruta
  const combinedData = locations.map((location) => {
    const fruit = fruits.find((fruit) => fruit.id === location.id_fruta);
    return { ...location, ...fruit };
  });

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {combinedData.map((data) => (
        <Marker
          key={data.id_fruta}
          coordinate={{
            latitude: data.local.lat,
            longitude: data.local.long,
          }}
          title={data.name}
          description={`Família: ${data.family}, Ordem: ${data.order}`} // Concatenando múltiplas descrições
        />
      ))}
    </MapView>
  );
}
