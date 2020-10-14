import { onBeforeUnmount, reactive, ref, watch } from 'vue';
function defaultParser(input) {
    if (typeof input === 'number') {
        return input;
    }
    return input.replace(/[^\w.-]+/g, '');
}
/**
 * When click and hold on a button - the speed of auto changin the value.
 */
const SPEED = 200;
/**
 * When click and hold on a button - the delay before auto changin the value.
 */
const DELAY = 600;
/**
 * Max Safe Integer -- on IE this is not available, so manually set the number in that case.
 * The reason this is used, instead of Infinity is because numbers above the MSI are unstable
 */
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
export const baseComponentProps = {
    step: {
        type: [String, Number]
    },
    parser: {
        type: Function,
        default: defaultParser
    },
    value: {
        type: Number
    },
    defaultValue: {
        type: Number
    },
    min: {
        type: Number
    },
    max: {
        type: Number
    },
    autoFocus: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readOnly: {
        type: Boolean,
        default: false
    },
    precision: {
        type: Number
    }
};
export const useBaseComponent = (props, { emit }) => {
    const autoStepTimer = ref(null);
    const state = reactive({
        inputValue: null,
        focused: props.autoFocus
    });
    watch(() => props.value, (value) => {
        const v = value !== undefined ? toNumber(value) : props.defaultValue;
        state.inputValue = toPrecisionAsStep(v);
    });
    watch(() => state.inputValue, (v) => {
        emit('update:value', v);
    });
    const onChange = (e) => {
        const { parser } = props;
        const input = typeof e === 'number' ? e : (parser && parser(e.target.value));
        state.inputValue = parseFloat(input);
        emit('change', toNumberWhenUserInput(input));
    };
    const onFocus = (...args) => {
        state.focused = true;
        emit('focus', ...args);
    };
    const onBlur = (e, ...args) => {
        state.focused = false;
        const value = getCurrentValidValue(state.inputValue);
        if (e.persist) {
            e.persist(); // fix https://github.com/react-component/input-number/issues/51
        }
        setValue(value, () => {
            emit('blur', e, ...args);
        });
    };
    const getCurrentValidValue = (value) => {
        let val = value;
        if (val === '') {
            val = '';
        }
        else if (!isNotCompleteNumber(val)) {
            val = getValidValue(val);
        }
        else {
            val = state.inputValue;
        }
        return toNumber(val);
    };
    const getValidValue = (value) => {
        let val = parseFloat(value.toString());
        if (isNaN(val)) {
            return value;
        }
        if (val < props.min) {
            val = props.min;
        }
        if (val > props.max) {
            val = props.max;
        }
        return val;
    };
    const setValue = (v, callback) => {
        // trigger onChange
        const newValue = isNotCompleteNumber(parseFloat(v)) ? undefined : parseFloat(v);
        const changed = newValue !== state.inputValue ||
            `${newValue}` !== `${state.inputValue}`; // https://github.com/ant-design/ant-design/issues/7363
        if (props.value === undefined) {
            state.inputValue = toPrecisionAsStep(v);
            callback && callback();
        }
        else {
            // always set input value same as value
            state.inputValue = toPrecisionAsStep(v);
            callback && callback();
        }
        if (changed) {
            emit('change', newValue);
        }
    };
    const getPrecision = (value) => {
        if (props.precision) {
            return props.precision;
        }
        const valueString = value.toString();
        if (valueString.indexOf('e-') >= 0) {
            return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
        }
        let precision = 0;
        if (valueString.indexOf('.') >= 0) {
            precision = valueString.length - valueString.indexOf('.') - 1;
        }
        return precision;
    };
    const getMaxPrecision = (currentValue, ratio = 1) => {
        if (props.precision) {
            return props.precision;
        }
        const { step } = props;
        const ratioPrecision = getPrecision(ratio);
        const stepPrecision = getPrecision(step);
        const currentValuePrecision = getPrecision(currentValue);
        if (!currentValue) {
            return ratioPrecision + stepPrecision;
        }
        return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
    };
    const getPrecisionFactor = (currentValue, ratio = 1) => {
        const precision = getMaxPrecision(currentValue, ratio);
        return Math.pow(10, precision);
    };
    const toPrecisionAsStep = (num) => {
        if (isNotCompleteNumber(num)) {
            return num;
        }
        const precision = Math.abs(getMaxPrecision(num));
        if (!isNaN(precision)) {
            return parseFloat(Number(num).toFixed(precision));
        }
        return num;
    };
    const isNotCompleteNumber = (num) => {
        return (isNaN(num) ||
            num === '' ||
            num === null ||
            (num && num.toString().indexOf('.') === num.toString().length - 1));
    };
    const toNumber = (num) => {
        if (isNotCompleteNumber(num)) {
            return num;
        }
        if (props.precision) {
            return Number(Number(num).toFixed(props.precision));
        }
        return Number(num);
    };
    const toNumberWhenUserInput = (num) => {
        // num.length > 16 => prevent input large number will became Infinity
        if ((/\.\d*0$/.test(num) || num.length > 16) && state.focused) {
            return num;
        }
        return toNumber(num);
    };
    const stepCompute = (type, val, rat) => {
        const { step, min } = props;
        const precisionFactor = getPrecisionFactor(val, rat);
        const precision = Math.abs(getMaxPrecision(val, rat));
        let result;
        const direct = type === 'up' ? 1 : -1;
        if (typeof val === 'number') {
            result = ((precisionFactor * val + direct * precisionFactor * +step * rat) /
                precisionFactor).toFixed(precision);
        }
        else {
            result = min === -Infinity ? direct * +step : min;
        }
        return toNumber(result);
    };
    const stepTo = (type, e, ratio = 1) => {
        if (e) {
            e.preventDefault();
        }
        if (props.disabled) {
            return false;
        }
        const value = getCurrentValidValue(state.inputValue) || 0;
        if (isNotCompleteNumber(value)) {
            return false;
        }
        let val = stepCompute(type, value, ratio);
        const outOfRange = val > props.max || val < props.min;
        if (val > props.max) {
            val = props.max;
        }
        else if (val < props.min) {
            val = props.min;
        }
        setValue(val);
        state.focused = true;
        return !outOfRange;
    };
    const stop = () => {
        if (autoStepTimer.value) {
            clearTimeout(autoStepTimer.value);
        }
    };
    const action = (type, e, ratio, recursive) => {
        if (e.persist) {
            e.persist();
        }
        stop();
        if (stepTo(type, e, ratio)) {
            autoStepTimer.value = setTimeout(() => {
                action(type, e, ratio, true);
            }, recursive ? SPEED : DELAY);
        }
    };
    const down = (e, ratio, recursive) => {
        action('down', e, ratio, recursive);
    };
    const up = (e, ratio, recursive) => {
        action('up', e, ratio, recursive);
    };
    {
        const value = props.value !== undefined ? toNumber(props.value) : props.defaultValue;
        state.inputValue = toPrecisionAsStep(value);
        watch(() => props.value, () => {
            state.inputValue = state.focused
                ? props.value : getValidValue(props.value);
        });
    }
    onBeforeUnmount(() => {
        stop();
    });
    return {
        state, stop, up, down,
        toPrecisionAsStep,
        onFocus, onBlur, onChange
    };
};
//# sourceMappingURL=base.jsx.map