import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useEmitter } from './emitter';
export const usePureInputComponent = (props, { emit, attrs }, options) => {
    const convertValue = ref((value) => {
        return value;
    });
    const defaultValue = computed(() => {
        const convertedValue = convertValue.value(props.value);
        if (convertedValue !== null && convertedValue !== undefined) {
            return convertedValue;
        }
        else {
            return options === null || options === void 0 ? void 0 : options.defaultValue;
        }
    });
    const stateValue = ref(defaultValue.value);
    const instance = getCurrentInstance();
    const { dispatch } = useEmitter(instance);
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
        const style = {};
        if (props.block) {
            style.display = 'block';
        }
        if (props.width) {
            if (typeof props.width === 'number') {
                style.width = props.width + 'px';
            }
            else {
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
    const convertValueBack = (value) => {
        return value;
    };
    const getInputComponent = () => {
        return {};
    };
    const getProps = () => {
        return {};
    };
    const getSlotProps = () => {
        const props = {};
        Object.keys(slots).forEach((slotKey) => {
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
        const comp = getInputComponent();
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
        var _a;
        return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
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
            return Object.assign(Object.assign(Object.assign(Object.assign({}, getSlotProps()), attrs), props), getProps());
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
//# sourceMappingURL=pure-input-component.jsx.map