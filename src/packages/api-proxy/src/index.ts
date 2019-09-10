import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import merge from 'lodash.merge';
import {API, ApiDef, ApiObject, ApiResponse, AppConfig, ParamType} from '../../../../types/api';
import HttpMethod from '../../http-method';
import {assignParams} from './param-handler';

/**
 * Created by wuhao on 2017/1/16.
 */
export default (apiObj: ApiObject<ApiDef>,
                config: AppConfig,
                commonSettings: AxiosRequestConfig = {}): ApiObject<API> => {
  Axios.defaults.baseURL = config.basePath;
  const newObj = Object.assign({}, apiObj) as unknown as API;

  function defineReq<D>(obj: API<D>, options: any): ApiObject<API> {
    let copyObj = obj;
    if (copyObj.url) {
      copyObj = merge({}, copyObj, options);
      /**
       * 发送ajax请求
       * @param {object} settings
       * @param {object|array} params
       */
      copyObj.request = (params?: ParamType, settings?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<D>>> =>
        request.call(copyObj, merge({}, settings, copyObj), params) as Promise<AxiosResponse<ApiResponse<D>>>;
      copyObj.req = (params?: ParamType, settings?: AxiosRequestConfig): Promise<ApiResponse<D>> =>
        requestData.call(copyObj, merge({}, settings, copyObj), params, false) as Promise<ApiResponse<D>>;
      copyObj.r = (params?: ParamType, settings?: AxiosRequestConfig): Promise<D> =>
        requestData.call(copyObj, merge({}, settings, copyObj), params, true) as Promise<D>;
    }
    for (const property in copyObj) {
      if (copyObj.hasOwnProperty(property)
        && typeof (copyObj as { [key: string]: any })[property] === 'object') {
        (copyObj as { [key: string]: any })[property]
          = defineReq((copyObj as { [key: string]: any })[property], options);
      }
    }
    return copyObj as unknown as ApiObject<API>;
  }

  const api = defineReq(newObj, commonSettings);


  const requestData = (obj: API, params?: ParamType, pure: boolean = false) => {
    const p = request(obj, params);
    // @ts-ignore
    return Promise.resolve(p).then((v: AxiosResponse<ApiResponse<any>>) => {
      return new Promise((resolve, reject) => {
        if (v.data.code) {
          reject(v.data);
        } else {
          if (pure) {
            resolve(v.data.data);
          } else {
            resolve(v.data);
          }
        }
      });
    });
  };


  const request = (obj: any, params?: ParamType) => {
    obj.url = obj.url + (config.pathSuffix || '');
    obj.method = obj.method || HttpMethod.GET;
    assignParams(obj, params);
    const p = Axios.request(obj);
    return Promise.resolve(p).then((v: AxiosResponse<ApiResponse<any>>) => new Promise((resolve) => {
      if ((obj.errorHandleType === undefined || obj.errorHandleType === 'global')
        && config.logicErrorHandler
        && v.data.code) {
        config.logicErrorHandler(v.data, v.data.code);
      }
      resolve(v);
    })).catch((err: AxiosError) => new Promise((resolve, reject) => {
      if ((obj.errorHandleType === undefined || obj.errorHandleType === 'global')
        && config.httpStatusErrorHandler) {
        if (err.response) {
          config.httpStatusErrorHandler(err, err.response.status);
        } else {
          config.httpStatusErrorHandler(err);
        }
      }
      reject(err);
    }));
  };
  return api;
};
