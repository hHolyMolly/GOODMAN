import axios from 'axios';

const API_URL = 'https://64173ed54f1dc9a599d4b491.mockapi.io/api/v1';

const $api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default $api;
