import React from "react";
import { StyleSheet, View } from "react-native";
import ScrollPicker from "react-native-wheel-scroll-picker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import SignupHOC from "./signupHOC";
import Colors from "../../../constants/Colors";
import * as Date from "../../../data/date-data";
import formUpdate from "../../../store/actions/form";

const Birthday = (props) => {
  const dispatch = useDispatch();
  let day = useSelector((state) => state.form.inputValues.day);
  let month = useSelector((state) => state.form.inputValues.month);
  let year = useSelector((state) => state.form.inputValues.year);
  // let theme = useSelector((state) => state.theme.isDarkMode);

  const getAge = () => {
    const now = moment();
    // Today's date
    const birth = moment([year, month, day]);
    //Calculate user's age by the diffence between today's date and user's birthday
    let ages = now.diff(birth, "years");
    dispatch(formUpdate("age", ages, true));
  };

  return (
    <SignupHOC
      navigation={props.nav}
      title="Date of Birth?"
      progress={ 2 / 8 }
      buttonStyle={styles.button}
      {...props}
      next={() => {
        props.values.age > 25 ? props.next() : props.stepChange(3);
      }}
    >
      <View style={styles.datePicker}>
        <ScrollPicker
          dataSource={
            year % 4 === 0 && month === 2
              ? Date.days_29
              : month === 2
              ? Date.days_28
              : month === 4 || month === 6 || month === 9 || month === 11
              ? Date.days_30
              : Date.days_31
          }
          onValueChange={(data, selectedIndex) => {
            dispatch(formUpdate("day", data, true));
            getAge();
          }}
          selectedIndex={day}
          wrapperHeight={180}
          wrapperWidth={75}
          wrapperBackground={Colors.primary.dark}
          itemHeight={60}
          highlightColor={Colors.primary.grey }
          highlightBorderWidth={2}
          activeItemTextStyle={styles.active}
        />

        <ScrollPicker
          dataSource={Date.months}
          onValueChange={(data, selectedIndex) => {
            dispatch(formUpdate("month", selectedIndex + 1, true));
            getAge();
          }}
          selectedIndex={month}
          wrapperHeight={180}
          wrapperWidth={75}
          wrapperBackground={Colors.primary.dark}
          itemHeight={60}
          highlightColor={Colors.primary.grey}
          highlightBorderWidth={2}
          activeItemTextStyle={styles.active}
        />

        <ScrollPicker
          dataSource={Date.years}
          selectedIndex={year - 1950}
          onValueChange={(data, selectedIndex) => {
            dispatch(formUpdate("year", data, true));
            getAge();
          }}
          wrapperHeight={180}
          wrapperWidth={75}
          wrapperBackground={Colors.primary.dark}
          itemHeight={60}
          highlightColor={Colors.primary.grey}
          highlightBorderWidth={2}
          activeItemTextStyle={styles.active}
        />
      </View>
    </SignupHOC>
  );
};

const styles = StyleSheet.create({
  button: {
    height: "51%",
  },
  datePicker: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  active: {
    fontSize: 24,
    lineHeight: 26,
    textAlign: "center",
    fontFamily: "open-sans-bold",
    color: Colors.primary.neon,
  },
});

export default Birthday;
