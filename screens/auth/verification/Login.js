import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as Device from "expo-device";
import * as Sentry from "sentry-expo";

import AuthHOC from "./AuthHOC";
import Show from "../../assets/images/ic-remove-red-eye-24px";
import Email from "../../assets/images/mail-bulk.-1";
import Lock from "../../assets/images/lock-alt.-1";
import colors from "../../constants/Colors";
import AuthenticationButton from "../../components/misc/AuthenticationButton";
import AuthenticationInput from "../../components/misc/AuthenticationInput";
import * as authActions from "../../store/actions/auth";
import formUpdate from "../../store/actions/form";
import { saveImage } from "../../store/actions/image";
import { storeToken } from "../../store/actions/notifications";
import reset from "../../store/actions/resetForm";
import formValidator from "../../utils/formValidator";
import emailValidator from "../../utils/emailValidator";
import { imageUpdate } from "../../utils/imageUpdate";
import { ScrollView } from "react-native-gesture-handler";

const Login = (props) => {
  let [pass, setPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  let token = "";
  let brand = "";
  let modelName = "";
  const dispatch = useDispatch();
  const allowed = ["email", "password"];

  const registerForPushNotificationsAsync = async () => {
    // Get permissions to receive notifications
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // Checking for the status of the permission access
    if (existingStatus !== "granted") {
      // Ask for permissions again if not previously granted
      try {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      } catch (err) {
        Alert.alert("An error occured", err, [{ text: "Okay" }]);
        Sentry.captureException(err);
      }
    }
    if (finalStatus !== "granted") {
      Alert.alert(
        "An error occured",
        "Failed to get push token for push notification!",
        [{ text: "Okay" }]
      );
      return;
    }

    // Get the device token
    let id = await Notifications.getExpoPushTokenAsync();

    if (id) {
      // Store token in redux store
      dispatch(storeToken(id));

      // Set the device token for push notifications
      token = id;
    }

    // Set the device brand and model name
    brand = Device.brand;
    modelName = Device.modelName;

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  // Used to filter through the state to get the email and password values
  const values = useSelector((state) =>
    Object.keys(state.form.inputValues)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = state.form.inputValues[key];
        return obj;
      }, {})
  );

  // Used to filter through the state to get the email and password validities
  const validities = useSelector((state) =>
    Object.keys(state.form.inputValidities)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = state.form.inputValidities[key];
        return obj;
      }, {})
  );

  //Fuction to handle dispatch of the login action and navigation to the dashboard
  const loginHandler = async () => {
    setIsLoading(true);
    setError(null);
    let { email, password } = values;
    email = await emailValidator(email);
    // await registerForPushNotificationsAsync();
    let loading = setIsLoading;
    const response = await formValidator(validities, loading);
    if (response) {
      try {
        const picture = await dispatch(
          authActions.login(email, password, token, brand, modelName)
        );
        if (picture) {
          const cacheImage = await imageUpdate(picture);
          await dispatch(saveImage(cacheImage));
        }
        props.navigation.navigate("Parents");
        dispatch(reset());
      } catch (err) {
        Alert.alert("An error occurred", err.msg, [{ text: "Okay" }]);
        if (err.msg === "Unable to login. Please verify your email.") {
          Alert.alert("An error occured", "Your email has not been verified", [
            { text: "Okay" },
          ]);
          props.navigation.navigate("Verification", { name: "resend" });
        }
        Sentry.captureException(err);
        setIsLoading(false);
      }
    }
  };

  //Used to handle the errors that may occur during login
  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred", error, [{ text: "Okay" }]);
    }
  }, [error]);
  /**
   * Function used to set the validitions of the field
   * @function textChangeHandler
   */
  const textChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatch(formUpdate(inputIdentifier, inputValue, inputValidity));
    },
    [dispatch]
  );

  return (
    <AuthHOC
      title="Hi There!"
      details="Securely log in to your InvestNaira"
      navigation={props.navigation}
      page={"Login"}
    >
      <View style={styles.loginContainer}>
        <ScrollView
          style={styles.loginFields}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <AuthenticationInput
            id="email"
            inputIcon={<Email width={30} />}
            placeholder="invest@investnaira.com"
            label="Username or Email Address"
            keyboardType="email-address"
            required
            autoCapitalize="none"
            errorText="Please enter a valid email address"
            textContentType="emailAddress"
            onInputChange={textChangeHandler}
            initialValue=""
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
            textContentType="password"
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password"
            onInputChange={textChangeHandler}
            initialValue=""
          />
          <View style={styles.loginText}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Verification", { name: "forgot" })
              }
            >
              <Text style={styles.text}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.loginUtils}>
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary.neon} />
          ) : (
            <AuthenticationButton onPress={loginHandler}>
              SIGN IN
            </AuthenticationButton>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.memberText}>New member? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignUp")}
            >
              <Text style={styles.signInText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthHOC>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  loginFields: {
    marginVertical: 10,
    flex: 1,
  },
  loginText: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  loginUtils: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.primary.neon,
    fontSize: 13,
    fontFamily: "montserrat-regular",
    marginBottom: 15,
  },
  textContainer: {
    fontFamily: "montserrat-regular",
    textAlign: "center",
    fontSize: 10,
    flexDirection: "row",
  },
  googleButton: {
    backgroundColor: "transparent",
    borderColor: colors.primary.neon,
    borderWidth: 1,
    justifyContent: "center",
  },
  textStyle: {
    color: colors.primary.neon,
  },
  memberText: {
    color: colors.primary.offBlack,
    fontSize: 12,
  },
  signInText: {
    color: colors.primary.neon,
    fontSize: 12,
  },
});

export default Login;
