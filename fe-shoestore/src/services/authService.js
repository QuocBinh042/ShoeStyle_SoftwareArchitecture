import { postData } from "./apiService";

export const login = async (credentials) => {
    try {
        const data = await postData(`auth/login`, credentials);
        if (data?.token) {
            localStorage.setItem("token", data.token);
        }
        return data;
    } catch (error) {
        throw error;
    }
};
export const signUp = async (user) => {
    console.log(user)
    try {
        const data = await postData(`auth/sign-up`, user);
        return data;
    } catch (error) {
        throw error;
    }
};
export const logout = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};
