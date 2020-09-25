import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';
import {setListeners, setProps} from '../utils/vnode';

import MultiPickerMixin from './multi-picker-mixin';
import MultiPickerProps from './multi-picker-props';

const MultiPicker = defineComponent({
  name: 'MultiPicker',
  props: {
    ...MultiPickerProps,
    getValue: {
      type: Function as PropType<() => any>
    }
  },
  render() {
    const {
      prefixCls
    } = this;
    const selectedValue = this.getValue();
    const colElements = this.$slots.default().map((col: any, i) => {
      setProps(col, {
        selectedValue: selectedValue[i]
      });
      setListeners(col, {
        input: (...args) => {
          this.$emit('update:value', i, ...args);
        },
        scrollChange: (...args) => {
          this.$emit('scroll-change', i, ...args);
        }
      });
      return col;
    });
    return (
      <div class={classnames(prefixCls)}>
        {colElements}
      </div>
    );
  }
});

export default MultiPickerMixin(MultiPicker) as any;
