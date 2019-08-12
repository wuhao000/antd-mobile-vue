import * as tslib_1 from "tslib";
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import DatePickerProps from '../../date-picker/src/props-type';
import { getComponentLocale } from '../../utils/getLocale';
import RCDatePicker from '../../vmc-date-picker/date-picker';
let DatePickerView = class DatePickerView extends DatePickerProps {
    render() {
        const locale = getComponentLocale(this.$props, this, 'DatePickerView', () => require('./locale/zh_CN'));
        // DatePicker use `defaultDate`, maybe because there are PopupDatePicker inside? @yiminghe
        // Here Use `date` instead of `defaultDate`, make it controlled fully.
        return (<RCDatePicker props={Object.assign({}, this.$props, { locale, date: this.value })} onChange={(value) => {
            const date = new Date(value[0], value[1], value[2], value[3], value[4]);
            this.$emit('input', date);
            this.$emit('change', date);
        }} onScrollChange={(e) => {
            this.$emit('scrollChange', e);
            this.$emit('scroll-change', e);
        }}/>);
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-picker'
    })
], DatePickerView.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-picker-col'
    })
], DatePickerView.prototype, "pickerPrefixCls", void 0);
DatePickerView = tslib_1.__decorate([
    Component({
        name: 'DatePickerView'
    })
], DatePickerView);
export default DatePickerView;
//# sourceMappingURL=date-picker-view.jsx.map