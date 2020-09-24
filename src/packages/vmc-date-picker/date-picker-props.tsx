import {PropType} from 'vue';
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

export default {
  date: {type: Date as PropType<Date>},
  defaultDate: {
    type: Date as PropType<Date>,
    default: () => new Date()
  },
  minDate: {},
  maxDate: {},
  minHour: {
    type: Number as PropType<number>
  },
  maxHour: {
    type: Number as PropType<number>
  },
  minMinute: {
    type: Number as PropType<number>
  },
  maxMinute: {
    type: Number as PropType<number>
  },
  mode: {
    type: String as PropType<string>,
    default: DATE
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  locale: {
    default: defaultLocale
  },
  minuteStep: {
    type: Number as PropType<number>,
    default: 1
  },
  formatMonth: {type: Function as PropType<(index: number, date: Date) => any>},
  formatDay: {type: Function as PropType<(index: number, date: Date) => any>},
  itemStyle: {type: Function as PropType<any>},
  prefixCls: {
    type: String as PropType<string>,
    default: 'rmc-date-picker'
  },
  rootNativeProps: {},
  pickerPrefixCls: {
    type: String as PropType<string>,
    default: 'rmc-picker'
  },
  use12Hours: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};
