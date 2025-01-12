import { fetchData } from './apiService'
export const fetchProductByProductDetailId = async (id) => {
    console.log(`product/by-product-details-id/${id}`)
    const data = await fetchData(`product/by-product-details-id/${id}`);
    console.log(data)
    return data;
};