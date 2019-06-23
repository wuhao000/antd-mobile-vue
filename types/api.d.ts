import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import HttpMethod from '../src/packages/http-method';


export interface ApiResponse<D> {
  code: number;
  data: D;
  msg: string;
}

export interface ApiObject<T = API | ApiDef> {
}

type errorHandleType = 'global' | 'custom';

export interface ApiDef<D = any> {
  errorHandleType?: errorHandleType;
  isFormData?: boolean;
  method: HttpMethod;
  url: string;
}

type NumberIdRequest<Data, Param> = { requestData: (this: API<Data, Param>, id: number) => Promise<Data> };
type StringIdRequest<Data, Param> = { requestData: (this: API<Data, Param>, id: string) => Promise<Data> };

export type NumberIdAPI<T, D = any, P = ParamType> =
    (T extends API ? API<D, P> : ApiDef<D>) & NumberIdRequest<D, P>;

export type GenericAPI<T, D = any, P = ParamType> = T extends API ? API<D, P> : ApiDef<D>;

export type StringIdAPI<T, D = any, P = ParamType> =
    (T extends API ? API<D, P> : ApiDef<D>) & StringIdRequest<D, P>;

export type ParamType = { [key: string]: any };

export interface API<D = { [key: string]: any }, P = ParamType> extends ApiDef {
  r: (params?: P, settings?: AxiosRequestConfig) => Promise<D>;
  req: (params?: P, settings?: AxiosRequestConfig) => Promise<ApiResponse<D>>;
  request: (params?: P, settings?: AxiosRequestConfig) => Promise<AxiosResponse<ApiResponse<D>>>;
}

export interface AppConfig {
  /**
   * 接口请求的基本路径
   */
  basePath: string;
  /**
   * http请求错误（响应状态非2xx, 3xx的）全局处理
   * @param err
   * @param {number} code
   * @returns {boolean}
   */
  httpStatusErrorHandler: (err: AxiosError, status?: number) => void;
  /**
   * 对接口请求错误进行全局处理（http响应正常(http的status为2xx)，返回的数据code非0）
   * @param data 接口响应数据
   * @param code 逻辑错误代码
   * @return 已处理返回true，否则返回false，返回false会进入具体的业务错误处理
   */
  logicErrorHandler: (data: ApiResponse<any>, code: number) => boolean;
  /**
   * 请求路径后缀（使用yapi mock时会用到，需要设置为/, 正常请求设置为空字符串）
   */
  pathSuffix: string;
}

export declare function ApiProxy(apiObj: ApiObject<ApiDef>, config: AppConfig, commonSettings: any): ApiObject<API>;

export {HttpMethod};
