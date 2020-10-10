import {defineComponent, getCurrentInstance, onMounted, PropType, ref, watch} from 'vue';
import List from '../../list';
import {optionsBasedComponentProps, useOptionsBaseComponent} from '../../mixins/options-based-component';
import RadioItem from './radio-item';

export default defineComponent({
  name: 'MRadioList',
  props: {
    ...optionsBasedComponentProps,
    value: {},
    title: {
      type: String as PropType<string>
    },
    maxHeightPercentage: {
      type: Number as PropType<number>
    }
  },
  setup(props, {emit, slots, attrs}) {
    const instance = getCurrentInstance();
    const {getOptions, isDisabled} = useOptionsBaseComponent(props, {emit, slots, attrs});
    const stateValue = ref(props.value !== undefined ? props.value : null);
    watch(() => props.value, (value: any) => {
      stateValue.value = value;
    });

    const renderOptions = () => {
      const options = getOptions();
      if (options) {
        return options.map(option => {
          return <RadioItem
            {...{disabled: option.disabled || isDisabled.value}}
            value={stateValue.value === option.value}
            onChange={(checkState) => {
              onChange(checkState, option.value);
            }}>{option.label}</RadioItem>;
        });
      } else {
        return [];
      }
    };
    const onChange = (checkState: any, value: any) => {
      if (checkState) {
        stateValue.value = value;
      }
      emit('update:value', value);
      emit('change', value);
    };
    onMounted(() => {
      if (props.maxHeightPercentage) {
        const windowHeight = document.body.clientHeight;
        const maxHeight = props.maxHeightPercentage;
        if (instance.vnode.el.clientHeight > windowHeight * maxHeight) {
          (instance.vnode.el as HTMLElement).style.height = windowHeight * maxHeight + 'px';
        }
      }
    });
    return {
      renderOptions
    };
  },
  render() {
    return <List required={this.required} title={this.title}>
      {this.renderOptions()}
    </List>;
  }
});
