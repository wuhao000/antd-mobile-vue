import {defineComponent, reactive, watch} from 'vue';
import Icon from '../../icon';
import {getComponentLocale} from '../../utils/getLocale';
import {Calendar as VMCalendar} from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';

export default defineComponent({
  install: null,
  Item: null,
  name: 'Calendar',
  props: {
    ...CalendarProps,
    prefixCls: {type: String, default: 'am-calendar'},
    timePickerPrefixCls: {type: String, default: 'am-picker'},
    timePickerPickerPrefixCls: {type: String, default: 'am-picker-col'}
  },
  setup(props, {emit}) {
    const state = reactive({
      visible: props.visible
    });
    watch(() => props.visible, (value) => {
      state.visible = value;
    });
    const onConfirm = (...args) => {
      emit('confirm', ...args);
      onClose();
    };
    const onClear = (e) => {
      emit('clear', e);
    };
    const onClose = (...args) => {
      state.visible = false;
      emit('close', ...args);
      emit('update:visible', false);
    };
    return {onClose, onConfirm, onClear, state};
  },
  render() {
    const locale = getComponentLocale(this.$props, {}, 'Calendar', () =>
      require('./locale/zh_CN')
    );
    const Header = VMCalendar.DefaultHeader;
    return (
      <VMCalendar
        locale={locale}
        renderHeader={headerProps => (
          <Header {...headerProps} closeIcon={<Icon type="cross"/>}/>
        )}
        onCancel={(...args) => {
          this.$emit('cancel', ...args);
        }}
        onClose={this.onClose}
        onConfirm={this.onConfirm}
        onClear={this.onClear}
        onSelectHasDisableDate={(...args) => {
          this.$emit('select-has-disable-date', ...args);
        }}
        {
          ...this.$props
        }
        visible={this.state.visible}
      />
    );
  }
});

