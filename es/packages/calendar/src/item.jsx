import * as tslib_1 from "tslib";
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import BaseInputComponent from '../../../mixins/base-input-component';
import List from '../../list';
import Calendar from './index';
const MIN_DATE = new Date(2000, 1, 1, 0, 0, 0);
const MAX_DATE = new Date(new Date().getFullYear() + 10, 12, 31, 23, 59, 59);
let MCalendarItem = class MCalendarItem extends BaseInputComponent {
    constructor() {
        super(...arguments);
        this.currentValue = [];
        this.visible = false;
    }
    getInputComponent() {
        return Calendar;
    }
    valueChanged(value) {
        if (this.type === 'one') {
            this.currentValue = [value];
        }
        else if (value) {
            this.currentValue = value;
        }
    }
    currentValueChanged() {
        if (this.currentValue.length) {
            this.displayValue = this.getDisplayValue();
        }
        else {
            this.displayValue = '';
        }
    }
    onClick() {
        this.visible = true;
    }
    onConfirm(value1, value2) {
        if (this.type === 'range') {
            this.currentValue = [value1, value2];
            this.$emit('input', [value1, value2]);
        }
        else {
            this.currentValue = [value1];
            this.$emit('input', value1);
        }
    }
    getDisplayValue() {
        const valueStrs = this.currentValue.map(it => {
            if (this.pickTime) {
                return moment(it).format('YYYY/MM/DD HH:mm');
            }
            else {
                return moment(it).format('YYYY/MM/DD');
            }
        });
        if (this.type === 'range') {
            return valueStrs[0] + ' ~ ' + (valueStrs[1] || '');
        }
        else {
            return valueStrs[0];
        }
    }
    onClose() {
        this.visible = false;
    }
    render() {
        // @ts-ignore
        return <List.Item text={this.text} title={this.title} onClick={this.onClick}>
      {
        // @ts-ignore
        <Calendar attrs={this.props} value={this.stateValue} scopedSlots={this.$scopedSlots} visible={this.visible} onClose={this.onClose} onConfirm={this.onConfirm} defaultValue={this.currentValue} slots={this.slots} on={this.listeners} style={this.cssStyle}>
          {this.getDefaultSlot()}
        </Calendar>}
      <span>{this.title}</span>
      <span slot={'extra'}>{this.displayValue || this.placeholder}</span>
    </List.Item>;
    }
};
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], MCalendarItem.prototype, "text", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], MCalendarItem.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: Date, default: () => new Date() })
], MCalendarItem.prototype, "defaultDate", void 0);
tslib_1.__decorate([
    Prop({ type: Date, default: () => MIN_DATE })
], MCalendarItem.prototype, "minDate", void 0);
tslib_1.__decorate([
    Prop({ type: Date, default: () => MAX_DATE })
], MCalendarItem.prototype, "maxDate", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], MCalendarItem.prototype, "pickTime", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'range' })
], MCalendarItem.prototype, "type", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], MCalendarItem.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Watch('value', { immediate: true })
], MCalendarItem.prototype, "valueChanged", null);
tslib_1.__decorate([
    Watch('currentValue', { immediate: true })
], MCalendarItem.prototype, "currentValueChanged", null);
MCalendarItem = tslib_1.__decorate([
    Component({
        name: 'MCalendarItem'
    })
], MCalendarItem);
export default MCalendarItem;
//# sourceMappingURL=item.jsx.map