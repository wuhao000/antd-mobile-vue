import { unwrapFragment } from '@/packages/utils/vue';
import classnames from 'classnames';
import { defineComponent, ref } from 'vue';
import { setListeners, setProps } from '../utils/vnode';
const MultiPicker = defineComponent({
    name: 'MultiPickerMixin',
    props: {
        prefixCls: {
            type: String
        },
        selectedValue: { type: Array }
    },
    setup(props, { slots, emit }) {
        const stateValue = ref(props.selectedValue);
        const onChange = (i, v, cb) => {
            const value = stateValue.value.concat();
            value[i] = v;
            if (cb) {
                cb(value, i);
            }
        };
        const onValueChange = (i, v) => {
            onChange(i, v, (...args) => {
                emit('update:value', ...args);
            });
            emit('value-change', i, v);
        };
        const onScrollChange = (i, v) => {
            onChange(i, v, (...args) => {
                emit('scroll-change', ...args);
            });
        };
        return { onValueChange, stateValue, onScrollChange };
    },
    render() {
        const { prefixCls } = this;
        const selectedValue = this.selectedValue;
        const colElements = this.$slots.default();
        unwrapFragment(colElements).forEach((col, i) => {
            setProps(col, {
                selectedValue: selectedValue[i]
            });
            setListeners(col, {
                'onUpdate:value': (value) => {
                    this.onValueChange(i, value);
                },
                scrollChange: (value) => {
                    this.onScrollChange(i, value);
                }
            });
        });
        return (<div class={classnames(prefixCls)}>
        {colElements}
      </div>);
    }
});
export default MultiPicker;
//# sourceMappingURL=multi-picker.jsx.map