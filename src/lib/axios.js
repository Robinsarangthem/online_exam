import axios from "axios";

// Remove any trailing slash
export const url = import.meta.env.VITE_API_URL;
console.log("🔗 API URL:", url);
console.log("Environment check:", {
  NODE_ENV: process.env.NODE_ENV,
  VITE_API_URL: import.meta.env.VITE_API_URL,
  allEnvVars: import.meta.env,
});
export const Axios = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // Increase timeout for Vercel cold starts
  withCredentials: false, // Try without credentials first
});

// Add request interceptor for debugging
