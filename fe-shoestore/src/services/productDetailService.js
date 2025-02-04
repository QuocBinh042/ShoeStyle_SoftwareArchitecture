import { fetchData } from './apiService'
export const fetchProductDetailById = async (id) => {
    const data = await fetchData(`product-details/${id}`);
    return data;
};
export const fetchProductDetailByProductId = async (id) => {
    const data = await fetchData(`product-details/by-product-id/${id}`);
    return data;
};
export const fetchProductDetailByOrderDetail = async (id) => {
    const data = await fetchData(`product-details/by-product-id/${id}`);
    return data;
};