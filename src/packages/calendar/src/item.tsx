import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import BaseInputComponent from '../../../mixins/base-input-component';
import List from '../../list';
import Calendar from './index';

const MIN_DATE = new Date(2000, 1, 1, 0, 0, 0);
const MAX_DATE = new Date(new Date().getFullYear() + 10, 12, 31, 23, 59, 59);
@Component({
  name: 'MCalendarItem'
})
export default class MCalendarItem extends BaseInputComponent {

  /**
   * 标题
   */
  @Prop({type: String})
  public title: string;
  /**
   * 默认值
   */
  @Prop({type: Date, default: () => new Date()})
  public defaultDate: Date;
  @Prop({type: Date, default: () => MIN_DATE})
  public minDate: Date;
  @Prop({type: Date, default: () => MAX_DATE})
  public maxDate: Date;
  @Prop({type: Boolean, default: false})
  public pickTime: boolean;
  @Prop({type: String, default: 'range'})
  public type: 'one' | 'range';
  @Prop({type: String})
  public placeholder: string;
  public currentValue: Date[] = [];
  public displayValue: string;

  public visible: boolean = false;

  public getInputComponent(): {} {
    return Calendar;
  }

  @Watch('value', {immediate: true})
  public valueChanged(value: any) {
    if (this.type === 'one') {
      this.currentValue = [value];
    } else if (value) {
      this.currentValue = value;
    }
  }

  @Watch('currentValue', {immediate: true})
  public currentValueChanged() {
    if (this.currentValue.length) {
      this.displayValue = this.getDisplayValue();
    } else {
      this.displayValue = '';
    }
  }

  public onClick() {
    this.visible = true;
  }

  public onConfirm(value1, value2) {
    if (this.type === 'range') {
      this.currentValue = [value1, value2];
      this.$emit('input', [value1, value2]);
    } else {
      this.currentValue = [value1];
      this.$emit('input', value1);
    }
  }


  public getDisplayValue() {
    const valueStrs = this.currentValue.map(it => {
      if (this.pickTime) {
        return moment(it).format('YYYY/MM/DD HH:mm');
      } else {
        return moment(it).format('YYYY/MM/DD');
      }
    });
    if (this.type === 'range') {
      return valueStrs[0] + ' ~ ' + (valueStrs[1] || '');
    } else {
      return valueStrs[0];
    }
  }

  public onClose() {
    this.visible = false;
  }

  public render() {
    return <List.Item text={!!this.displayValue}
                      title={this.title}
                      onClick={this.onClick}>
      <Calendar
          attrs={this.props}
          value={this.stateValue}
          scopedSlots={this.$scopedSlots}
          visible={this.visible}
          onClose={this.onClose}
          onConfirm={this.onConfirm}
          defaultValue={this.currentValue}
          slots={this.slots}
          on={this.listeners}
          style={this.cssStyle}>
        {this.getDefaultSlot()}
      </Calendar>
      <span>{this.title}</span>
      <span slot="extra">{this.displayValue || this.placeholder}</span>
    </List.Item>;
  }

}
