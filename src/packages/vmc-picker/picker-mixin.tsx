import {defineComponent, PropType} from 'vue';

const PickerItem = defineComponent({
  name: 'PickerItem',
  props: {
    value: {},
    label: {}
  }
});

export default function PickerMixin(ComposedComponent) {
  return defineComponent({
    name: 'PickerMixin',
    props: {
      disabled: {
        type: Boolean as PropType<boolean>,
        default: false
      },
      selectedValue: {},
      itemStyle: {},
      prefixCls: {},
      indicatorStyle: {},
      indicatorClassName: {},
      defaultSelectedValue: {},
      noAnimate: {}
    },
    setup(props, {slots}) {
      const Item = PickerItem;
      const select = (value, itemHeight, scrollTo) => {
        const children: any = slots.default();
        if (children) {
          for (let i = 0, len = children.length; i < len; i++) {
            if (children[i].componentOptions.propsData.value === value) {
              selectByIndex(i, itemHeight, scrollTo);
              return;
            }
          }
          selectByIndex(0, itemHeight, scrollTo);
        }
      };
      const selectByIndex = (index, itemHeight, zscrollTo) => {
        if (index < 0 || index >= slots.default().length || !itemHeight) {
          return;
        }
        zscrollTo(index * itemHeight);
      };
      const computeChildIndex = (top, itemHeight, childrenLength) => {
        const index = Math.round(top / itemHeight);
        return Math.min(index, childrenLength - 1);
      };
      const doScrollingComplete = (top, itemHeight, fireValueChange) => {
        const children = slots.default();
        const index = computeChildIndex(top, itemHeight, children.length);
        const child: any = children[index];
        if (child) {
          fireValueChange(child.componentOptions.propsData.value);
        } else if (console.warn) {
          console.warn('child not found', children, index);
        }
      };

      return {
        doScrollingComplete, computeChildIndex, select
      };
    },
    render() {
      return (
        <ComposedComponent {
                             ...{
                               ...this.$props,
                               doScrollingComplete: this.doScrollingComplete,
                               computeChildIndex: this.computeChildIndex,
                               select: this.select
                             }
                           }>{this.$slots.default()}</ComposedComponent>
      );
    }
  });
}
