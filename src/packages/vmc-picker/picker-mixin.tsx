import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'PickerItem'
})
class PickerItem extends Vue {

  @Prop()
  public value: any;
  @Prop()
  public label: any;

}

export default function PickerMixin(ComposedComponent) {
  @Component({
    name: 'PickerMixin'
  })
  class PickerMixin extends Vue {
    public static Item = PickerItem;
    @Prop({type: Boolean, default: false})
    public disabled ?: boolean;
    @Prop()
    public selectedValue ?: any;
    @Prop()
    public itemStyle ?: any;
    @Prop()
    public prefixCls ?: string;
    @Prop()
    public indicatorStyle ?: any;
    @Prop()
    public indicatorClassName ?: string;
    @Prop()
    public defaultSelectedValue ?: any;
    @Prop()
    public noAnimate ?: boolean;

    public select(value, itemHeight, scrollTo) {
      const children: any = this.$slots.default;
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

    public selectByIndex(index, itemHeight, zscrollTo) {
      if (index < 0 || index >= this.$slots.default.length || !itemHeight) {
        return;
      }
      zscrollTo(index * itemHeight);
    }

    public computeChildIndex(top, itemHeight, childrenLength) {
      const index = Math.round(top / itemHeight);
      return Math.min(index, childrenLength - 1);
    }

    public doScrollingComplete(top, itemHeight, fireValueChange) {
      const children = this.$slots.default;
      const index = this.computeChildIndex(top, itemHeight, children.length);
      const child: any = children[index];
      if (child) {
        fireValueChange(child.componentOptions.propsData.value);
      } else if (console.warn) {
        console.warn('child not found', children, index);
      }
    }

    public render() {
      return (
        <ComposedComponent attrs={
          {
            ...this.$props,
            doScrollingComplete: this.doScrollingComplete,
            computeChildIndex: this.computeChildIndex,
            select: this.select
          }
        } on={this.$listeners}>{this.$slots.default}</ComposedComponent>
      );
    }
  }

  return PickerMixin;
}
