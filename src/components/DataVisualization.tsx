import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';




function DataVisualization() {
    return (
        <View>
            <View>
                <Text style={{ padding: 10 }}>Data Visualization :</Text>
            </View>
            <View style={styles.container}>
                <BarChart data={{
                    labels: ['2019', '2020', '2021', '2022'],
                    datasets: [
                        {
                            data: [20 , 45, 80, 43],
                        },
                    ],
                }}
                    width={Dimensions.get('window').width-10}
                    height={220}
                    yAxisLabel={'$'}
                    chartConfig={{
                        backgroundColor:"white",
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                />
            </View>
        </View>
    )
}

export default DataVisualization;

const styles = StyleSheet.create({
    container: {
        margin:5,
        borderRadius:5,
        backgroundColor:"white"
    }
});
