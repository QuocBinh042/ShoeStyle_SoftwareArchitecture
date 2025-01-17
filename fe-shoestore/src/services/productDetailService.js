import { fetchData } from './apiService'
export const fetchProductDetailById = async (id) => {
    const data = await fetchData(`product-details/${id}`);
    return data;
};