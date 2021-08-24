import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import { Bar } from "react-native-progress";
import { useSelector } from "react-redux";
import {Entypo, Ionicons } from "@expo/vector-icons";

import colors from "../../../constants/Colors";
import AuthenticationButton from "../../../components/misc/AuthenticationButton";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SignupHOC = (props) => {
  // const theme = useSelector((state) => state.theme.isDarkMode);

  return (
    <KeyboardAvoidingView
      style={{
        ...styles.screen,
        ...props.style,
        // backgroundColor: theme ? colors.primary.dark : "white",
      }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.containers}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              props.step === 1
                ? props.navigation.goBack()
                : props.step === 8
                ? props.stepChange(1)
                : props.prev();
            }}
          >
            <Ionicons name="arrow-back-outline" size={28} color={colors.primary.neon} />
          </TouchableOpacity>
          <View style={styles.progress}>
            <Bar
              animated={true}
              animationType="spring"
              progress={props.progress}
              color={colors.primary.neon}
              unfilledColor= "#ccc"
              borderWidth={0}
              height={3}
              width={Dimensions.get("window").width / 1.75}
            />
          </View>
        </View>
        <View style={[styles.content, props.step !== 1 && { flex: 1 }]}>
          <Text style={styles.title}>{props.title}</Text>
          {props.text ? <Text style={styles.text}>{props.text}</Text> : null}
          {props.step === 1 || props.step === 3 ? (
            props.children
          ) : (
            <ScrollView style={styles.containers}>{props.children}</ScrollView>
          )}
        </View>
        <View style={{ ...styles.buttonStyle }}>
          {props.step === 1 &&
            (props.loading ? (
              <ActivityIndicator size="small" color={colors.primary.neon} />
            ) : props.step === 4 || props.step === 8 ? null : (
              <AuthenticationButton
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  (props.ready && props.step === 4) ||
                  (props.ready && props.step === 8)
                    ? props.recaptchaForm.refreshToken()
                    : props.step === 4 || props.step === 8
                    ? props.setReady()
                    : props.next();
                }}
                style={styles.button}
              >
                <Entypo name="chevron-small-right" color="white" size={23} />
              </AuthenticationButton>
            ))}
        </View>
        {props.step === 3 && (
          <View style={styles.buttonContainer}>
            <AuthenticationButton
              onPress={() => props.stepChange(7)}
              style={{ ...styles.inviteButton, ...styles.yes }}
              textStyle={styles.buttonText}
            >
              Student
            </AuthenticationButton>

            <AuthenticationButton
              style={{ ...styles.inviteButton, ...styles.no}}
              onPress={props.next}
              textStyle={{ ...styles.buttonText, ...styles.noText }}
            >
              Staff
            </AuthenticationButton>
          </View>
        )}
      </View>
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
  containers: {
    flex: 1,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    borderRadius: 30,
    width: 55,
  },
  content: {
    marginTop: 10,
    height: Dimensions.get("window").height / 1.5,
    padding: 5,
  },
  title: {
    color: colors.primary.neon,
    fontSize: 15,
    fontFamily: "montserrat-bold",
    textAlign: "center",
    marginBottom: 30,
  },
  text: {
    color: colors.primary.offBlack,
    fontSize: 13,
    fontFamily: "montserrat-regular",
    textAlign: "center",
    marginBottom: 10,
  },
  progress: {
    width: "87%",
    alignItems: "center",
  },
  buttonStyle: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 5,
  },
  buttonText: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
  },
  inviteButton: {
    width: 100,
  },
  yes: {
    backgroundColor: colors.primary.neon,
  },
  no: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary.neon,
  },
  noText: {
    color: colors.primary.neon,
  },
});

export default SignupHOC;
