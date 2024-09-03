import { StatusBar } from "expo-status-bar";
import React from "react";
import Navigation from "./Navigation";
import { SafeAreaView } from "react-native";
import { AppProvider } from "./context/AppContext"; // Importar o AppProvider

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView className="flex-1">
        <Navigation />
        <StatusBar style="auto" />
      </SafeAreaView>
    </AppProvider>
  );
}
