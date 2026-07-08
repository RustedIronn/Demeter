const initialState = {
  isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}