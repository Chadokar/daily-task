import axios from "axios";
import qs from "query-string";

export const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// don't use request function directly, use axiosGet, axiosPostRequest, axiosPutRequest, axiosDelete
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token${1}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    // Optionally catch errors and add additional logging here
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};

// GET with Axios
export const axiosGet = async (url, queryObj) => {
  const query = qs.stringify(queryObj);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const response = await client.get(`${url}?${query}`, config).catch((err) => {
    console.log(err);
    throw new Error(err);
  });
  // console.log(response);
  return response.data;
};

// Post with Axios
export const axiosPostRequest = async (url, queryObj, bodyObj) => {
  const query = qs.stringify(queryObj);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log("bodyobj : ", bodyObj);
  return await client.post(
    `${url}${query ? `? ${query}` : ""}`,
    bodyObj,
    config
  );
};

// PUT with Axios
export const axiosPutRequest = async (url, queryObj, bodyObj) => {
  const query = qs.stringify(queryObj);
  return await client.put(`${url}?${query}`, bodyObj);
};

// Delete with Axios
export const axiosDelete = async (id) => {
  return await client.delete(`${id}`);
};
