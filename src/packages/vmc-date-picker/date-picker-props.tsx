import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import defaultLocale from './locale/zh_CN';

const DATE = 'date';

interface IDatePickerProps {
  date?: any;
  defaultDate?: any;
  minDate?: any;
  maxDate?: any;
  minHour?: number;
  maxHour?: number;
  minMinute?: number;
  maxMinute?: number;
  mode?: string;
  disabled?: boolean;
  locale?: any;
  minuteStep?: number;
  formatMonth?: (month: number, date?: any) => any;
  formatDay?: (day: number, date?: any) => any;
  itemStyle?: any;
  /** web only */
  prefixCls?: string;
  rootNativeProps?: {};
  pickerPrefixCls?: string;
  use12Hours?: boolean;
}

@Component({
  name: 'DatePickerProps'
})
class DatePickerProps extends Vue<IDatePickerProps> {
  @Prop({})
  public date?: any;
  @Prop({})
  public defaultDate?: any;
  @Prop({})
  public minDate?: any;
  @Prop({})
  public maxDate?: any;
  @Prop({type: Number})
  public minHour?: number;
  @Prop({type: Number})
  public maxHour?: number;
  @Prop({type: Number})
  public minMinute?: number;
  @Prop({type: Number})
  public maxMinute?: number;
  @Prop({
    type: String,
    default: DATE
  })
  public mode?: string;
  @Prop({
    type: Boolean,
    default: false
  })
  public disabled?: boolean;
  @Prop({default: defaultLocale})
  public locale?: any;
  @Prop({
    type: Number,
    default: 1
  })
  public minuteStep?: number;
  @Prop({})
  public formatMonth?: (month: number, date?: any) => any;
  @Prop({})
  public formatDay?: (day: number, date?: any) => any;
  @Prop({})
  public itemStyle?: any;
  @Prop({
    type: String,
    default: 'rmc-date-picker'
  })
  public prefixCls?: string;
  @Prop({})
  public rootNativeProps?: {};
  @Prop({
    type: String,
    default: 'rmc-picker'
  })
  public pickerPrefixCls?: string;
  @Prop({
    type: Boolean,
    default: false
  })
  public use12Hours?: boolean;
}

export default DatePickerProps;
