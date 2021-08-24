/**
 * Action used to update the state of fields
 * @function formUpdate
 * @param {string} inputIdentifier - ID of the field currently being edited
 * @param {string} inputValue - Current value of the field being edited
 * @param {boolean} inputValidity - Validity of the field
 * @returns {object}
 */
 export default (inputIdentifier, inputValue, inputValidity) => {
    return {
      type: "UPDATE",
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    };
  };
  