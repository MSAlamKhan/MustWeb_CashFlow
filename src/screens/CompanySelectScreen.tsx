import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import DataTable from "../components/DataTable";

function CompanySelectScreen({ navigation }: any) {
  const [companyList, setCompanyList] = useState([]);
  const [company, setCompany] = useState("");
  const [selectValue, setSelectValue] = useState("");
  async function AccediPress() {
    AsyncStorage.setItem("company", selectValue);
    return navigation.navigate("dashboard", { companyName: company });
  }
  const { LogoutUser }: any = useAuth();
  async function SelectCompanies() {
    const email = await AsyncStorage.getItem("email2");
    const password = await AsyncStorage.getItem("password");
    axios
      .post(`https://cashflow.albasoftsolutions.it/api/companies/getData`, {
        email: email,
        password: password,
      })
      .then((res) => {
        let data = JSON.parse(JSON.stringify(res.data));
        // console.log("====================================");
        // console.log("comnay : ", data.listaAziende);
        // console.log("====================================");
        return setCompanyList(data.listaAziende);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function ReturnLog() {
    return LogoutUser();
  }

  useEffect(() => {
    SelectCompanies();
  });
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
          <View>
            <Picker
              style={styles.input}
              selectedValue={selectValue}
              onValueChange={(itemValue, itemIndex) => {
                setSelectValue(itemValue);
                setCompany(companyList[itemIndex]["alias"]);
              }}
            >
              {companyList?.map((company: any) => (
                <Picker.Item
                  key=""
                  label={company.alias}
                  value={company.nome}
                />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#a52a2c",
              marginTop: 5,
              borderRadius: 5,
              padding: 10,
              alignItems: "center",
            }}
            onPress={AccediPress}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>Accedi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "gray",
              marginTop: 5,
              borderRadius: 5,
              padding: 10,
              alignItems: "center",
            }}
            onPress={ReturnLog}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>LogOut</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    padding: 10,
  },
  LoginPage: {
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
});

export default CompanySelectScreen;
