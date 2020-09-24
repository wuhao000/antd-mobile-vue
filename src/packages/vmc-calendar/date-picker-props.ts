import {PropType} from 'vue';
import {ExtraData, Locale} from './data-types';

export default {
  /** 默认日期，default: today */
  defaultDate: {type: Date as PropType<Date>},
  /** 选择值 */
  endDate: {type: Date as PropType<Date>},
  /** 日期扩展数据 */
  getDateExtra: {type: Function as PropType<(date: Date, currentValue?: Date[]) => ExtraData>},
  /** 无限滚动优化（大范围选择），default: false */
  infiniteOpt: {type: Boolean},
  /** 初始化月个数，default: 6 */
  initialMonths: {type: Number},
  /** 本地化 */
  locale: {type: Object as PropType<Locale>},
  /** 最大日期 */
  maxDate: {type: Date as PropType<Date>},
  /** 最小日期 */
  minDate: {type: Date as PropType<Date>},
  /** 选择区间包含不可用日期 */
  onSelectHasDisableDate: {type: Function as PropType<(date: Date[]) => void>},
  /** (web only) 样式前缀 */
  prefixCls: {type: String},
  /** 行大小 */
  rowSize: {type: String as PropType<'normal' | 'xl'>},
  /** 选择值 */
  startDate: {type: Date as PropType<Date>},
  /** 选择类型，default: range，one: 单日，range: 日期区间 */
  type: {type: String as PropType<'one' | 'range'>}
};
