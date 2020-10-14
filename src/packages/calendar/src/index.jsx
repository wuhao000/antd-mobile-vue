import { defineComponent, reactive, watch } from 'vue';
import Icon from '../../icon';
import { getComponentLocale } from '../../utils/getLocale';
import { Calendar as VMCalendar } from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';
export default defineComponent({
    install: null,
    Item: null,
    name: 'Calendar',
    props: Object.assign(Object.assign({}, CalendarProps), { prefixCls: { type: String, default: 'am-calendar' }, timePickerPrefixCls: { type: String, default: 'am-picker' }, timePickerPickerPrefixCls: { type: String, default: 'am-picker-col' } }),
    setup(props, { emit }) {
        const state = reactive({
            visible: props.visible,
            value: props.value
        });
        watch(() => props.visible, (value) => {
            state.visible = value;
        });
        const onConfirm = (...args) => {
            emit('confirm', ...args);
            emit('update:value', state.value);
            onClose();
        };
        const onClear = (e) => {
            emit('clear', e);
        };
        const onClose = (...args) => {
            state.visible = false;
            state.value = props.value;
            emit('close', ...args);
            emit('update:visible', false);
        };
        return { onClose, onConfirm, onClear, state };
    },
    render() {
        const locale = getComponentLocale(this.$props, {}, 'Calendar', () => require('./locale/zh_CN'));
        const Header = VMCalendar.DefaultHeader;
        return (<VMCalendar {...this.$props} v-model={[this.state.value, 'value']} locale={locale} renderHeader={headerProps => (<Header {...headerProps} closeIcon={<Icon type="cross"/>}/>)} onCancel={(...args) => {
            this.$emit('cancel', ...args);
        }} onClose={this.onClose} onConfirm={this.onConfirm} onClear={this.onClear} onSelectHasDisableDate={(...args) => {
            this.$emit('select-has-disable-date', ...args);
        }} visible={this.state.visible}/>);
    }
});
//# sourceMappingURL=index.jsx.map