import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const navigation: any = useNavigation();
  const [error, setError] = useState<any>();
  //   const [graphData, setGraphData] = useState(null);
  const LoginUser = (event: any, Email: string, Password: string) => {
    event.preventDefault();
    axios
      .post("https://cashflow.albasoftsolutions.it/api/auth/token", {
        client_secret: "30639096bfe4ec4b9f17696ef1d02b9t",
        username: Email,
        password: Password,
        app_mobile: "true",
      })
      .then(async (response) => {
        if (response.status == 200) {
          console.log("====================================");
          console.log("RESPONSE DATA ==>", response.data["token"]);
          console.log("====================================");
          await AsyncStorage.setItem("token", response.data.token);

          navigation.navigate("company");
        } else {
          Alert.alert("email or password is incorrect");
        }
      })
      .catch((err) => {
        Alert.alert("email or password is incorrect");
      });
  };

  let LogoutUser = useCallback(async () => {
    await AsyncStorage.removeItem("token");
    let token = AsyncStorage.getItem("token");
    console.log("====================================");
    console.log("Token inn logout ==>", token);
    console.log("====================================");
    navigation.navigate("Login");
  }, []);

  //   const FetchData = () => {
  //     axios
  //       .post(
  //         "https://cashflow.albasoftsolutions.it/api/monthlyAmounts/getData",
  //         {
  //           email: "com@a.it",
  //           db: "cflow_00790425052008",
  //           password: "admin",
  //         }
  //       )
  //       .then((response) => {
  //         if (response.data) {
  //           setGraphData(response.data);
  //           console.log(graphData);
  //         } else {
  //           alert("data issue");
  //         }
  //       });
  //   };

  const loginStatus = useCallback(async () => {
    let token = await AsyncStorage.getItem("token");
    console.log("====================================");
    console.log("token in  status =>", token);
    console.log("====================================");
    if (token != null) {
      navigation.navigate("company");
    }
  }, []);

  useEffect(() => {
    loginStatus();
  }, [loginStatus]);

  let contextData = {
    LoginUser: LoginUser,
    LogoutUser: LogoutUser,
    // FetchData: FetchData,
    setError: setError,
    error: error,
    // graphData: graphData,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
