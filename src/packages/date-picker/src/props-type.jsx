import { __decorate } from "tslib";
import { Options, Vue } from 'vue-class-component';
import locale from './locale/zh_CN';
let DatePickerProps = class DatePickerProps extends Vue {
};
__decorate([
    Prop({
        type: Number,
        default: 1
    })
], DatePickerProps.prototype, "minuteStep", void 0);
__decorate([
    Prop({ type: Boolean })
], DatePickerProps.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], DatePickerProps.prototype, "editable", void 0);
__decorate([
    Prop({})
], DatePickerProps.prototype, "format", void 0);
__decorate([
    Prop({ type: String })
], DatePickerProps.prototype, "extra", void 0);
__decorate([
    Prop({})
], DatePickerProps.prototype, "dismissText", void 0);
__decorate([
    Prop({})
], DatePickerProps.prototype, "okText", void 0);
__decorate([
    Prop({})
], DatePickerProps.prototype, "title", void 0);
DatePickerProps = __decorate([
    Options({
        name: 'DatePickerProps',
        props: {
            value: {},
            mode: { default: 'datetime' },
            minDate: {},
            maxDate: {},
            visible: { type: Boolean },
            locale: type, Object, default: () => locale
        }
    })
], DatePickerProps);
export default DatePickerProps;
//# sourceMappingURL=props-type.jsx.map