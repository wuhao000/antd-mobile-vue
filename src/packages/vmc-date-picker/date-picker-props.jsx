import defaultLocale from './locale/zh_CN';
const DATE = 'date';
export default {
    date: { type: Date },
    defaultDate: {
        type: Date,
        default: () => new Date()
    },
    minDate: {},
    maxDate: {},
    minHour: {
        type: Number
    },
    maxHour: {
        type: Number
    },
    minMinute: {
        type: Number
    },
    maxMinute: {
        type: Number
    },
    mode: {
        type: String,
        default: DATE
    },
    disabled: {
        type: Boolean,
        default: false
    },
    locale: {
        default: defaultLocale
    },
    minuteStep: {
        type: Number,
        default: 1
    },
    formatMonth: { type: Function },
    formatDay: { type: Function },
    itemStyle: { type: Function },
    prefixCls: {
        type: String,
        default: 'rmc-date-picker'
    },
    rootNativeProps: {},
    pickerPrefixCls: {
        type: String,
        default: 'rmc-picker'
    },
    use12Hours: {
        type: Boolean,
        default: false
    }
};
//# sourceMappingURL=date-picker-props.jsx.map