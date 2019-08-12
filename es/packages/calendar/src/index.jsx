import * as tslib_1 from "tslib";
import PropTypes from 'prop-types';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Icon from '../../icon';
import { getComponentLocale } from '../../utils/getLocale';
import { Calendar as VMCalendar } from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';
let Calendar = class Calendar extends CalendarProps {
    constructor() {
        super(...arguments);
        this.state = {
            visible: this.visible
        };
    }
    visibleChanged(value) {
        this.state.visible = value;
    }
    onConfirm(...args) {
        this.$emit('confirm', ...args);
        this.onClose();
    }
    onClear(e) {
        this.$emit('clear', e);
    }
    onClose(...args) {
        this.state.visible = false;
        this.$emit('close', ...args);
        this.$emit('update:visible', false);
    }
    render() {
        const locale = getComponentLocale(this.$props, {}, 'Calendar', () => require('./locale/zh_CN'));
        const Header = VMCalendar.DefaultHeader;
        return (<VMCalendar locale={locale} renderHeader={headerProps => (<Header {...headerProps} closeIcon={<Icon type={'cross'}/>}/>)} onCancel={(...args) => {
            this.$emit('cancel', ...args);
        }} onClose={this.onClose} onConfirm={this.onConfirm} onClear={this.onClear} onSelectHasDisableDate={(...args) => {
            this.$emit('select-has-disable-date', ...args);
        }} attrs={this.$props} visible={this.state.visible}/>);
    }
};
Calendar.contextTypes = {
    antLocale: PropTypes.object
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
tslib_1.__decorate([
    Watch('visible')
], Calendar.prototype, "visibleChanged", null);
Calendar = tslib_1.__decorate([
    Component({
        name: 'Calendar'
    })
], Calendar);
export default Calendar;
//# sourceMappingURL=index.jsx.map