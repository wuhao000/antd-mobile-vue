import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import BaseInputComponent from '../../../mixins/base-input-component';
import List from '../../list';
import DatePicker from './index';

@Component({
  name: 'DatePickerItem'
})
export default class DatePickerItem extends BaseInputComponent {

  @Prop({type: String})
  public title: string;

  public render() {

    return <DatePicker attrs={this.$attrs}
                       value={this.stateValue}
                       scopedSlots={this.$scopedSlots}
                       slots={this.slots}
                       on={this.listeners}
                       style={this.cssStyle}>
      <List.Item title={this.title}
                 arrow="horizontal"/>
    </DatePicker>;
  }
}
