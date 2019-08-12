import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
let Input = class Input extends Vue {
    constructor() {
        super(...arguments);
        this.currentValue = this.value || '';
    }
    valueChanged(value) {
        this.currentValue = value;
    }
    get inputRef() {
        return this.$refs['input'];
    }
    onInputBlur(e) {
        const value = e.target.value;
        this.$emit('blur', value);
    }
    onInputFocus(e) {
        this.$emit('focus');
    }
    focus() {
        if (this.inputRef) {
            this.inputRef.focus();
        }
    }
    render() {
        const value = this.currentValue + '';
        const type = this.type === 'number' ? 'text' : this.type;
        return <input value={value} ref={'input'} type={type} disabled={this.disabled} readonly={this.readonly} placeholder={this.placeholder} onblur={(e) => {
            this.onInputBlur(e);
        }} style={{ textAlign: this.textAlign }} {...this.$props} {...this.$attrs} oninput={e => {
            this.$emit('change', e);
        }}/>;
    }
};
tslib_1.__decorate([
    Prop({ type: [String, Number] })
], Input.prototype, "value", void 0);
tslib_1.__decorate([
    Prop(Boolean)
], Input.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop(String)
], Input.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Prop(Boolean)
], Input.prototype, "readonly", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Input.prototype, "type", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'left' })
], Input.prototype, "textAlign", void 0);
tslib_1.__decorate([
    Watch('value')
], Input.prototype, "valueChanged", null);
Input = tslib_1.__decorate([
    Component({
        name: 'Input'
    })
], Input);
export default Input;
//# sourceMappingURL=input.jsx.map