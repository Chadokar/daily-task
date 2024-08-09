import axios from "axios";
import { setUser } from "../reducers/User";
import createToast from "./createToast";

export const generateOTP = async (payload) => {
  try {
    console.log("payload : ", payload);
    const response = await axios.post("/otp/generate", payload);
    console.log("response : ", response);
    // console.log(data);
    createToast(response.data.message, "success");
    localStorage.setItem("temp-token", response.data.token);
    return response;
  } catch (error) {
    if (error?.response?.data?.error === "Token expired") {
      localStorage.removeItem("temp-token");
      createToast("OTP expired. Please try again", "error");
    }
    if (error?.response?.data?.error?.startsWith("Token expired")) {
      localStorage.removeItem("token");
    }
    createToast(error?.response?.data?.error, "error");
    console.error(error);
    return error;
  }
};

export const verifyOTP = async (payload, dispatch) => {
  try {
    const response = await axios.post("/otp/verify", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("temp-token")}`,
      },
    });
    createToast(response.data.message, "success");
    localStorage.setItem("token", response.data.token);
    dispatch(setUser(response.user));
    return response;
  } catch (error) {
    if (error?.response?.data?.error === "Token expired") {
      localStorage.removeItem("temp-token");
      createToast("OTP expired. Please try again", "error");
    }
    if (error?.response?.data?.error?.startsWith("Token expired")) {
      localStorage.removeItem("token");
    }
    createToast(error?.response?.data?.error, "error");
    console.error(error);
  }
};

export const register = async (dispatch, payload) => {
  try {
    const response = await axios.post("/user/register", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("temp-token")}`,
      },
    });
    const data = response.data.data;
    // console.log(data);
    localStorage.setItem("token", response.data.data.token);
    dispatch(setUser(data.user));
    createToast("User registered successfully", "success");
    return response;
  } catch (error) {
    if (error?.response?.data?.error === "Token expired") {
      localStorage.removeItem("temp-token");
      createToast("OTP expired. Please try again", "error");
    }
    if (error?.response?.data?.error?.startsWith("Token expired")) {
      localStorage.removeItem("token");
    }
    createToast(error?.response?.data?.error, "error");
    console.error(error);
  }
};
