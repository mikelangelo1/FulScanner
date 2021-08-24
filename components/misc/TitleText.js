import React from "react";
import { Text, StyleSheet } from "react-native";

import colors from "../../constants/Colors";

const TitleText = (props) => {
  return (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.primary.neon,
    fontSize: 32,
    fontFamily: "avenir-bold",
  },
});

export default TitleText;
