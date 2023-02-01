import React from "react";
import { Icon } from "react-native-elements";
import { Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "./LoginPage";
import CompanySelectScreen from "./CompanySelectScreen";
import DashboardScreen from "./Dashboardscreen";
import OtpScreen from "./OtpPage";
import ValidateScreen from "./validateScreen";
import SettingScreen from "./SettingScreen";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const RootStackScreen = () => {
  const { LogoutUser }: any = useAuth();
  const navigation: any = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="validate" component={ValidateScreen} />
      <Stack.Screen name="verification" component={OtpScreen} />
      <Stack.Screen name="company" component={CompanySelectScreen} />
      {/* <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#191970" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "#fff",
        }}
      /> */}
      <Stack.Screen
        name="dashboard"
        component={DashboardScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#191970" },
          headerTitleStyle: {
            color: "#191970",
          },
          headerTintColor: "#fff",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => LogoutUser()}
              style={{ padding: 10 }}
            >
              <Icon name="logout" type="" color="#517fa4" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
  const navigation: any = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="validate" component={ValidateScreen} />
      <Stack.Screen name="verification" component={OtpScreen} />
      <Stack.Screen name="company" component={CompanySelectScreen} />
      {/* <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#191970" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "#fff",
        }}
      /> */}
      {/* <Stack.Screen
        name="dashboard"
        component={DashboardScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#191970" },
          headerTitleStyle: {
            color: "#191970",
          },
          headerTintColor: "#fff",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings")}
              style={{ padding: 10 }}
            >
              <Icon name="logout" type="" color="#517fa4" />
            </TouchableOpacity>
          ),
        }}
      /> */}
    </Stack.Navigator>
  );
};
