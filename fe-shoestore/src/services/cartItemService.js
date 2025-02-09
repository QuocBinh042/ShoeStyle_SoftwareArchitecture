import { fetchData, postData, putData,deleteData } from './apiService'
export const fetchCartItemByCartId = async (id,page=1,pageSize=3) => {
    const data = await fetchData(`cart-item/${id}?page=${page}&pageSize=${pageSize}`);
    return data
};
export const addCartItem = async (cartItem) => {
    const data = await postData(`cart-item/add`, cartItem);
    if (data) {
        console.log('Cart item added successfully:', data);
    }
    return data;
};
export const updateCartItem = async (cartId, productDetailId, updatedCartItem) => {
    const endpoint = `cart-item/update/${cartId}/${productDetailId}`;
    const data = await putData(endpoint, updatedCartItem);
    if (data) {
        console.log('Cart item updated successfully:', data);
    }
    return data;
};
export const deleteCartItem = async (cartId, productDetailId) => {
    const endpoint = `cart-item/delete/${cartId}/${productDetailId}`;
    const data = await deleteData(endpoint);
    if (data) {
        console.log('Cart item deleted successfully:', data);
    }
    console.log(data)
    return data;
};