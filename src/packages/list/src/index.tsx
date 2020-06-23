import {ValidateRules} from 'async-validator';
import classNames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Provide} from 'vue-property-decorator';
import Item from './item';

@Component({
  name: 'MList'
})
class List extends Vue {
  /**
   * 是否分区样式
   */
  @Prop({type: Boolean, default: false})
  public section: boolean;
  @Prop({default: 'am-list'})
  public prefixCls?: string;
  @Prop({type: String})
  public role?: string;
  @Prop({type: [String, Object]})
  public title: string | VNode;
  @Prop({type: Number, default: 8})
  public spaceBetweenSection: number;
  public static Item = Item;
  @Prop({type: Boolean, default: true})
  public touchFeedback: boolean;
  @Provide('list')
  public list = this;
  @Prop({type: Object})
  public model: object;
  @Prop({type: Object})
  public rules: ValidateRules;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop({type: Boolean, default: true})
  public editable: boolean;
  public static install: (Vue) => void;
  public fields: any[] = [];
  @Prop({type: Boolean, default: false})
  public required: boolean;

  public created() {
    this.$on('d.form.addField', (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
    /* istanbul ignore next */
    this.$on('d.form.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  }

  public clearValidate(props = []) {
    const fields = props.length
        ? (typeof props === 'string'
                ? this.fields.filter(field => props === (field as any).prop)
                : this.fields.filter(field => props.indexOf((field as any).prop) > -1)
        ) : this.fields;
    fields.forEach(field => {
      (field as any).clearValidate();
    });
  }

  public resetFields() {
    if (!this.model) {
      console.warn('[Element Warn][Form]model is required for resetFields to work.');
      return;
    }
    this.fields.forEach(field => {
      (field as any).resetField();
    });
  }

  public validate(callback) {
    if (!this.model) {
      return;
    }
    let promise;
    let copyCallback = callback;
    // if no callback, return promise
    if (typeof copyCallback !== 'function' && Promise) {
      promise = new Promise((resolve, reject) => {
        copyCallback = (valid) => {
          const errorField = this.fields.find(it => it.validateStatus === 'error');
          if (errorField) {
            errorField.focus();
          }
          valid ? resolve(valid) : reject(valid);
        };
      });
    }

    let valid = true;
    let count = 0;
    // 如果需要验证的fields为空，调用验证时立刻返回callback
    if (this.fields.length === 0 && copyCallback) {
      copyCallback(true);
    }
    let invalidFields = {};
    this.fields.forEach(field => {
      field.validate('', (message, field) => {
        if (message) {
          valid = false;
        }
        invalidFields = Object.assign({}, invalidFields, field);
        if (typeof copyCallback === 'function' && ++count === this.fields.length) {
          copyCallback(valid, invalidFields);
        }
      });
    });
    if (promise) {
      return promise;
    }
  }

  public validateField(props, cb) {
    const copyProps = [].concat(props);
    const fields = this.fields.filter(field => copyProps.indexOf((field as any).prop) !== -1);
    if (!fields.length) {
      console.warn('[Element Warn]please pass correct props!');
      return;
    }
    fields.forEach(field => {
      (field as any).validate('', cb);
    });
  }

  public render() {
    const {prefixCls} = this;
    const wrapCls = classNames(prefixCls, {
      [prefixCls + '-section']: this.section
    });
    const children = [];
    if (this.$slots.default) {
      this.$slots.default.forEach((it: VNode, index) => {
        if (index < this.$slots.default.length - 1) {
          if (this.section && it.data) {
            if (it.data.staticStyle) {
              it.data.staticStyle.marginBottom = this.spaceBetweenSection + 'px';
            } else {
              it.data.staticStyle = {marginBottom: this.spaceBetweenSection + 'px'};
            }
          }
        }
        children.push(it);
      });
    }
    return (
        <div class={wrapCls}>
          {this.$slots.title || this.title ? <div class={classNames(`${prefixCls}-header`, {
            [`${prefixCls}-required`]: this.required
          })}>
            {this.$slots.title ? this.$slots.title : this.title}
          </div> : ''}
          {children.length ? (
              <div class={`${prefixCls}-body`}>{children}</div>
          ) : null}
          {this.$slots.footer ? this.$slots.footer : null}
        </div>
    );
  }
}

export default List as any;
