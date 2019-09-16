import _extends from "@babel/runtime/helpers/extends";
import Axios from 'axios';
import merge from 'lodash.merge';
import HttpMethod from '../../http-method';
import { assignParams } from './param-handler';
/**
 * Created by wuhao on 2017/1/16.
 */

export default (function (apiObj, config, commonSettings) {
  if (commonSettings === void 0) {
    commonSettings = {};
  }

  Axios.defaults.baseURL = config.basePath;

  var newObj = _extends({}, apiObj);

  function defineReq(obj, options) {
    var copyObj = obj;

    if (copyObj.url) {
      copyObj = merge({}, copyObj, options);
      /**
       * 发送ajax请求
       * @param {object} settings
       * @param {object|array} params
       */

      copyObj.request = function (params, settings) {
        return request.call(copyObj, merge({}, settings, copyObj), params);
      };

      copyObj.req = function (params, settings) {
        return requestData.call(copyObj, merge({}, settings, copyObj), params, false);
      };

      copyObj.r = function (params, settings) {
        return requestData.call(copyObj, merge({}, settings, copyObj), params, true);
      };
    }

    for (var property in copyObj) {
      if (copyObj.hasOwnProperty(property) && typeof copyObj[property] === 'object') {
        copyObj[property] = defineReq(copyObj[property], options);
      }
    }

    return copyObj;
  }

  var api = defineReq(newObj, commonSettings);

  var requestData = function requestData(obj, params, pure) {
    if (pure === void 0) {
      pure = false;
    }

    var p = request(obj, params); // @ts-ignore

    return Promise.resolve(p).then(function (v) {
      return new Promise(function (resolve, reject) {
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

  var request = function request(obj, params) {
    obj.url = obj.url + (config.pathSuffix || '');
    obj.method = obj.method || HttpMethod.GET;
    assignParams(obj, params);
    var p = Axios.request(obj);
    return Promise.resolve(p).then(function (v) {
      return new Promise(function (resolve) {
        if ((obj.errorHandleType === undefined || obj.errorHandleType === 'global') && config.logicErrorHandler && v.data.code) {
          config.logicErrorHandler(v.data, v.data.code);
        }

        resolve(v);
      });
    }).catch(function (err) {
      return new Promise(function (resolve, reject) {
        if ((obj.errorHandleType === undefined || obj.errorHandleType === 'global') && config.httpStatusErrorHandler) {
          if (err.response) {
            config.httpStatusErrorHandler(err, err.response.status);
          } else {
            config.httpStatusErrorHandler(err);
          }
        }

        reject(err);
      });
    });
  };

  return api;
});