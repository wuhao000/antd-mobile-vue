import { useSimpleFormComponent } from '@/packages/mixins/simple-form-component';
import { computed } from 'vue';
import { usePureInputComponent } from './pure-input-component';
export const useBaseInputComponent = (props, { emit, attrs, slots }, options) => {
    const { isReadonly, componentSize, isDisabled } = useSimpleFormComponent(props);
    const { getSlotProps, cssStyle, listeners, getDefaultSlot, getProps, stateValue } = usePureInputComponent(props, {
        emit,
        attrs
    }, options);
    return {
        isReadonly,
        componentSize,
        isDisabled,
        getDefaultSlot,
        slots,
        stateValue,
        listeners, cssStyle,
        props: computed(() => {
            return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, getSlotProps()), attrs), props), getProps()), { disabled: isDisabled, readOnly: isReadonly, visible: stateValue });
        })
    };
};
//# sourceMappingURL=base-input-component.jsx.map