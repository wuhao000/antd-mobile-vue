import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
export default function MultiPickerMixin(ComposedComponent) {
    let MultiPickerMixin = class MultiPickerMixin extends Vue {
        getValue() {
            const { selectedValue } = this;
            if (selectedValue && selectedValue.length) {
                return selectedValue;
            }
            else {
                if (!this.$slots.default) {
                    return [];
                }
                return this.$slots.default.map((c) => {
                    const cc = c.$children;
                    return cc && cc[0] && cc[0].props.value;
                });
            }
        }
        onChange(i, v, cb) {
            const value = this.getValue().concat();
            value[i] = v;
            if (cb) {
                cb(value, i);
            }
        }
        onValueChange(i, v) {
            this.onChange(i, v, (...args) => {
                this.$emit('input', ...args);
            });
            this.$emit('value-change', i, v);
        }
        onScrollChange(i, v) {
            this.onChange(i, v, (...args) => {
                this.$emit('scroll-change', ...args);
            });
        }
        render() {
            return (<ComposedComponent attrs={Object.assign({}, this.$props, { getValue: this.getValue })} on={{
                input: this.onValueChange,
                scrollChange: this.onScrollChange
            }}>{this.$slots.default}</ComposedComponent>);
        }
    };
    tslib_1.__decorate([
        Prop()
    ], MultiPickerMixin.prototype, "prefixCls", void 0);
    tslib_1.__decorate([
        Prop()
    ], MultiPickerMixin.prototype, "selectedValue", void 0);
    MultiPickerMixin = tslib_1.__decorate([
        Component({
            name: 'MultiPickerMixin'
        })
    ], MultiPickerMixin);
    return MultiPickerMixin;
}
//# sourceMappingURL=multi-picker-mixin.jsx.map