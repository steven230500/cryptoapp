import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coinlore.net/api/tickers/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(request => {
  return request;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
