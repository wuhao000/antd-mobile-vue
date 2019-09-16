import _extends from "@babel/runtime/helpers/extends";
import HttpMethod from '../../http-method';
import qs from 'querystring';
/**
 * 判断对象是不是数组
 * @type {(arr) => boolean}
 */

var isArray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};
/**
 * 替换请求路径中的路径参数名称为实际的参数值，并将在路径中的参数从请求参数中去除
 * @param {string} path 待处理的请求路径
 * @param {object} params 请求的所有参数
 * @return {string}
 */


function replaceRestParams(path, params) {
  var pathSegments = toSegments(path);

  for (var index = 0; index < pathSegments.length; index++) {
    var segment = pathSegments[index];

    if (segment.indexOf(':') === 0) {
      var paramName = segment.substr(1);

      if (params[paramName] !== null && params[paramName] !== undefined) {
        pathSegments[index] = params[paramName];
        delete params[paramName];
      } else {
        throw Error("\u7F3A\u5C11\u8DEF\u5F84\u53C2\u6570" + paramName + ", \u8BF7\u6C42\u8DEF\u5F84\u4E3A: " + path + "\uFF0C\u8BF7\u6C42\u7684\u53C2\u6570\u4E3A" + params);
      }
    }
  }

  return pathSegments.join('');
}
/**
 * 将请求路径进行分段，解析出其中以:开头的部分，即为路径参数
 * @param {string} path 待解析的路径
 * @return {string[]} 路径分段后的字符串数组，数组中的字符串顺序连接即为原路径
 */


function toSegments(path) {
  var result = [];
  var start = -1;

  for (var index = 0; index < path.length; index++) {
    var char = path[index];

    if (char === ':' && (index === 0 || path[index - 1] === '/') || ['/', '?', '&', '#'].indexOf(char) >= 0 && start >= 0) {
      if (index > 0) {
        result.push(path.substring(start, index));
      }

      start = index;
    } else if (index === path.length - 1 && start >= 0) {
      if (index > 0) {
        result.push(path.substring(start, index + 1));
      }

      start = index;
    } else if (start === -1) {
      start = index;
    }
  }

  return result;
}
/**
 * 将对象参数转化为axis请求的数据格式
 * @param {API & AxiosRequestConfig} obj 接口对象
 * @param {object} params 请求参数
 * @return {API & AxiosRequestConfig} 接口对象
 */


export var assignParams = function assignParams(obj, params) {
  if (params) {
    if (isArray(params)) {
      throw Error('不接受数组参数');
    }

    var copyParams = _extends({}, params);

    obj.url = replaceRestParams(obj.url, copyParams);

    if (obj.isFormData && [HttpMethod.POST, HttpMethod.PUT].includes(obj.method)) {
      obj.data = qs.stringify(copyParams);
    } else if ([HttpMethod.GET, HttpMethod.DELETE].includes(obj.method)) {
      obj.url = obj.url + "?" + qs.stringify(copyParams);
    } else {
      obj.data = copyParams;
    }

    return obj;
  } else {
    return obj;
  }
};