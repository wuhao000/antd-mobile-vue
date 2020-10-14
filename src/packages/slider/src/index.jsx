import RcSlider from 'ant-design-vue/es/vc-slider/src/Slider';
import { defineComponent } from 'vue';
import { formComponentProps, useFormComponent } from '../../mixins/form-component';
const Slider = defineComponent({
    install: null,
    name: 'Slider',
    props: Object.assign(Object.assign({}, formComponentProps), { prefixCls: {
            type: String,
            default: 'am-slider'
        }, marks: {}, dots: {
            type: Boolean
        }, included: {
            type: Boolean
        }, handleStyle: {}, trackStyle: {}, railStyle: {}, tipFormatter: {}, min: {
            type: Number
        }, max: {
            type: Number
        }, step: {
            type: Number
        }, handle: {} }),
    setup(props, { emit }) {
        const { isDisabled, currentValue } = useFormComponent(props, { emit });
        return { isDisabled, currentValue };
    },
    render() {
        const props = Object.assign({}, this.$props, { disabled: this.isDisabled });
        return (<div class={`${this.prefixCls}-wrapper`}>
        <RcSlider {...props} value={this.currentValue} onChange={(value) => {
            this.currentValue = value;
        }}/>
      </div>);
    }
});
export default Slider;
//# sourceMappingURL=index.jsx.map