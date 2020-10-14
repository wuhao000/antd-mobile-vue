import { __rest } from "tslib";
import classnames from 'classnames';
import { defineComponent, reactive, watch } from 'vue';
import getDataAttr from '../../utils/get-data-attr';
import Checkbox from './checkbox';
export default defineComponent({
    name: 'MAgreeItem',
    props: {
        prefixCls: {
            type: String,
            default: 'am-checkbox'
        },
        name: {
            type: String
        },
        wrapLabel: {
            type: Boolean,
            default: true
        },
        defaultValue: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        var _a;
        const state = reactive({
            value: (_a = props.value) !== null && _a !== void 0 ? _a : props.defaultValue
        });
        watch(() => state.value, (value) => {
            emit('update:value', value);
        });
        watch(() => props.value, (value) => {
            state.value = value;
        });
        return {
            state
        };
    },
    render() {
        const restProps = __rest(this.$props, []);
        const { prefixCls } = restProps;
        const wrapCls = classnames(`${prefixCls}-agree`);
        return (<div {...getDataAttr(restProps)} class={wrapCls}>
        <Checkbox {...restProps} v-model={[this.state.value, 'value']} class={`${prefixCls}-agree-label`}>
          {this.$slots.default()}
        </Checkbox>
      </div>);
    }
});
//# sourceMappingURL=agree-item.jsx.map