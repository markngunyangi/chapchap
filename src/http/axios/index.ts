import axiosRequest from 'axios';

import { BASE_API_URL } from '@/constants';

export const axios = axiosRequest.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

export const axiosInstance = axios;
