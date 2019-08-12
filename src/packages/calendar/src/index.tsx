import PropTypes from 'prop-types';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import Icon from '../../icon';
import {getComponentLocale} from '../../utils/getLocale';
import {Calendar as VMCalendar} from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';

@Component({
  name: 'Calendar'
})
class Calendar extends CalendarProps {

  public static contextTypes = {
    antLocale: PropTypes.object
  };
  public static install: (Vue) => void;

  @Prop({type: String, default: 'am-calendar'})
  public prefixCls: string;
  @Prop({type: String, default: 'am-picker'})
  public timePickerPrefixCls: string;
  @Prop({type: String, default: 'am-picker-col'})
  public timePickerPickerPrefixCls: string;

  public state = {
    visible: this.visible
  };
  public static Item: any;

  @Watch('visible')
  public visibleChanged(value: boolean) {
    this.state.visible = value;
  }

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


  public render() {
    const locale = getComponentLocale(this.$props, {}, 'Calendar', () =>
      require('./locale/zh_CN')
    );
    const Header = VMCalendar.DefaultHeader;
    return (
      <VMCalendar
        locale={locale}
        renderHeader={headerProps => (
          <Header {...headerProps} closeIcon={<Icon type={'cross'}/>}/>
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
