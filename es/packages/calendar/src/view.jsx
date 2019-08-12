import * as tslib_1 from "tslib";
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from '../../icon';
import { getComponentLocale } from '../../utils/getLocale';
import { CalendarView as VMCalendar } from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';
const endOfMonth = () => {
    const now = new Date();
    return new Date(new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime() - 24 * 3600 * 1000);
};
const beginOfMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
};
let Calendar = class Calendar extends CalendarProps {
    constructor() {
        super(...arguments);
        this.state = {
            visible: this.visible
        };
    }
    render() {
        const locale = getComponentLocale(this.$props, {}, 'Calendar', () => require('./locale/zh_CN'));
        const Header = VMCalendar.DefaultHeader;
        return (
        // @ts-ignore
        <VMCalendar class={this.prefixCls + '-view'} locale={locale} renderHeader={headerProps => (<Header {...headerProps} closeIcon={<Icon type={'cross'}/>}/>)} onSelectHasDisableDate={(...args) => {
            this.$emit('select-has-disable-date', ...args);
        }} attrs={Object.assign({}, this.$props, { type: 'one', displayMode: true, minDate: this.minDate || beginOfMonth(), maxDate: this.maxDate || endOfMonth() })} visible={this.state.visible}/>);
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: 'am-calendar' })
], Calendar.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-picker' })
], Calendar.prototype, "timePickerPrefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-picker-col' })
], Calendar.prototype, "timePickerPickerPrefixCls", void 0);
Calendar = tslib_1.__decorate([
    Component({
        name: 'Calendar'
    })
], Calendar);
export default Calendar;
//# sourceMappingURL=view.jsx.map