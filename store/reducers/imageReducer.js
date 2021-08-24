const initialState = {
    image: "",
  };
  
  export default (state = initialState, action) => {
    if (action.type === "SAVE_IMAGE") {
      return {
        image: action.image,
      };
    }
    return state;
  };
  