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
export const postData = async (endpoint, body) => {
  try {
    const response = await fetch(API_BASE_URL + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Failed to post data');
    }
    return response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    return null;
  }
};
export const putData = async (endpoint, body) => {
  try {
    const response = await fetch(API_BASE_URL + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Failed to update data');
    }
    return response.json();
  } catch (error) {
    console.error('Error updating data:', error);
    return null;
  }
};
export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(API_BASE_URL + endpoint, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete data');
    }
    return response.status
  } catch (error) {
    console.error('Error deleting data:', error);
    return null;
  }
};
