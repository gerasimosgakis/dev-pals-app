import { GET_AUTHENTICATION } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    default:
      return state;
  }
}
