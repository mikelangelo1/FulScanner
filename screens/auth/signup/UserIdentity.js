import React from "react";
import { StyleSheet, View, Text,  } from "react-native";

import SignupHOC from "./signupHOC";
import SvgTest from "../../../Svgs/SvgsTest";

const UserIdentity = (props) => {
  return (
    <SignupHOC
      navigation={props.nav}
      title="Are you a student or a staff?"
      progress={props.step / 8}
      step={props.step}
      {...props}
    >
      <View style={styles.imageContainer}>
        <SvgTest />
      </View>
    </SignupHOC>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textAlign: "right",
    width: "100%",
  },
});

export default UserIdentity;
