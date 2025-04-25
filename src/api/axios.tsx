import baseAxios from "axios";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import {BASE_URL} from "./config";

const axios = baseAxios.create({
    baseURL: BASE_URL + `/api`
});

axios.interceptors.request.use(async (request: any) => {
    const token = await auth().currentUser?.getIdToken(false);

    if (token) {
        request.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return request;
});

axios.interceptors.response.use(async (response) => {
        return response
    },
    async (error: any) => {

        if (error?.response?.status === 401) {
            Toast.show({
                type: 'error',
                text1: 'You have been logged out',
                text2: 'Your session is expired or deleted!',
            });

            await auth().signOut()
        }

        return Promise.reject(error);
    })

export default axios;