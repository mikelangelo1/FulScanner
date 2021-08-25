import React from "react";
import { View, StyleSheet } from "react-native";

import AuthenticationInput from "../../../components/misc/AuthenticationInput"
import SignupHOC from "./signupHOC";

const StaffIdInput = (props) => {
    return (
        <SignupHOC
            navigation={props.nav}
            title="Enter your Staff Id"
            progress={4/10}
            buttonStyle={styles.button}
            {...props}
            next={() => props.stepChange(5)}
        >
            <View>

            <AuthenticationInput 
                id="staff_id"
                placeholder="Staff Id"
                keyboardType="default"
                autoCapitalize = "none"
                errorText= "Please enter your Staff Id"
                onInputChange ={props.change}
                initialValue= {props.values.staff_id}
            />
            </View>

        </SignupHOC>
    )
}

export default StaffIdInput;

const styles = StyleSheet.create({
    button: {
        height: "91%",
      },
})