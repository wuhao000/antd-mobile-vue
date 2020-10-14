import { __decorate } from "tslib";
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseInputComponent from '../../mixins/base-input-component';
import List from '../../list';
import DatePicker from './index';
let DatePickerItem = class DatePickerItem extends BaseInputComponent {
    render() {
        return <DatePicker {...this.$attrs} disabled={this.isDisabled} editable={!this.isReadonly} value={this.stateValue} scopedSlots={this.$scopedSlots} slots={this.slots} on={this.listeners} style={this.cssStyle}>
      <List.Item title={this.title} required={this.required} disabled={this.isDisabled} error={this.error} errorDisplayType={this.errorDisplayType} errorMessage={this.errorMessage} arrow="horizontal"/>
    </DatePicker>;
    }
};
__decorate([
    Prop({ type: [String, Object] })
], DatePickerItem.prototype, "title", void 0);
DatePickerItem = __decorate([
    Component({
        name: 'DatePickerItem'
    })
], DatePickerItem);
export default DatePickerItem;
//# sourceMappingURL=item.jsx.map