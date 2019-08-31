import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import {FormComponent} from '../../../mixins/form-component';

@Component({
  name: 'MSwitch'
})
export default class Switch extends FormComponent {

  @Prop({type: String})
  public color?: string;
  @Prop({type: String})
  public name?: string;
  @Prop({type: String, default: 'am-switch'})
  public prefixCls?: string;
  @Prop({type: String, default: 'ios'})
  public platform: string;


  public onChange(e) {
    this.currentValue = e.target.checked;
  }

  public onClick(e: any) {
    let val;
    // tslint:disable-next-line:prefer-conditional-expression
    if (e && e.target && e.target.checked !== undefined) {
      val = e.target.checked;
    } else {
      val = this.value;
    }
    this.currentValue = val;
  }

  public render() {
    const {
      prefixCls,
      name,
      disabled,
      platform,
      color,
      ...restProps
    } = this;
    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-android`]: platform === 'android'
    });

    const fackInputCls = classnames('checkbox', {
      [`checkbox-disabled`]: disabled
    });

    const globalProps = Object.keys(restProps).reduce<{
      [key: string]: any;
    }>((prev, key) => {
      if (
        key.substr(0, 5) === 'aria-' ||
        key.substr(0, 5) === 'data-' ||
        key === 'role'
      ) {
        prev[key] = (restProps as any)[key];
      }
      return prev;
    }, {});

    const style: any = {};
    if (color && this.currentValue) {
      style.backgroundColor = color;
    }

    return (
      <label class={wrapCls}>
        <input
          type={'checkbox'}
          name={name}
          class={`${prefixCls}-checkbox`}
          disabled={disabled}
          checked={this.currentValue}
          onChange={this.onChange}
          value={this.currentValue ? 'on' : 'off'}
          {...(!disabled ? {onClick: this.onClick} : {})}
          {...globalProps}
        />
        <div
          class={fackInputCls}
          style={style}
          {...(disabled ? {onClick: this.onClick} : {})}
        />
      </label>
    );
  }
}
