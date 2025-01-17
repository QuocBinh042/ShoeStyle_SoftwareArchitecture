import { fetchData } from './apiService'
export const fetchProductByProductDetailId = async (id) => {
    const data = await fetchData(`product/by-product-details-id/${id}`);
    return data;
};