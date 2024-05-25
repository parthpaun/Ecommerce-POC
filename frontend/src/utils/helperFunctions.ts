/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosRequestConfig,
  Method,
  AxiosResponse,
  AxiosError,
} from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
  // Add any other properties you expect in the token
}
// Base URL for your API
const BASE_API_URL = `${process.env.API_URL}/api`;

// Define a type for the API call function
interface ApiCall {
  (
    method: Method,
    url: string,
    data?: Record<string, any> | null,
    headers?: Record<string, string>
  ): Promise<any>;
}

// Common API function
export const apiCall: ApiCall = async (method, url, data = null) => {
  const headers: Record<string, string> = {};
  if (!url.includes("/auth")) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  try {
    // Define the configuration for the Axios request
    const config: AxiosRequestConfig = {
      method,
      url: `${BASE_API_URL}${url}`,
      data,
      headers,
    };
    // Make the API call using the specified method and URL
    const response: AxiosResponse = await axios(config);

    // Return the response data
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.replace("/auth/login");
    }
    // Handle any errors (you may want to customize this part)
    console.error(`API call failed: ${error}`);
    throw error;
  }
};

export const getUserData = (): CustomJwtPayload | null => {
  const token = localStorage.getItem("token");
  if (token) {
    const userData: CustomJwtPayload = jwtDecode(token);
    return userData;
  }
  return null;
};
