import { useFormComponent } from '../../mixins/form-component';
import RcRange from 'ant-design-vue/lib/vc-slider/src/Range';
import { defineComponent } from 'vue';
const Range = defineComponent({
    name: 'Range',
    props: {
        prefixCls: {
            type: String,
            default: 'am-slider'
        },
        handleStyle: {},
        trackStyle: {},
        railStyle: {},
        onChange: {},
        onAfterChange: {},
        tipFormatter: {},
        min: {
            type: Number
        },
        max: {
            type: Number
        },
        step: {
            type: Number
        }
    },
    isntall: null,
    setup(props, ctx) {
        const { currentValue } = useFormComponent(props, ctx);
        return { currentValue };
    },
    render() {
        return (<div class={`${this.prefixCls}-wrapper`}>
        <RcRange {...this.$props} value={this.currentValue} onChange={(v) => {
            this.currentValue = v;
        }}/>
      </div>);
    }
});
export default Range;
//# sourceMappingURL=index.jsx.map