import * as tslib_1 from "tslib";
import CalendarBase from '@/packages/vmc-calendar/calendar-base';
import Component from 'vue-class-component';
let CalendarView = class CalendarView extends CalendarBase {
    render() {
        return this.renderCalendar();
    }
};
CalendarView = tslib_1.__decorate([
    Component({
        name: 'CalendarView'
    })
], CalendarView);
export default CalendarView;
//# sourceMappingURL=calendar-view.jsx.map