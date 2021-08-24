import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";

import Finished from "../../../assets/images/undraw_celebrating_bol5.svg";
import TitleText from "../../../components/misc/TitleText";
import Colors from "../../../constants/Colors";

const Success = (props) => {
  setTimeout(() => props.navigation.navigate("Login"), 5000);
  // const theme = useSelector((state) => state.theme.isDarkMode);
  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: "white",
      }}
    >
      <TitleText style={styles.title}>All done!</TitleText>
      <Finished width={Dimensions.get("window").width / 2} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: Dimensions.get("window").height / 10,
  },
});

export default Success;
