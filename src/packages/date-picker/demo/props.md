属性 | 说明 | 类型 | 默认值 
------ | ------ | ------ | ---
className| |string|
pickerPrefixCls| |string|
placeholder| |string|
popupPrefixCls| |string|
prefixCls| |string|
use12Hours|12小时制|boolean|false
mode|日期选择的类型, 可以是日期date,时间time,日期+时间datetime,年year,月month|	string,date|
value(v-model)|当前选中时间|date|
minDate|最小可选日期|date|new Date(2000, 1, 1, 0, 0, 0)
maxDate|最大可选日期|date|new Date(2030, 1, 1, 23, 59, 59)
minuteStep|分钟数递增步长设置|number|1
disabled|是否不可用|boolean|false
title|弹框的标题|string/VNode|无
extra|显示文案|string|请选择
