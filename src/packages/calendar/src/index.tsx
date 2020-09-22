import {Options} from 'vue-class-component';
import Icon from '../../icon';
import {getComponentLocale} from '../../utils/getLocale';
import {Calendar as VMCalendar} from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';

@Options({
  name: 'Calendar',
  props: {
    prefixCls: {type: String, default: 'am-calendar'},
    timePickerPrefixCls: {type: String, default: 'am-picker'},
    timePickerPickerPrefixCls: {type: String, default: 'am-picker-col'}
  },
  watch: {
    visible(value) {
      this.state.visible = value;
    }
  }
})
class Calendar extends CalendarProps {
  public static install: (Vue) => void;
  public prefixCls: string;
  public timePickerPrefixCls: string;
  public timePickerPickerPrefixCls: string;
  public state = {
    visible: this.visible
  };
  public static Item: any;

  public onConfirm(...args) {
    this.$emit('confirm', ...args);
    this.onClose();
  }

  public onClear(e) {
    this.$emit('clear', e);
  }

  public onClose(...args) {
    this.state.visible = false;
    this.$emit('close', ...args);
    this.$emit('update:visible', false);
  }

  public render(): any {
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
        attrs={
          this.$props
        }
        visible={this.state.visible}
      />
    );
  }
}

export default Calendar as any;
