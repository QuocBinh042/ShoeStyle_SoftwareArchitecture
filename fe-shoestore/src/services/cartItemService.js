import { fetchData } from './apiService'
export const fetchCartItemByCartId = async (id) => {
    console.log(`cart-item/${id}`)
    const data = await fetchData(`cart-item/${id}`);
    console.log(data)
    return data;
};
