import { getCurrentInstance, ref, watch } from 'vue';
const isNullOrUndefined = (value) => {
    return value === undefined || value === null;
};
const basicTypes = ['number', 'boolean', 'string'];
function isEqual(a, b) {
    if (isNullOrUndefined(a) && isNullOrUndefined(b)) {
        return true;
    }
    else if (isNullOrUndefined(a) || isNullOrUndefined(b)) {
        return false;
    }
    const compareA = basicTypes.includes(typeof a) ? a.toString() : a;
    const compareB = basicTypes.includes(typeof b) ? b.toString() : b;
    return compareA === compareB;
}
export const useLocalValue = (defaultValue, propName = 'value', options = {
    transform: v => v,
    reverseTransform: v => v
}) => {
    const context = {
        doAfterSetValue: null,
        doBeforeSetValue: null
    };
    const instance = getCurrentInstance();
    const stateValue = ref(isNullOrUndefined(instance.props[propName]) ? options.transform(defaultValue) : options.transform(instance.props[propName]));
    watch(() => instance.props[propName], (value) => {
        const newValue = options.transform(value);
        if (!isEqual(stateValue.value, newValue)) {
            stateValue.value = newValue;
        }
    });
    return {
        afterValueSetAction(callback) {
            context.doAfterSetValue = callback;
        },
        setBeforeAction(callback) {
            context.doBeforeSetValue = callback;
        },
        setValue(value, eventKeyOrCallback) {
            if (context.doBeforeSetValue) {
                context.doBeforeSetValue(value);
            }
            let event = null;
            if (typeof eventKeyOrCallback === 'string') {
                event = eventKeyOrCallback ? eventKeyOrCallback : `update:${propName}`;
            }
            else {
                event = `update:${propName}`;
            }
            if (instance.props[propName] === undefined) {
                stateValue.value = value;
            }
            else {
                instance.emit(event, options.reverseTransform(value));
            }
            if (typeof eventKeyOrCallback === 'function') {
                eventKeyOrCallback();
            }
            if (context.doAfterSetValue) {
                context.doAfterSetValue(value);
            }
        },
        getValue() {
            return stateValue.value;
        },
        stateValue
    };
};
//# sourceMappingURL=value.js.map