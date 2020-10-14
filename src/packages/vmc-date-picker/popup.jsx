import { __decorate } from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import PopupPicker from '../vmc-picker/popup';
let PopupDatePicker = class PopupDatePicker extends Vue {
    onDismiss() {
        if (this.store.onDismiss) {
            this.store.onDismiss();
        }
        this.$emit('dismiss');
    }
    onOk(v) {
        if (this.store.onOk) {
            this.store.onOk();
        }
        this.$emit('change', v);
        this.$emit('ok', v);
    }
    render() {
        // @ts-ignore
        return (<PopupPicker {...Object.assign(Object.assign({ picker: this.datePicker, value: this.date }, this.$props), this.$attrs)} disabled={this.disabled || !this.editable} onDismiss={this.onDismiss} onOk={this.onOk}>{this.$slots.default}</PopupPicker>);
    }
};
__decorate([
    Prop()
], PopupDatePicker.prototype, "datePicker", void 0);
__decorate([
    Prop()
], PopupDatePicker.prototype, "date", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], PopupDatePicker.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], PopupDatePicker.prototype, "editable", void 0);
__decorate([
    Inject({ from: 'store', default: undefined })
], PopupDatePicker.prototype, "store", void 0);
PopupDatePicker = __decorate([
    Component({
        name: 'PopupDatePicker'
    })
], PopupDatePicker);
export default PopupDatePicker;
//# sourceMappingURL=popup.jsx.map