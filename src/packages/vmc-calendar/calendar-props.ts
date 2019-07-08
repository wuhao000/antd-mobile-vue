import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {PropsType as HeaderPropsType} from './calendar/header';
import {Models} from './date/data-types';
import defaultLocale from './locale/zh_CN';

export type SelectDateType = [Date, Date] | [Date];

@Component({
  name: 'CalendarProps'
})
export default class CalendarProps extends Vue {
  /** 显示开始日期，default: today */
  @Prop({})
  public defaultDate?: Date;
  /** 默认时间选择值 */
  @Prop({
    type: Date, default: () => {
      return new Date(2000, 0, 1, 8);
    }
  })
  public defaultTimeValue?: Date;
  /** 默认选择值，开始时间、结束时间 */
  @Prop({})
  public defaultValue?: SelectDateType;
  /** 入场方向，default: vertical，vertical: 垂直，horizontal: 水平 */
  @Prop({})
  public enterDirection?: 'horizontal' | 'vertical';
  /** 日期扩展数据 */
  @Prop({type: Function})
  public getDateExtra?: (date: Date) => Models.ExtraData;
  /** 无限滚动优化（大范围选择），default: false */
  @Prop({type: Boolean, default: false})
  public infiniteOpt?: boolean;
  /** 初始化月个数，default: 6 */
  @Prop({type: Number})
  public initialMonths?: number;
  /** 本地化 */
  @Prop({
    type: Object, default: () => {
      return defaultLocale;
    }
  })
  public locale?: Models.Locale;
  /** 最大日期 */
  @Prop({type: Date})
  public maxDate?: Date;
  /** 最小日期 */
  @Prop({type: Date})
  public minDate?: Date;
  /** 选择日期回调，如果有返回值，选择范围将使用返回值 */
  @Prop({})
  public onSelect?: (date: Date, state?: [Date | undefined, Date | undefined]) => SelectDateType | void;
  /** 是否选择时间，default: false */
  @Prop({type: Boolean, default: false})
  public pickTime?: boolean;
  /** (web only) 样式前缀，default: rmc-calendar */
  @Prop({type: String, default: 'rmc-calendar'})
  public prefixCls?: string;
  /** 替换标题栏 */
  @Prop({})
  public renderHeader?: (prop: HeaderPropsType) => VNode;
  /** 替换快捷选择栏，需要设置showShortcut: true */
  @Prop({})
  public renderShortcut?: (select: (startDate?: Date, endDate?: Date) => void) => VNode;
  /** 行大小，default: normal */
  @Prop({})
  public rowSize?: 'normal' | 'xl';
  @Prop({type: Boolean, default: true})
  public showHeader: boolean;
  /** 快捷日期选择， default: false */
  @Prop({type: Boolean, default: false})
  public showShortcut?: boolean;
  @Prop({type: String})
  public timePickerPickerPrefixCls?: string;
  @Prop({type: String})
  public timePickerPrefixCls?: string;
  /** header title, default: {locale.title} */
  @Prop({type: String})
  public title?: string;
  /** 选择类型，default: range，one: 单日，range: 日期区间 */
  @Prop({type: String, default: 'range'})
  public type?: 'one' | 'range';
  /** 是否显示，default: false */
  @Prop({type: Boolean, default: false})
  public visible?: boolean;
  /**
   * 是否静态展示模式
   */
  @Prop({type: Boolean, default: false})
  public displayMode: boolean;
}
