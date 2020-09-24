import {useFormComponent} from '../../mixins/form-component';
import RcRange from 'ant-design-vue/lib/vc-slider/src/Range';
import {defineComponent, PropType} from 'vue';

const Range = defineComponent({
  name: 'Range',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-slider'
    },
    handleStyle: {},
    trackStyle: {},
    railStyle: {},
    onChange: {},
    onAfterChange: {},
    tipFormatter: {},
    min: {
      type: Number as PropType<number>
    },
    max: {
      type: Number as PropType<number>
    },
    step: {
      type: Number as PropType<number>
    }
  },
  isntall: null,
  setup(props, ctx) {
    const {currentValue} = useFormComponent(props, ctx);
    return {currentValue};
  },
  render() {
    return (
      <div class={`${this.prefixCls}-wrapper`}>
        <RcRange props={this.$props}
                 value={this.currentValue}
                 onChange={(v) => {
                   this.currentValue = v;
                 }}/>
      </div>
    );
  }
});

export default Range as any;
