import { Alert } from "react-native";

export default (validities, loading) => {
  let formIsValid = true;
  validities.referrer = true;
  /**
   * Helper function used to capitalize the first letter of a string
   * @function capitalize
   * @param {string} str - Received string for capitalization
   * @returns {string}
   */
  function capitalize(str) {
    const word = str.split(" ");
    const cap = [];

    for (const char of word) {
      cap.push(char[0].toUpperCase() + char.slice(1));
    }

    return cap.join(" ");
  }

  // Used to set the form validity
  for (const key in validities) {
    // if any of the validities of the form are false the form is rendered invalid
    formIsValid = formIsValid && validities[key];
  }

  // If form is invalid
  if (!formIsValid) {
    let invalidFields = "";
    let invalidArray = [];
    // Loop through the validities object
    Object.keys(validities).forEach((key, index) => {
      // If any field is invalid
      if (!validities[key]) {
        if (key === "password_confirm") {
          key = "Confirm Password";
        }
        if (key === "phone_no") {
          key = "Phone Number";
        }
        if (key === "firstname") {
          key = "First Name";
        }
        if (key === "lastname") {
          key = "Last Name";
        }
        // Push key into the invalid array made to know the number of invalid fields
        invalidArray.push(key);
      }
    });

    // Used to map through the invalid array and construct error message
    invalidArray.map((value, index) => {
      if (index === invalidArray.length - 2) {
        invalidFields += capitalize(value) + " and ";
      } else if (index === invalidArray.length - 1) {
        invalidFields += capitalize(value) + " ";
      } else {
        invalidFields += capitalize(value) + ", ";
      }
    });

    // Used to set the suffix of the message based on the length of the array
    if (invalidArray.length === 1) {
      invalidFields += "is invalid";
    } else {
      invalidFields += "are invalid";
    }
    loading(false);

    //Display error pop up
    Alert.alert("An error occured", invalidFields, [{ text: "Okay" }]);
    return false;
  } else {
    return true;
  }
};
