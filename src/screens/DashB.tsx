import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BarGraph from "../components/BarChart";

import MyLineChart from "../components/lineChart";
import numbro from "numbro";

const DashB = ({ lineGraph, barGraph }) => {
  const { credit, debit } = lineGraph;
  const isCredit = credit.every((element: number) => element == 0.0);
  const isDebit = debit.every((element: number) => element == 0.0);
  console.log("====================================");
  console.log(isCredit, isDebit);
  console.log("====================================");
  return (
    <ScrollView>
      <View
        style={{
          paddingVertical: 10,
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            marginLeft: 10,
          }}
        >
          Situazione finanziaria
        </Text>
      </View>
      <View>
        <TouchableOpacity></TouchableOpacity>
      </View>
      {isCredit && isDebit ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", margin: 20 }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            valori non validi
          </Text>
        </View>
      ) : (
        <View style={styles.charts}>
          <MyLineChart graphData={lineGraph} />
          <BarGraph graphData={barGraph} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  charts: {
    marginBottom: 30,
  },
  activityIndicator: {
    // width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height / 1.5,
    display: "flex",
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DashB;
