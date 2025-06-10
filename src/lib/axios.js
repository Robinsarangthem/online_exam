import axios from 'axios'

export const url = import.meta.env.VITE_API_URL;

export const Axios = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'application/json',
		'ngrok-skip-browser-warning': 'true',
		// 'Access-Control-Allow-Origin': '*',
	},
	withCredentials: true,
})