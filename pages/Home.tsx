import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, TextInput, TouchableOpacity, Text, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import locations from "../location.json";
import MapViewCluster from "react-native-map-clustering";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import fruits from "../Fruit.json"; // Certifique-se de que o caminho está correto

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
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [data, setData] = useState<CombinedData[]>([]);

  // armazenar a duas listas em uma só lista pelo id e id_fruta
  const combinedData = locations.map((location) => {
    const fruit = fruits.find((fruit) => fruit.id === location.id_fruta);
    return { ...location, ...fruit };
  });
  const [searchQuery, setSearchQuery] = useState("");

  const mapRef = useRef<MapView>(null); // Cria uma referência para o MapView

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão de localização negada");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });

      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude,
        longitude,
      }));
    };

    requestLocationPermission();
  }, []);

  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    try {
      console.log("Iniciando busca com query:", searchQuery);
      setLoading(true);

      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: searchQuery,
            format: "json",
            limit: 1,
          },
        }
      );

      console.log("Resposta da API:", response.data);

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        console.log("Local encontrado:", { lat, lon });
        setLoading(false);

        setRegion((prevRegion) => {
          console.log("Região anterior:", prevRegion);
          const newRegion = {
            ...prevRegion,
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
          };
          console.log("Nova região:", newRegion);
          return newRegion;
        });
      } else {
        console.log("Local não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar o local:", error);
      setLoading(false);
    }
  }, [searchQuery]);

  const goToUserLocation = useCallback(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01, // Zoom para uma visão mais próxima
          longitudeDelta: 0.01,
        },
        1000 // Duração da animação em milissegundos
      );
    }
  }, [userLocation]);

  const [markerSelected, setMarkerSelected] = useState<CombinedData | null>(
    null
  );

  const goToFruitLocation = useCallback(() => {
    if (markerSelected) {
      const { lat, long } = markerSelected.local;
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;
      Linking.openURL(googleMapsUrl);
    }
  }, [markerSelected]);

  if (!userLocation) {
    return <ActivityIndicator animating={true} color={MD2Colors.green500} />;
  }

  return (
    <View className="flex-1">
      {loading && (
        <View className="flex-1 w-full absolute bg-white/50 z-50 top-0 bottom-0 justify-center items-center">
          <ActivityIndicator animating={true} color={MD2Colors.green500} />
        </View>
      )}

      <View className="flex-row absolute top-10 z-20 bg-white left-5 right-5 rounded-full py-2 px-4 opacity-80 ">
        <TextInput
          className="w-[90%]"
          placeholder="Pesquisar"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          onPress={handleSearch}
          className="w-10 bg-gray-100 rounded-full h-10 justify-center items-center shadow"
        >
          <AntDesign name="search1" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View className="absolute z-20 bottom-28 right-5 space-y-4">
        {markerSelected && (
          <TouchableOpacity
            onPress={goToFruitLocation}
            className="  bg-[#34D399] rounded-full p-3 "
          >
            <MaterialIcons name="route" size={24} color="white" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={goToUserLocation}
          className=" bg-[#34D399] rounded-full p-3"
        >
          <FontAwesome5 name="location-arrow" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <MapViewCluster
        onPanDrag={() => setMarkerSelected(null)}
        ref={mapRef} // Atribui a referência ao MapView
        className="w-[110%] h-[110%]"
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        radius={50}
        showsCompass={false}
        showsMyLocationButton={false}
        region={region}
      >
        {combinedData.map((data) => (
          <Marker
            key={data.id_fruta}
            coordinate={{
              latitude: data.local.lat,
              longitude: data.local.long,
            }}
            image={require("../assets/markers/Banana.png")}
            title={data.name}
            description={`Família: ${data.family}, Ordem: ${data.order}`} // Concatenando múltiplas descrições
            onPress={() => setMarkerSelected(data as CombinedData)}
          />
        ))}
      </MapViewCluster>
    </View>
  );
}
