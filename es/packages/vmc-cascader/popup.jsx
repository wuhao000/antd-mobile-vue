import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import PopupPicker from '../vmc-picker/popup';
let PopupCascader = class PopupCascader extends Vue {
    onDismiss() {
        if (this.store.onDismiss) {
            this.store.onDismiss();
        }
        this.$emit('dismiss');
    }
    onChange(v) {
        this.$emit('change', v);
    }
    onOk(v) {
        if (this.store.onOk) {
            this.store.onOk(v);
        }
        this.$emit('change', v);
        this.$emit('ok');
    }
    render() {
        // @ts-ignore
        return (<PopupPicker attrs={Object.assign({ picker: this.cascader }, this.$props, this.$attrs)} onDismiss={this.onDismiss} onChange={this.onChange} onOk={this.onOk}>{<template slot={'picker'}>{this.cascader}</template>}{this.$slots.default}</PopupPicker>);
    }
};
tslib_1.__decorate([
    Prop({ type: Object })
], PopupCascader.prototype, "cascader", void 0);
tslib_1.__decorate([
    Inject({ from: 'store', default: undefined })
], PopupCascader.prototype, "store", void 0);
PopupCascader = tslib_1.__decorate([
    Component({
        name: 'PopupCascader'
    })
], PopupCascader);
export default PopupCascader;
//# sourceMappingURL=popup.jsx.map