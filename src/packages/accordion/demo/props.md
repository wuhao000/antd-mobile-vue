属性 | 说明 | 类型 | 默认值 
------ | ------ | ------ | ---
accordion|`手风琴`模式|boolean|false
activeKey|无默认值，accordion模式下默认第一个元素|string \| string[]|
| defaultActiveKey | 初始化选中面板的 key | String   | 无 |
| header | 面板头内容 | React.Element or String | 无     |
| key  | 对应 activeKey   | String          | 无     |
| onChange      |   切换面板的回调   | (key: string): void |  noop  |
openAnimation|设置自定义切换动画，禁止动画可设为`{}`|any|
prefixCls||string|