import { Popover } from 'ant-design-vue';
import classNames from 'classnames';
import { defineComponent, ref, watch } from 'vue';
const MPopover = defineComponent({
    name: 'MPopover',
    props: {
        /**
         * 是否显示气泡（v-model）
         */
        value: {
            type: Boolean,
            default: false
        },
        prefixCls: {
            type: String,
            default: 'am-popover'
        },
        /**
         * 是否显示遮罩
         */
        mask: {
            type: Boolean,
            default: true
        },
        /**
         * 是否允许点击遮罩层关闭
         */
        maskClosable: {
            type: Boolean,
            default: true
        }
    },
    item: null,
    install: null,
    setup(props, { emit }) {
        const currentValue = ref(props.value);
        watch(() => props.value, (value) => {
            currentValue.value = value;
        });
        watch(() => currentValue.value, (currentValue) => {
            emit('update:value', currentValue);
            emit('change', currentValue);
        });
        return { currentValue };
    },
    render() {
        const maskClass = classNames(this.prefixCls + '-mask', {
            [this.prefixCls + '-mask-hidden']: !this.currentValue
        });
        const popoverProps = Object.assign(Object.assign({}, this.$attrs), { prefixCls: this.prefixCls, 'v-model': [this.currentValue, 'value'], trigger: "click", 'v-slots': this.$slots });
        // @ts-ignore
        return <Popover {...popoverProps}>
      {this.$slots.default()}
      {this.mask ? <div onClick={(e) => {
            if (!this.maskClosable) {
                e.stopPropagation();
                e.preventDefault();
            }
        }} class={maskClass}/> : null}
    </Popover>;
    }
});
export default MPopover;
//# sourceMappingURL=index.jsx.map