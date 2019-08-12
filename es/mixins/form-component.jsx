import * as tslib_1 from "tslib";
import Emitter from './emitter';
import { getPropByPath } from './utils';
import AsyncValidator from 'async-validator';
import debounce from 'lodash.debounce';
import Component from 'vue-class-component';
import { Inject, Prop, Watch } from 'vue-property-decorator';
const noop = function noop(a, b) {
};
let FormComponent = class FormComponent extends Emitter {
    constructor() {
        super(...arguments);
        this.currentErrorMessage = this.errorMessage;
        this.isCurrentError = this.error;
        this.validateStatus = '';
        this.currentValue = this.value;
        this.validateDisabled = true;
    }
    get fieldValue() {
        return this.currentValue;
    }
    get errorIcon() {
        return this.isCurrentError ? (<div class={`${this.prefixCls}-error-extra`} onClick={(e) => {
            if (this.currentErrorMessage && this.$toast) {
                this.$toast.info(this.currentErrorMessage);
            }
            this.$emit('error-click', e);
        }}/>) : null;
    }
    get isDisabled() {
        let disabled = this.disabled;
        if (this.list) {
            if (!disabled) {
                disabled = this.list.disabled;
            }
        }
        return disabled;
    }
    get isReadonly() {
        let isReadonly = this.readOnly;
        if (this.list) {
            if (!isReadonly) {
                isReadonly = this.list.readOnly;
            }
        }
        return isReadonly;
    }
    created() {
        if (this.list) {
            this.dispatch('DForm', 'd.form.addField', [this]);
        }
        this.validate = debounce(this.validate, 300);
    }
    errorChanged(error) {
        this.isCurrentError = error;
    }
    errorMessageChanged(errorMessage) {
        this.currentErrorMessage = errorMessage;
    }
    getFilteredRule(trigger) {
        const rules = this.getRules();
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
    }
    getRules() {
        let formRules = this.list && this.list.rules;
        const prop = getPropByPath(formRules, this.prop || '');
        formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : [];
        const selfRules = this.rules;
        let requiredRule = this.required !== undefined ? { required: this.required } : [];
        if ((formRules && formRules.some(rule => rule.required !== undefined))
            || (selfRules && selfRules.some(rule => rule.required !== undefined))) {
            requiredRule = [];
        }
        return [].concat(selfRules || formRules || []).concat(requiredRule);
    }
    onFieldBlur() {
        this.validate('blur');
    }
    onFieldChange() {
        if (this.validateDisabled) {
            this.validateDisabled = false;
            return;
        }
        this.validate('change');
    }
    validate(trigger, callback = noop) {
        this.$nextTick(() => {
            this.validateDisabled = false;
            const rules = this.getFilteredRule(trigger);
            if ((!rules || rules.length === 0) && this.required === undefined) {
                callback();
                return true;
            }
            this.validateStatus = 'validating';
            const descriptor = {};
            if (rules && rules.length > 0) {
                rules.forEach(rule => {
                    delete rule.trigger;
                });
            }
            descriptor[this.prop] = rules;
            const validator = new AsyncValidator(descriptor);
            const model = {
                [this.prop]: this.fieldValue
            };
            validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
                this.validateStatus = !errors ? 'success' : 'error';
                this.isCurrentError = this.validateStatus === 'error';
                this.currentErrorMessage = errors ? errors[0].message : '';
                callback(this.currentErrorMessage, invalidFields);
                this.$emit('validate', !errors, errors);
                this.list && this.list.$emit('validate', this.prop, !errors, this.currentErrorMessage || null);
            });
        });
    }
    valueChanged(value) {
        this.currentValue = value;
    }
};
tslib_1.__decorate([
    Prop({ type: String })
], FormComponent.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], FormComponent.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], FormComponent.prototype, "error", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], FormComponent.prototype, "errorMessage", void 0);
tslib_1.__decorate([
    Inject({ from: 'list', default: undefined })
], FormComponent.prototype, "list", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], FormComponent.prototype, "prop", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], FormComponent.prototype, "readOnly", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], FormComponent.prototype, "required", void 0);
tslib_1.__decorate([
    Prop({ type: Array })
], FormComponent.prototype, "rules", void 0);
tslib_1.__decorate([
    Prop()
], FormComponent.prototype, "value", void 0);
tslib_1.__decorate([
    Watch('error')
], FormComponent.prototype, "errorChanged", null);
tslib_1.__decorate([
    Watch('errorMessage')
], FormComponent.prototype, "errorMessageChanged", null);
tslib_1.__decorate([
    Watch('value')
], FormComponent.prototype, "valueChanged", null);
FormComponent = tslib_1.__decorate([
    Component({
        name: 'FormComponent'
    })
], FormComponent);
export { FormComponent };
//# sourceMappingURL=form-component.jsx.map