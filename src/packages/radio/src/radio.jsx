import { __rest } from "tslib";
import RcCheckbox from 'ant-design-vue/lib/vc-checkbox';
import classnames from 'classnames';
import { defineComponent, ref } from 'vue';
const Radio = defineComponent({
    RadioItem: null,
    install: null,
    name: 'MRadio',
    props: {
        prefixCls: {
            type: String,
            default: 'am-radio'
        },
        listPrefixCls: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        name: {
            type: String
        },
        wrapLabel: {
            default: true
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit, slots }) {
        const checked = ref(props.value || false);
        const onClick = () => {
            checked.value = !checked.value;
            emit('change', checked.value);
        };
        return {
            onClick
        };
    },
    render() {
        const restProps = __rest(this.$props, []);
        const { prefixCls } = restProps;
        const wrapCls = classnames(`${prefixCls}-wrapper`);
        if ('class' in restProps) {
            // Todo https://github.com/developit/preact-compat/issues/422
            /* tslint:disable:no-string-literal */
            delete restProps['class'];
        }
        const mark = (<label class={wrapCls} onClick={this.onClick}>
        <RcCheckbox {...this.$props} checked={this.value} type="radio"/>
        {this.$slots.default}
      </label>);
        if (this.wrapLabel) {
            return mark;
        }
        return <RcCheckbox type="radio" checked={this.value} {...this.$props}>{this.$slots.default}</RcCheckbox>;
    }
});
export default Radio;
//# sourceMappingURL=radio.jsx.map