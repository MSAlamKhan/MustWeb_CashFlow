import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

function CostumInput({value, setValue,  placeholder, secureTextEntry}: any){
    return(
        <View>
             <TextInput value={value} onChangeText={setValue} placeholder={placeholder} style={styles.input} secureTextEntry={secureTextEntry}/>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
        borderRadius: 5
    },
})
export default CostumInput;