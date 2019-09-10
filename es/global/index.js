import APiProxy from '../api-proxy';
import axios from 'axios';
import Vue from 'vue';

var apiProxy = function apiProxy(apiObject, config, axiosConfig) {
  axios.defaults.baseURL = config.basePath;
  var apiProxy = APiProxy(apiObject, config, axiosConfig || {});
  var plugin = {
    installed: false,
    install: function install(vue) {
      if (plugin.installed) {
        return;
      }

      if (!vue.prototype.$api) {
        Object.defineProperties(vue.prototype, {
          $api: {
            get: function get() {
              return apiProxy;
            }
          }
        });
      }
    }
  };
  Vue.use(plugin);
  return apiProxy;
};

export default {
  proxyAPI: apiProxy
};