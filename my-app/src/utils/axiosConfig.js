import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hosteecommerce.vercel.app/', 
  withCredentials: true,
});

export default axiosInstance;
