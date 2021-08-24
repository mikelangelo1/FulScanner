import { LOGIN, LOGOUT } from "../actions/auth";

const initialState = {
  picture: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        picture: action.image,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
