import {defineComponent, PropType, ref, Ref, watch} from 'vue';
import Touchable from '../vmc-feedback';

const InputHandler = defineComponent({
  name: 'InputHandler',
  props: {
    prefixCls: {
      type: String as PropType<string>
    },
    disabled: {
      type: Boolean as PropType<boolean>
    },
    role: {
      type: String as PropType<string>
    },
    unselectable: {
      type: Boolean as PropType<boolean>
    }
  },
  setup(props, {emit, slots}) {
    const active: Ref<boolean> = ref(false);
    watch(() => props.disabled, (disabled: boolean) => {
      if (!disabled) {
        active.value = false;
      }
    });


    return {active};
  },
  render() {
    const {
      prefixCls, disabled, unselectable, ...otherProps
    } = this.$props;
    return (
      <Touchable disabled={disabled}
                 {
                   ...{
                     onTouchstart: (...args) => {
                       this.active = true;
                       this.$emit('touchstart', ...args);
                     },
                     onTouchend: (...args) => {
                       this.active = false;
                       this.$emit('touchend', ...args);
                     }
                   }
                 }>
        <span class={{
          [`${prefixCls}-handler-active`]: this.active && !this.disabled
        }}
              {...otherProps}
              unselectable={unselectable ? 'on' : 'off'}
              onClick={(...args) => {
                this.$emit('click', ...args);
              }}
        >{this.$slots.default}</span>
      </Touchable>
    );
  }
});

export default InputHandler as any;
