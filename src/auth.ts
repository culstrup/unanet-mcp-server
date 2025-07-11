import axios, { AxiosInstance } from "axios";

export interface UnanetAuth {
  username: string;
  password: string;
  apiKey: string;
  firmCode: string;
  baseUrl: string;
}

export function validateAuth(auth: UnanetAuth): void {
  if (!auth.username) {
    throw new Error("UNANET_USERNAME environment variable is required");
  }
  if (!auth.password) {
    throw new Error("UNANET_PASSWORD environment variable is required");
  }
  if (!auth.apiKey) {
    throw new Error("UNANET_API_KEY environment variable is required");
  }
  if (!auth.firmCode) {
    throw new Error("UNANET_FIRM_CODE environment variable is required");
  }
  if (!auth.baseUrl) {
    throw new Error("UNANET_BASE_URL environment variable is required");
  }
}

export function createUnanetClient(auth: UnanetAuth): AxiosInstance {
  const client = axios.create({
    baseURL: auth.baseUrl,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": auth.apiKey,
      "X-Firm-Code": auth.firmCode,
    },
    auth: {
      username: auth.username,
      password: auth.password,
    },
    timeout: 30000, // 30 second timeout
  });

  // Add request interceptor for logging
  client.interceptors.request.use(
    (config) => {
      console.error(`[Unanet API] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error("[Unanet API] Request error:", error.message);
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error(`[Unanet API] Response error: ${error.response.status} ${error.response.statusText}`);
        
        // Handle specific error codes
        switch (error.response.status) {
          case 401:
            throw new Error("Authentication failed. Please check your credentials.");
          case 403:
            throw new Error("Access forbidden. Please check your API permissions.");
          case 429:
            throw new Error("Rate limit exceeded. Please try again later.");
          default:
            throw new Error(`API error: ${error.response.status} ${error.response.statusText}`);
        }
      } else if (error.request) {
        throw new Error("No response from Unanet API. Please check your network connection.");
      } else {
        throw new Error(`Request setup error: ${error.message}`);
      }
    }
  );

  return client;
}