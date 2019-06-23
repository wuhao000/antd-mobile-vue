# 全局工具类

## 用法

### 接口对象代理

```typescript
import {Global, AppConfig} from 'aegis-ui';

const apiObj = {
  user: {
    get: {
      url: '/user/:id',
      method: HttpMethod.GET
    }
  }
}
const appConfig: AppConfig = {
  basePath: '/api'
}
Global.proxyAPI(apiObj, appConfig)
```

