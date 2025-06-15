import axios from 'axios'

// Remove any trailing slash
export const url = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'https://online-exam-backend.vercel.app';
console.log('🔗 API URL:', url);
console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  VITE_API_URL: import.meta.env.VITE_API_URL,
  allEnvVars: import.meta.env
});
export const Axios = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 30000, // Increase timeout for Vercel cold starts
	withCredentials: false, // Try without credentials first
})

// Add request interceptor for debugging
Axios.interceptors.request.use(
	(config) => {
		console.log('🚀 Request:', config.method?.toUpperCase(), config.url);
		return config;
	},
	(error) => {
		console.error('❌ Request Error:', error);
		return Promise.reject(error);
	}
);

// Add response interceptor for debugging
Axios.interceptors.response.use(
	(response) => {
		console.log('✅ Response:', response.status, response.config.url);
		return response;
	},
	(error) => {
		console.error('❌ Response Error:', error.response?.status, error.message);
		return Promise.reject(error);
	}
);