import * as ROUTES from "../../routes/endpoints.js";

export const PICTURE_UPDATE = "PICTURE_UPDATE";

export const pictureUpdate = (profile_picture, token) => {
  // Split file path by . seperators
  let uriParts = profile_picture.split(".");

  // Pick the last value which is the file type
  let fileType = uriParts[uriParts.length - 1];

  // Split file path by  / seperators, pick the last which is the file name
  let filename = profile_picture.split("/").pop();

  let formData = new FormData();
  // append the picture to the form data
  formData.append("profile_pic", {
    uri: profile_picture,
    name: `${filename}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      // Set user token
      Authorization: `Bearer ${token}`,
    },
  };
  return async () => {
    const response = await fetch(ROUTES.PROFILE_PICTURE, options);
    const resData = await response.json();
    if (!response.ok) {
      throw resData.msg;
    }
    return resData;
  };
};

export const profileUpdate = (phone_no, short_id, token) => {
  return async (dispatch) => {
    const response = await fetch(ROUTES.PROFILE_UPDATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phone_no: phone_no,
        short_id: short_id,
      }),
    });
    if (!response.ok) {
      throw response.errors;
    }
    const resData = await response.json();
    console.log(resData);
  };
};

export const passwordUpdate = (
  old_password,
  new_password,
  new_password_confirm,
  token
) => {
  console.log(old_password, new_password, new_password_confirm, token);
  return async (dispatch) => {
    const response = await fetch(ROUTES.PASSWORD_UPDATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_password: old_password,
        new_password: new_password,
        new_password_confirm: new_password_confirm,
      }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw resData.errors;
    }
  };
};
