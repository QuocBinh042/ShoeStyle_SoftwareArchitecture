import { fetchData } from './apiService'
export const fetchFilters = async () => {
  const data = await fetchData('search/show-filtered');
  return data;
};
export const fetchAllProducts = async ({ page = 1, pageSize = 12 }) => {
  console.log("Page:", page, "PageSize:", pageSize);  // Kiểm tra giá trị truyền vào
  const data = await fetchData(`all-products?page=${page}&pageSize=${pageSize}&forceReload=1`);
  return data;
};
export const fetchFilteredProducts = async (params,page) => {
  const baseUrl = 'search/filtered';
  
  // Xây dựng chuỗi tham số query từ params
  let queryString = '';

  // Duyệt qua các tham số và thêm vào query string nếu có giá trị
  if (params.categoryIds && params.categoryIds.length > 0) {
    queryString += `categoryIds=${params.categoryIds.join(',')}`;
  }
  if (params.brandIds && params.brandIds.length > 0) {
    if (queryString) queryString += '&';  // Thêm dấu & nếu có tham số trước đó
    queryString += `brandIds=${params.brandIds.join(',')}`;
  }
  if (params.colors && params.colors.length > 0) {
    if (queryString) queryString += '&';
    queryString += `colors=${params.colors.join(',')}`;
  }
  if (params.sizes && params.sizes.length > 0) {
    if (queryString) queryString += '&';
    queryString += `sizes=${params.sizes.join(',')}`;
  }
  if (params.minPrice) {
    if (queryString) queryString += '&';
    queryString += `minPrice=${params.minPrice}`;
  }
  if (params.maxPrice) {
    if (queryString) queryString += '&';
    queryString += `maxPrice=${params.maxPrice}`;
  }
  if (params.sortBy) {
    if (queryString) queryString += '&';
    queryString += `sortBy=${params.sortBy}`;
  }
  if (page) {
    if (queryString) queryString += '&';
    queryString += `page=${page}`;
  }
  // Full url request
  const fullUrl = `${baseUrl}?${queryString}`;  

  console.log("Fetching filtered products from:", fullUrl); 

  try {
    const response = await fetchData(fullUrl);  
    console.log("Response received:", response);  
    if (!response || !response.products || response.products.length === 0) {
      console.error("No data found in response.");
      return { products: [], total: 0 }; // Trả về đối tượng với products và total là 0
    }

    console.log("Filtered total data received:", response.total);
    
    // Giả sử response trả về có cả products và total
    return { products: response.products, total: response.total || 0 };
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return null;
  }
};



