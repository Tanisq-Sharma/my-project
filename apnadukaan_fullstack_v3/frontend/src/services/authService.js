import axios from 'axios';
const API_URL = 'http://localhost:8080/api/auth/';

const register = (name, email, password, role) => {
  return axios.post(API_URL + 'register', { name, email, password, role });
};

const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password }).then((response) => {
    if (response.data && response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

export default { register, login, logout, getCurrentUser };
