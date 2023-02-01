import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Alert, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CostumInput from "../components/CostumInput";

function SettingScreen() {
    const [viewTotp, SetViewTotp] = useState<any>();
    const [viewEmail, SetViewEmail] = useState<any>();
    const [code, setCode] = useState('');
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = async () => {
        let em = await AsyncStorage.getItem('email2')
        axios.post("https://api.cashflow.albadev.xyz/v1/mist/guest/2fa/status",
            {
                "username_or_email": em
            }).then(resp => {
                if (resp.status == 200) {
                    setIsEnabled(current => !current)
                }
                else {
                    setIsEnabled(current => current)
                }
            }).catch(erro => {
                console.log(erro)
            })
    };

    async function verifyEmail() {
        let token = await AsyncStorage.getItem('token')
        axios.post("https://api.cashflow.albadev.xyz/v1/mist/authorized/2fa/verify_new_2fa",
            { "method": "email", "otp": code },
            {
                headers: { "Mist-Authorization": `${token}` }
            }).then(resp => {
                Alert.alert("theToTp is done !")
            }).catch(erro => {
                console.log(erro)
            })
    }
    async function verifyTotp() {
        let token2 = await AsyncStorage.getItem('token')
        axios.post("https://api.cashflow.albadev.xyz/v1/mist/authorized/2fa/verify_new_2fa",
            { "method": "totp", "otp": code },
            {
                headers: { "Mist-Authorization": `${token2}` }
            }).then(resp => {
                Alert.alert("theToTp is done !")
            }).catch(erro => {
                console.log(erro)
            })
    }
    async function set_email() {
        let token = await AsyncStorage.getItem('token')
        axios.post("https://api.cashflow.albadev.xyz/v1/mist/authorized/2fa/set_new_2fa",
            { "method": "email" },
            {
                headers: { "Mist-Authorization": `${token}` }
            }).then(res => {
                SetViewEmail(
                    <View>
                        <CostumInput placeholder="add code" setValue={() => setCode(code)} />
                        <View>
                            <TouchableOpacity style={{
                                backgroundColor: "green",
                                marginTop: 20,
                                borderRadius: 5,
                                padding: 15,
                                alignItems: "center"
                            }} onPress={verifyEmail}>
                                <Text>add code</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }).catch(err => {
                console.log(err);
            })
    }
    async function set_totp() {
        let token = await AsyncStorage.getItem('token')
        axios.post("https://api.cashflow.albadev.xyz/v1/mist/authorized/2fa/set_new_2fa",
            { "method": "totp" },
            {
                headers: { "Mist-Authorization": `${token}` }
            }).then(res => {
                SetViewEmail(
                    <View>
                        <CostumInput placeholder="add code" setValue={() => setCode(code)} />
                        <View>
                            <TouchableOpacity style={{
                                backgroundColor: "green",
                                marginTop: 20,
                                borderRadius: 5,
                                padding: 15,
                                alignItems: "center"
                            }} onPress={verifyTotp}>
                                <Text>add code</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                SetViewTotp(
                    <View style={{ padding: 20 }}>
                        <Text style={{ color: "red" }}>{res.data}</Text>
                    </View>)
            }).catch(err => {
                console.log(err);
            })
    }
    return (
        <View style={{ display: 'flex', alignItems: "center" }}>
            <Text>Autenticazione a due fattori</Text>
            <View>
                <TouchableOpacity onPress={set_email} style={{
                    backgroundColor: "green",
                    marginTop: 20,
                    borderRadius: 5,
                    padding: 15,
                    alignItems: "center"
                }}>
                    <Text>Verifica con email</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{
                    backgroundColor: "green",
                    marginTop: 20,
                    borderRadius: 5,
                    padding: 15,
                    alignItems: "center"
                }} onPress={set_totp}>
                    <Text>Verifica con Totp</Text>
                </TouchableOpacity>
            </View>
            <View>
                {viewTotp}
                {viewEmail}
            </View>
            <View style={{ display: 'flex' }}>
                <Text>è autenticato</Text>
                <Switch
                    trackColor={{ true: "#767577", false: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text> non è autenticato</Text>
            </View>
        </View>
    )
}

export default SettingScreen;