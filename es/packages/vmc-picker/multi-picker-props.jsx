import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let MultiPickerProps = class MultiPickerProps extends Vue {
};
tslib_1.__decorate([
    Prop({ type: String })
], MultiPickerProps.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop()
], MultiPickerProps.prototype, "selectedValue", void 0);
MultiPickerProps = tslib_1.__decorate([
    Component({
        name: 'MultiPickerProps'
    })
], MultiPickerProps);
export { MultiPickerProps };
//# sourceMappingURL=multi-picker-props.jsx.map