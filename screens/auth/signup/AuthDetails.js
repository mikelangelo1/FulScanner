import React, { useState} from "react";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
  } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from '@expo/vector-icons';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import SignupHOC from "./signupHOC";
import AuthenticationInput from "../../../components/misc/AuthenticationInput";
import colors from "../../../constants/Colors";

  const AuthDetails = (props) => {
  let [pass, setPass] = useState(true);
    const [data, setData] = React.useState({
        username: "",
        password: "",
        confirm_password: "",
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
      });

const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const updateConfrimSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
  //   <View style={styles.container}>
  //     <StatusBar backgroundColor="#009387" barStyle="light-content" />
  //     <View style={styles.header}>
  //       <Text style={styles.text_header}>Register Now</Text>
  //     </View>
  //     <Animatable.View animation="fadeInUpBig" style={styles.footer}>
  //       <ScrollView>
  //         <Text style={styles.text_footer} User>
  //           {" "}
  //           Username{" "}
  //         </Text>
  //         <View style={styles.action}>
  //           <FontAwesome name="user-o" color="#05375a" size={20} />
  //           <TextInput
  //             placeholder="Your username"
  //             style={styles.textInput}
  //             autoCapitalize="none"
  //             onChangeText={(val) => textInputChange(val)}
  //           />
  //           {data.check_textInputChange ? (
  //             <Animatable.View animation="bounceIn">
  //               <Feather name="check-circle" color="green" size={20} />
  //             </Animatable.View>
  //           ) : null}
  //         </View>
  //         <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
  //         <View style={styles.action}>
  //           <Feather name="lock" color="#05375a" size={20} />
  //           <TextInput
  //             placeholder="Your Password"
  //             secureTextEntry={data.secureTextEntry}
  //             style={styles.textInput}
  //             autoCapitalize="none"
  //             onChangeText={(val) => handlePasswordChange(val)}
  //           />
  //           <TouchableOpacity onPress={updateSecureTextEntry}>
  //             {data.secureTextEntry ? (
  //               <Feather name="eye-off" colo="grey" size={20} />
  //             ) : (
  //               <Feather name="eye" color="grey" size={20} />
  //             )}
  //           </TouchableOpacity>
  //         </View>

  //         <Text
  //           style={[
  //             styles.text_footer,
  //             {
  //               marginTop: 35,
  //             },
  //           ]}
  //         >
  //           Confirm Password
  //         </Text>
  //         <View style={styles.action}>
  //           <Feather name="lock" color="#05375a" size={20} />
  //           <TextInput
  //             placeholder="Confirm Your Password"
  //             secureTextEntry={data.confirm_secureTextEntry}
  //             style={styles.textInput}
  //             autoCapitalize="none"
  //             onChangeText={(val) => handleConfirmPasswordChange(val)}
  //           />
  //           <TouchableOpacity onPress={updateConfrimSecureTextEntry}>
  //             {data.secureTextEntry ? (
  //               <Feather name="eye-off" color="grey" size={20} />
  //             ) : (
  //               <Feather name="eye" color="grey" size={20} />
  //             )}
  //           </TouchableOpacity>
  //         </View>
  //         <View style={styles.textPrivate}>
  //           <Text style={styles.color_textPrivate}>
  //             By signing up you agree to our
  //           </Text>
  //           <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
  //             {" "}
  //             Terms of service
  //           </Text>
  //           <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
  //             {" "}
  //             and{" "}
  //           </Text>
  //           <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
  //             {" "}
  //             Privacy policy
  //           </Text>
  //         </View>
  //         <View style={styles.button}>
  //           <TouchableOpacity style={styles.signIn} onPress={() => {}}>
  //             <LinearGradient
  //               colors={["#08d4c4", "#01ab9d"]}
  //               style={styles.signIn}
  //             >
  //               <Text
  //                 style={[
  //                   styles.textSign,
  //                   {
  //                     color: "#fff",
  //                   },
  //                 ]}
  //               >
  //                 Sign Up
  //               </Text>
  //             </LinearGradient>
  //           </TouchableOpacity>

  //           <TouchableOpacity
  //             onPress={() => navigation.goBack()}
  //             style={[
  //               styles.signIn,
  //               {
  //                 borderColor: "#009387",
  //                 borderWidth: 1,
  //                 marginTop: 15,
  //               },
  //             ]}
  //           >
  //             <Text
  //               style={[
  //                 styles.textSign,
  //                 {
  //                   color: "#009387",
  //                 },
  //               ]}
  //             >
  //               Sign In
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  // //       </ScrollView>
  // //     </Animatable.View>
  // //   </View>
  <SignupHOC
      navigation={props.nav}
      title="Almost there!"
      progress={props.step / 5}
      buttonStyle={styles.button}
      next={props.next}
      {...props}
    >
      <ScrollView>
        <AuthenticationInput
          id="email"
          inputIcon={<MaterialIcons name="email" size={24} color="black" />}
          placeholder="aisha.abu@fulafia.edu.ng"
          label="Email Address"
          keyboardType="email-address"
          required
          email
          autoCapitalize="none"
          errorText="Please enter a valid email address"
          onInputChange={props.change}
          initialValue={props.values.email}
          textContentType="emailAddress"
        />
        <AuthenticationInput
          id="phone_no"
          inputIcon={<Feather name="phone-call" size={24} color="#05375a" />}
          placeholder="Phone Number"
          label="Phone Number"
          keyboardType="phone-pad"
          phone
          required
          errorText="Please enter a valid phone number"
          onInputChange={props.change}
          initialValue={props.values.phone_no}
          textContentType="telephoneNumber"
        />
        <AuthenticationInput
          id="password"
          inputIcon={<Feather name="eye-off" color="#05375a" size={20} />}
          placeholder="••••••"
          label="Password"
          keyboardType="default"
          passwordIcon={  <Feather name="eye-off" color="grey" size={20} />}
          secureTextEntry={pass}
          onTouch={() => setPass((prevState) => !prevState)}
          required
          minLength={6}
          autoCapitalize="none"
          errorText="Please enter a valid password"
          onInputChange={props.change}
          initialValue={props.values.password}
          textContentType="password"
        />
        {/* {props.ready && (
          <ReCaptchaV3
            ref={(ref) => setCaptchaForm(ref)}
            captchaDomain={props.baseUrl}
            siteKey={props.siteKey}
            onReceiveToken={(token) => {
              props.values.recaptcha = token;
              setTimeout(async () => {
                props.submit();
              }, 1500);
            }}
          />
        )} */}
      </ScrollView>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={() => {
              
            }}>
              
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Sign Up
                </Text>
            
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              and{" "}
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
            </Text>
          </View>
    </SignupHOC>
   );
};

export default AuthDetails;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#009387",
    },
    header: {
      flex: 1,
      justifyContent: "flex-end",
      paddingHorizontal: 20,
      paddingBottom: 50,
    },
    footer: {
      flex: Platform.OS === "ios" ? 3 : 5,
      backgroundColor: "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    text_header: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 30,
    },
    text_footer: {
      color: "#05375a",
      fontSize: 18,
    },
    action: {
      flexDirection: "row",
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#f2f2f2",
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : -12,
      paddingLeft: 10,
      color: "#05375a",
    },
    button: {
      alignItems: "center",
      marginTop: 20,
    },
    signIn: {
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
    textSign: {
      fontSize: 12,
      fontWeight: "bold",
    },
    textPrivate: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 20,
    },
    color_textPrivate: {
      color: "grey",
    },
  });
  