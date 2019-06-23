import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';
import PopupPicker from '../vmc-picker/popup';

@Component({
  name: 'PopupCascader'
})
export default class PopupCascader extends Vue {
  @Prop({type: Object})
  public cascader: VNode;
  @Inject({from: 'store', default: undefined})
  public store: {
    onDismiss: () => void;
    onOk: (...args: any) => any
  };

  private onDismiss(): any {
    if (this.store.onDismiss) {
      this.store.onDismiss();
    }
    this.$emit('dismiss');
  }

  public onChange(v) {
    this.$emit('change', v);
  }

  public onOk(v) {
    if (this.store.onOk) {
      this.store.onOk(v);
    }
    this.$emit('change', v);
    this.$emit('ok');
  }

  public render() {
    // @ts-ignore
    return (<PopupPicker
        attrs={
          {
            picker: this.cascader,
            ...this.$props,
            ...this.$attrs
          }
        }
        onDismiss={this.onDismiss}
        onChange={this.onChange}
        onOk={this.onOk}
    >{<template slot={'picker'}>{this.cascader}</template>}{this.$slots.default}</PopupPicker>);
  }
}
