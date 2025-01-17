import { fetchData,postData } from './apiService'
export const addOrderDetails = async (orderDetail) => {
    const data = await postData(`order-details/add`, orderDetail);
    if (data) {
        console.log('Cart item added successfully:', data);
    }
    return data;
};