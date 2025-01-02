import axios from 'axios';


const baseURL = import.meta.env.VITE_API_URL || '/api'

const instance = axios.create({
  baseURL: baseURL,  // This will prepend /api to all requests
});

export default instance;