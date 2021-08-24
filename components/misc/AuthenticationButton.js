import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import colors from "../../constants/Colors";

const AuthenticationButton = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonContainer, ...props.style }}
      onPress={props.onPress}
    >
      <Text style={{ ...styles.buttonText, ...props.textStyle }}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    backgroundColor: colors.primary.neon,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginVertical: 10,
    shadowColor: "#00000029",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontFamily: "montserrat-bold",
    color: "white",
    fontSize: 12,
  },
});

export default AuthenticationButton;
