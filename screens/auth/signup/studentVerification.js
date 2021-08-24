import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useDispatch } from "react-redux";

import SignupHOC from "./signupHOC";
import OTPTextView from "../../../components/misc/OTPTextView";
import formUpdate from "../../../store/actions/form";

const StudentVerification = (props) => {
  const dispatch = useDispatch();
  return (
    <SignupHOC
      navigation={props.nav}
      title="Just a sec!"
      text="A 6-digit OTP is waiting in your parent's inbox"
      progress={1}
      buttonStyle={styles.button}
      {...props}
    >
      <View style={styles.otpContainer}>
        <OTPTextView
          defaultValue=""
          submit={props.verifyKid}
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
    height: "74%",
  },
});

export default StudentVerification;
