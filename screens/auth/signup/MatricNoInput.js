import React from "react";
import { View, StyleSheet } from "react-native";

import AuthenticationInput from "../../../components/misc/AuthenticationInput"
import SignupHOC from "./signupHOC";

const MatricNoInput = (props) => {
    return (
        <SignupHOC
            navigation={props.nav}
            title="Enter your matric number"
            progress={4/10}
            buttonStyle={styles.button}
            {...props}
            next={() => props.stepChange(5)}
        >
            <View>

            <AuthenticationInput 
                id="matric_no"
                placeholder="Matric Number"
                keyboardType="default"
                autoCapitalize = "none"
                errorText= "Please enter your matric number"
                onInputChange ={props.change}
                initialValue= {props.values.matric_no}
            />
            </View>

        </SignupHOC>
    )
}

export default MatricNoInput;

const styles = StyleSheet.create({
    button: {
        height: "91%",
      },
})