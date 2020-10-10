import RcSlider from 'ant-design-vue/es/vc-slider/src/Slider';
import {defineComponent, PropType} from 'vue';
import {formComponentProps, useFormComponent} from '../../mixins/form-component';

const Slider = defineComponent({
  install: null,
  name: 'Slider',
  props: {
    ...formComponentProps,
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-slider'
    },
    marks: {},
    dots: {
      type: Boolean as PropType<boolean>
    },
    included: {
      type: Boolean as PropType<boolean>
    },
    handleStyle: {},
    trackStyle: {},
    railStyle: {},
    tipFormatter: {},
    min: {
      type: Number as PropType<number>
    },
    max: {
      type: Number as PropType<number>
    },
    step: {
      type: Number as PropType<number>
    },
    handle: {}
  },
  setup(props, {emit}) {
    const {isDisabled, currentValue} = useFormComponent(props, {emit});
    return {isDisabled, currentValue};
  },
  render() {
    const props = Object.assign({}, this.$props, {disabled: this.isDisabled});
    return (
      <div class={`${this.prefixCls}-wrapper`}>
        <RcSlider {...props}
                  value={this.currentValue}
                  onChange={
                    (value) => {
                      this.currentValue = value;
                    }
                  }/>
      </div>
    );
  }
});

export default Slider as any;
