import axios from "axios";

const instance = axios.create({
  baseURL: 'https://timetable-backend.herokuapp.com/api',
  withCredentials: true,
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Content-Type': 'application/json',
    },
})

instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return config;
},
  error => {
    return Promise.reject(error);
  }
);

export default instance