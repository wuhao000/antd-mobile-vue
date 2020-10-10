import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import DatePickerProps from '../../date-picker/src/props-type';
import {getComponentLocale} from '../../utils/getLocale';
import RCDatePicker from '../../vmc-date-picker/date-picker';

@Component({
  name: 'DatePickerView'
})

class DatePickerView extends DatePickerProps {
  @Prop({
    type: String,
    default: 'am-picker'
  })
  public prefixCls?: string;
  @Prop({
    type: String,
    default: 'am-picker-col'
  })
  public pickerPrefixCls?: string;
  public static install: (Vue) => void;

  public render() {
    const locale = getComponentLocale(this.$props, this, 'DatePickerView', () =>
        require('./locale/zh_CN')
    );
    // DatePicker use `defaultDate`, maybe because there are PopupDatePicker inside? @yiminghe
    // Here Use `date` instead of `defaultDate`, make it controlled fully.
    return (
        <RCDatePicker
            {
              ...{
                ...this.$props,
                locale,
                date: this.value
              }
            }
            onChange={(value) => {
              const date = new Date(value[0], value[1], value[2], value[3], value[4]);
              this.$emit('update:value', date);
              this.$emit('change', date);
            }}
            onScrollChange={(e) => {
              this.$emit('scrollChange', e);
              this.$emit('scroll-change', e);
            }}
        />
    );
  }
}

export default DatePickerView as any;
