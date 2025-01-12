import { fetchData } from './apiService'
export const fetchProductDetailById = async (id) => {
    console.log(`products-details/${id}`)
    const data = await fetchData(`products-details/${id}`);
    console.log(data)
    return data;
};