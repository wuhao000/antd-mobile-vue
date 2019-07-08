import {Models} from './date/data-types';
import zhCN from './locale/zh_CN';

export {default as Calendar} from './calendar';
export {default as CalendarView} from './calendar-view';
export {default as DatePicker} from './date-picker';

const Locale = {zhCN};

type LocaleType = Models.Locale;
export {Locale, LocaleType};
