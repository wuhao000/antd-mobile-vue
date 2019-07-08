import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Icon from '../../icon';
import {getComponentLocale} from '../../utils/getLocale';
import {CalendarView as VMCalendar} from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';

@Component({
  name: 'Calendar'
})
class Calendar extends CalendarProps {

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

  public render() {
    const locale = getComponentLocale(this.$props, {}, 'Calendar', () =>
      require('./locale/zh_CN')
    );
    const Header = VMCalendar.DefaultHeader;
    return (
      // @ts-ignore
      <VMCalendar
        class={this.prefixCls + '-view'}
        locale={locale}
        renderHeader={headerProps => (
          <Header {...headerProps} closeIcon={<Icon type={'cross'}/>}/>
        )}
        onSelectHasDisableDate={(...args) => {
          this.$emit('select-has-disable-date', ...args);
        }}
        attrs={
          {
            ...this.$props,
            type: 'one',
            displayMode: true
          }
        }
        visible={this.state.visible}
      />
    );
  }
}

export default Calendar as any;
