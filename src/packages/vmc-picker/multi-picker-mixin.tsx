import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

export default function MultiPickerMixin(ComposedComponent) {
  @Component({
    name: 'MultiPickerMixin'
  })
  class MultiPickerMixin extends Vue {
    @Prop()
    public prefixCls?: string;
    @Prop()
    public selectedValue: any;

    public getValue() {
      const {selectedValue} = this;
      if (selectedValue && selectedValue.length) {
        return selectedValue;
      } else {
        if (!this.$slots.default) {
          return [];
        }
        return this.$slots.default.map((c: any) => {
          const cc: any = c.$children;
          return cc && cc[0] && cc[0].props.value;
        });
      }
    }

    public onChange(i, v, cb) {
      const value = this.getValue().concat();
      value[i] = v;
      if (cb) {
        cb(value, i);
      }
    }

    public onValueChange(i, v) {
      this.onChange(i, v, (...args) => {
        this.$emit('input', ...args);
      });
      this.$emit('value-change', i, v);
    }

    public onScrollChange(i, v) {
      this.onChange(i, v, (...args) => {
        this.$emit('scroll-change', ...args);
      });
    }

    public render() {
      return (
        <ComposedComponent
          attrs={
            {
              ...this.$props,
              getValue: this.getValue
            }
          }
          on={
            {
              input: this.onValueChange,
              scrollChange: this.onScrollChange
            }
          }
        >{this.$slots.default}</ComposedComponent>
      );
    }
  }

  return MultiPickerMixin;
}
