import {defineComponent, reactive} from 'vue';
import Icon from '../../icon';
import {getComponentLocale} from '../../utils/getLocale';
import {CalendarView as VMCalendar} from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';

const endOfMonth = () => {
  const now = new Date();
  return new Date(new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime() - 24 * 3600 * 1000);
};

const beginOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

export default defineComponent({
  props: {
    ...CalendarProps,
    prefixCls: {type: String, default: 'am-calendar'},
    timePickerPrefixCls: {type: String, default: 'am-picker'},
    timePickerPickerPrefixCls: {type: String, default: 'am-picker-col'}
  },
  setup(props) {
    const state = reactive({
      visible: props.visible
    });
    return {
      state
    };
  },
  render() {
    const locale = getComponentLocale(this.$props, {}, 'Calendar', () =>
      require('./locale/zh_CN')
    );
    // @ts-ignore
    const Header = VMCalendar.DefaultHeader;
    return (
      // @ts-ignore
      <VMCalendar
        class={this.prefixCls + '-view'}
        locale={locale}
        renderHeader={headerProps => (
          <Header {...headerProps} closeIcon={<Icon type="cross"/>}/>
        )}
        onSelectHasDisableDate={(...args) => {
          this.$emit('select-has-disable-date', ...args);
        }}
        {
          ...{
            ...this.$props,
            type: 'one',
            displayMode: true,
            minDate: this.minDate || beginOfMonth(),
            maxDate: this.maxDate || endOfMonth()
          }
        }
        visible={this.state.visible}
      />
    );
  }
});
