import {ValidateRules} from 'async-validator';
import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Provide} from 'vue-property-decorator';
import DButton from '../../d-button';

@Component({
  name: 'DForm'
})
export default class DForm extends Vue {

  /**
   * 显示取消确认按钮，分别产生cancel和ok事件，cancel和ok没有默认操作，完全由用户定义
   */
  @Prop({type: Boolean, default: false})
  public okCancel: boolean;
  @Prop({type: String, default: 'default'})
  public size: 'small' | 'large' | 'default';
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop({type: Boolean, default: false})
  public readOnly: boolean;
  @Prop({
    type: [Number, Object], default(this: any) {
      const layout = this.$options.propsData &&
          this.$options.propsData.layout;
      if (layout === 'horizontal') {
        return {
          xs: {span: 24},
          sm: {span: 7}
        };
      }
      return 0;
    }
  })
  public labelCols: number | object;
  @Prop({type: String, default: '确定'})
  public okText: string;
  @Prop({type: String, default: '取消'})
  public cancelText: string;
  @Prop(Boolean)
  public inline: boolean;
  /**
   * 标签宽度
   */
  @Prop({type: [String, Number]})
  public labelWidth: string | number;
  @Prop({type: Boolean})
  public hideRequiredMark: boolean;
  @Prop({type: String, default: 'horizontal'})
  public layout: 'horizontal' | 'inline' | 'vertical';
  @Prop({type: Object})
  public model: object;
  @Prop({type: Object})
  public rules: ValidateRules;
  @Prop({
    type: Function, default() {
      return () => {
      };
    }
  })
  public onSubmit: any;
  public prefixCls = 'ant-form';
  @Prop({
    type: [Number, Object], default(this: any) {
      const layout = this.$options.propsData &&
          this.$options.propsData.layout;
      if (layout === 'horizontal') {
        return {
          xs: {span: 24},
          sm: {span: 12},
          md: {span: 10}
        };
      }
      return 0;
    }
  })
  public wrapperCols: number | object;
  public fields: any[] = [];
  @Provide('form')
  public form = this;
  public static Item: any;
  public static install: (Vue) => void;

  public created() {
    this.form = this;
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

  public render(h: any) {
    const {
      prefixCls,
      hideRequiredMark,
      onSubmit,
      $slots
    } = this;
    const layout = this.getLayout();
    const formClassName = classNames(prefixCls, {
      [`${prefixCls}-horizontal`]: layout === 'horizontal',
      [`${prefixCls}-vertical`]: layout === 'vertical',
      [`${prefixCls}-inline`]: layout === 'inline',
      [`${prefixCls}-hide-required-mark`]: hideRequiredMark
    });
    return (
        <form onSubmit={onSubmit} class={formClassName}>
          {$slots.default}
          {this.renderButtons()}
        </form>
    );
  }

  private getLayout() {
    if (this.inline) {
      return 'inline';
    } else {
      return this.layout;
    }
  }

  private renderButtons() {
    if (this.okCancel) {
      return <div class={this.prefixCls + '-footer-btns'}>
        {
          // @ts-ignore
          <DButton onClick={(e) => {
            this.$emit('cancel', e);
          }}>{this.cancelText}</DButton>
        }
        {
          // @ts-ignore
          <DButton
              onClick={(e) => {
                this.$emit('ok', e);
              }}
              type={'primary'}
              style={{marginLeft: '8px'}}>{this.okText}</DButton>
        }
      </div>;
    }
  }
}
