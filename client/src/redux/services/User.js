import axios from "axios";
import { setUser } from "../reducers/User";
import createToast from "./createToast";

export async function fetchUserData(dispatch, navigate) {
  try {
    if (
      localStorage.getItem("token") &&
      !(localStorage.getItem("token") === "undefined")
    ) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.get(`/user/profile`, config);
      const data = response.data;
      dispatch(setUser(data.user));
      return data;
    }
  } catch (error) {
    if (error?.response?.data?.error?.startsWith("Token expired"))
      localStorage.removeItem("token");
    createToast(error?.response?.data?.error, "error");
    createToast("Please Re-Login", "error");
    // localStorage.removeItem("token");
    console.log(error);
    navigate("/login");
  }
}

export async function editUserData(dispatch, data) {
  try {
    if (localStorage.getItem("token")) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const body = {
        name: data.name ? data.name : undefined,
        genres: data.genres || [],
        languages: data.languages || [],
        password: data.password ? data.password : undefined,
      };

      const response = await axios.put(`/user/profile`, body, config);
      const resData = response.data.data;
      createToast(response.data.message, "success");
      fetchUserData(dispatch);
      // console.log("data: ", resData)
      dispatch(setUser(resData.user));
      return response;
    }
  } catch (error) {
    if (error?.response?.data?.error?.startsWith("Token expired"))
      localStorage.removeItem("token");
    createToast(error?.response?.data?.error, "error");
    console.log(error);
  }
}

export const login = async (dispatch, payload) => {
  try {
    // console.log("payload: ", payload);
    const response = await axios.post("/user/login", payload);
    const data = response.data;
    console.log("data: ", response);
    dispatch(setUser(data.user));
    localStorage.setItem("token", data.token);
    createToast("Logged in successfully", "success");
    return response;
  } catch (error) {
    if (error?.response?.data?.error?.startsWith("Token expired"))
      localStorage.removeItem("token");
    createToast(error?.response?.data?.error, "error");
    console.log(error);
    return error;
  }
};

export const logout = async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await axios.get("/user/logout", config);
    dispatch(setUser(null));
    localStorage.removeItem("token");
    createToast("Logged out successfully", "success");
    return response;
  } catch (error) {
    if (error?.response?.data?.error?.startsWith("Token expired"))
      localStorage.removeItem("token");
    createToast(error?.response?.data?.error, "error");
    console.log(error?.response?.data?.error);
  }
};
