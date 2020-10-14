import { __rest } from "tslib";
import { defineComponent, ref, watch } from 'vue';
import Touchable from '../vmc-feedback';
const InputHandler = defineComponent({
    name: 'InputHandler',
    props: {
        prefixCls: {
            type: String
        },
        disabled: {
            type: Boolean
        },
        role: {
            type: String
        },
        unselectable: {
            type: Boolean
        }
    },
    setup(props, { emit, slots }) {
        const active = ref(false);
        watch(() => props.disabled, (disabled) => {
            if (!disabled) {
                active.value = false;
            }
        });
        return { active };
    },
    render() {
        const _a = this.$props, { prefixCls, disabled, unselectable } = _a, otherProps = __rest(_a, ["prefixCls", "disabled", "unselectable"]);
        return (<Touchable disabled={disabled} {...{
            onTouchstart: (...args) => {
                this.active = true;
                this.$emit('touchstart', ...args);
            },
            onTouchend: (...args) => {
                this.active = false;
                this.$emit('touchend', ...args);
            }
        }}>
        <span class={{
            [`${prefixCls}-handler-active`]: this.active && !this.disabled
        }} {...otherProps} unselectable={unselectable ? 'on' : 'off'} onClick={(...args) => {
            this.$emit('click', ...args);
        }}>{this.$slots.default}</span>
      </Touchable>);
    }
});
export default InputHandler;
//# sourceMappingURL=input-handler.jsx.map