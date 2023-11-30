import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import {keycloakService} from "../auth/keycloak.ts";
// import { auth, getAccessToken } from '../auth/auth';

const axiosClient = axios.create({
  baseURL: '/api/v1',
  timeout: 30000,
});

const defaultHeaders = (): Record<string, string> => {
  return {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + keycloakService.getAccessToken(),
  };
};

const defaultOptions = (customHeaders?: AxiosRequestHeaders): AxiosRequestConfig => {
  const headers = {
    ...defaultHeaders(),
    ...customHeaders,
  };
  return {
    headers,
  };
};
const request = async (customOptions: AxiosRequestConfig): Promise<AxiosResponse> => {
  const { headers, ...requestOptions } = customOptions;
  const options = {
    ...defaultOptions(headers as AxiosRequestHeaders),
    ...requestOptions,
  };
  try {
    return await axiosClient(options);
  } catch (error: any) {
    console.error(error);
    if (error?.response?.status === 401) {
      keycloakService.callLogout();
    }
    throw error;
  }
};

const requestData = async (customOptions: AxiosRequestConfig): Promise<AxiosResponse['data']> => {
  const a = await keycloakService.callTokenRefreshIfNeeded();
  const response = await request(customOptions);
  return response.data;
};

const getUrlParams = (
  params: string | string[][] | Record<string, string> | URLSearchParams | undefined,
) => new URLSearchParams(params).toString();

const http = {
  get(options: AxiosRequestConfig): Promise<AxiosResponse['data']> {
    return requestData({
      ...options,
      method: 'get',
    });
  },
  post(options: AxiosRequestConfig): Promise<AxiosResponse['data']> {
    return requestData({
      ...options,
      method: 'post',
    });
  },
  put(options: AxiosRequestConfig): Promise<AxiosResponse['data']> {
    return requestData({
      ...options,
      method: 'put',
    });
  },
  patch(options: AxiosRequestConfig): Promise<AxiosResponse['data']> {
    return requestData({
      ...options,
      method: 'patch',
    });
  },
  delete(options: AxiosRequestConfig): Promise<AxiosResponse['data']> {
    return requestData({
      ...options,
      method: 'delete',
    });
  },
  request,
  getUrlParams,
};

export { http };

export default http;
