import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import SignupHOC from "./signupHOC";
import AuthenticationInput from "../../../components/misc/AuthenticationInput";
import Email from "../../../assets/images/mail-bulk.-1.svg";
import Lock from "../../../assets/images/lock-alt.-1.svg";
import User from "../../../assets/images/ic-person-1.svg";
import Show from "../../../assets/images/ic-remove-red-eye-24px.svg";

const StudentAuth = (props) => {
  const [pass, setPass] = useState(true);
  return (
    <SignupHOC
      navigation={props.nav}
      title="Almost there!"
      progress={5 / 6}
      buttonStyle={styles.button}
      {...props}
      prev={() => props.stepChange(3)}
    >
      <View>
        <AuthenticationInput
          id="short_id"
          inputIcon={<User width={30} />}
          placeholder="toninath"
          label="Username"
          keyboardType="default"
          errorText="Please enter a valid username"
          onInputChange={props.change}
          initialValue={props.kidsValues.short_id}
          textContentType="username"
        />
        <AuthenticationInput
          id="parent_email"
          inputIcon={<Email width={30} />}
          placeholder="invest@investnaira.com"
          label="Parent's Email Address"
          keyboardType="email-address"
          required
          email
          autoCapitalize="none"
          errorText="Please enter a valid email address"
          onInputChange={props.change}
          initialValue={props.kidsValues.parent_email}
          textContentType="emailAddress"
        />
        <AuthenticationInput
          id="password"
          inputIcon={<Lock width={30} />}
          placeholder="••••••"
          label="Password"
          keyboardType="default"
          passwordIcon={<Show width={30} />}
          secureTextEntry={pass}
          onTouch={() => setPass((prevState) => !prevState)}
          required
          minLength={6}
          autoCapitalize="none"
          errorText="Please enter a valid password"
          onInputChange={props.change}
          initialValue={props.kidsValues.password}
          textContentType="password"
        />
      </View>
    </SignupHOC>
  );
};

const styles = StyleSheet.create({
  button: {
    height: "46%",
  },
});

export default StudentAuth;
