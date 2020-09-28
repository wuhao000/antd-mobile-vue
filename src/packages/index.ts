// 导入颜色选择器组件
import HttpMethod from './http-method';
import VueIcon from '@ant-design/icons-vue';
import zhCn from './moment-zh_CN';
import Accordion from './accordion';
import NavBar from './nav-bar';
import Drawer from './drawer';
import Card from './card';
import ActionSheet from './action-sheet';
import Button from './button';
import List from './list';
import ActivityIndicator from './activity-indicator';
import Range from './range';
import Switch from './switch';
import Input from './input';
import Calendar from './calendar';
import Badge from './badge';
import WingBlank from './wing-blank';
import Checkbox from './checkbox';
import Flex from './flex';
import Grid from './grid';
import Carousel from './carousel';
import WhiteSpace from './white-space';
// 注册moment中文国际化文案
if (window.moment) {
  window.moment.updateLocale('zh-cn', zhCn);
}
// 存储组件列表
const components = [
  Accordion,
	NavBar,
	Drawer,
	Card,
	ActionSheet,
	Button,
	List,
	ActivityIndicator,
	Range,
	Switch,
	Input,
	Calendar,
	Badge,
	WingBlank,
	Checkbox,
	Flex,
	Grid,
	Carousel,
	WhiteSpace
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否可以安装
  // if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.use(component));
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
   install(window.Vue);
}
export {
  // 以下是具体的组件列表
  HttpMethod,
  Accordion,
	NavBar,
	Drawer,
	Card,
	ActionSheet,
	Button,
	List,
	ActivityIndicator,
	Range,
	Switch,
	Input,
	Calendar,
	Badge,
	WingBlank,
	Checkbox,
	Flex,
	Grid,
	Carousel,
	WhiteSpace
};
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  HttpMethod,
  Accordion,
	NavBar,
	Drawer,
	Card,
	ActionSheet,
	Button,
	List,
	ActivityIndicator,
	Range,
	Switch,
	Input,
	Calendar,
	Badge,
	WingBlank,
	Checkbox,
	Flex,
	Grid,
	Carousel,
	WhiteSpace
};
