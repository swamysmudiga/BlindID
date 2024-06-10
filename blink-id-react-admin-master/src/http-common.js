import axios from "axios";
import { API_BASE_URL } from "./components/config";

const instance =   axios.create({
  baseURL: API_BASE_URL,
    // Disable SSL verification for non-HTTPS API
  httpsAgent: new (require('https').Agent)({rejectUnauthorized: false}),
  headers: {
    "Content-type": "application/json"
  }
});

 // Intercepting requests to add headers for CORS
instance.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  return config;
});

export default instance;

