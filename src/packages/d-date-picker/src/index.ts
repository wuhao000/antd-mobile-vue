import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import locale from '../locale/zh_CN';
import BaseFormComponent from '../../../mixins/base-input-component';
import RangePicker from './range-picker';

const DatePicker = window.antd.DatePicker;
@Component({
  name: 'DDatePicker'
})
export default class DDatePicker extends BaseFormComponent {
  public static RangePicker = RangePicker;
  @Prop({type: Object, default: () => locale})
  public locale: object;
  @Prop({type: String, default: 'zh'})
  public localeCode: string;
  @Prop({type: Boolean, default: false})
  public clearable: boolean;
  @Prop({type: Boolean, default: undefined})
  public showTime: boolean;
  @Prop({type: String, default: 'date'})
  public mode: 'datetime' | 'date' | 'month' | 'week';
  public static install: (Vue) => void;

  get shouldShowTime() {
    return this.mode === 'datetime';
  }

  get format() {
    switch (this.mode) {
      case 'date':
        return 'YYYY-MM-DD';
      case 'datetime':
        return 'YYYY-MM-DD HH:mm:ss';
    }
  }

  public convertValue(value: any): any {
    if (!value) {
      return undefined;
    }
    if (typeof value === 'string') {
      return moment(value, this.format);
    } else if (typeof value === 'number') {
      return moment(value);
    } else {
      return moment(value);
    }
  }

  public convertValueBack(value: any): any {
    if (value) {
      return value.toDate();
    } else {
      return value;
    }
  }

  public getInputComponent(): {} {
    if (this.mode === 'date' || this.mode === 'datetime') {
      return DatePicker;
    } else if (this.mode === 'month') {
      return DatePicker.MonthPicker;
    } else if (this.mode === 'week') {
      return DatePicker.WeekPicker;
    }
  }

  public getProps() {
    return {
      showTime: this.mode === 'datetime',
      allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable,
      format: this.format
    };
  }


  @Watch('value')
  public valueChanged(value: any) {
    const convertValue = this.convertValue(value);
    if (this['stateValue'] === null || this['stateValue'] === undefined) {
      this['stateValue'] = convertValue;
    } else if (!convertValue) {
      this['stateValue'] = undefined;
    } else {
      if (this['stateValue'].toString() !== convertValue.toString()) {
        this['stateValue'] = convertValue;
      }
    }
  }

}
