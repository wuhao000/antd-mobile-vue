// 导入颜色选择器组件
import Global from './global';
import HttpMethod from './http-method';
import VueIcon from '@ant-design/icons-vue';
import zhCn from './moment-zh_CN';
import Accordion from './accordion';
import ActionSheet from './action-sheet';
import ActivityIndicator from './activity-indicator';
import ApiProxy from './api-proxy';
import Badge from './badge';
import Button from './button';
import Calendar from './calendar';
import Card from './card';
import Carousel from './carousel';
import Chart from './chart';
import Checkbox from './checkbox';
import DatePicker from './date-picker';
import DatePickerView from './date-picker-view';
import Drawer from './drawer';
import Flex from './flex';
import Grid from './grid';
import Icon from './icon';
import ImagePicker from './image-picker';
import Input from './input';
import List from './list';
import ListView from './list-view';
import LoadingDirective from './loading-directive';
import Menu from './menu';
import Modal from './modal';
import NavBar from './nav-bar';
import NoticeBar from './notice-bar';
import Pagination from './pagination';
import Picker from './picker';
import Popup from './popup';
import Progress from './progress';
import PullRefresh from './pull-refresh';
import Radio from './radio';
import Range from './range';
import Result from './result';
import SearchBar from './search-bar';
import SegmentedControl from './segmented-control';
import Slider from './slider';
import Steps from './steps';
import Switch from './switch';
import TabBar from './tab-bar';
import Tabs from './tabs';
import Tag from './tag';
import Textarea from './textarea';
import TimeDirective from './time-directive';
import Toast from './toast';
import WhiteSpace from './white-space';
import WingBlank from './wing-blank';
// 注册moment中文国际化文案
if (moment) {
  moment.updateLocale('zh-cn', zhCn);
}
if (window.AntDesignIcons) {
  // 注册 ant design icons, 共721个icon
  const icons = window.AntDesignIcons;
  Object.keys(icons).forEach(icon => {
    VueIcon.add(icons[icon]);
  });
}
// 存储组件列表
const components = [
  Accordion,
	ActionSheet,
	ActivityIndicator,
	Badge,
	Button,
	Calendar,
	Card,
	Carousel,
	Chart,
	Checkbox,
	DatePicker,
	DatePickerView,
	Drawer,
	Flex,
	Grid,
	Icon,
	ImagePicker,
	Input,
	List,
	ListView,
	LoadingDirective,
	Menu,
	Modal,
	NavBar,
	NoticeBar,
	Pagination,
	Picker,
	Popup,
	Progress,
	PullRefresh,
	Radio,
	Range,
	Result,
	SearchBar,
	SegmentedControl,
	Slider,
	Steps,
	Switch,
	TabBar,
	Tabs,
	Tag,
	Textarea,
	TimeDirective,
	Toast,
	WhiteSpace,
	WingBlank
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
  Global,
  HttpMethod,
  Accordion,
	ActionSheet,
	ActivityIndicator,
	ApiProxy,
	Badge,
	Button,
	Calendar,
	Card,
	Carousel,
	Chart,
	Checkbox,
	DatePicker,
	DatePickerView,
	Drawer,
	Flex,
	Grid,
	Icon,
	ImagePicker,
	Input,
	List,
	ListView,
	LoadingDirective,
	Menu,
	Modal,
	NavBar,
	NoticeBar,
	Pagination,
	Picker,
	Popup,
	Progress,
	PullRefresh,
	Radio,
	Range,
	Result,
	SearchBar,
	SegmentedControl,
	Slider,
	Steps,
	Switch,
	TabBar,
	Tabs,
	Tag,
	Textarea,
	TimeDirective,
	Toast,
	WhiteSpace,
	WingBlank
};
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  Global,
  HttpMethod,
  Accordion,
	ActionSheet,
	ActivityIndicator,
	ApiProxy,
	Badge,
	Button,
	Calendar,
	Card,
	Carousel,
	Chart,
	Checkbox,
	DatePicker,
	DatePickerView,
	Drawer,
	Flex,
	Grid,
	Icon,
	ImagePicker,
	Input,
	List,
	ListView,
	LoadingDirective,
	Menu,
	Modal,
	NavBar,
	NoticeBar,
	Pagination,
	Picker,
	Popup,
	Progress,
	PullRefresh,
	Radio,
	Range,
	Result,
	SearchBar,
	SegmentedControl,
	Slider,
	Steps,
	Switch,
	TabBar,
	Tabs,
	Tag,
	Textarea,
	TimeDirective,
	Toast,
	WhiteSpace,
	WingBlank
};
