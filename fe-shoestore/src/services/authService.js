import { postData } from "./apiService";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
export const login = async (credentials) => {
    try {
        const response = await postData(`auth/login`, credentials);
        if (response?.accessToken && response?.refreshToken) {
            console.log("Logged in successfully");
        }
        return response;
    } catch (error) {
        throw error;
    }
};
export const refreshToken = async () => {
    try {
        const response = await postData(`auth/refresh-token`, {});
        if (response?.accessToken) {
            console.log("Refreshed access token");
            return response.accessToken;
        }
    } catch (error) {
        logout();
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
export const logout = async () => {
    try {
        await postData(`auth/logout`, {}); 
        Cookies.remove("accessToken"); 
        Cookies.remove("refreshToken");
        console.log("Logged out");
    } catch (error) {
        console.error("Logout failed: ", error);
    }
}

export const getToken = async () => {
    let accessToken = Cookies.get("accessToken");
    console.log(document.cookie);
    if (!accessToken) {
        throw new Error("Token is missing or invalid");
    }

    try {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            accessToken = await refreshToken();
            if (accessToken) {
                console.log("Token refreshed");
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

