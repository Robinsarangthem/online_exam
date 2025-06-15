// import axios from 'axios'

// export const url = import.meta.env.VITE_API_URL;

// export const Axios = axios.create({
// 	baseURL: url,
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'ngrok-skip-browser-warning': 'true',
// 		// 'Access-Control-Allow-Origin': '*',
// 	},
// 	// withCredentials: true,
// })
// import axios from 'axios'

// export const url = import.meta.env.VITE_API_URL || "https://online-exam-backend.vercel.app";

// // Add this to see what URL is being used
// console.log('🔗 API URL:', url);

// export const Axios = axios.create({
// 	baseURL: url,
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'ngrok-skip-browser-warning': 'true',
// 	},
// 	timeout: 10000, // Add timeout
// })

// // Add request/response interceptors to debug
// Axios.interceptors.request.use(
//   (config) => {
//     console.log('🚀 Request:', config.method.toUpperCase(), config.url);
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// Axios.interceptors.response.use(
//   (response) => {
//     console.log('✅ Response:', response.status, response.config.url);
//     return response;
//   },
//   (error) => {
//     console.error('❌ Response Error:', {
//       message: error.message,
//       code: error.code,
//       config: error.config?.url,
//       response: error.response?.status
//     });
//     return Promise.reject(error);
//   }
// );
import axios from 'axios'

// Remove any trailing slash
export const url = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'https://online-exam-backend.vercel.app';

console.log('🔗 API URL:', url);

export const Axios = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'application/json',
		// 'ngrok-skip-browser-warning': 'true',
	},
	timeout: 10000,
	withCredentials: true, // Include credentials for CORS requests
})

// 
// Detailed interceptors
// Axios.interceptors.request.use(
//   (config) => {
    // console.log('🚀 Full request config:', {
    //   method: config.method,
    //   baseURL: config.baseURL,
    //   url: config.url,
    //   fullURL: `${config.baseURL}${config.url}`,
    //   headers: config.headers
    // });
    // return config;
//   },
//   (error) => {
    // console.error('❌ Request setup error:', error);
    // return Promise.reject(error);
//   }
// );
// 
// Axios.interceptors.response.use(
//   (response) => {
    // console.log('✅ Response success:', {
    //   status: response.status,
    //   url: response.config.url,
    //   fullURL: `${response.config.baseURL}${response.config.url}`
    // });
    // return response;
//   },
//   (error) => {
    // console.error('❌ Full error details:', {
    //   message: error.message,
    //   code: error.code,
    //   name: error.name,
    //   stack: error.stack,
    //   config: error.config ? {
        // method: error.config.method,
        // baseURL: error.config.baseURL,
        // url: error.config.url,
        // fullURL: `${error.config.baseURL}${error.config.url}`,
        // timeout: error.config.timeout
    //   } : 'No config',
    //   response: error.response ? {
        // status: error.response.status,
        // statusText: error.response.statusText,
        // data: error.response.data
    //   } : 'No response'
    // });
    // return Promise.reject(error);
//   }
// );