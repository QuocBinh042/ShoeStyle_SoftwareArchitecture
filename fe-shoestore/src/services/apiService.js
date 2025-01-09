const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(API_BASE_URL + endpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
