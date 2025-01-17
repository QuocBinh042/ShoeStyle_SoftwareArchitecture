import { fetchData,postData } from './apiService'
export const addOrder = async (order) => {
    const data = await postData(`order/add`, order);
    if (data) {
        console.log('Order added successfully:', data);
    }
    return data;
};