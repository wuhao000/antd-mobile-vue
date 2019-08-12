import * as tslib_1 from "tslib";
import { MultiPickerProps } from '../vmc-picker/multi-picker-props';
import classnames from 'classnames';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { setListeners, setProps } from '../utils/vnode';
import MultiPickerMixin from './multi-picker-mixin';
let MultiPicker = class MultiPicker extends MultiPickerProps {
    render() {
        const { prefixCls } = this.$props;
        const selectedValue = this.getValue();
        const colElements = this.$slots.default.map((col, i) => {
            setProps(col, {
                selectedValue: selectedValue[i]
            });
            setListeners(col, {
                input: (...args) => {
                    this.$emit('input', i, ...args);
                },
                scrollChange: (...args) => {
                    this.$emit('scroll-change', i, ...args);
                }
            });
            return col;
        });
        return (<div class={classnames(prefixCls)}>
        {colElements}
      </div>);
    }
};
tslib_1.__decorate([
    Prop()
], MultiPicker.prototype, "getValue", void 0);
MultiPicker = tslib_1.__decorate([
    Component({ name: 'MultiPicker' })
], MultiPicker);
export default MultiPickerMixin(MultiPicker);
//# sourceMappingURL=multi-picker.jsx.map