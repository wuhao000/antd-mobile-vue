import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';
import Icon from '../../icon';
import RMCInputNumber from '../../vmc-input-number';

const MStepper = defineComponent({
  install: null,
  name: 'MStepper',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-stepper'
    },
    showNumber: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    min: {
      type: Number as PropType<number>
    },
    max: {
      type: Number as PropType<number>
    },
    step: {
      default: 1
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    disabled: {
      type: Boolean as PropType<boolean>
    },
    autoFocus: {
      type: Boolean as PropType<boolean>
    },
    value: {
      type: [Number, String] as PropType<number>
    },
    defaultValue: {
      type: Number as PropType<number>
    },
    valueEditable: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    upStyle: {},
    downStyle: {},
    inputStyle: {},
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, {emit, slots}) {


    const getCurrentValue = () => {
      const value = props.value;
      let currentValue = null;
      if (typeof value === 'string') {
        if (value === '') {
          currentValue = null;
        } else {
          currentValue = parseInt(value);
        }
      } else {
        currentValue = value;
      }
      return currentValue;
    };


    return {
      getCurrentValue
    };
  },
  render() {
    const {showNumber, value, ...restProps} = this.$props;

    const stepperClass = classnames({
      showNumber: !!showNumber
    });
    const props: any = {
      ...restProps
    }
    props.upHandler = <Icon type="plus" size="xxs"/>;
    props.downHandler = <Icon type="minus" size="xxs"/>;
    return (
      <RMCInputNumber
        {...{
          ...this.$attrs,
          ...props,
          value: this.getCurrentValue(),
        }}
        class={stepperClass}/>
    );
  }
});

export default MStepper as any;
