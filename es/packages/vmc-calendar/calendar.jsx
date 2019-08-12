import * as tslib_1 from "tslib";
import CalendarBase from './calendar-base';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Popup from '../popup';
let Calendar = class Calendar extends CalendarBase {
    visibleChanged(visible) {
        this.state.visible = visible;
        const defaultValue = this.defaultValue;
        if (visible && defaultValue) {
            this.shortcutSelect(defaultValue[0], defaultValue[1]);
        }
    }
    render() {
        const height = document.body.clientHeight;
        const width = document.body.clientWidth;
        return (<Popup onClose={this.onClose} attrs={{
            height: `${height}px`,
            width: `${height}px`,
            value: this.state.visible,
            placement: this.enterDirection === 'vertical' ? 'bottom' : 'right'
        }}>
          {this.renderCalendar()}
        </Popup>);
    }
};
tslib_1.__decorate([
    Watch('visible')
], Calendar.prototype, "visibleChanged", null);
Calendar = tslib_1.__decorate([
    Component({
        name: 'Calendar'
    })
], Calendar);
export default Calendar;
//# sourceMappingURL=calendar.jsx.map