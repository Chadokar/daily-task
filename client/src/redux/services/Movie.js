import axios from 'axios';
import createToast from '../../utils/createToast';
import { logout } from './User';

export const getMovies = async (page) => {
    try {
        const response = await axios.get(`/movie/?page=${page}`);
        const data = response.data.data;
        return data;
    } catch (error) {
        if(error?.response?.data?.error?.startsWith("Token expired")){
            localStorage.removeItem("token");
        }
        createToast(error?.response?.data?.error, "error");
        console.error(error);
    }
}

export const getLatestMovies = async (page) => {
    try {
        const response = await axios.get(`/movie/latest/?page=${page}`);
        const data = response.data.data;
        return data;
    } catch (error) {
        if(error?.response?.data?.error?.startsWith("Token expired")){
            localStorage.removeItem("token");
        }
        createToast(error?.response?.data?.error, "error");
        console.error(error);
    }
}

export const getUpcomingMovies = async (page) => {
    try {
        const response = await axios.get(`/movie/upcoming/?page=${page}`);
        const data = response.data.data;
        return data;
    } catch (error) {
        if(error?.response?.data?.error?.startsWith("Token expired")){
            localStorage.removeItem("token");
        }
        createToast(error?.response?.data?.error, "error");
        console.error(error);
    }
}

export const getMovie = async (dispatch, id) => {
    try {
        // console.log(id)
        const response = await axios.get(`/movie/${id}`);
        const data = response.data.data;
        return data;
    } catch (error) {
        if(error?.response?.data?.error?.startsWith("Token expired")){
            localStorage.removeItem("token");
        }
        createToast(error?.response?.data?.error, "error");
        console.error(error);
    }
}

