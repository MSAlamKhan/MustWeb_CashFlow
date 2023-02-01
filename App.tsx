import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackScreen, AuthStack } from "./src/screens/RootStackScreen";
import { AuthProvider, useAuth } from "./src/hooks/useAuth";
import { StatusBar } from "expo-status-bar";
import Entypo from "@expo/vector-icons/Entypo";
import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import numbro from "numbro";
import AsyncStorage from "@react-native-async-storage/async-storage";

// SplashScreen.preventAutoHideAsync();

function App() {
  numbro.registerLanguage({
    languageTag: "fr-BE",

    delimiters: {
      thousands: ".",
      decimal: ",",
    },
    abbreviations: {
      thousand: "k",
      million: "m",
      billion: "b",
      trillion: "t",
    },
    ordinal: (number) => {
      return number === 1 ? "er" : "ème";
    },
    currency: {
      symbol: "€",
      position: "postfix",
      code: "EUR",
    },
    currencyFormat: {
      thousandSeparated: true,
      totalLength: 4,
      spaceSeparated: true,
      average: true,
    },
    formats: {
      fourDigits: {
        totalLength: 4,
        spaceSeparated: true,
        average: true,
      },
      fullWithTwoDecimals: {
        output: "currency",
        mantissa: 2,
        spaceSeparated: true,
        thousandSeparated: true,
      },
      fullWithTwoDecimalsNoCurrency: {
        mantissa: 2,
        thousandSeparated: true,
      },
      fullWithNoDecimals: {
        output: "currency",
        spaceSeparated: true,
        thousandSeparated: true,
        mantissa: 0,
      },
    },
  });
  //
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootStackScreen />
      </AuthProvider>
      <StatusBar backgroundColor="#ffffff" style="auto" />
    </NavigationContainer>
  );
}

export default App;
