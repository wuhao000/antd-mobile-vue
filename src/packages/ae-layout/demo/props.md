属性 | 说明 | 类型 | 默认值 
------ | ------ | ------ | ---
| breakpoint | 触发响应式布局[断点](/components/grid#api)时的回调 | (broken) => {} |
| breakpoint | 触发响应式布局的[断点](/components/grid#API) | Enum { 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' } | - |
| class | 容器 class | string | - |
| class | 容器 class | string | - |
| collapse | 展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发 | (collapsed, type) => {} |
| collapsedWidth | 收缩宽度，设置为 0 会出现特殊 trigger | number | 80 |
| collapsible | 是否可收起 | boolean | false |
| defaultCollapsed | 是否默认收起 | boolean | false |
| hasSider | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | boolean | - |
height||string \| number|
lineHeight||string \| number|1
| reverseArrow | 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用 | boolean | false |
| style | 指定样式 | object\|string | - |
| style | 指定样式 | object | - |
| theme | 主题颜色 | string: `light` `dark` | `dark` |
| trigger | 自定义 trigger，设置为 null 时隐藏 trigger | string\|slot | - |
width||string \| number|
| 事件名称 | 说明 | 回调参数 |
| 参数 | 说明 | 类型 | 默认值 |
| 参数 | 说明 | 类型 | 默认值 |