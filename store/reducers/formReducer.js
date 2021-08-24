// Initial State of all fields
const initialState = {
    inputValues: {
      firstname: "",
      lastname: "",
      staff_id: "",
      email: "",
      phone_no: "",
      password: "",
      short_id: "",
      otp: "",
      password_confirm: "",
      old_password: "",
      new_password: "",
      new_password_confirm: "",
      note: "",
    },
    inputValidities: {
      note: true,
      firstname: false,
      lastname: false,
      staff_id: false,
      email: false,
      phone_no: false,
      password: false,
      short_id: false,
      otp: false,
      password_confirm: false,
      old_password: false,
      new_password: false,
      new_password_confirm: false,
    },
  };
  
  /**
   * Factory Function used to handle the validities of form
   * @fuction Input Reducer
   * @param {object} state - State of the form
   * @param {object} action  - Used to determine the changes to be carried out on the state
   * @returns {object}
   */
  
  export default (state = initialState, action) => {
    if (action.type === "UPDATE") {
      // Update the values of the fields
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
  
      // Update the validities of the fields
      return {
        inputValidities: updatedValidities,
        inputValues: updatedValues,
      };
    } else if (action.type === "RESET") {
      return initialState;
    }
    return state;
  };
  