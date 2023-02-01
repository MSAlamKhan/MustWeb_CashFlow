import React, { useCallback, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import DataVisualization from "../components/DataVisualization";
import DataTable from "../components/DataTable";
import { AntDesign } from "@expo/vector-icons";
import DashA from "./DashA";
import DashB from "./DashB";
import { Colors } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import numbro from "numbro";

const devWidth = Dimensions.get("screen").width;

function DashboardScreen({ route }) {
  const { companyName } = route.params;
  const [isDashboard, setIsDashboard] = useState(true);

  const [monthlyAmounts, setMonthlyAmounts] = useState([]);
  const importoSum = 0;

  numbro.setLanguage("fr-BE");

  // define a language
  const company = AsyncStorage.getItem("company");
  console.log("====================================");
  console.log("Company ==>", company);
  console.log("====================================");

  const FetchMonthlyAmounts = async () => {
    const email = await AsyncStorage.getItem("email2");
    const password = await AsyncStorage.getItem("password");

    const company = await AsyncStorage.getItem("company");
    axios
      .post(
        "https://cashflow.albasoftsolutions.it/api/monthlyAmounts/getData",
        {
          email: email,
          db: company,
          password: password,
        }
      )
      .then((response) => {
        if (response.data) {
          const { data } = response.data;
          // console.log(data);
          setMonthlyAmounts(data);
        } else {
          alert("data issue");
        }
      });
  };

  const FetchBalances = async () => {
    const email = await AsyncStorage.getItem("email2");
    const password = await AsyncStorage.getItem("password");

    const company = await AsyncStorage.getItem("company");
    axios
      .post("https://cashflow.albasoftsolutions.it/api/balances/getData", {
        email: email,
        db: company,
        password: password,
      })
      .then((response) => {
        if (response.data) {
          // console.log(response.data);
          const { saldi } = response.data;
          const importoObjs = saldi.map((object: any) => object["fidoCassa"]);
          const importo = importoObjs.map((obj: any) => obj[0]["importo"]);
          importo.forEach((element: any) => {
            importoSum + element;
          });
          // console.log("importo Sum", importoSum);
        } else {
          alert("data issue");
        }
      });
  };

  const formatValues = (array: any[]) =>
    array.map((value: any) => {
      return numbro(value).format({
        thousandSeparated: true,
        mantissa: 2,
      });
    });

  const calculateGraphValues = (steps: number, array: any) => {
    let elements = [];
    for (let index = 0; index < array.length; index++) {
      elements[index] = steps * index;
    }
    return elements;
  };

  const calculateSteps = (max: number, array: any) => max / (array.length - 1);

  const creditSubDebit = (credit: any, debit: any) => {
    let element = [];
    for (let index = 0; index < credit.length; index++) {
      element[index] = credit[index] - debit[index];
    }
    return element;
  };

  useFocusEffect(
    useCallback(() => {
      FetchMonthlyAmounts();
      FetchBalances();
    }, [])
  );

  const months = monthlyAmounts.map((element) => element["mese"]);
  const credit = monthlyAmounts.map((element) => element["entrate"]);
  const debit = monthlyAmounts.map((element) => element["uscite"]);
  const creditDebitAray = credit.concat(debit);
  const lineGraphMax = Math.max(...creditDebitAray);
  const C_D = creditSubDebit(credit, debit);
  const barGraphMax = Math.max(...C_D);

  // console.log("====================================");
  // console.log("credit: ", credit, "debit: ", debit);
  // console.log("====================================");
  // console.log("====================================");
  // console.log("Credit - Debit", C_D);
  // console.log("====================================");
  const lineGraphSteps = calculateSteps(lineGraphMax, credit);
  const lineGraphValues = calculateGraphValues(lineGraphSteps, credit);
  const barGraphSteps = calculateSteps(barGraphMax, C_D);
  const barGraphValues = calculateGraphValues(barGraphSteps, C_D);
  // console.log("====================================");
  // console.log("my values :", graphValues);
  // console.log("====================================");
  // console.log("====================================");
  // console.log("min", min, "max", max, "steps", steps);
  // console.log("====================================");

  //formated lableValues
  const lineGraphFormatedValues = formatValues(lineGraphValues);
  const barGraphFormatedValues = formatValues(barGraphValues);
  console.log("====================================");
  console.log("bar formated : ", barGraphFormatedValues);
  console.log("====================================");
  // console.log(
  //   "Line graph : ",
  //   lineGraphFormatedValues,
  //   " Bar Graph : ",
  //   barGraphFormatedValues
  // );

  const lineGraphProps = {
    credit: credit,
    debit: debit,
    labels: months,
    yaxisLabels: lineGraphFormatedValues,
  };

  const barGraphProps = {
    labels: months,
    barGraphData: C_D,
    importo: importoSum,
    yaxisLabels: barGraphFormatedValues,
  };

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#191970",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {/* Tab 1 */}

          <TouchableOpacity onPress={() => setIsDashboard(true)}>
            <View
              style={{
                width: devWidth * 0.5,

                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: isDashboard ? "#EFA566" : null,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={require("../../assets/imac.png")}
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    marginTop: 5,
                    color: "#ffffff",
                    fontWeight: "600",
                  }}
                >
                  Report
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Tab 2 */}

          <TouchableOpacity onPress={() => setIsDashboard(false)}>
            <View
              style={{
                width: devWidth * 0.5,

                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: !isDashboard ? "#EFA566" : null,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/webanalytics.png")}
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    marginTop: 5,
                    color: "#ffffff",
                    fontWeight: "400",
                  }}
                >
                  Situazione finanziaria
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {isDashboard ? (
        <DashA selectedCompany={companyName} />
      ) : (
        <DashB lineGraph={lineGraphProps} barGraph={barGraphProps} />
      )}
    </ScrollView>
  );
}
export default DashboardScreen;
