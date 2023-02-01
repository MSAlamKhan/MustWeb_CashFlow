import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CostumInput from "../components/CostumInput";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ValidateScreen({ navigation }: any) {
    const { LogoutUser }: any = useAuth();
    async function verifByEmail() {
        let em =await AsyncStorage.getItem('email2')
        return (
            axios.post('https://api.cashflow.albadev.xyz/v1/mist/guest/2fa/send_otp',
                {
                    "method": "email",
                    "username_or_email": em
                }
            ).then(
                r => {
                    if (r.status == 204){
                        navigation.navigate('verification')
                    }
                }
            ).catch(e => {
                console.log(e)
            })
        )
    }
    // async function verifybyTotp() {
    //     let em =await AsyncStorage.getItem('email2')
    //     return (
    //         axios.post('https://api.cashflow.albadev.xyz/v1/mist/guest/2fa/send_otp',
    //             {
    //                 "method": "totp",
    //                 "username_or_email": em
    //             }
    //         ).then(
    //             r => {
    //                 if (r.status == 204){
    //                     navigation.navigate('verification')
    //                 }
    //             }
    //         ).catch(e => {
    //             console.log(e)
    //         })
    //     )
    // }
    function ReturnLog() {
        LogoutUser();
    }
    return (
        <View style={styles.LoginPage}>
            <View style={styles.LoginForm} >
                <Image source={{ uri: "https://cashflow.albasoftsolutions.it/img/logo_cashflow_new.png" }} style={styles.Logo} />
                <View style={{ margin: 20 }}>
                    <Text>
                        Two Facture verification is enable please Verified
                    </Text>
                </View>
                <View style={{ margin: 30 }}>
                    <TouchableOpacity style={{
                        backgroundColor: "#a52a2c",
                        marginTop: 5,
                        borderRadius: 5,
                        padding: 10,
                        alignItems: "center"
                    }} onPress={verifByEmail}><Text style={{ fontWeight: "bold", color: "white" }}>Validate by Email</Text></TouchableOpacity>
                    {/* <TouchableOpacity style={{
                        backgroundColor: "gray",
                        marginTop: 5,
                        borderRadius: 5,
                        padding: 10,
                        alignItems: "center"
                    }} onPress={verifybyTotp} ><Text style={{ fontWeight: "bold", color: "white" }}>Validate by totp</Text></TouchableOpacity> */}
                    <TouchableOpacity style={{
                        backgroundColor: "gray",
                        marginTop: 5,
                        borderRadius: 5,
                        padding: 10,
                        alignItems: "center"
                    }} onPress={ReturnLog} ><Text style={{ fontWeight: "bold", color: "white" }}>Go Back</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
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

export default ValidateScreen;