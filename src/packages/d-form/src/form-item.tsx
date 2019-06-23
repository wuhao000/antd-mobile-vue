import AsyncValidator, {ValidateRule, ValidateRules} from 'async-validator';
import debounce from 'lodash.debounce';
import Component, {mixins} from 'vue-class-component';
import {Inject, Prop, Provide} from 'vue-property-decorator';
import Emitter from '../../../mixins/emitter';
import {getPropByPath, noop} from './utils';

const Form = window.antd.Form;
@Component({
  name: 'DFormItem',
  componentName: 'ElFormItem'
})
export default class DFormItem extends mixins(Emitter) {

  public validateStatus: '' | 'success' | 'warning' | 'error' | 'validating' = '';
  /**
   * 是否显示错误反馈
   */
  @Prop({type: Boolean, default: false})
  public hasFeedback: boolean;
  /**
   * 需要校验的属性
   */
  @Prop({type: String, default: ''})
  public prop: string;
  /**
   * 标签宽度
   */
  @Prop({type: [String, Number]})
  public labelWidth: string | number;
  @Prop()
  public value: any;
  public help: any = '';
  /**
   * 是否必须
   */
  @Prop({type: Boolean, default: false})
  public required: boolean;
  /**
   * 校验规则
   */
  @Prop({type: [Object, Array]})
  public rules: object | any[];
  @Inject({
    from: 'form', default: undefined
  })
  public form: any;
  @Provide('formItem')
  public formItem = this;
  @Prop({type: String, default: ''})
  public label: string;
  private validateDisabled: boolean = true;
  private control: any;

  get fieldValue() {
    if (this.value !== null && this.value !== undefined) {
      return this.value;
    }
    const model = this.form && this.form.model;
    if (!model || !this.prop) {
      return;
    }

    let path = this.prop;
    if (path.indexOf(':') !== -1) {
      path = path.replace(/:/, '.');
    }
    return getPropByPath(model, path, true).v;
  }

  get isRequired() {
    if (this.required) {
      return this.required;
    } else {
      return this.getRules().some(it => it.required);
    }
  }

  get labelCol() {
    let labelCol: any = {};
    if (this.$attrs['label-col']) {
      labelCol = this.$attrs['label-col'];
    }
    if (this.form && this.form.labelCols) {
      if (typeof this.form.labelCols === 'number') {
        labelCol.span = this.form.labelCols;
      } else {
        labelCol = this.form.labelCols;
      }
    }
    labelCol.style = this.labelStyle;
    return labelCol;
  }

  get labelStyle() {
    const labelWidth = this.labelWidth ? this.labelWidth : (this.form && this.form.labelWidth);
    const style: any = {};
    if (labelWidth) {
      style.width = typeof labelWidth === 'number' ? (labelWidth + 'px') : labelWidth;
      style.float = 'left';
    }
    return style;
  }

  get wrapperCol() {
    let wrapperCol: any = {};
    if (this.$attrs['wrapper-col']) {
      wrapperCol = this.$attrs['wrapper-col'];
    }
    if (this.form && this.form.wrapperCols) {
      if (typeof this.form.wrapperCols === 'number') {
        wrapperCol.span = this.form.wrapperCols;
      } else {
        wrapperCol = this.form.wrapperCols;
      }
    } else if (this.form && this.form.labelCols) {
      if (typeof this.form.labelCols === 'number') {
        wrapperCol.span = 24 - this.form.labelCols;
      }
    }
    wrapperCol.style = this.wrapperStyle;
    return wrapperCol;
  }

  get wrapperStyle() {
    const labelWidth = this.labelWidth ? this.labelWidth : (this.form && this.form.labelWidth);
    const style: any = {};
    if (labelWidth) {
      style.marginLeft = typeof labelWidth === 'number' ? (labelWidth + 'px') : labelWidth;
    }
    return style;
  }

  public beforeDestroy() {
    if (this.prop) {
      this.dispatch('DForm', 'd.form.removeField', [this]);
    }
  }

  public created() {
    if (this.prop) {
      this.dispatch('DForm', 'd.form.addField', [this]);
      this.$on('d.form-item.setControl', (control) => {
        this.control = control;
      });
      const rules = this.getRules();
      if (rules.length || this.required !== undefined) {
        this.$on('d.form.blur', this.onFieldBlur);
        this.$on('el.form.blur', this.onFieldBlur);
        this.$on('d.form.change', this.onFieldChange);
        this.$on('el.form.change', this.onFieldChange);
      }
    }
    this.validate = debounce(this.validate, 300);
  }

  public focus() {
    if (this.control && this.control.focus.bind(this.control).bind(this.control).bind(this.control).bind(this.control).bind(this.control)) {
      this.control.focus();
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
    let formRules: ValidateRules = this.form && this.form.rules;
    const selfRules = this.rules;
    const requiredRule = this.required !== undefined ? {required: this.required} : [];
    const prop = getPropByPath(formRules, this.prop || '');
    formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : [];
    return [].concat(selfRules || formRules || []).concat(requiredRule);
  }

  public onFieldBlur() {
    this.validate('blur');
  }

  public onFieldChange() {
    if (this.validateDisabled) {
      this.validateDisabled = false;
      return;
    }
    this.validate('change');
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
        this.help = errors ? errors[0].message : '';
        callback(this.help, invalidFields);
        this.$emit('validate', !errors, errors);
        this.form && this.form.$emit('validate', this.prop, !errors, this.help || null);
      });
    });
  }

  public render() {
    const props = Object.assign({}, this.$props);
    if (this.$slots.label) {
      props.label = this.$slots.label;
    }
    return <Form.Item props={props}
                      attrs={this.$attrs}
                      help={this.help}
                      labelCol={this.labelCol}
                      validateStatus={this.validateStatus}
                      wrapperCol={this.wrapperCol}>
      {this.$slots.default}
    </Form.Item>;
  }

}
