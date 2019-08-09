属性 | 说明 | 类型 | 默认值 
------ | ------ | ------ | ---
activeCardColor|激活的卡片背景色（未激活卡片的边框色与之相同）|string|
animated|切换标签时是否有动画|boolean|true
card|使用卡片样式|boolean|
destroyInactiveTab|是否销毁未激活的标签页|boolean|false
distanceToChangeTab|切换卡片的滑动距离，0-1之间|number|0
page||number \| string|
prefixCls|class前缀|string|
prerenderingSiblingsNumber|与当前激活标签相邻的提前渲染的标签数量|number|1
renderTabBar||(props: any) => VNode|
swipeable|是否支持手势|boolean|true
tabBarActiveTextColor|激活的标签页文字颜色|string|
tabBarBackgroundColor|标签页背景颜色|string|
tabBarInactiveTextColor|未激活的标签页文字颜色|string|
tabBarPosition|TabBar's position | default: top|'top' \| 'bottom' \| 'left' \| 'right'|
tabBarTextStyle|标签栏文字样式|any|
tabBarUnderlineStyle|标签下划线样式|any|
tabDirection|标签页方向|'horizontal' \| 'vertical'|
tabs|标签数据|Models.TabData[]|
useLeftInsteadTransform|use left instead of transform | default: false|boolean|
useOnPan||boolean|true
usePaged||boolean|true
value|当前激活的卡片的索引|number \| string|0