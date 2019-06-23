# 接口代理工具

## 何时使用
当项目中存在接口调用时

## 使用说明
全局定义一个api对象，使用该工具对api对象进行代理，然后挂载为Vue的属性，
然后在Vue的组件中以this.$api.xxx.r(params)的形式进行接口调用

## 使用方法

### 定义为插件

```typescript
import apiObj from '@/api/index';
import {API, ApiObject, ApiProxy} from 'aegis-ui';
import axios from 'axios';
import {PluginObject, VueConstructor} from 'vue';
import config from '../config';
import state from '../store/state';

axios.defaults.baseURL = config.basePath;
const apiProxy: ApiObject<API> = ApiProxy(apiObj, config, {
  headers: {common: {}}
});
const plugin: PluginObject<any> = {
  installed: false,
  install: (vue: VueConstructor) => {
    if (plugin.installed) {
      return;
    }
    Object.defineProperties(vue.prototype, {
      $api: {
        get() {
          return apiProxy;
        }
      }
    });
  }
};

export const api = apiProxy;

export default plugin;
```

### 使用插件

```typescript
import Api from './api';
Vue.use(Api);
```
