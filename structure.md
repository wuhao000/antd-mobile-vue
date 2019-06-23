### 项目 目录结构说明

* │  .browserslistrc // 配置目标浏览器
* │  .env.development // 开发环境配置，可在此配置全局变量，使用 process.env 读取，打包工具会根据不同环境自动读取变量
* │  .env.pre // 生产环境配置，可在此配置全局变量，使用 process.env 读取，打包工具会根据不同环境自动读取变量
* │  .env.production  // 测试环境配置，可在此配置全局变量，使用 process.env 读取，打包工具会根据不同环境自动读取变量
* │  .eslintrc.js // eslint 配置
* │  .gitignore
* │  .npmignore  //与gitignore相同 
* │  .postcssrc.js // postcss配置，一般不会用到，使用默认值
* │  babel.config.js // babel配置，一般不会用到，使用默认值
* │  package-lock.json
* │  package.json
* │  README.md
* │  vue.config.js // vue 配置，可配置 webpack 等，可参照 https://cli.vuejs.org/zh/config/
* │  
* ├─public // 此文件夹下可以放置一些静态资源，除了index.html会经过处理外，其他文件都会原封不动的自动复制到 htdocs 根目录下，不会经过webpack的处理。
* │      favicon.ico
* │      index.html // 所有的打包页面都会经过这个文件，本模板对多页的配置采用了统一处理，当然也可以在 vue.config.js 单独配置每个页面
* │ 
* ├─packages // 组件 指令 公共工具类 公共样式  该文件夹为上传NPM包 
* │   │  
* │   │   
* │   ├─components // 组件文件夹，可定义一些公共组件
* │   │   │   
* │   │   ├─alert（示例）//具名组件文件夹 
* │   │   │   │ 
* │   │   │   ├─src  // 组件开发文件夹  
* │   │   │   │  │   
* │   │   │   │  └─alert.vue  // 组件 
* │   │   │   │ 
* │   │   │   └─index.ts // 组件对外暴露文件 
* │   │   │   
* │   │   ├─date（示例）//具名组件文件夹 
* │   │   │   │ 
* │   │   │   ├─src  // 组件开发文件夹  
* │   │   │   │  │ 
* │   │   │   │  └─date.vue  // 组件 
* │   │   │   │ 
* │   │   │   └─index.ts // 组件对外暴露文件 
* │   │   │   
* │   │   └─index.ts // 所有组件对外暴露文件
* │   │  
* │   ├─directive // 指令文件夹，可定义一些公共指令   
* │   │   │   
* │   │   ├─alert（示例）//具名指令文件夹 
* │   │   │   │ 
* │   │   │   ├─src  // 指令开发文件夹  
* │   │   │   │  │   
* │   │   │   │  └─alert.ts  // 指令 
* │   │   │   │ 
* │   │   │   └─index.ts // 指令对外暴露文件 
* │   │   │   
* │   │   ├─date（示例）//具名指令文件夹 
* │   │   │   │ 
* │   │   │   ├─src  // 指令开发文件夹  
* │   │   │   │  │   
* │   │   │   │  └─date.ts  // 指令 
* │   │   │   │ 
* │   │   │   └─index.ts // 指令对外暴露文件 
* │   │   │   
* │   │   └─index.ts // 所有指令对外暴露文件
* │   │    
* │   ├─utils  // 常用 js 工具类  
* │   │   │   
* │   │   ├─alert（示例）
* │   │   │   │ 
* │   │   │   ├─src 
* │   │   │   │  │   
* │   │   │   │  └─alert.ts  
* │   │   │   │ 
* │   │   │   └─index.ts 
* │   │   │   
* │   │   └─index.ts // 所有工具类和公共方法对外暴露文件
* │   │   
* │   └─style // 公共样式文件夹，可以定义一些公共样式，如浏览器重置样式 reset.less，此文件夹可按需求随意更改 
* │        
* │ 
* │ 
* └─src // demo开发文件夹  不需要上传至npm ，该文件夹下只面向dome演示
*    ├─assets // 资源文件夹，可放置 css、images等   
*    │      
*    ├─components // 组件文件夹
*    │      
*    ├─directive // 指令文件夹    
*    │      
*    ├─main.ts 
*    ├─app.vue
*    ├─router.ts
*    └─store.ts
  