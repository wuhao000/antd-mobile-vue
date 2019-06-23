import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import DateTimePicker from '../vmc-date-picker';
import {Models} from './date/data-types';

export const MIN_DATE = new Date(0, 0, 0, 0, 0);
export const MAX_DATE = new Date(9999, 11, 31, 23, 59, 59);

export interface PropsType {
  locale: Models.Locale;
  prefixCls?: string;
  pickerPrefixCls?: string;
  title?: string;
  defaultValue?: Date;
  value?: Date;
  onValueChange?: (time: Date) => void;

  minDate?: Date;
  maxDate?: Date;
  clientHeight?: number;
}

@Component({
  name: 'TimePicker'
})
export default class TimePicker extends Vue {
  @Prop()
  public locale: Models.Locale;
  @Prop(String)
  public prefixCls?: string;
  @Prop(String)
  public pickerPrefixCls?: string;
  @Prop(String)
  public title?: string;
  @Prop(Date)
  public defaultValue?: Date;
  @Prop(Date)
  public value?: Date;
  @Prop({
    type: Date, default: () => {
      return MIN_DATE;
    }
  })
  public minDate?: Date;
  @Prop({
    type: Date, default: () => {
      return MAX_DATE;
    }
  })
  public maxDate?: Date;
  @Prop()
  public clientHeight?: number;

  public onDateChange(date: Date) {
    this.$emit('change', date);
  }

  public getMinTime(date?: Date) {
    const minDate = this.minDate as Date;
    if (!date ||
      date.getFullYear() > minDate.getFullYear() ||
      date.getMonth() > minDate.getMonth() ||
      date.getDate() > minDate.getDate()
    ) {
      return MIN_DATE;
    }
    return minDate;
  }

  public getMaxTime(date?: Date) {
    const maxDate = this.maxDate as Date;
    if (!date ||
      date.getFullYear() < maxDate.getFullYear() ||
      date.getMonth() < maxDate.getMonth() ||
      date.getDate() < maxDate.getDate()
    ) {
      return MAX_DATE;
    }
    return maxDate;
  }

  public render() {
    const {locale, title, value, defaultValue, prefixCls, pickerPrefixCls, clientHeight} = this.$props;
    const date = value || defaultValue || undefined;
    const height = (clientHeight && clientHeight * 3 / 8 - 52) || Number.POSITIVE_INFINITY;

    return (
      <div class={'time-picker'}>
        <div class={'title'}>{title}</div>
        {
          // @ts-ignore
          <DateTimePicker
            prefixCls={prefixCls}
            pickerPrefixCls={pickerPrefixCls}
            style={{
              height: height > 164 || height < 0 ? 164 : height,
              overflow: 'hidden'
            }}
            mode={'time'}
            date={date}
            locale={locale}
            minDate={this.getMinTime(date)}
            maxDate={this.getMaxTime(date)}
            onChange={this.onDateChange}
            use12Hours
          />
        }
      </div>
    );
  }
}
