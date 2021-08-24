import React from "react";
import { StyleSheet, View } from "react-native";

import SignupHOC from "./signupHOC";
import AuthenticationInput from "../../../components/misc/AuthenticationInput";

const Name = (props) => {
  console.log(props.nav)
  return (
    <SignupHOC
      navigation={props.nav}
      title="What's your name?"
      progress={ 1 / 8} 
      buttonStyle={styles.button}
      next={props.next}
      {...props}
    >
      <View>
        <AuthenticationInput
          id="firstname"
          placeholder="Aisha"
          label="First Name"
          keyboardType="default"
          required
          autoCapitalize="words"
          errorText="Please enter your first name"
          onInputChange={props.change}
          textContentType="name"
          initialValue={props.values.firstname}
        />
        <AuthenticationInput
          id="lastname"
          placeholder="Abubakar"
          label="Last Name"
          keyboardType="default"
          required
          minLength={1}
          autoCapitalize="words"
          errorText="Please enter your last name"
          onInputChange={props.change}
          initialValue={props.values.lastname}
          textContentType="name"
        />
      </View>
    </SignupHOC>
  );
};

const styles = StyleSheet.create({
  button: {
    height: "35%",
  },
});

export default Name;
