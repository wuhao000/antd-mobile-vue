// 导入颜色选择器组件
import Global from './global';
import HttpMethod from './http-method';
import VueIcon from '@ant-design/icons-vue';
import zhCn from './moment-zh_CN';
import ApiProxy from './api-proxy';
import LoadingDirective from './loading-directive';
import MAccordion from './m-accordion';
import MActionSheet from './m-action-sheet';
import MActivityIndicator from './m-activity-indicator';
import MAnimate from './m-animate';
import MBadge from './m-badge';
import MButton from './m-button';
import MCalendar from './m-calendar';
import MCard from './m-card';
import MCarousel from './m-carousel';
import MChart from './m-chart';
import MCheckbox from './m-checkbox';
import MDatePicker from './m-date-picker';
import MDrawer from './m-drawer';
import MFlex from './m-flex';
import MGrid from './m-grid';
import MIcon from './m-icon';
import MInput from './m-input';
import MList from './m-list';
import MModal from './m-modal';
import MNavBar from './m-nav-bar';
import MNoticeBar from './m-notice-bar';
import MPagination from './m-pagination';
import MPicker from './m-picker';
import MPopup from './m-popup';
import MPullRefresh from './m-pull-refresh';
import MRadio from './m-radio';
import MRange from './m-range';
import MResult from './m-result';
import MSearchBar from './m-search-bar';
import MSteps from './m-steps';
import MSwitch from './m-switch';
import MTabBar from './m-tab-bar';
import MTabs from './m-tabs';
import MTextarea from './m-textarea';
import MToast from './m-toast';
import MWhiteSpace from './m-white-space';
import MWingBlank from './m-wing-blank';
import TimeDirective from './time-directive';
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
  LoadingDirective,
	MAccordion,
	MActionSheet,
	MActivityIndicator,
	MAnimate,
	MBadge,
	MButton,
	MCalendar,
	MCard,
	MCarousel,
	MChart,
	MCheckbox,
	MDatePicker,
	MDrawer,
	MFlex,
	MGrid,
	MIcon,
	MInput,
	MList,
	MModal,
	MNavBar,
	MNoticeBar,
	MPagination,
	MPicker,
	MPopup,
	MPullRefresh,
	MRadio,
	MRange,
	MResult,
	MSearchBar,
	MSteps,
	MSwitch,
	MTabBar,
	MTabs,
	MTextarea,
	MToast,
	MWhiteSpace,
	MWingBlank,
	TimeDirective
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
  ApiProxy,
	LoadingDirective,
	MAccordion,
	MActionSheet,
	MActivityIndicator,
	MAnimate,
	MBadge,
	MButton,
	MCalendar,
	MCard,
	MCarousel,
	MChart,
	MCheckbox,
	MDatePicker,
	MDrawer,
	MFlex,
	MGrid,
	MIcon,
	MInput,
	MList,
	MModal,
	MNavBar,
	MNoticeBar,
	MPagination,
	MPicker,
	MPopup,
	MPullRefresh,
	MRadio,
	MRange,
	MResult,
	MSearchBar,
	MSteps,
	MSwitch,
	MTabBar,
	MTabs,
	MTextarea,
	MToast,
	MWhiteSpace,
	MWingBlank,
	TimeDirective
};
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  Global,
  HttpMethod,
  ApiProxy,
	LoadingDirective,
	MAccordion,
	MActionSheet,
	MActivityIndicator,
	MAnimate,
	MBadge,
	MButton,
	MCalendar,
	MCard,
	MCarousel,
	MChart,
	MCheckbox,
	MDatePicker,
	MDrawer,
	MFlex,
	MGrid,
	MIcon,
	MInput,
	MList,
	MModal,
	MNavBar,
	MNoticeBar,
	MPagination,
	MPicker,
	MPopup,
	MPullRefresh,
	MRadio,
	MRange,
	MResult,
	MSearchBar,
	MSteps,
	MSwitch,
	MTabBar,
	MTabs,
	MTextarea,
	MToast,
	MWhiteSpace,
	MWingBlank,
	TimeDirective
};
