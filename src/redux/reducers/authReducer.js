const initialState = {
  isAuthenticated: false,
  loading: false, 
  user: null,
  token: localStorage.getItem("token"),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SIGNUP_SUCCESS":
        return {
          ...state,
          success: true,
          error: null,

        };
      case "SIGNUP_FAIL":
        return {
          ...state,
          success: false,
          error: action.payload,
        };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload.user,
          token: action.payload.token,
        };
      case "LOGOUT":
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          user: null,
          token: null,
        };
      case "AUTH_LOADING":
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
};

export default authReducer;
