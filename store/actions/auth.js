import { AsyncStorage } from "react-native";

import * as ROUTES from "../../routes/endpoints.js";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const FORGOT = "FORGOT";
export const RESET = "RESET";
export const SIGNUP = "SIGNUP";
export const STUDENT_SIGNUP = "STUDENT_SIGNUP";
export const VERIFY = "VERIFY";
export const RESEND = "RESEND";

/**
 * Function to be dispatched upon login
 * @function
 * @param {string} email - User e-mail
 * @param {string} password - User password
 * @returns {async}
 */
export const login = (email, password, push_token, role, ) => {
  return async (dispatch) => {
    const response = await fetch(ROUTES.USER_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        push_token: push_token,
        role: role,
      }),
    });
    const resData = await response.json();

    // Throw errors if we dont get a status code of 20*
    if (!response.ok) {
      throw resData.errors;
    }
    dispatch({ type: LOGIN, image: resData.user.picture });

    //Save the token, refresh token and user data to storage
    saveDataToStorage(resData.token, resData.refreshToken, resData.user);

    return resData.user.picture;
  };
};

/**
 * Function to be dispatched upon login
 * @function signup
 * @param {string} firstname - User password
 * @param {string} lastname - User e-mail
 * @param {number} staff_number - User matric_number
 * @param {string} email - User e-mail
 * @param {number} phone_no - User password
 * @param {string} password - User password
 * @returns {async}
 */
export const signup = (
  firstname,
  lastname,
  staff_no,
  email,
  phone_no,
  password,
) => {
  return async (dispatch) => {
    const response = await fetch(ROUTES.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        staff_no: staff_no,
        email: email,
        phone_no: phone_no,
        password: password,
        source: "app",
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw resData.errors;
    }

    dispatch({ type: SIGNUP });
    return resData;
  };
};

/**
 * Function to be dispatched upon student sign up
 * @function studentSignup
 * @param {string} firstname - User password
 * @param {string} lastname - User e-mail
 * @param {number} matric_number- Matric number
 * @param {string} parent_email - User e-mail
 * @param {number} short_id - User password
 * @param {string} password - User password
 * @param {string} source - User acquisition channel
 * @returns {async}
 */
export const studentsSignup = (
  firstname,
  lastname,
  matric_no,
  email,
  short_id,
  password,
) => {
  return async (dispatch) => {
    const response = await fetch(ROUTES.REGISTER_STUDENT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        matric_number: matric_number,
        short_id: short_id,
        email: email,
        password: password,
        source: "app",
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw resData.errors;
    }

    dispatch({ type: SIGNUP });
    return resData;
  };
};

/**
 * Function to be dispatched upon verification of staff email
 * @function
 * @param {string} email - User e-mail
 * @param {number} otp - User otp
 * @returns {async}
 */

export const verify = (email, otp) => {
  return async (dispatch) => {
    const response = await fetch(ROUTES.USER_VERIFY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw resData.errors;
    }

    dispatch({ type: VERIFY });
  };
};

/**
 * Function to be dispatched upon verification of student email
 * @function
 * @param {string} email - User e-mail
 * @param {number} otp - User otp
 * @returns {async}
 */

export const studentVerify = (short_id, otp) => {
  return async (dispatch) => {
    const response = await fetch(ROUTES.CHILD_VERIFY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        short_id: short_id,
        verify_otp: otp,
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw resData.errors;
    }

    dispatch({ type: "STUDENT_VERIFY" });
  };
};
// Logout function dispatched on logout
export const logout = () => {
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

/**
 * Forgot Password function dispatched
 * @function forgot
 * @param {string} email - Registered user's email
 * @returns {async}
 */
export const forgot = (email) => {
  return async (dispatch) => {
    const response = await fetch(ROUTES.USER_FORGOT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw resData.errors;
    }
    dispatch({ type: FORGOT });
    return resData;
  };
};

/**
 * Resend verification link action dispatched
 * @function resend
 * @param {string} email - Registered user's email
 * @returns {async}
 */
export const resend = (email) => {
  return async (dispatch) => {
    const response = await fetch(ROUTES.RESEND_USER_VERIFY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw resData.errors;
    }
    dispatch({ type: RESEND });
    return resData;
  };
};

/**
 * Reset password action dispatched
 * @function reset
 * @param {string} email - User's email
 * @param {number} otp - User's one time password received from server
 * @param {string} password - User's password
 * @param {string} password_confirm - User's confirmed password
 */
export const reset = (email, otp, password, password_confirm) => {
  return async (dispatch) => {
    const response = await fetch(ROUTES.USER_RESET, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
        password: password,
        password_confirm: password_confirm,
      }),
    });
    if (!response.ok) {
      throw response.errors;
    }
    dispatch({ type: RESET });
    const resData = await response.json();
    return resData;
  };
};

/**
 * Function used to set token and user info to storage
 * @function saveDataToStorage
 * @param {string} token
 * @param {string} refreshToken
 * @param {object} userInfo
 */
const saveDataToStorage = (token, refreshToken, userInfo) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      refreshToken: refreshToken,
      userInfo: userInfo,
    })
  );
};
