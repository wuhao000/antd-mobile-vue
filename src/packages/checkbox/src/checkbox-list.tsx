import {defineComponent, onMounted, PropType, ref} from 'vue';
import List from '../../list';
import CheckboxItem from './checkbox-item';

const MCheckboxList = defineComponent({
  name: 'MCheckboxList',
  props: {
    value: {
      type: Array as PropType<any[]>
    },
    title: {
      type: String as PropType<string>
    },
    maxHeightPercentage: {
      type: Number as PropType<number>
    }
  },
  setup(props, {emit, slots}) {
    const stateValue = ref(props.value || []);


    const renderOptions = () => {
      const options = this.getOptions();
      return options.map(option => {
        return <CheckboxItem
          value={stateValue.value.includes(option.value)}
          disabled={option.disabled || this.isDisabled}
          on={
            {
              change: (checkState) => {
                onChange(checkState, option.value);
              }
            }
          }>{option.label}</CheckboxItem>;
      });
    };
    const onChange = (checkState: any, value: any) => {
      if (checkState) {
        if (props.value) {
          if (!props.value.includes(value)) {
            const array = [].concat(props.value);
            array.push(value);
            emit('update:value', array);
            emit('change', array);
          }
        } else {
          if (!stateValue.value.includes(value)) {
            stateValue.value.push(value);
          }
        }
      } else {
        if (props.value) {
          if (props.value.includes(value)) {
            const array = [].concat(props.value);
            array.splice(array.indexOf(value), 1);
            emit('update:value', array);
            emit('change', array);
          }
        } else {
          if (stateValue.value.includes(value)) {
            stateValue.value.splice(stateValue.value.indexOf(value), 1);
          }
        }
      }
    };
    onMounted(() => {
      if (props.maxHeightPercentage) {
        const windowHeight = document.body.clientHeight;
        const maxHeight = props.maxHeightPercentage;
        if (this.$el.clientHeight > windowHeight * maxHeight) {
          (this.$el as HTMLElement).style.height = windowHeight * maxHeight + 'px';
        }
      }
    });

    return {};
  },
  render() {
    // @ts-ignore
    return <List required={this.required} title={this.title}>
      {this.renderOptions()}
    </List>;
  }
});

export default MCheckboxList as any;
