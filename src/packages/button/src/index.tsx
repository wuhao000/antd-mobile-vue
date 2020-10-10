import classnames from 'classnames';
import {VNode} from 'vue';
import {Options, Vue} from 'vue-class-component';
import IconRes, {IconResProps} from '../../mixins/icon-res';
import TouchFeedback from '../../vmc-feedback';

const httpReg = /^http(s)?:\/\//;

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isString(str: any) {
  return typeof str === 'string';
}

@Options({
  inheritAttrs: false,
  name: 'MButton',
  props: {
    prefixCls: {type: String, default: 'am-button'},
    role: {type: String},
    inline: {type: Boolean, default: false},
    icon: {type: [String, Object]},
    activeClassName: {type: String},
    activeStyle: {
      type: [Boolean, Object],
      default: () => {
        return {};
      }
    },
    type: {type: String},
    size: {type: String, default: 'large'},
    disabled: {type: Boolean, default: false},
    loading: {type: Boolean, default: false}
  }
})
class MButton extends Vue {
  public prefixCls?: string;
  public role?: string;
  public inline?: boolean;
  public icon?: IconResProps | string | VNode;
  public activeClassName?: string;
  public activeStyle?: boolean | object;
  public type?: 'primary' | 'warning' | 'ghost';
  public size?: 'large' | 'small';
  public disabled?: boolean;
  public loading?: boolean;
  public static install: (Vue) => void;

  public insertSpace(child: any) {
    if (isString(child.text) && isTwoCNChar(child.text)) {
      return <span>{child.text.split('').join(' ')}</span>;
    }
    return child;
  }

  public render(): any {
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

    const kids = this.$slots.default ? this.$slots.default().map(this.insertSpace) : '';

    let iconEl;

    if (typeof iconType === 'string') {
      iconEl = (
        <IconRes
          class={`${prefixCls}-icon`}
          // @ts-ignore
          {...{
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
        <a role="button"
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

export default MButton as any;
