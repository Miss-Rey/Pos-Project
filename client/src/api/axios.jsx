import axios from "axios";

// 🌐 Base URL Determination with Fixes
const getBaseUrl = () => {
  const envApiUrl = import.meta.env.VITE_API_URL;

  if (import.meta.env.MODE === "production") {
    return envApiUrl || "/api"; // Default relative path for production
  }

  // ✅ Removed trailing slash to avoid incorrect API requests
  return envApiUrl || "http://localhost:5000/api/auth";
};

// 🚀 Create Axios instance
const API = axios.create({
  baseURL: getBaseUrl(), // ✅ Ensuring correct API base URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds timeout
});

// 🛡️ Request Interceptor: Add token and metadata
API.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers["X-Request-Timestamp"] = new Date().toISOString();
      return config;
    } catch (error) {
      console.error("🚨 Request Interceptor Error:", error.message || error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("🚨 Request Error:", error.message || "Unknown request error");
    return Promise.reject(error);
  }
);

// ⚠️ Response Interceptor: Error handling with improved messaging
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response, config } = error;

    if (!response) {
      console.error("🌐 Network Error:", error.message || "Connection issue");
      return Promise.reject({
        message: "Network error. Please check your connection.",
        isNetworkError: true,
      });
    }

    const errorMessages = {
      400: "Bad Request – Your request is invalid.",
      401: "Unauthorized – Please log in again.",
      403: "Forbidden – You don’t have permission.",
      404: "Not Found – The resource doesn’t exist.",
      500: "Server Error – Please try again later.",
    };

    const message =
      errorMessages[response.status] ||
      response.data?.message ||
      `Request failed with status ${response.status}`;

    if (import.meta.env.MODE !== "production") {
      console.groupCollapsed(`📡 API Error: ${config.url}`);
      console.error("Status:", response.status);
      console.error("Message:", message);
      console.error("Response:", response.data);
      console.groupEnd();
    }

    
    return Promise.reject({
      status: response.status,
      message,
      data: response.data,
      originalError: error,
    });
  }
);

export default API;
