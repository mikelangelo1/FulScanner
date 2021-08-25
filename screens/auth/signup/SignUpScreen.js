import React, {useState, useEffect} from "react";
import {
  Platform,
  UIManager,
  LayoutAnimation
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../../../store/actions/auth";
import formUpdate from "../../../store/actions/form";
import formValidator from "../../../utils/formValidator";
import cleaner from "../../../utils/phoneNumberCleaner";

import StudentVerification from "./studentVerification";
import Verification from "./Verification";
import StudentAuth from "./studentAuth";
import Success from "./Success";
import UserIdentity from "./UserIdentity"
import Name from './Name';
import Birthday from "./Birthday";
import AuthDetails from "./AuthDetails";
import MatricNoInput from "./MatricNoInput";
import StaffIdInput from "./StaffIdInput";


if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const SignUpScreen = ({navigation}) => {
  
  const [step, setStep] = useState(1);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const allowedStaffs = [
    "firstname",
    "lastname",
    "staff_id",
    "email",
    "phone_no",
    "password",
  ];
  const allowedStudents = [
    "firstname",
    "lastname",
    "matric_no",
    "email",
    "short_id",
    "password",
  ];
  const verify = ["email", "otp"];
  const verifyStudent = ["email", "otp"];

//Filter state to get initial staff signup values
const values = useSelector((state) =>
Object.keys(state.form.inputValues)
  .filter((key) => allowedStaffs.includes(key))
  .reduce((obj, key) => {
    obj[key] = state.form.inputValues[key];
    return obj;
  }, {})
);

//Filter state to get initial staff signup values validities
const validities = useSelector((state) =>
Object.keys(state.form.inputValidities)
  .filter((key) => allowedStaffs.includes(key))
  .reduce((obj, key) => {
    obj[key] = state.form.inputValidities[key];
    return obj;
  }, {})
);

//Filter state to get initial verification values
const verifyValues = useSelector((state) =>
Object.keys(state.form.inputValues)
  .filter((key) => verify.includes(key))
  .reduce((obj, key) => {
    obj[key] = state.form.inputValues[key];
    return obj;
  }, {})
);

//Filter state to get initial staff verification values validities
const verifyValidities = useSelector((state) =>
Object.keys(state.form.inputValidities)
  .filter((key) => verify.includes(key))
  .reduce((obj, key) => {
    obj[key] = state.form.inputValidities[key];
    return obj;
  }, {})
);

//Filter state to get initial students signup values
const studentsValues = useSelector((state) =>
Object.keys(state.form.inputValues)
  .filter((key) => allowedStudents.includes(key))
  .reduce((obj, key) => {
    obj[key] = state.form.inputValues[key];
    return obj;
  }, {})
);

//Filter state to get initial students signup values validities
const studentsValidities = useSelector((state) =>
Object.keys(state.form.inputValidities)
  .filter((key) => allowedStudents.includes(key))
  .reduce((obj, key) => {
    obj[key] = state.form.inputValidities[key];
    return obj;
  }, {})
);

//Filter state to get students initial verification values
const studentsVerifyValues = useSelector((state) =>
Object.keys(state.form.inputValues)
  .filter((key) => verifyStudent.includes(key))
  .reduce((obj, key) => {
    obj[key] = state.form.inputValues[key];
    return obj;
  }, {})
);

//Filter state to get initial students verification values validities
const studentsVerifyValidities = useSelector((state) =>
Object.keys(state.form.inputValidities)
  .filter((key) => verifyStudent.includes(key))
  .reduce((obj, key) => {
    obj[key] = state.form.inputValidities[key];
    return obj;
  }, {})
);

//Fuction to handle dispatch of the Signup action and navigation to the dashboard
  const signupHandler = async () => {
    setError(null);
    let {
      firstname,
      lastname,
      staff_id,
      email,
      phone_no,
      password,
    } = values;
    const newPhone = cleaner(phone_no);
    phone_no = newPhone;
    let action = authActions.signup(
      firstname,
      lastname,
      staff_id,
      email,
      phone_no,
      password,
    );

    let loading = setIsLoading;
    const response = await formValidator(validities, loading);
    if (response) {
      try {
        await dispatch(action);
        setIsLoading(false);
        nextStep();
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
  };

  //Fuction to handle dispatch of the Verify action and navigation to the dashboard
  const verifyHandler = async () => {
    setIsLoading(true);
    setError(null);
    const { email, otp } = verifyValues;
    let action = authActions.verify(email, otp);
    let loading = setIsLoading;
    const response = await formValidator(verifyValidities, loading);
    if (response) {
      try {
        await dispatch(action);
        setStep(5);
        dispatch(reset());
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
  };

  //Fuction to handle dispatch of the Signup action and navigation to the dashboard
  const studentsSignupHandler = async () => {
    setError(null);
    let {
      firstname,
      lastname,
      matric_no,
      email,
      short_id,
      password,
    } = studentValues;
    let action = authActions.studentsSignup(
      firstname,
      lastname,
      matric_no,
      email,
      short_id,
      password,
    );

    let loading = setIsLoading;
    const response = await formValidator(studentsValidities, loading);
    if (response) {
      try {
        await dispatch(action);
        setIsLoading(false);
        nextStep();
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
  };

  //Fuction to handle dispatch of the Verify action and navigation to the dashboard
  const verifyStudentsHandler = async () => {
    setIsLoading(true);
    setError(null);
    const { short_id, otp } = studentsVerifyValues;
    let action = authActions.studentsVerify(short_id, otp);
    let loading = setIsLoading;
    const response = await formValidator(studentsVerifyValidities, loading);
    if (response) {
      try {
        await dispatch(action);
        setStep(8);
        dispatch(reset());
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
  };

   //Used to handle the errors that may occur during sign up
   useEffect(() => {
    if (error) {
      Object.keys(error).forEach((key, index) => {
        Alert.alert("An error occurred", error[key], [{ text: "Okay" }]);
      });
    }
  }, [error]);

  /**
   * Function used to set the validitions of the field
   * @function textChangeHandler
   */
   const textChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    dispatch(formUpdate(inputIdentifier, inputValue, inputValidity));
  };

  const nextStep = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        500,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
    setStep(step < 8 ? step + 1 : 8);
  };

  const prevStep = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        1000,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
    setStep(step === 1 ? 1 : step - 1);
  };

  // const { navigation } = props;

  const prop = {
    next: nextStep,
    change: textChangeHandler,
    step: step,
    navigation: navigation,
    prev: prevStep,
    values: values,
    studentssValues: studentsValues,
    verifyValues: verifyValues,
    stepChange: setStep,
    submit: signupHandler,
    studentssubmit: studentsSignupHandler,
    verify: verifyHandler,
    verifyStudents: verifyStudentsHandler,
    error: error,
    loading: isLoading,
    setLoading: setIsLoading,
  };

  switch (step) {
    case 1: 
     return <Name {...prop} />;
    case 2:
      return <Birthday {...prop} />;
      case 3:
      return <UserIdentity {...prop}  />   
    case 4:
      return <StaffIdInput {...prop} />
    case 5:
      return <AuthDetails {...prop} />;
    case 6:
      return <Verification {...prop} />;
    case 7:
      return <Success {...prop} />;
    case 8:
      return <MatricNoInput {...prop} />;
    case 9:
      return <StudentAuth {...prop} />;
    case 10: 
    return <StudentVerification {...prop} />;
  }
};

export default SignUpScreen;

