import React, { useState } from "react";
import {
  StyleSheet,
  Linking,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import CostumInput from "../components/CostumInput";
import { useAuth } from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

function LoginPage({ navigation }: any) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { LoginUser, error, setError }: any = useAuth();
  async function logFunc(e: any) {
    if (Email === "") {
      setError(
        <View
          style={{
            width: 300,
            shadowOpacity: 10,
            marginTop: 20,
            padding: 10,
            borderRadius: 5,
            backgroundColor: "#a10a2a",
          }}
        >
          <Text style={{ color: "white" }}>Check your Email !</Text>
        </View>
      );
    } else if (Password === "") {
      setError(
        <View
          style={{
            width: 300,
            shadowOpacity: 10,
            marginTop: 20,
            padding: 10,
            borderRadius: 5,
            backgroundColor: "#a10a2a",
          }}
        >
          <Text style={{ color: "white" }}>Check your password !</Text>
        </View>
      );
    } else {
      LoginUser(e, Email, Password);
      await AsyncStorage.setItem("email2", Email);
      await AsyncStorage.setItem("password", Password);
    }
  }
  return (
    <View style={styles.LoginPage}>
      <View style={styles.LoginForm}>
        <Image
          source={{
            uri: "https://cashflow.albasoftsolutions.it/img/logo_cashflow_new.png",
          }}
          style={styles.Logo}
        />
        <View style={{ margin: 15 }}>
          <CostumInput placeholder="Utente" value={Email} setValue={setEmail} />
          <CostumInput
            placeholder="Password"
            value={Password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <View>{error}</View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <Text
              style={styles.Text}
              onPress={() => Linking.openURL("https://google.com")}
            >
              Termini di utilizzo
            </Text>
            <Text
              style={styles.Text}
              onPress={() => Linking.openURL("https://google.com")}
            >
              Privacy Policy
            </Text>
          </View>
          <TouchableOpacity style={styles.log} onPress={logFunc}>
            <Text style={{ fontWeight: "bold", color: "white" }}>Login</Text>
          </TouchableOpacity>
          <Text
            style={styles.Text}
            onPress={() => Linking.openURL("https://google.com")}
          >
            Password dimenticata?
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 9,
    padding: 5,
  },
  LoginPage: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#191970",
  },
  LoginForm: {
    backgroundColor: "white",
    padding: 0,
    borderRadius: 5,
    alignItems: "center",
  },
  Logo: {
    width: 100,
    height: 50,
    marginTop: 40,
  },
  log: {
    backgroundColor: "#a52a2c",
    marginTop: 20,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
});

export default LoginPage;
