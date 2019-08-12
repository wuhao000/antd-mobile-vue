import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let PickerItem = class PickerItem extends Vue {
};
tslib_1.__decorate([
    Prop()
], PickerItem.prototype, "value", void 0);
tslib_1.__decorate([
    Prop()
], PickerItem.prototype, "label", void 0);
PickerItem = tslib_1.__decorate([
    Component({
        name: 'PickerItem'
    })
], PickerItem);
export default function PickerMixin(ComposedComponent) {
    let PickerMixin = class PickerMixin extends Vue {
        select(value, itemHeight, scrollTo) {
            const children = this.$slots.default;
            if (children) {
                for (let i = 0, len = children.length; i < len; i++) {
                    if (children[i].componentOptions.propsData.value === value) {
                        this.selectByIndex(i, itemHeight, scrollTo);
                        return;
                    }
                }
                this.selectByIndex(0, itemHeight, scrollTo);
            }
        }
        selectByIndex(index, itemHeight, zscrollTo) {
            if (index < 0 || index >= this.$slots.default.length || !itemHeight) {
                return;
            }
            zscrollTo(index * itemHeight);
        }
        computeChildIndex(top, itemHeight, childrenLength) {
            const index = Math.round(top / itemHeight);
            return Math.min(index, childrenLength - 1);
        }
        doScrollingComplete(top, itemHeight, fireValueChange) {
            const children = this.$slots.default;
            const index = this.computeChildIndex(top, itemHeight, children.length);
            const child = children[index];
            if (child) {
                fireValueChange(child.componentOptions.propsData.value);
            }
            else if (console.warn) {
                console.warn('child not found', children, index);
            }
        }
        render() {
            return (<ComposedComponent attrs={Object.assign({}, this.$props, { doScrollingComplete: this.doScrollingComplete, computeChildIndex: this.computeChildIndex, select: this.select })} on={this.$listeners}>{this.$slots.default}</ComposedComponent>);
        }
    };
    PickerMixin.Item = PickerItem;
    tslib_1.__decorate([
        Prop({ type: Boolean, default: false })
    ], PickerMixin.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Prop()
    ], PickerMixin.prototype, "selectedValue", void 0);
    tslib_1.__decorate([
        Prop()
    ], PickerMixin.prototype, "itemStyle", void 0);
    tslib_1.__decorate([
        Prop()
    ], PickerMixin.prototype, "prefixCls", void 0);
    tslib_1.__decorate([
        Prop()
    ], PickerMixin.prototype, "indicatorStyle", void 0);
    tslib_1.__decorate([
        Prop()
    ], PickerMixin.prototype, "indicatorClassName", void 0);
    tslib_1.__decorate([
        Prop()
    ], PickerMixin.prototype, "defaultSelectedValue", void 0);
    tslib_1.__decorate([
        Prop()
    ], PickerMixin.prototype, "noAnimate", void 0);
    PickerMixin = tslib_1.__decorate([
        Component({
            name: 'PickerMixin'
        })
    ], PickerMixin);
    return PickerMixin;
}
//# sourceMappingURL=picker-mixin.jsx.map