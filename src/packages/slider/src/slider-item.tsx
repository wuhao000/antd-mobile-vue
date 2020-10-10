import {formComponentProps, useFormComponent} from '../../mixins/form-component';
import {defineComponent, PropType} from 'vue';
import List from '../../list';
import Slider from './index';

export default defineComponent({
  install: null,
  name: 'SliderItem',
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
    maximumTrackStyle: {},
    minimumTrackStyle: {},
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
    handle: {},
    title: {
      type: [String, Object] as PropType<string>
    }
  },
  setup(props, {emit}) {
    const {isDisabled, currentValue} = useFormComponent(props, {emit});
    return {isDisabled, currentValue};
  },
  render() {
    return (
      <List.Item multipleLine
                 disabled={this.isDisabled}>
        {this.title}
        <List.Item.Brief style={{padding: '15px'}}>
          <Slider {...this.$props}
                  disabled={this.isDisabled}
                  value={this.currentValue}
                  onChange={
                    (v) => {
                      this.currentValue = v;
                    }
                  }/>
        </List.Item.Brief>
      </List.Item>
    );
  }
});
