import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  AsyncStorage,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";

import Arrow from "../../assets/images/ic-arrow-back-48px.svg";
import colors from "../../constants/Colors";
import TitleText from "../../components/misc/TitleText";
import Colors from "../../constants/Colors";

const AuthHOC = (props) => {
  // const theme = useSelector((state) => state.theme.isDarkMode);
  const check = AsyncStorage.getItem("alreadyLaunched");
  return (
    <KeyboardAvoidingView
      style={{
        ...styles.screen,
        ...props.style,
        backgroundColor: "white",
      }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.header}>
            {props.page === "Login" && check ? null : (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.state.routeName === "Login"
                    ? props.navigation.navigate("AuthLanding")
                    : props.step === 2
                    ? props.prev()
                    : props.navigation.goBack();
                }}
              >
                <Arrow fill={"black"} width={23} />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <TitleText>{props.title}</TitleText>
            {props.details && <Text style={styles.text}>{props.details}</Text>}
            {props.children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  text: {
    color: colors.primary.offBlack,
    fontSize: 13,
    fontFamily: "montserrat-regular",
    marginVertical: 5,
  },
});

export default AuthHOC;
