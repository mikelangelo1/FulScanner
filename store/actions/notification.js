import * as ROUTES from "../../routes/endpoints.js";

export const NOTIFY = "NOTIFY";

/**
 * Function to  dispatch push notification
 * @function notify
 * @param {string} token - User User Expo Device Token
 * @param {string} title - Notification Title
 * @param {string} body - Subtext of notification
 * @param {object} data - Notification Payload
 * @returns {async}
 */

export const notify = (token, title, body, data) => {
  return async (dispatch) => {
    const message = {
      to: token,
      sound: "default",
      title: title,
      body: body,
      data: { data: data },
      _displayInForeground: true,
    };
    const response = await fetch(ROUTES.NOTIFY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw resData;
    }

    dispatch({ type: NOTIFY });
  };
};

export const storeToken = (token) => {
  return {
    type: "TOKEN",
    deviceId: token,
  };
};
