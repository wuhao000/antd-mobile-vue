import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import BaseFormComponent from '../../../mixins/base-input-component';
import locale from '../locale/zh_CN';

const DatePicker = window.antd.DatePicker;
@Component({
  name: 'DRangePicker'
})
export default class DRangePicker extends BaseFormComponent {
  @Prop({type: Object, default: () => locale})
  public locale: object;
  @Prop({type: String, default: 'zh'})
  public localeCode: string;
  @Prop({type: Boolean, default: false})
  public clearable: boolean;
  @Prop({type: Boolean, default: undefined})
  public showTime: boolean;
  public static install: (Vue) => void;

  public convertValue(value: Array<Date | number>): any {
    if (!value) {
      return undefined;
    }
    return value.map(it => moment(it));
  }

  public convertValueBack(value: any): any {
    if (value) {
      return value.map(it => it.toDate());
    } else {
      return value;
    }
  }

  public getInputComponent(): {} {
    return DatePicker.RangePicker;
  }

  public getProps() {
    return {
      allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable
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
