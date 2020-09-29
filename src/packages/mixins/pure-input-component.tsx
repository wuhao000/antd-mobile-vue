import {computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import {useEmitter} from './emitter';

export const usePureInputComponent = (props, {emit, attrs}, options?: {defaultValue: any}) => {
  const convertValue = ref((value: any) => {
    return value;
  });
  const defaultValue = computed(() => {
    const convertedValue = convertValue.value(props.value);
    if (convertedValue !== null && convertedValue !== undefined) {
      return convertedValue;
    } else {
      return options?.defaultValue;
    }
  });
  const stateValue = ref(defaultValue.value);
  const instance = getCurrentInstance();
  const {dispatch} = useEmitter(instance);
  watch(() => stateValue.value, (value) => {
    if (Array.isArray(value) && typeof value[0] === 'object') {
      console.log('invalid');
    }
    const val = convertValueBack(value);
    if (props.value !== undefined) {
      emit('update:value', val);
    }
    emit('change', val);
    dispatch('DFormItem', 'd.form.change', [val]);
  });
  watch(() => props.value, (value) => {
    const convertedValue = convertValue.value(value);
    if (stateValue.value !== convertedValue) {
      console.log(convertedValue);
      stateValue.value = convertedValue;
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
      console.log(value);
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
    emit('update:value', val);
    if (props.value === undefined) {
      console.log(val);
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
        ...getProps()
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
};
