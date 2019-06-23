属性 | 说明 | 类型 | 默认值 
------ | ------ | ------ | ---
clearable|是否支持清除|boolean|false
defaultOptionLabel||string|
defaultOptionValue||any|
filter|是否根据输入项进行筛选。类型为函数，接收 <code>inputValue</code>，<code>option</code> 两个参数， 当 <code>option</code> 符合筛选条件时，应返回 <code>true</code>，反之则返回 <code>false</code>。 仅对<code>options</code>进行过滤，如果选项为子组件时，请通过监听<code>search</code>事件获取输入值并自行实现过滤逻辑|(input: string, option: any) => boolean|
labelProperty|选项对象中作为标签的属性名称|string \| ((option) => any)|
multiple|为true时等同于mode="multiple"|boolean|
notFoundContent|当下拉列表为空时显示的内容|string|
options|选项数据|any[]|
placeholder|占位提示信息|string|
searchable|是否支持选项搜索|boolean|
valueProperty|选项对象中作为值的属性名称|string \| ((option) => any)|