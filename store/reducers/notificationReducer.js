const initialState = {
    token: "",
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case "TOKEN":
        return { token: action.deviceId };
    }
    return state;
  };
  