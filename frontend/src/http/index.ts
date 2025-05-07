import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuthStore } from "@/stores/auth";

const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json"
  },
  timeout: 1000
});

// List of endpoints that do not require a token
const noAuthEndpoints: string[] = [
  '/auth/token', 
  '/auth/refresh-token', 
  '/account/v1/users/register'
];

// Utility functions for token refreshing
let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

function onRefreshed(accessToken: string): void {
  subscribers.forEach(callback => callback(accessToken));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => void): void {
  subscribers.push(callback);
}

httpClient.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    // Check if the request URL is in the list of no-auth endpoints
    const requiresAuth = !noAuthEndpoints.some(endpoint => config.url?.includes(endpoint));
    
    if (requiresAuth) {
      const authStore = useAuthStore()
      let tokenType = authStore.tokenType.charAt(0).toUpperCase() + authStore.tokenType.slice(1)
      
      if (authStore.getAccessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `${tokenType} ${authStore.getAccessToken}`,
        };
      } else {
        // Handle case where token is missing (e.g., redirect to login)
        throw new Error('Authentication token is missing');
      }

      if (!authStore.isAuthenticated) {
        if (!isRefreshing) {
          isRefreshing = true;
          
          try {
            if (!await authStore.refreshSession()) {
              throw new Error('Authentication token is missing');
            }

            config.headers.Authorization = `${tokenType} ${authStore.getAccessToken}`;

            onRefreshed(authStore.getAccessToken);
          } catch (error) {
            console.error('Token refresh failed:', error);
            return Promise.reject(error);
          } finally {
            isRefreshing = false;
          }
        }

        return new Promise<AxiosRequestConfig>((resolve) => {
          addSubscriber((newToken: string) => {
            config.headers = {
              ...config.headers,
              Authorization: `${tokenType} ${newToken}`,
            };
            resolve(config);
          });
        });
      }
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);


export default httpClient;