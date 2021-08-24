import React, { PureComponent } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";
import Colors from "../../constants/Colors";

class OTPTextView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: 0,
      otpText: [],
    };
    this.inputs = [];
  }

  componentDidMount() {
    const { defaultValue, cellTextLength } = this.props;
    this.otpText = defaultValue.match(
      new RegExp(".{1," + cellTextLength + "}", "g")
    );
  }

  onTextChange = (text, i) => {
    const { cellTextLength, inputCount, handleTextChange } = this.props;
    this.setState(
      (prevState) => {
        let { otpText } = prevState;
        otpText[i] = text;
        return {
          otpText,
        };
      },
      () => {
        handleTextChange(this.state.otpText.join(""));
        if (text.length === cellTextLength && i !== inputCount - 1) {
          this.inputs[i + 1].focus();
        }
      }
    );
  };

  onInputFocus = (i) => {
    this.setState({ focusedInput: i });
  };

  onKeyPress = (e, i) => {
    const { otpText = [] } = this.state;
    //Since otpText[i] is undefined, The clear operation is not functional
    if (e.nativeEvent.key === "Backspace" && i !== 0 && !otpText[i]) {
      this.inputs[i - 1].focus();
    }
    if (i === 5) {
      setTimeout(() => this.props.submit(), 1500);
    }
  };

  render() {
    const {
      inputCount,
      offTintColor,
      tintColor,
      defaultValue,
      cellTextLength,
      containerStyle,
      textInputStyle,
      ...textInputProps
    } = this.props;

    const TextInputs = [];

    for (let i = 0; i < 6; i += 1) {
      let defaultChars = [];
      if (defaultValue) {
        defaultChars = defaultValue.match(
          new RegExp(".{1," + cellTextLength + "}", "g")
        );
      }
      const inputStyle = [
        styles.textInput,
        textInputStyle,
        { backgroundColor: offTintColor },
      ];
      if (this.state.focusedInput >= i) {
        inputStyle.push({ backgroundColor: Colors.primary.neon });
      }

      TextInputs.push(
        <TextInput
          ref={(e) => {
            this.inputs[i] = e;
          }}
          key={i}
          defaultValue={defaultValue ? defaultChars[i] : ""}
          style={inputStyle}
          maxLength={this.props.cellTextLength}
          onFocus={() => this.onInputFocus(i)}
          onChangeText={(text) => this.onTextChange(text, i)}
          multiline={false}
          onKeyPress={(e) => this.onKeyPress(e, i)}
          keyboardType="numeric"
          {...textInputProps}
        />
      );
    }
    return <View style={[styles.container, containerStyle]}>{TextInputs}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  textInput: {
    borderRadius: Dimensions.get("window").width / 17,
    height: Dimensions.get("window").width / 8.5,
    width: Dimensions.get("window").width / 8.5,
    margin: 4,
    textAlign: "center",
    fontSize: Dimensions.get("window").width / 18,
    fontFamily: "montserrat-bold",
    color: "white",
  },
});

OTPTextView.propTypes = {
  defaultValue: PropTypes.string,
  inputCount: PropTypes.number,
  containerStyle: PropTypes.object,
  textInputStyle: PropTypes.object,
  cellTextLength: PropTypes.number,
  tintColor: PropTypes.string,
  offTintColor: PropTypes.string,
  handleTextChange: PropTypes.func,
  inputType: PropTypes.string,
};

OTPTextView.defaultProps = {
  defaultValue: "",
  inputCount: 6,
  tintColor: "#3CB371",
  offTintColor: "#DCDCDC",
  cellTextLength: 1,
  containerStyle: {},
  textInputStyle: {},
  handleTextChange: () => {},
};
export default OTPTextView;
