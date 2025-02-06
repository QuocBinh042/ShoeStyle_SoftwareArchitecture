import { fetchData,postData } from './apiService'
export const addOrder = async (order) => {
    const data = await postData(`order/add`, order);
    if (data) {
        console.log('Order added successfully:', data);
    }
    return data;
};
export const fetchOrderByUser = async (id) => {
    const data = await fetchData(`order/by-user-id/${id}`);
    return data;
};
export const countOrderByUser = async (id) => {
    const data = await fetchData(`order/count/${id}`);
    console.log(data)
    return data;
};
export const sumAmount = async (id) => {
    const data = await fetchData(`order/total-spent/${id}`);
    console.log(data)
    return data;
};