import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

import Arrow from "../../assets/images/ic-arrow-back-48px.svg";
import TitleText from "../../components/misc/TitleText";
import colors from "../../constants/Colors";
import AuthenticationButton from "../../components/misc/AuthenticationButton";

const AuthLandingScreen = (props) => {
 
  const { width, height } = Dimensions.get("window");
  return (
    <View
      style={[
        styles.screen,
        // theme === true && { backgroundColor: colors.primary.dark },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Startup", { slide: 3 });
        }}
      >
        <Arrow fill="black" width={23} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <TitleText
          style={{
            ...styles.title,
            color: colors.primary.neon,
          }}
        >
          Scan
        </TitleText>
        <TitleText
          style={{
            ...styles.title,
            color: colors.primary.neon,
          }}
        >
          Fulafia
        </TitleText>
        <TitleText
          style={{
            ...styles.title,
            color: colors.primary.neon,
          }}
        >
          Exam
        </TitleText>
        <TitleText
          style={{
            ...styles.title,
            color: colors.primary.neon,
          }}
        >
          code!
        </TitleText>
      </View>
      <View style={styles.image}>
        <Image source={require("../../assets/images/scan-04.png")} />
      </View>

      {/* <Pig width={width / 1.6} height={height / 3.2} /> */}
      <View>
        <AuthenticationButton
          onPress={() => props.navigation.navigate("SignUp")}
          textStyle={styles.button}
        >
          LET'S GO
        </AuthenticationButton>
        <View style={styles.textContainer}>
          <Text style={styles.memberText}>Already a member? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  backArrow: {
    width: "100%",
    alignItems: "flex-start",
  },
  titleContainer: {
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "45%",
    paddingTop: 20,
    paddingLeft: 20,
  },
  title: {
    color: "black",
    fontSize: 32,
    fontFamily: "avenir-bold",
  },
  image: {
    width: "100%",
    height: "30%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  button: {
    fontFamily: "avenir-bold",
  },
  textContainer: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: 0,
    flexDirection: "row",
  },
  memberText: {
    color: colors.primary.offBlack,
    fontSize: 12,
    fontFamily: "avenir-regular",
  },
  signInText: {
    color: colors.primary.neon,
    fontSize: 12,
    fontFamily: "avenir-regular",
  },
});

export default AuthLandingScreen;
