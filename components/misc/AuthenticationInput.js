import React, { useReducer, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

/**
 * Factory Function used to handle the validities of form fields
 * @fuction Input Reducer
 * @param {object} state - State of the input field
 * @param {object} action  - Used to determine the changes to be carried out on the state
 * @returns {object}
 */

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
  }
};

const AuthenticationInput = (props) => {
  // The state of the input field which contains the initial values, validities and state of touch
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const password = useSelector((state) => state.form.inputValues.new_password);

  //Deconstructing the props so that they can be used as dependencies in the useEffect fuction
  const { id } = props;

  //Used to set the state of the field
  useEffect(() => {
    if (inputState.touched) {
      props.onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState]);

  /**
   * Function used to set the validitions of the field
   * @function textChangeHandler
   * @param {string} text - The text entered into the input field
   * @return {object} - The action that is passed into the input reducer function
   */
  const textChangeHandler = (text) => {
    // Regex pattern used to verify email fields
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Regex pattern used to verify phone number fields
    const pattern = /^0(1|7|8|9)|\+234\d/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.phone && !text.match(pattern)) {
      isValid = false;
    }
    if (props.confirmPassword && text.localeCompare(password) !== 0) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  //Function that dispatches the INPUT_BLUR action
  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };
  // const theme = useSelector((state) => state.theme.isDarkMode);

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <View
        style={{
          ...styles.card,
          backgroundColor: "#F5FBF6",
          // backgroundColor: theme ? "transparent" : "#F5FBF6",
          borderColor: "#F1F7F2",
        }}
      >
        <View style={styles.textInput}>
          <TextInput
            {...props}
            style={{
              ...styles.input,
              color: Colors.primary.dark,
            }}
            placeholderTextColor= "#8E8E8E"
            value={inputState.value}
            onChangeText={textChangeHandler}
            onBlur={lostFocusHandler}
          />
        </View>
        <View style={styles.passwordIcon}>
          <TouchableOpacity onPress={props.onTouch}>
            {props.passwordIcon}
          </TouchableOpacity>
        </View>
      </View>
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "98%",
    marginVertical: 5,
  },
  label: {
    fontFamily: "montserrat-bold",
    color: Colors.primary.offBlack,
    fontSize: 13,
  },
  card: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderColor: "#F1F7F2",
    borderWidth: 2,
    borderRadius: 4,
  },
  textInput: {
    width: "90%",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    marginLeft: 5,
  },
  errorText: {
    fontFamily: "montserrat-regular",
    color: "red",
    fontSize: 10,
  },
});

export default AuthenticationInput;
