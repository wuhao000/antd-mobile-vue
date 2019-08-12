import * as tslib_1 from "tslib";
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
        return (<PopupPicker attrs={Object.assign({ picker: this.datePicker, value: this.date }, this.$props, this.$attrs)} onDismiss={this.onDismiss} onOk={this.onOk}>{this.$slots.default}</PopupPicker>);
    }
};
tslib_1.__decorate([
    Prop()
], PopupDatePicker.prototype, "datePicker", void 0);
tslib_1.__decorate([
    Prop()
], PopupDatePicker.prototype, "date", void 0);
tslib_1.__decorate([
    Inject({ from: 'store', default: undefined })
], PopupDatePicker.prototype, "store", void 0);
PopupDatePicker = tslib_1.__decorate([
    Component({
        name: 'PopupDatePicker'
    })
], PopupDatePicker);
export default PopupDatePicker;
//# sourceMappingURL=popup.jsx.map