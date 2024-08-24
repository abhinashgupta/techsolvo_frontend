import axiosInstance from "../../axiosInstance";

export const signup = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/signup", userData);
    const { token } = response.data;
    localStorage.setItem("token", token);
    dispatch({ type: "SIGNUP_SUCCESS", payload: token });
  } catch (error) {
    dispatch({ type: "SIGNUP_FAIL", payload: error.response.data.message });
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_LOADING" });
    const response = await axiosInstance.post("/auth/login", credentials);
    const { token, user } = response.data;

    localStorage.setItem("token", token);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { token, user },
    });
  } catch (error) {
    console.error("Login error:", error);

  }
};


export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
};