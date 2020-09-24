import {defineComponent, PropType} from 'vue';

export default function MultiPickerMixin(ComposedComponent) {
  const MultiPickerMixin = defineComponent({
    name: 'MultiPickerMixin',
    props: {
      prefixCls: {},
      selectedValue: {type: Array as PropType<any[]>}
    },
    setup(props, {slots, emit}) {
      const getValue = () => {
        const {selectedValue} = props;
        if (selectedValue && selectedValue.length) {
          return selectedValue;
        } else {
          if (!slots.default) {
            return [];
          }
          return slots.default().map((c: any) => {
            const cc: any = c.$children;
            return cc && cc[0] && cc[0].props.value;
          });
        }
      };
      const onChange = (i, v, cb) => {
        const value = getValue().concat();
        value[i] = v;
        if (cb) {
          cb(value, i);
        }
      };
      const onValueChange = (i, v) => {
        onChange(i, v, (...args) => {
          emit('input', ...args);
        });
        emit('value-change', i, v);
      };
      const onScrollChange = (i, v) => {
        onChange(i, v, (...args) => {
          emit('scroll-change', ...args);
        });
      };
      return {getValue, onValueChange, onScrollChange};
    },
    render() {
      return (
        <ComposedComponent
          {
            ...{
              ...this.$props,
              getValue: this.getValue,
              'onUpdate:value': this.onValueChange,
              onScrollChange: this.onScrollChange
            }
          }
        >{this.$slots.default()}</ComposedComponent>
      );
    }
  });

  return MultiPickerMixin;
}
