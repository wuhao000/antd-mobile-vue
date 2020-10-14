import RcCheckbox from 'ant-design-vue/lib/vc-checkbox';
import classnames from 'classnames';
import { defineComponent, ref, watch } from 'vue';
import AgreeItem from './agree-item';
import CheckboxItem from './checkbox-item';
const Checkbox = defineComponent({
    CheckboxItem: CheckboxItem,
    AgreeItem: AgreeItem,
    name: 'MCheckbox',
    props: {
        prefixCls: {
            default: 'am-checkbox'
        },
        name: {
            type: String
        },
        wrapLabel: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit, slots }) {
        const checked = ref(props.value || false);
        watch(() => props.value, (value) => {
            checked.value = value;
        });
        watch(() => checked.value, (checked) => {
            emit('update:value', checked);
        });
        const onClick = (e) => {
            // e.stopPropagation();
            // e.preventDefault();
            checked.value = !checked.value;
            emit('change', checked.value);
            emit('update:value', checked.value);
        };
        return { onClick };
    },
    render() {
        var _a, _b;
        const { prefixCls } = this;
        const wrapCls = classnames(`${prefixCls}-wrapper`);
        const mark = (<label class={wrapCls}>
        <RcCheckbox onClick={this.onClick} checked={this.value} {...this.$props}/>
        {(_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)}
      </label>);
        if (this.wrapLabel) {
            return mark;
        }
        return <RcCheckbox onClick={this.onClick} checked={this.value} {...this.$props}>{this.$slots.default()}</RcCheckbox>;
    }
});
export default Checkbox;
//# sourceMappingURL=checkbox.jsx.map