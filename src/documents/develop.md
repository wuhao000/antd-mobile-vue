# 组件开发说明

## 创建组件目录

在src/packages目录下创建新的文件夹作为组件目录，文件夹的名称为组件名称，命名方式为-连接小写单词，不允许使用大写

使用命令行创建组件目录 <code> npm run create 组件名 组件中文名 类型</code>

类型: <code> tool | component | directive </code>

示例: <code> npm run create m-button 按钮 component</code>

组件的目录结构如下：

UI组件命名特别说明：

* 移动端UI组件以M开头，例如MInput
* PC端UI组件以D开头，例如DInput
* 通用UI组件以Ae开头，例如AeInput

```html
component-name（示例）//组件名称 
│ 
├─src  // 组件代码文件夹  
│  │   
│  └─index.ts(x) 或 index.vue 必须提供
│
├─demo  // 必须提供，示例文件夹，必须包含至少一个示例 
│  │   
│  ├─demo1  示例1文件夹
│  │   │
│  │   ├─index.vue 必须提供，示例1组件
│  │   │
│  │   └─index.md 必须提供，示例1说明
│  │
│  ├─demo2   示例2文件夹
│  │   │
│  │   ├─index.vue 示例2组件
│  │   │
│  │   └─index.md 示例说明
│  │
│  ├─index.vue 准备好其他文件之后运行npm run docs即可生成
│  │
│  ├─README.md 必须提供，组件的基本介绍
│  │
│  ├─props.md UI组件的Props说明（按需要提供）
│  │
│  ├─events.md 组件的事件说明（按需要提供）
│  │
│  ├─functions.md 组件的对外暴露的方法说明（按需要提供）
│  │
│  └─slots.md 组件的插槽说明（按需要提供）
│
└─index.ts // 必须提供，对外暴露文件，默认暴露的对象必须具有install方法 
```

> 如果添加的是UI组件，命名直接使用组件名称
> 如果添加的是vue指令组件，命名使用 xxx-directive

### 编写组件文件
1. 在组件文件夹下创建src文件夹
2. 在组件文件夹下创建index.ts
3. 在第1步中创建的src文件夹下创建index.vue（UI组件）或index.ts（指令或其他类型组件）文件
4. 编写代码

## 编写组件示例
1. 在组件文件夹下创建demo文件夹
2. 在demo文件夹下创建README.md
3. 每组示例在demo文件夹下分别创建demo1、demo2等文件夹
4. 在demo1、demo2等文件夹下创建index.md、index.vue文件
5. index.vue为示例组件、index.md为示例说明

## 生成组件文档

生成文档需要在组件代码编写完成后运行一次

运行以下命令
```
npm run docs
```

> 如果添加了新的示例或修改了示例的代码时需要重新运行生成文档的命令
> 修改.md文件不需要重新生成文档
> 修改已存在的示例代码在开发时可以实时看到运行效果，只是文档中的示例代码会不同步

