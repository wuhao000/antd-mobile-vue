import AsyncValidator, {ValidateRule} from 'async-validator';
import Component from 'vue-class-component';
import {Inject, Prop, Watch} from 'vue-property-decorator';
import Emitter from './emitter';
import {getPropByPath} from './utils';

const noop = function noop(a?, b?) {
};

@Component({
  name: 'FormComponent'
})
export class FormComponent extends Emitter {

  /**
   * class 前缀
   */
  @Prop({type: String})
  public prefixCls?: string;
  @Prop({type: Boolean})
  public disabled: boolean;
  @Prop({type: Boolean, default: false})
  public error: boolean;
  @Prop({type: String})
  public errorMessage: string;
  public currentErrorMessage = this.errorMessage;
  @Inject({from: 'list', default: undefined})
  public list: any;
  @Prop({type: String})
  public prop: string;
  @Prop({type: Boolean, default: true})
  public editable: boolean;
  /**
   * 是否必须
   */
  @Prop({type: Boolean, default: false})
  public required: boolean;
  @Prop({type: Array})
  public rules: ValidateRule[];
  public validateStatus: '' | 'success' | 'warning' | 'error' | 'validating' = '';
  @Prop()
  public value: any;
  @Prop(String)
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

  @Watch('errorMessage')
  public errorMessageChanged(errorMessage: string) {
    this.currentErrorMessage = errorMessage;
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

  @Watch('value')
  public valueChanged(value: any) {
    if (this.currentValue !== value) {
      this.currentValue = value;
    }
  }

  @Watch('currentValue')
  public currentValueChanged(currentValue: number[]) {
    this.$emit('input', currentValue);
    this.$emit('change', currentValue);
  }

}
