import React from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import DataVisualization from "../components/DataVisualization";
import DataTable from "../components/DataTable";
import { AntDesign } from "@expo/vector-icons";

function DashA({ selectedCompany }) {
  return (
    <ScrollView>
      <View style={{ paddingTop: 20, flexDirection: "column" }}>
        <View>
          <DataTable companyName={selectedCompany} />
        </View>
        <View>{/* <DataVisualization /> */}</View>
        <View>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "white",
                width: 125,
                padding: 10,
                margin: 10,
                flexDirection: "row",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Aggiorna i dati</Text>
              <AntDesign name="reload1" size={15} style={{ marginLeft: 5 }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
export default DashA;
