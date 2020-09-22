import AsyncValidator, {ValidateRule} from 'async-validator';
import {Options} from 'vue-class-component';
import Emitter from './emitter';
import {getPropByPath} from './utils';

const noop = function noop(a?, b?) {
};

@Options({
  name: 'FormComponent',
  props: {
    prefixCls: {type: String},
    disabled: {type: Boolean},
    error: {type: Boolean, default: false},
    errorMessage: {type: String},
    prop: {type: String},
    editable: {type: Boolean, default: true},
    required: {type: Boolean, default: false},
    rules: {type: Array},
    value: {},
    errorDisplayType: String
  },
  inject: {
    list: {from: 'list', default: undefined}
  },
  watch: {
    errorMessage(errorMessage) {
      this.currentErrorMessage = errorMessage;
    },
    value(value) {
      if (this.currentValue !== value) {
        this.currentValue = value;
      }
    },
    currentValue(currentValue: number[]) {
      this.$emit('input', currentValue);
      this.$emit('change', currentValue);
    }
  }
})
export default class FormComponent extends Emitter {
  /**
   * class 前缀
   */
  public prefixCls?: string;
  public disabled: boolean;
  public error: boolean;
  public errorMessage: string;
  public currentErrorMessage = this.errorMessage;
  public list: any;
  public prop: string;
  public editable: boolean;
  /**
   * 是否必须
   */
  public required: boolean;
  public rules: ValidateRule[];
  public validateStatus: '' | 'success' | 'warning' | 'error' | 'validating' = '';
  public value: any;
  public errorDisplayType: 'toast' | 'popover' | 'text' | undefined;
  public currentValue = this.value;
  private validateDisabled: boolean = true;
  private isCurrentError: boolean = false;

  get fieldValue() {
    return this.currentValue;
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
    let isReadonly = !this.editable;
    if (this.list && !isReadonly) {
      isReadonly = !this.list.editable;
    }
    return isReadonly;
  }

  public created() {
    if (this.list) {
      this.dispatch('DForm', 'd.form.addField', [this]);
    }
  }

  public getFilteredRule(trigger) {
    const rules = this.getRules();
    return rules.filter(rule => {
      if (!rule.trigger || trigger === '') {
        return true;
      }
      if (Array.isArray(rule.trigger)) {
        return rule.trigger.indexOf(trigger) > -1;
      } else {
        return rule.trigger === trigger;
      }
    }).map(rule => Object.assign({}, rule));
  }

  public getRules(): ValidateRule[] {
    let formRules: any = this.list && this.list.rules;
    const prop = getPropByPath(formRules, this.prop || '');
    formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : [];
    const selfRules = this.rules;
    let requiredRule = this.required !== undefined ? {required: this.required} : [];
    if ((formRules && formRules.some(rule => rule.required !== undefined))
      || (selfRules && selfRules.some(rule => rule.required !== undefined))) {
      requiredRule = [];
    }
    return [].concat(selfRules || formRules || []).concat(requiredRule);
  }

  public onFieldBlur() {
  }

  public onFieldChange() {
    if (this.validateDisabled) {
      this.validateDisabled = false;
      return;
    }
  }

  public validate(trigger, callback = noop) {
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
      validator.validate(model, {firstFields: true}, (errors, invalidFields) => {
        this.validateStatus = !errors ? 'success' : 'error';
        this.isCurrentError = this.validateStatus === 'error';
        this.currentErrorMessage = errors ? errors[0].message : '';
        callback(this.currentErrorMessage, invalidFields);
        this.$emit('validate', !errors, errors);
        this.list && this.list.$emit('validate', this.prop, !errors, this.currentErrorMessage || null);
      });
    });
  }
}
