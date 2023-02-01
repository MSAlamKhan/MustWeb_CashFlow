import axios from 'axios';
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CostumInput from "../components/CostumInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../hooks/useAuth";

function OtpScreen({navigation}:any) {
    const [code, setCode] = useState('');

    async function VerificationButton() {
        let em =await AsyncStorage.getItem('email2');
        let pass =await AsyncStorage.getItem('password');

        axios.post('https://api.cashflow.albadev.xyz/v1/mist/guest/login', {
            username_or_email: em,
            password: pass,
            otp:code
        }).then(resp => {
            if(resp.status === 201){
                AsyncStorage.setItem('token',resp.data);
                navigation.navigate('company');
            }
        }).catch(err =>{
            console.log(err)
        })
    }
    const { LogoutUser }: any = useAuth();
    function ReturnLog() {
        LogoutUser();
    }
    return (
        <View style={styles.LoginPage}>
            <View style={styles.LoginForm} >
                <Image source={{ uri: "https://cashflow.albasoftsolutions.it/img/logo_cashflow_new.png" }} style={styles.Logo} />
                <View style={{ margin: 10 }}>
                    <CostumInput placeholder="Type OTP" value={code} setValue={setCode} />
                </View>
                <View style={{ margin: 15 }}>
                    <TouchableOpacity style={{
                        backgroundColor: "#a52a2c",
                        marginTop: 5,
                        borderRadius: 5,
                        padding: 10,
                        alignItems: "center"
                    }} onPress={VerificationButton}><Text style={{ fontWeight: "bold", color: "white" }}>Confirm</Text></TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: "gray",
                        marginTop: 5,
                        borderRadius: 5,
                        padding: 10,
                        alignItems: "center"
                    }} onPress={ReturnLog} ><Text style={{ fontWeight: "bold", color: "white" }}>LogOut</Text></TouchableOpacity>
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

export default OtpScreen;