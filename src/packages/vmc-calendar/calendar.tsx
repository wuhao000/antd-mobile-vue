import CalendarBase from './calendar-base';
import Component from 'vue-class-component';
import {Watch} from 'vue-property-decorator';
import Popup from '../popup';

@Component({
  name: 'Calendar'
})
class Calendar extends CalendarBase {

  @Watch('visible')
  public visibleChanged(visible: boolean) {
    this.state.visible = visible;
    const defaultValue = this.defaultValue;
    if (visible && defaultValue) {
      this.shortcutSelect(defaultValue[0], defaultValue[1]);
    }
  }

  public render() {
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;
    return (
        <Popup
            onClose={this.onClose}
            attrs={{
              height: `${height}px`,
              width: `${height}px`,
              value: this.state.visible,
              placement: this.enterDirection === 'vertical' ? 'bottom' : 'right'
            }}>
          {this.renderCalendar()}
        </Popup>
    );
  }
}

export default Calendar as any;
