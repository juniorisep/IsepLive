import axios from 'axios';

export const backUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const token = localStorage.getItem('token');
if (token != null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    const respAuth = response.headers['Authorization'];
    if (respAuth) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${respAuth}`;
    }
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
