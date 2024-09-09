import { StatusBar } from "expo-status-bar";
import React from "react";
import Navigation from "./Navigation";
import { SafeAreaView } from "react-native";
import { AppProvider } from "./context/AppContext"; // Importar o AppProvider
import { PaperProvider } from "react-native-paper";
import { UserProvider } from "./context/UserContext"; // Importar o UserProvider

export default function App() {
  return (
    <AppProvider>
      <UserProvider>
        <PaperProvider>
          <SafeAreaView className="flex-1">
            <Navigation />
            <StatusBar style="auto" />
          </SafeAreaView>
        </PaperProvider>
      </UserProvider>
    </AppProvider>
  );
}
