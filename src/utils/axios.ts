import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type RawAxiosRequestHeaders,
  type AxiosResponse,
  type AxiosError,
  type ApiInstance,
} from 'axios';
import { ElMessage } from 'element-plus';
import { isObject } from './tools';
import abortControllers from '../store/abort-http';
import { toLogin } from '../common/router-methods';

const baseURL = import.meta.env.VITE_BASE_URL;

const axios: AxiosInstance | any = Axios.create({
  baseURL,
  timeout: 20000, // 请求超时 20s
});

const token: string | null = localStorage.getItem('token');
const acStore = abortControllers();

const handleError = ({ status, data }: AxiosResponse): void => {
  switch (status) {
    // 要求用户身份认证。
    case 401:
      toLogin();
      break;
    // 客户端没有访问内容的权限
    case 403:
      localStorage.removeItem('token');
      setTimeout(toLogin, 1000);
      break;
    // 服务器找不到请求资源。
    case 404:
      break;
    // 服务器等待客户端发送的请求时间过长，超时
    case 408:
      break;
    // 服务器内部错误，无法完成请求
    case 500:
      break;
    // 网关错误
    case 502:
      break;
    // 由于超载或系统维护，服务器暂时的无法处理客户端的请求。
    case 503:
      break;
    // 网关超时
    case 504:
      break;
    default:
      ElMessage.error(`${isObject(data) ? data.message : ''}`);
      break;
  }
};

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    const controller: AbortController = new AbortController();
    token !== null && (config.headers.Authorization = token);
    config.signal = controller.signal;
    acStore.updateControllers({
      controller,
      signal: controller.signal,
    });
    return config;
  },
  async (error: AxiosError<any>) => {
    return await Promise.reject(error);
  },
);

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    if (response.status === 200) {
      return await Promise.resolve(response);
    } else {
      return await Promise.reject(response);
    }
  },
  async (error: AxiosError<any>) => {
    if (isObject(error.response) && error.response?.status !== undefined) {
      handleError(error.response);
    } else {
      ElMessage.error(`${error.response}`);
    }
    return await Promise.reject(error.response);
  },
);

const apiMap: string[] = ['get', 'post', 'put', 'delete'];
const headers: RawAxiosRequestHeaders = {
  'content-type': 'application/json',
};

const setApi =
  (method: string) =>
  (
    url: string,
    data: any,
    customConfig: AxiosRequestConfig | undefined = {},
  ) => {
    if (customConfig?.headers != null) {
      const contentType: any = customConfig.headers['content-type'];
      if (contentType === undefined) {
        Object.assign(customConfig.headers, headers);
      }
    } else {
      customConfig.headers = Object.assign({}, headers);
    }

    if (method === 'post' || method === 'put') {
      return axios[method](url, data ?? {}, customConfig);
    }
    return axios[method](url, { ...customConfig, params: data ?? {} });
  };

const createApiIstance = (apiMap: string[]): ApiInstance => {
  const apiInstance: ApiInstance | any = {};

  apiMap.forEach((key: string) => {
    apiInstance[key] = setApi(key);
  });

  return apiInstance;
};

export default createApiIstance(apiMap);
