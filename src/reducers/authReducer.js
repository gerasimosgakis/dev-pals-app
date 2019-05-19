import { SET_CURRENT_USER, RESET_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errors: { message: "" }
      };
    case RESET_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        errors: { message: "" }
      };
    default:
      return state;
  }
}
