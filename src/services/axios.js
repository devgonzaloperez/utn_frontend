import axios from 'axios';
import { setAccessToken } from '../redux/slices/authSlice';
import { store } from '../redux/store';

const BASE_URL = 'https://utnbackend-production.up.railway.app';

export const axiosPublicInstance = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});

export const axiosPrivateInstance = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});

//Request interceptor to add access token to the header.
axiosPrivateInstance.interceptors.request.use(
    (config) => {
        if (!config.headers['Authorization']){
            config.headers['Authorization'] = `Bearer ${store.getState().authStore?.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//Response interceptor to refresh access token of the header.
axiosPrivateInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const previousRequest = error?.config;
        if(error?.response?.status === 403 && !previousRequest?.sent){ //Invalid Token (403).
            previousRequest.sent = true;
            console.log('Refreshing access token!'); //Se hace vía /refresh. Refresh lee el refresh token desde cookies y devuelve un nuevo access token, el cual lo actualizo en axios y en redux.
            const response = await axiosPublicInstance.get('/refresh');
            store.dispatch(setAccessToken(response?.data?.accessToken)); //Redux update.
            previousRequest.headers['Authorization'] = `Bearer ${response?.data?.accessToken}`; //Axios update.
            return axiosPrivateInstance(previousRequest);
        }
        return Promise.reject(error);
    }
);


