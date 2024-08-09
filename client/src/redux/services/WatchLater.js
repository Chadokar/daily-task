import axios from 'axios';
import createToast from '../../utils/createToast';
import { fetchUserData, logout } from './User';

export const addToWatchLater = async (dispatch, id) => {
    try {
        const response = await axios.post("/movie/watchlist/", { movieId: id }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = response.data.data;

        createToast("Added to watchlist", "success");

        fetchUserData(dispatch);
        return data;
    } catch (error) {
        if(error?.response?.data?.error?.startsWith("Token expired")){
            try{
                logout();
            }catch(e){}
            localStorage.removeItem("token");
        }
        createToast(error?.response?.data?.error, "error");
        console.error(error);
    }
}

export const removeFromWatchLater = async (dispatch, id) => {
    try {
        const response = await axios.delete("/movie/watchlist/", {
            data: { movieId: id },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = response.data.data;

        createToast("Removed from watchlist", "success");

        fetchUserData(dispatch);
        return data;
    } catch (error) {
        if(error?.response?.data?.error?.startsWith("Token expired")){
            try{
                logout();
            }catch(e){}
            localStorage.removeItem("token");
        }
        createToast(error?.response?.data?.error, "error");
        console.error(error);
    }
}

export const removeFromHistory = async (dispatch, id) => {
    try {
        const response = await axios.delete("/movie/history/", {
            data: { movieId: id },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = response.data.data;

        createToast("Removed from watchlist", "success");

        fetchUserData(dispatch);
        return data;
    } catch (error) {
        if(error?.response?.data?.error?.startsWith("Token expired")){
            try{
                logout();
            }catch(e){}
            localStorage.removeItem("token");
        }
        createToast(error?.response?.data?.error, "error");
        console.error(error);
    }
}