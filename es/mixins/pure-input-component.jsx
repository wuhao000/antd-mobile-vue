import * as tslib_1 from "tslib";
import Component from 'vue-class-component';
import { mixins } from 'vue-class-component/lib/util';
import { Prop, Watch } from 'vue-property-decorator';
import Emitter from './emitter';
const hasListener = (instance, listener) => {
    const listeners = instance.$listeners || {};
    return Object.keys(listeners).includes(listener);
};
const hasProp = (instance, prop) => {
    const $options = instance.$options || {};
    const propsData = $options.propsData || {};
    return prop in propsData;
};
let PureInputComponent = class PureInputComponent extends mixins(Emitter) {
    constructor() {
        super(...arguments);
        this.stateValue = this.initValue;
    }
    get cssStyle() {
        const style = {};
        if (this.block) {
            style.display = 'block';
        }
        if (this.width) {
            if (typeof this.width === 'number') {
                style.width = this.width + 'px';
            }
            else {
                style.width = this.width;
            }
        }
        return style;
    }
    get initValue() {
        const convertValue = this.convertValue(this.value);
        if (convertValue !== null && convertValue !== undefined) {
            return convertValue;
        }
        else {
            return this.getInitValue();
        }
    }
    get listeners() {
        return Object.assign({}, this.$listeners, {
            input: this.onInput,
            blur: this.handleBlur,
            change: this.handleChange,
            keydown: this.handleKeydown,
            keyup: this.handleKeyup
        }, this.getListeners());
    }
    get slots() {
        return Object.assign({}, this.$slots, this.getSlots());
    }
    getSlots() {
        return {};
    }
    getInitValue() {
        return null;
    }
    get props() {
        return Object.assign({}, this.getSlotProps(), this.$attrs, this.$props, this.getProps(), { visible: this.stateValue });
    }
    stateValueChanged(value) {
        const val = this.convertValueBack(value);
        if (hasProp(this, 'value')) {
            this.$emit('input', val);
        }
        this.$emit('change', val);
        this.dispatch('DFormItem', 'd.form.change', [val]);
    }
    valueChanged(value) {
        if (this.stateValue !== this.convertValue(value)) {
            this.stateValue = this.convertValue(value);
        }
    }
    mounted() {
        this.dispatch('DFormItem', 'd.form-item.setControl', [this]);
    }
    beforeDestroy() {
        this.dispatch('DFormItem', 'd.form-item.setControl', [null]);
    }
    convertValue(value) {
        return value;
    }
    convertValueBack(value) {
        return value;
    }
    getInputComponent() {
        return {};
    }
    getListeners() {
        return {};
    }
    getProps() {
        return {};
    }
    getSlotProps() {
        const props = {};
        Object.keys(this.$slots).forEach((slotKey) => {
            if (slotKey !== 'default') {
                props[slotKey] = this.$slots[slotKey];
            }
        });
        return props;
    }
    handleBlur() {
        this.dispatch('DFormItem', 'd.form.blur', [this.stateValue]);
    }
    handleChange(value) {
        if (value !== null && value !== undefined && value.toString() === '[object InputEvent]') {
            return;
        }
        const comp = this.getInputComponent();
        if (comp.model && comp.model.prop === 'value' && comp.model.event === 'change') {
            this.stateValue = value;
        }
    }
    handleKeydown() {
        this.$emit('keydown');
    }
    handleKeyup() {
        this.$emit('keyup');
    }
    onInput(value) {
        let val = value;
        if (value && value.toString() === '[object InputEvent]') {
            val = value.target.value;
        }
        this.$emit('input', val);
        if (!(hasProp(this, 'value') && hasListener(this, 'input'))) {
            this.stateValue = val;
        }
    }
    render() {
        const CustomComponent = this.getInputComponent();
        // @ts-ignore
        return <CustomComponent attrs={this.props} value={this.stateValue} scopedSlots={this.$scopedSlots} slots={this.slots} on={this.listeners} style={this.cssStyle}>
      {this.getDefaultSlot()}
    </CustomComponent>;
    }
    getDefaultSlot() {
        return this.$slots.default;
    }
};
tslib_1.__decorate([
    Prop(Boolean)
], PureInputComponent.prototype, "block", void 0);
tslib_1.__decorate([
    Prop()
], PureInputComponent.prototype, "value", void 0);
tslib_1.__decorate([
    Prop([String, Number])
], PureInputComponent.prototype, "width", void 0);
tslib_1.__decorate([
    Watch('stateValue')
], PureInputComponent.prototype, "stateValueChanged", null);
tslib_1.__decorate([
    Watch('value')
], PureInputComponent.prototype, "valueChanged", null);
PureInputComponent = tslib_1.__decorate([
    Component({
        name: 'PureInputComponent'
    })
], PureInputComponent);
export default PureInputComponent;
//# sourceMappingURL=pure-input-component.jsx.map