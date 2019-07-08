import CalendarBase from '@/packages/vmc-calendar/calendar-base';
import Component from 'vue-class-component';
import {Watch} from 'vue-property-decorator';
import Popup from '../popup';

@Component({
  name: 'Calendar'
})
export default class Calendar extends CalendarBase {

  @Watch('visible')
  public visibleChanged(visible: boolean) {
    this.state.visible = visible;
    if (visible && this.defaultValue) {
      this.shortcutSelect(this.defaultValue[0], this.defaultValue[1]);
    }
  }

  public render() {
    const height = document.body.clientHeight;
    return (
      // @ts-ignore
      <Popup
        onClose={this.onClose}
        attrs={{
          height: height + 'px',
          value: this.state.visible
        }}>
        {this.renderCalendar()}
      </Popup>
    );
  }
}
