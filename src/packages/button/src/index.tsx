import classnames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import IconRes, {IconResProps} from '../../../mixins/icon-res';
import TouchFeedback from '../../vmc-feedback';

const httpReg = /^http(s)?:\/\//;

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isString(str: any) {
  return typeof str === 'string';
}

@Component({
  name: 'Button'
})
class Button extends Vue {
  @Prop({type: String, default: 'am-button'})
  public prefixCls?: string;
  @Prop({type: String})
  public role?: string;
  @Prop({type: Boolean, default: false})
  public inline?: boolean;
  @Prop({type: [String, Object]})
  public icon?: IconResProps | string | VNode;
  @Prop({type: String})
  public activeClassName?: string;
  @Prop({
    type: [Boolean, Object],
    default: () => {
      return {};
    }
  })
  public activeStyle?: boolean | object;
  @Prop({type: String})
  public type?: 'primary' | 'warning' | 'ghost';
  @Prop({type: String, default: 'large'})
  public size?: 'large' | 'small';
  @Prop({type: Boolean, default: false})
  public disabled?: boolean;
  @Prop({type: Boolean, default: false})
  public loading?: boolean;
  public static install: (Vue) => void;

  public insertSpace(child: any) {
    if (isString(child.text) && isTwoCNChar(child.text)) {
      return <span>{child.text.split('').join(' ')}</span>;
    }
    return child;
  }

  public render() {
    const {
      prefixCls,
      type,
      size,
      inline,
      disabled,
      icon,
      loading,
      activeStyle,
      activeClassName
    } = this;

    const iconType: any = loading ? 'loading' : icon;
    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-primary`]: type === 'primary',
      [`${prefixCls}-ghost`]: type === 'ghost',
      [`${prefixCls}-warning`]: type === 'warning',
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-inline`]: inline,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-icon`]: !!iconType
    });

    const kids = this.$slots.default ? this.$slots.default.map(this.insertSpace) : '';

    let iconEl;

    if (typeof iconType === 'string') {
      iconEl = (
        <IconRes
          class={`${prefixCls}-icon`}
          // @ts-ignore
          props={{
            type: httpReg.test(iconType) ? iconType : {
              mobile: true,
              iconType: 'icon',
              type: iconType,
              size: size === 'small' ? 'xxs' : 'md'
            }
          }}/>
      );
    } else if (iconType) {
      const cls = classnames(
        'am-icon',
        `${prefixCls}-icon`,
        size === 'small' ? 'am-icon-xxs' : 'am-icon-md'
      );
      iconEl = (
        // @ts-ignore
        <IconRes class={cls} props={{type: iconType}}/>
      );
    }
    // use div, button native is buggy @yiminghe
    return (
      // @ts-ignore
      <TouchFeedback
        // tslint:disable-next-line:jsx-no-multiline-js
        activeClassName={
          activeClassName || (activeStyle ? `${prefixCls}-active` : undefined)}
        disabled={disabled}
        activeStyle={activeStyle}>
        <a role={'button'}
           class={wrapCls}
           onClick={(e) => {
             if (!this.disabled) {
               this.$emit('click', e);
             }
           }}
           aria-disabled={disabled}>
          {iconEl}
          {kids}
        </a>
      </TouchFeedback>
    );
  }
}

export default Button as any;
