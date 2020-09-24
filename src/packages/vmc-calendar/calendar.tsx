import {defineComponent, watch} from 'vue';
import Popup from '../popup';
import {useBaseCalendar} from './calendar-base';
import CalendarProps from './calendar-props';

const Calendar = defineComponent({
  name: 'Calendar',
  props: {
    ...CalendarProps
  },
  setup(props, ctx) {
    const {state, shortcutSelect, onClose, renderCalendar} = useBaseCalendar(props, ctx);
    watch(() => props.visible, () => {
      state.visible = props.visible;
      const defaultValue = props.defaultValue;
      if (props.visible && defaultValue) {
        shortcutSelect(defaultValue[0], defaultValue[1]);
      }
    });
    return {onClose, state, renderCalendar};
  },
  render() {
    const height = document.body.clientHeight;
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
});
export default Calendar as any;
