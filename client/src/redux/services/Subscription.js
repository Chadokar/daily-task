import axios from "axios";
import createToast from "../../utils/createToast";
import { logout } from "./User";

export const getSubscriptionPlans = async () => {
    try {
        const response = await axios.get("/plan", {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = response.data.data;
        // console.log(data);

        return response;
    }
    catch (error) {
        createToast(error?.response?.data?.error, "error");
        console.error(error);
    }
}

export const getSubscriptionPlan = async (id) => {
    try {
        const response = await axios.get("/plan" + id, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = response.data.data;
        // console.log(data);

        return response;
    }
    catch (error) {
        createToast(error?.response?.data?.error, "error");
        console.error(error);
    }
}