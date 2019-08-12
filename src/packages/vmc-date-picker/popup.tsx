import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';
import PopupPicker from '../vmc-picker/popup';

@Component({
  name: 'PopupDatePicker'
})
export default class PopupDatePicker extends Vue {
  @Prop()
  public datePicker: VNode;
  @Prop()
  public date?: any;
  @Inject({from: 'store', default: undefined})
  public store: {
    value: Date,
    onOk: (...args: any) => any,
    onDismiss: (...args: any) => any
  };

  private onDismiss(): any {
    if (this.store.onDismiss) {
      this.store.onDismiss();
    }
    this.$emit('dismiss');
  }

  public onOk(v) {
    if (this.store.onOk) {
      this.store.onOk();
    }
    this.$emit('change', v);
    this.$emit('ok', v);
  }

  public render() {
    // @ts-ignore
    return (<PopupPicker
      attrs={
        {
          picker: this.datePicker,
          value: this.date,
          ...this.$props,
          ...this.$attrs
        }
      }
      onDismiss={this.onDismiss}
      onOk={this.onOk}
    >{this.$slots.default}</PopupPicker>);
  }
}
