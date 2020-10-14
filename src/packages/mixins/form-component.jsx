import { useEmitter } from '@/packages/mixins/emitter';
import AsyncValidator from 'async-validator';
import { computed, getCurrentInstance, inject, nextTick, ref, watch } from 'vue';
import { getPropByPath } from './utils';
const noop = function noop(a, b) {
};
export const formComponentProps = {
    /**
     * class 前缀
     */
    prefixCls: {
        type: String
    },
    disabled: {
        type: Boolean
    },
    error: {
        type: Boolean,
        default: false
    },
    errorMessage: {
        type: String
    },
    prop: {
        type: String
    },
    editable: {
        type: Boolean,
        default: true
    },
    /**
     * 是否必须
     */
    required: {
        type: Boolean,
        default: false
    },
    rules: {
        type: Array
    },
    value: {},
    errorDisplayType: {
        type: String
    }
};
export const useFormComponent = (props, { emit }) => {
    const { dispatch } = useEmitter(getCurrentInstance());
    const currentErrorMessage = ref(props.errorMessage);
    const list = inject('list');
    const validateStatus = ref('');
    const currentValue = ref(props.value);
    const validateDisabled = ref(true);
    const isCurrentError = ref(false);
    watch(() => props.errorMessage, (errorMessage) => {
        currentErrorMessage.value = errorMessage;
    });
    watch(() => props.value, (value) => {
        if (currentValue.value !== value) {
            currentValue.value = value;
        }
    });
    watch(() => currentValue.value, (currentValue) => {
        emit('update:value', currentValue);
        emit('change', currentValue);
    });
    const fieldValue = computed(() => {
        return currentValue.value;
    });
    const isDisabled = computed(() => {
        let disabled = props.disabled;
        if (list) {
            if (!disabled) {
                disabled = list.disabled;
            }
        }
        return disabled;
    });
    const isReadonly = computed(() => {
        let isReadonly = !props.editable;
        if (list && !isReadonly) {
            isReadonly = !list.editable;
        }
        return isReadonly;
    });
    const getFilteredRule = (trigger) => {
        const rules = getRules();
        return rules.filter(rule => {
            if (!rule.trigger || trigger === '') {
                return true;
            }
            if (Array.isArray(rule.trigger)) {
                return rule.trigger.indexOf(trigger) > -1;
            }
            else {
                return rule.trigger === trigger;
            }
        }).map(rule => Object.assign({}, rule));
    };
    const getRules = () => {
        let formRules = list && list.rules;
        const prop = getPropByPath(formRules, props.prop || '');
        formRules = formRules ? (prop.o[props.prop || ''] || prop.v) : [];
        const selfRules = props.rules;
        let requiredRule = props.required !== undefined ? { required: props.required } : [];
        if ((formRules && formRules.some(rule => rule.required !== undefined))
            || (selfRules && selfRules.some(rule => rule.required !== undefined))) {
            requiredRule = [];
        }
        return [].concat(selfRules || formRules || []).concat(requiredRule);
    };
    const onFieldBlur = () => {
    };
    const onFieldChange = () => {
        if (validateDisabled.value) {
            validateDisabled.value = false;
        }
    };
    const validate = (trigger, callback = noop) => {
        nextTick(() => {
            validateDisabled.value = false;
            const rules = getFilteredRule(trigger);
            if ((!rules || rules.length === 0) && props.required === undefined) {
                callback();
                return true;
            }
            validateStatus.value = 'validating';
            const descriptor = {};
            if (rules && rules.length > 0) {
                rules.forEach(rule => {
                    delete rule.trigger;
                });
            }
            descriptor[props.prop] = rules;
            const validator = new AsyncValidator(descriptor);
            const model = {
                [props.prop]: fieldValue.value
            };
            validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
                validateStatus.value = !errors ? 'success' : 'error';
                isCurrentError.value = validateStatus.value === 'error';
                currentErrorMessage.value = errors ? errors[0].message : '';
                callback(currentErrorMessage.value, invalidFields);
                emit('validate', !errors, errors);
                list && list.$emit('validate', props.prop, !errors, currentErrorMessage.value || null);
            });
        });
    };
    {
        if (list) {
            dispatch('DForm', 'd.form.addField', [this]);
        }
    }
    return {
        currentValue, onFieldChange, validate, onFieldBlur, isReadonly, isDisabled
    };
};
//# sourceMappingURL=form-component.jsx.map