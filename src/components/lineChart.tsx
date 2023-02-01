import React, { useCallback, useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";

const MyLineChart = ({ graphData }: any) => {
  const { credit, debit, labels, yaxisLabels } = graphData;

  console.log("====================================");
  console.log(graphData);
  console.log("====================================");
  function* setYLabel() {
    yield* yaxisLabels;
  }
  const yLabelIterator = setYLabel();

  return (
    <View style={styles.chart}>
      <LineChart
        data={{
          labels: labels,
          legend: ["Credit", "Debit"],
          datasets: [
            {
              data: credit,

              strokeWidth: 1,
              color: (opacity = 1) => "#00FF00",
            },
            {
              data: debit,

              strokeWidth: 1,
              color: (opacity = 1) => "#FF0000",
            },
          ],
        }}
        // withDots={false}
        withInnerLines={false}
        withShadow={false}
        width={Dimensions.get("window").width - 16} // from react-native
        height={220}
        yAxisSuffix={"€"}
        formatYLabel={() => yLabelIterator.next().value}
        chartConfig={{
          backgroundGradientFrom: "#ffff",
          backgroundGradientTo: "#ffff",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "3",
          },
          propsForLabels: {
            fontSize: 10,
            fontWeight: "bold",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyLineChart;
