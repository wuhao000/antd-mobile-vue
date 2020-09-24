import {Options, Vue} from 'vue-class-component';
import {ExtraData, Locale} from './data-types';
import {PropsType as HeaderPropsType} from './calendar/header';
import defaultLocale from './locale/zh_CN';
import { VNode, PropType } from 'vue';

export type SelectDateType = [Date, Date] | [Date];

export default {
  defaultDate: {},
  defaultTimeValue: {
    type: Date as PropType<Date>, default: () => {
      return new Date(2000, 0, 1, 8);
    }
  },
  defaultValue: {type: Array as PropType<Date[]>},
  displayMode: {type: Boolean, default: false},
  enterDirection: {type: String, default: 'vertical'},
  getDateExtra: {type: Function},
  infiniteOpt: {type: Boolean, default: false},
  initialMonths: {type: Number},
  locale: {
    type: Object, default: () => {
      return defaultLocale;
    }
  },
  maxDate: {type: Date},
  minDate: {type: Date},
  onSelect: {type: Function},
  pickTime: {type: Boolean, default: false},
  prefixCls: {type: String, default: 'rmc-calendar'},
  renderHeader: {type: Function},
  renderShortcut: {type: Function},
  rowSize: {},
  showHeader: {type: Boolean, default: true},
  showShortcut: {type: Boolean, default: false},
  timePickerPickerPrefixCls: {type: String},
  timePickerPrefixCls: {type: String},
  title: {type: String},
  type: {type: String, default: 'range'},
  visible: {type: Boolean, default: false}
};

// @Options({
//   name: 'CalendarProps',
//   props: {
//     defaultDate: {},
//     defaultTimeValue: {
//       type: Date, default: () => {
//         return new Date(2000, 0, 1, 8);
//       }
//     },
//     defaultValue: {},
//     displayMode: {type: Boolean, default: false},
//     enterDirection: {type: String, default: 'vertical'},
//     getDateExtra: {type: Function},
//     infiniteOpt: {type: Boolean, default: false},
//     initialMonths: {type: Number},
//     locale: {
//       type: Object, default: () => {
//         return defaultLocale;
//       }
//     },
//     maxDate: {type: Date},
//     minDate: {type: Date},
//     onSelect: {},
//     pickTime: {type: Boolean, default: false},
//     prefixCls: {type: String, default: 'rmc-calendar'},
//     renderHeader: {},
//     renderShortcut: {},
//     rowSize: {},
//     showHeader: {type: Boolean, default: true},
//     showShortcut: {type: Boolean, default: false},
//     timePickerPickerPrefixCls: {type: String},
//     timePickerPrefixCls: {type: String},
//     title: {type: String},
//     type: {type: String, default: 'range'},
//     visible: {type: Boolean, default: false}
//   }
// })
// export default class CalendarProps extends Vue {
//   /** 显示开始日期，default: today */
//   public defaultDate?: Date;
//   /** 默认时间选择值 */
//   public defaultTimeValue?: Date;
//   /** 默认选择值，开始时间、结束时间 */
//   public defaultValue?: SelectDateType;
//   /**
//    * 是否静态展示模式
//    */
//   public displayMode: boolean;
//   /** 入场方向，default: vertical，vertical: 垂直，horizontal: 水平 */
//   public enterDirection?: 'horizontal' | 'vertical';
//   /** 日期扩展数据 */
//   public getDateExtra?: (date: Date) => ExtraData;
//   /** 无限滚动优化（大范围选择），default: false */
//   public infiniteOpt?: boolean;
//   /** 初始化月个数，default: 6 */
//   public initialMonths?: number;
//   /** 本地化 */
//   public locale?: Locale;
//   /** 最大日期 */
//   public maxDate?: Date;
//   /** 最小日期 */
//   public minDate?: Date;
//   /** 选择日期回调，如果有返回值，选择范围将使用返回值 */
//   public onSelect?: (date: Date, state?: [Date | undefined, Date | undefined]) => SelectDateType | void;
//   /** 是否选择时间，default: false */
//   public pickTime?: boolean;
//   /** (web only) 样式前缀，default: rmc-calendar */
//   public prefixCls?: string;
//   /** 替换标题栏 */
//   public renderHeader?: (prop: HeaderPropsType) => VNode;
//   /** 替换快捷选择栏，需要设置showShortcut: true */
//   public renderShortcut?: (select: (startDate?: Date, endDate?: Date) => void) => VNode;
//   /** 行大小，default: normal */
//   public rowSize?: 'normal' | 'xl';
//   public showHeader: boolean;
//   /** 快捷日期选择， default: false */
//   public showShortcut?: boolean;
//   public timePickerPickerPrefixCls?: string;
//   public timePickerPrefixCls?: string;
//   /** header title, default: {locale.title} */
//   public title?: string;
//   /** 选择类型，default: range，one: 单日，range: 日期区间 */
//   public type?: 'one' | 'range';
//   /** 是否显示，default: false */
//   public visible?: boolean;
//
// }
