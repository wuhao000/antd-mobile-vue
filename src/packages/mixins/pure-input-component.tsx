import {computed, defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import {useEmitter} from './emitter';

const hasListener = (instance, listener) => {
  const listeners = instance.$listeners || {};
  return Object.keys(listeners).includes(listener);
};

const hasProp = (instance, prop) => {
  const $options = instance.$options || {};
  const propsData = $options.propsData || {};
  return prop in propsData;
};

export const usePureInputComponent = (props, {emit, attrs}) => {
  const getInitValue = () => {
    return null;
  };
  const convertValue = ref((value: any) => {
    return value;
  });
  const initValue = computed(() => {
    const convertedValue = convertValue.value(props.value);
    if (convertedValue !== null && convertedValue !== undefined) {
      return convertedValue;
    } else {
      return getInitValue();
    }
  });
  const stateValue = ref(initValue.value);
  const instance = getCurrentInstance();
  const {dispatch} = useEmitter(instance);
  watch(() => stateValue.value, (value) => {
    const val = convertValueBack(value);
    if (hasProp(this, 'value')) {
      emit('input', val);
    }
    emit('change', val);
    dispatch('DFormItem', 'd.form.change', [val]);
  });
  watch(() => props.value, (value) => {
    if (stateValue.value !== convertValue.value(value)) {
      stateValue.value = convertValue.value(value);
    }
  });
  const cssStyle = computed(() => {
    const style: any = {};
    if (props.block) {
      style.display = 'block';
    }
    if (props.width) {
      if (typeof props.width === 'number') {
        style.width = props.width + 'px';
      } else {
        style.width = props.width;
      }
    }
    return style;
  });
  const listeners = computed(() => {
    const listeners = {
      onInput: onInput,
      onBlur: handleBlur,
      onChange: handleChange,
      onKeydown: handleKeydown,
      onKeyup: handleKeyup
    };
    Object.keys(attrs).forEach(key => {
      if (key in listeners) {
        listeners[key] = attrs[key];
      }
    });
    return listeners;
  });
  const slots = computed(() => {
    return Object.assign({}, slots, getSlots());
  });
  const getSlots = () => {
    return {};
  };
  const convertValueBack = (value: any) => {
    return value;
  };
  const getInputComponent = () => {
    return {};
  };
  const getListeners = () => {
    return {};
  };
  const getProps = () => {
    return {};
  };
  const getSlotProps = () => {
    const props: any = {};
    Object.keys(slots).forEach((slotKey: string) => {
      if (slotKey !== 'default') {
        props[slotKey] = slots[slotKey];
      }
    });
    return props;
  };
  const handleBlur = () => {
    dispatch('DFormItem', 'd.form.blur', [stateValue.value]);
  };
  const handleChange = (value) => {
    if (value !== null && value !== undefined && value.toString() === '[object InputEvent]') {
      return;
    }
    const comp: any = getInputComponent();
    if (comp.model && comp.model.prop === 'value' && comp.model.event === 'change') {
      stateValue.value = value;
    }
  };
  const handleKeydown = () => {
    emit('keydown');
  };
  const handleKeyup = () => {
    emit('keyup');
  };
  const onInput = (value) => {
    let val = value;
    if (value && value.toString() === '[object InputEvent]') {
      val = value.target.value;
    }
    emit('input', val);
    if (!(hasProp(this, 'value') && hasListener(this, 'input'))) {
      stateValue.value = val;
    }
  };
  const getDefaultSlot = () => {
    return slots.default?.();
  };
  onMounted(() => {
    dispatch('DFormItem', 'd.form-item.setControl', [this]);
  });
  onBeforeUnmount(() => {
    dispatch('DFormItem', 'd.form-item.setControl', [null]);
  });
  return {
    getInputComponent,
    listeners,
    cssStyle,
    stateValue,
    getDefaultSlot,
    props: computed(() => {
      return {
        ...getSlotProps(),
        ...attrs,
        ...props,
        ...getProps(),
        visible: stateValue.value
      };
    }),
    slots,
    getSlotProps,
    getProps
  };
};
export const pureInputComponentProps = {
  block: Boolean,
  value: {},
  width: [String, Number]
}
export default defineComponent({
  name: 'PureInputComponent',
  props: pureInputComponentProps,
  setup(_props, ctx) {
    const {getInputComponent, getDefaultSlot, slots, listeners, props, cssStyle, stateValue} = usePureInputComponent(_props, ctx);
    return {
      getInputComponent, listeners, props, cssStyle, stateValue, slots, getDefaultSlot
    };
  },
  render() {
    const CustomComponent = this.getInputComponent();
    const props = {
      ...this.listeners,
      ...this.props,
      style: this.cssStyle,
      value: this.stateValue
    };
    // @ts-ignore
    return <CustomComponent {...props}
                            slots={this.slots}>
      {this.getDefaultSlot()}
    </CustomComponent>;
  }
});
