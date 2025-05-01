import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'https://foodies-app-pke3.onrender.com/api',
});

export default axiosAPI;
