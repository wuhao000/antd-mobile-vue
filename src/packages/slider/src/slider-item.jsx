import { formComponentProps, useFormComponent } from '../../mixins/form-component';
import { defineComponent } from 'vue';
import List from '../../list';
import Slider from './index';
export default defineComponent({
    install: null,
    name: 'SliderItem',
    props: Object.assign(Object.assign({}, formComponentProps), { prefixCls: {
            type: String,
            default: 'am-slider'
        }, marks: {}, dots: {
            type: Boolean
        }, included: {
            type: Boolean
        }, maximumTrackStyle: {}, minimumTrackStyle: {}, handleStyle: {}, trackStyle: {}, railStyle: {}, tipFormatter: {}, min: {
            type: Number
        }, max: {
            type: Number
        }, step: {
            type: Number
        }, handle: {}, title: {
            type: [String, Object]
        } }),
    setup(props, { emit }) {
        const { isDisabled, currentValue } = useFormComponent(props, { emit });
        return { isDisabled, currentValue };
    },
    render() {
        return (<List.Item multipleLine disabled={this.isDisabled}>
        {this.title}
        <List.Item.Brief style={{ padding: '15px' }}>
          <Slider {...this.$props} disabled={this.isDisabled} value={this.currentValue} onChange={(v) => {
            this.currentValue = v;
        }}/>
        </List.Item.Brief>
      </List.Item>);
    }
});
//# sourceMappingURL=slider-item.jsx.map