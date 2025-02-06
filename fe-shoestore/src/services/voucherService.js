import { fetchData,postData,deleteData ,putData} from './apiService'
export const fetchVoucherWithPrice = async (value) => {
    const data = await fetchData(`voucher/eligible?orderValue=${value}`);
    return data;
};