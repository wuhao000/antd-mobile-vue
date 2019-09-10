import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {ExtraData, Locale} from './data-types';

@Component({
  name: 'DatePickerProps'
})
export default class DatePickerProps extends Vue {
  /** 默认日期，default: today */
  @Prop({})
  public defaultDate?: Date;
  /** 选择值 */
  @Prop({})
  public endDate?: Date;
  /** 日期扩展数据 */
  @Prop({})
  public getDateExtra?: (date: Date, currentValue?: Date[]) => ExtraData;
  /** 无限滚动优化（大范围选择），default: false */
  @Prop({type: Boolean})
  public infiniteOpt?: boolean;
  /** 初始化月个数，default: 6 */
  @Prop({type: Number})
  public initialMonths?: number;
  /** 本地化 */
  @Prop({})
  public locale?: Locale;
  /** 最大日期 */
  @Prop({type: Date})
  public maxDate?: Date;
  /** 最小日期 */
  @Prop({type: Date})
  public minDate?: Date;
  /** 选择区间包含不可用日期 */
  @Prop({})
  public onSelectHasDisableDate?: (date: Date[]) => void;
  /** (web only) 样式前缀 */
  @Prop({type: String})
  public prefixCls?: string;
  /** 行大小 */
  @Prop({})
  public rowSize?: 'normal' | 'xl';
  /** 选择值 */
  @Prop({type: Date})
  public startDate?: Date;
  /** 选择类型，default: range，one: 单日，range: 日期区间 */
  @Prop({})
  public type?: 'one' | 'range';
}
