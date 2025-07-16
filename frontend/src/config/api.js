// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  USER_LOGIN: `${API_BASE_URL}/api/user/login`,
  USER_REGISTER: `${API_BASE_URL}/api/user/register`,
  ORDER_CREATE: `${API_BASE_URL}/api/order`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_REGISTER: `${API_BASE_URL}/api/admin/register`,
  FOOD_LIST: `${API_BASE_URL}/api/food/list`,
  FOOD_CREATE: `${API_BASE_URL}/api/food`,
  FOOD_UPDATE: (id) => `${API_BASE_URL}/api/food/${id}`,
  FOOD_DELETE: (id) => `${API_BASE_URL}/api/food/${id}`,
  ADMIN_ORDERS: `${API_BASE_URL}/api/admin/orders`,
};

export default API_ENDPOINTS; 