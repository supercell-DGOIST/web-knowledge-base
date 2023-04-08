import { type AxiosRequestConfig } from 'axios';
/**
 * 自定义扩展axios模块
 * @author Maybe
 */
declare module 'axios' {
  export interface ApiInstance<D = any> {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
    get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
    delete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
    post: <T = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig,
    ) => Promise<T>;
    put: <T = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig,
    ) => Promise<T>;
  }
}
