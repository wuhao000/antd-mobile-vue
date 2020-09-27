import {defineComponent, onBeforeUpdate, PropType, ref, Ref} from 'vue';
import {getPxStyle, getTransformPropValue} from './utils';

const TabPane = defineComponent({
  name: 'TabPane',
  props: {
    role: {
      type: String as PropType<string>
    },
    active: {
      type: Boolean as PropType<boolean>
    },
    fixX: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    fixY: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup(props, {emit, slots}) {
    const layout: Ref<HTMLDivElement> = ref(null);
    const offsetX = ref(0);
    const offsetY = ref(0);


    const setLayout = (div: HTMLDivElement) => {
      layout.value = div;
    };
    onBeforeUpdate(() => {
      if (props.active !== props.active) {
        if (props.active) {
          offsetX.value = 0;
          offsetY.value = 0;
        } else {
          offsetX.value = layout.value.scrollLeft;
          offsetY.value = layout.value.scrollTop;
        }
      }
    });
    return {
      setLayout,
      offsetX, offsetY
    };
  },
  render() {
    const {active, fixX, fixY, ...props} = this;
    const style = {
      ...fixX && this.offsetX ? getTransformPropValue(getPxStyle(-this.offsetX, 'px', false)) : {},
      ...fixY && this.offsetY ? getTransformPropValue(getPxStyle(-this.offsetY, 'px', true)) : {}
    };
    const divProps: any = {...props};
    return <div {...divProps} style={style} ref={this.setLayout}>
      {this.$slots.default}
    </div>;
  }
});
export default TabPane as any;
