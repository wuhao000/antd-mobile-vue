import APiProxy from '../api-proxy';
import axios from 'axios';
import Vue from 'vue';
const apiProxy = (apiObject, config, axiosConfig) => {
    axios.defaults.baseURL = config.basePath;
    const apiProxy = APiProxy(apiObject, config, axiosConfig || {});
    const plugin = {
        installed: false,
        install: (vue) => {
            if (plugin.installed) {
                return;
            }
            if (!vue.prototype.$api) {
                Object.defineProperties(vue.prototype, {
                    $api: {
                        get() {
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
//# sourceMappingURL=index.js.map