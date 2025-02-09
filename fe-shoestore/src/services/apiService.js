import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Đổi thành API của bạn

// Hàm lấy token từ localStorage
const getAuthToken = () => localStorage.getItem("token");

// Hàm tạo instance của Axios với headers chứa token
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Thêm interceptor để tự động gắn token vào headers
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Hàm gọi API
export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const putData = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
