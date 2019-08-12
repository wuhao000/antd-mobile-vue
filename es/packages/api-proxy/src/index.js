import Axios from 'axios';
import merge from 'lodash.merge';
import HttpMethod from '../../http-method';
import { assignParams } from './param-handler';
/**
 * Created by wuhao on 2017/1/16.
 */
export default (apiObj, config, commonSettings = {}) => {
    Axios.defaults.baseURL = config.basePath;
    const newObj = Object.assign({}, apiObj);
    function defineReq(obj, options) {
        let copyObj = obj;
        if (copyObj.url) {
            copyObj = merge({}, copyObj, options);
            /**
             * 发送ajax请求
             * @param {object} settings
             * @param {object|array} params
             */
            copyObj.request = (params, settings) => request.call(copyObj, merge({}, settings, copyObj), params);
            copyObj.req = (params, settings) => requestData.call(copyObj, merge({}, settings, copyObj), params, false);
            copyObj.r = (params, settings) => requestData.call(copyObj, merge({}, settings, copyObj), params, true);
        }
        for (const property in copyObj) {
            if (copyObj.hasOwnProperty(property)
                && typeof copyObj[property] === 'object') {
                copyObj[property]
                    = defineReq(copyObj[property], options);
            }
        }
        return copyObj;
    }
    const api = defineReq(newObj, commonSettings);
    const requestData = (obj, params, pure = false) => {
        const p = request(obj, params);
        // @ts-ignore
        return Promise.resolve(p).then((v) => {
            return new Promise((resolve, reject) => {
                if (v.data.code) {
                    reject(v.data);
                }
                else {
                    if (pure) {
                        resolve(v.data.data);
                    }
                    else {
                        resolve(v.data);
                    }
                }
            });
        });
    };
    const request = (obj, params) => {
        obj.url = obj.url + (config.pathSuffix || '');
        obj.method = obj.method || HttpMethod.GET;
        assignParams(obj, params);
        const p = Axios.request(obj);
        return Promise.resolve(p).then((v) => new Promise((resolve) => {
            if ((obj.errorHandleType === undefined || obj.errorHandleType === 'global')
                && config.logicErrorHandler
                && v.data.code) {
                config.logicErrorHandler(v.data, v.data.code);
            }
            resolve(v);
        })).catch((err) => new Promise((resolve, reject) => {
            if ((obj.errorHandleType === undefined || obj.errorHandleType === 'global')
                && config.httpStatusErrorHandler) {
                if (err.response) {
                    config.httpStatusErrorHandler(err, err.response.status);
                }
                else {
                    config.httpStatusErrorHandler(err);
                }
            }
            reject(err);
        }));
    };
    return api;
};
//# sourceMappingURL=index.js.map