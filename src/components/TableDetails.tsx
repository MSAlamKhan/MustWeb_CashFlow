import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { DataTable } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
function TableDetails() {
    const [saldi, setSaldi] = useState<any>()
    const [error, setError] = useState('')
    async function getDataSoldi() {
        const email = await AsyncStorage.getItem("email2");
        const token = await AsyncStorage.getItem("token");
        const company = await AsyncStorage.getItem("company")
        axios.post("https://cashflow.albasoftsolutions.it/api/balances/getData", {
            "email": email,
            "db": company,
            "token": token,
        }).then(res => {
            return setSaldi(res?.data.saldi)
            
        }).catch(error => Alert.alert("error"));
    }

    
    useEffect(() => {
        getDataSoldi();
    }, [])



    return (
        <View style={styles.container} >
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Nome c/c</DataTable.Title>
                    <DataTable.Title>saldo</DataTable.Title>
                    <DataTable.Title>descrizione</DataTable.Title>
                    <DataTable.Title>saldoValuta</DataTable.Title>
                </DataTable.Header>
                {saldi?.map((s:any,index:number) => {
                    return(
                    <DataTable.Row key={index}>
                        
                        <DataTable.Cell>{s.saldo}</DataTable.Cell>
                        <DataTable.Cell>{s.descrizione}</DataTable.Cell>
                        <DataTable.Cell>{s.saldoValuta}</DataTable.Cell>
                    </DataTable.Row>
                )})}
            </DataTable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { margin: 5, padding: 5, marginTop: 30, paddingTop: 30, backgroundColor: 'white', borderRadius: 5 },
    Table: { borderTopWidth: 2, marginTop: 20, borderColor: "#f8f9fD" },
    Title: { fontWeight: "bold" },
    TouchButton: {
        flexDirection: 'row', borderTopWidth: 1, paddingTop: 5, paddingBottom: 5, justifyContent: 'space-between', borderColor: "#f8f9fa",
    },
    head: { height: 40 },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1 },
    row: { height: 28, borderTopWidth: 1 },
})

export default TableDetails;