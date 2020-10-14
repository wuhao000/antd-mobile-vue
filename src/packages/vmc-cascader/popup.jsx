import { defineComponent, inject } from 'vue';
import PopupPicker from '../vmc-picker/popup';
export default defineComponent({
    name: 'PopupCascader',
    props: {
        cascader: {
            type: Object
        }
    },
    setup(props, { emit, slots }) {
        const store = inject('store', undefined);
        const onDismiss = () => {
            if (store.onDismiss) {
                store.onDismiss();
            }
            emit('dismiss');
        };
        const onChange = (v) => {
            emit('change', v);
        };
        const onOk = (v) => {
            if (store.onOk) {
                store.onOk(v);
            }
            emit('change', v);
            emit('ok');
        };
        return {
            onDismiss, onOk, onChange
        };
    },
    render() {
        // @ts-ignore
        return (<PopupPicker {...Object.assign(Object.assign({ picker: this.cascader }, this.$props), this.$attrs)} onDismiss={this.onDismiss} onChange={this.onChange} onOk={this.onOk}>{<template slot={'picker'}>{this.cascader}</template>}{this.$slots.default}</PopupPicker>);
    }
});
//# sourceMappingURL=popup.jsx.map