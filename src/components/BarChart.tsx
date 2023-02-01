import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { BarChart } from "react-native-chart-kit";

const winWidth = Dimensions.get("window").width;

const BarGraph = ({ graphData }: any) => {
  const { yaxisLabels, barGraphData, importo, labels } = graphData;

  function* setYLabel() {
    yield* yaxisLabels.reverse();
  }
  const yLabelIterator = setYLabel();

  const colors = barGraphData.map((value: number) => {
    if (value >= -1) {
      return (opacity = 1) => "#00FF00";
      // Condition (value < 0) means C-D is negative
    } else {
      if (importo > value * -1) {
        return (opacity = 1) => "#FFFF00";
      } else {
        return (opacity = 1) => "#FF0000";
      }
    }
  });
  const data = {
    labels: labels,

    datasets: [
      {
        data: barGraphData,
        colors: colors,
      },
    ],
  };
  return (
    <View style={styles.chart}>
      <BarChart
        width={winWidth - 16}
        height={250}
        yAxisSuffix={"€"}
        // withHorizontalLabels={false}
        withInnerLines={false}
        showBarTops={false}
        flatColor={true}
        fromZero={true}
        withCustomBarColorFromData={true}
        data={data}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          barPercentage: 0.7,
          color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
          labelColor: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
          propsForLabels: {
            fontSize: 9,
            fontWeight: "bold",
          },
          style: {
            borderRadius: 16,
          },
          formatYLabel: () => yLabelIterator.next().value,
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
export default BarGraph;
