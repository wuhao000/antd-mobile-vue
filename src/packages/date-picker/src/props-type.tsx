import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import locale from './locale/zh_CN';

@Component({
  name: 'DatePickerProps'
})
export default class DatePickerProps extends Vue<IDatePickerPropsType> {
  @Prop({})
  public value?: Date;
  @Prop({default: 'datetime'})
  public mode?: 'datetime' | 'date' | 'year' | 'month' | 'time';
  @Prop({})
  public minDate?: Date;
  @Prop({})
  public maxDate?: Date;
  @Prop({type: Boolean})
  public visible?: boolean;
  @Prop({type: Object, default: () => locale})
  public locale?: {
    okText: string;
    dismissText: string;
    extra: string;
    DatePickerLocale: {
      year: string;
      month: string;
      day: string;
      hour: string;
      minute: string;
      am?: string;
      pm?: string;
    };
  };
  @Prop({
    type: Number,
    default: 1
  })
  public minuteStep?: number;
  @Prop({type: Boolean})
  public disabled?: boolean;
  @Prop({})
  public format?: string | ((value: Date) => string);
  @Prop({type: String})
  public extra?: string;
  @Prop({})
  public dismissText?: VNode | string;
  @Prop({})
  public okText?: VNode | string;
  @Prop({})
  public title?: VNode | string;
}

export interface IDatePickerPropsType {
  value?: Date;
  mode?: 'datetime' | 'date' | 'year' | 'month' | 'time';
  minDate?: Date;
  maxDate?: Date;
  visible?: boolean;
  locale?: {
    okText: string;
    dismissText: string;
    extra: string;
    DatePickerLocale: {
      year: string;
      month: string;
      day: string;
      hour: string;
      minute: string;
      am?: string;
      pm?: string;
    };
  };
  minuteStep?: number;
  disabled?: boolean;
  format?: string | ((value: Date) => string);
  extra?: string;
  dismissText?: VNode | string;
  okText?: VNode | string;
  title?: VNode | string;
}
