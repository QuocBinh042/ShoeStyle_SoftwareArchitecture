import { postData } from "./apiService";
import {jwtDecode} from "jwt-decode";
export const login = async (credentials) => {
    try {
        const data = await postData(`auth/login`, credentials);
        if (data?.accessToken && data?.refreshToken) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("Refresh token not exist");
        }

        const response = await postData(`auth/refresh-token`, { refreshToken });
        if (response?.accessToken) {
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            return response.accessToken;
        }
    } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw new Error("Cần đăng nhập lại");
    }
};

export const signUp = async (user) => {
    try {
        const data = await postData(`auth/sign-up`, user);
        return data;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export const getToken = async () => {
    let accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("Token is missing or invalid");
    }

    try {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            accessToken = await refreshToken();
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken); 
            } else {
                logout();
                throw new Error("Session expired, please log in again.");
            }
        }
    } catch (error) {
        console.error("Error while processing token: ", error);
        logout();
        throw new Error("Authentication error, please log in again.");
    }

    return accessToken;
};