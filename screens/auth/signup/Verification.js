import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import SignupHOC from "./signupHOC";
import OTPTextView from "../../../components/misc/OTPTextView";
import formUpdate from "../../../store/actions/form";

const Verification = (props) => {
  const dispatch = useDispatch();
  return (
    <SignupHOC
      navigation={props.nav}
      title="Verification"
      text="Enter your OTP here"
      progress={props.step / 5}
      buttonStyle={styles.button}
      next={() => props.stepChange(2)}
      {...props}
    >
      <View style={styles.otpContainer}>
        <OTPTextView
          defaultValue=""
          submit={props.verify}
          handleTextChange={(text) => dispatch(formUpdate("otp", text, true))}
        />
      </View>
    </SignupHOC>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    alignItems: "center",
  },
  button: {
    height: "80%",
  },
});

export default Verification;
