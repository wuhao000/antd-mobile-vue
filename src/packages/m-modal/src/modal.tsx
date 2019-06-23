import classnames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Model, Prop, Watch} from 'vue-property-decorator';
import Dialog from '../../../ant/vc-dialog';
import TouchFeedback from '../../vmc-feedback';
import {Action} from './props-type';

export abstract class ModalComponent extends Vue {
  public static alert: (title: (string | VNode),
                        message: (string | VNode),
                        actions?: { text: string }[],
                        platform?: string) => ({
    close: () => void
  } | Promise<any>);
  public static confirm: (title: (string | VNode),
                          message: (string | VNode),
                          actions?: { text: string }[],
                          platform?: string) => { close: () => void } | Promise<any>;
  public static prompt: (title: (string | VNode),
                         message: (string | VNode),
                         callbackOrActions?: Array<{ text: string, style?: object }>,
                         type?: string, defaultValue?: string, placeholders?: string[], platform?: string) => ({ close: () => void } | Promise<any>);

  public static operation: (
      actions: Array<Action<any>>,
      platform?: string
  ) => { close: () => void };
}

@Component({
  name: 'Modal'
})
export default class Modal extends ModalComponent {
  @Prop({default: 'am-modal'})
  public prefixCls?: string;
  @Prop({type: String})
  public transitionName?: string;
  @Prop({type: String})
  public maskTransitionName?: string;
  @Prop({type: String})
  public wrapClassName?: string;
  @Prop()
  public wrapProps?: Partial<any>;
  @Prop({type: String, default: 'ios'})
  public platform?: string;
  @Prop()
  public bodyStyle?: any;
  @Prop()
  public title?: string | VNode;
  @Model('change', {type: Boolean, default: false})
  public visible: boolean;
  @Prop({type: Boolean, default: true})
  public maskClosable?: boolean;
  @Prop({type: Boolean, default: false})
  public closable?: boolean;
  @Prop({
    default: () => {
      return [];
    }
  })
  public footer?: Array<Action<any>>;
  @Prop({type: [String, Object]})
  public className: string | object;
  @Prop()
  public onClose?: () => void;
  @Prop({type: Boolean, default: false})
  public transparent?: boolean;
  @Prop({type: Boolean, default: false})
  public popup?: boolean;
  @Prop({type: Boolean, default: true})
  public animated?: boolean;
  @Prop({type: String, default: 'slide-down'})
  public animationType?: any;
  @Prop()
  public onAnimationEnd?: (visible: boolean) => void;
  @Prop({type: Boolean})
  public animateAppear?: boolean;
  @Prop({type: Boolean, default: false})
  public operation?: boolean;
  public static install: (Vue) => void;
  public state = {
    visible: this.visible
  };


  @Watch('visible')
  public visibleChanged(visible: boolean) {
    this.state.visible = visible;
  }

  public renderFooterButton(button: Action<any>, prefixCls: string | undefined, i: number) {
    let buttonStyle = {};
    if (button.style) {
      buttonStyle = button.style;
      if (typeof buttonStyle === 'string') {
        const styleMap: {
          [key: string]: object;
        } = {
          cancel: {},
          default: {},
          destructive: {color: 'red'}
        };
        buttonStyle = styleMap[buttonStyle] || {};
      }
    }

    const onClickFn = (e: any) => {
      e.preventDefault();
      if (button.onPress) {
        button.onPress();
      }
    };

    return (
        // @ts-ignore
        <TouchFeedback activeClassName={`${prefixCls}-button-active`} key={i}>
          <a
              class={`${prefixCls}-button`}
              role={'button'}
              style={buttonStyle}
              onClick={onClickFn}
          >
            {button.text || `Button`}
          </a>
        </TouchFeedback>
    );
  }

  public render() {
    const {
      prefixCls,
      wrapClassName,
      transitionName,
      maskTransitionName,
      platform,
      footer = [],
      operation,
      animated,
      transparent,
      popup,
      animationType,
      ...restProps
    } = this.$props;

    const btnGroupClass = classnames(
        `${prefixCls}-button-group-${
            footer.length === 2 && !operation ? 'h' : 'v'
            }`,
        `${prefixCls}-button-group-${operation ? 'operation' : 'normal'}`
    );
    const footerDom = footer.length ? (
        <div class={btnGroupClass} role={'group'}>
          {footer.map((button, i) =>
              // tslint:disable-next-line:jsx-no-multiline-js
              this.renderFooterButton(button, prefixCls, i)
          )}
        </div>
    ) : null;

    let transName;
    let maskTransName;
    if (animated) {
      // tslint:disable-next-line:prefer-conditional-expression
      if (transparent) {
        transName = maskTransName = 'am-fade';
      } else {
        transName = maskTransName = 'am-slide-up';
      }
      if (popup) {
        transName =
            animationType === 'slide-up' ? 'am-slide-up' : 'am-slide-down';
        maskTransName = 'am-fade';
      }
    }

    const wrapCls = classnames(wrapClassName, {
      [`${prefixCls}-wrap-popup`]: popup
    });
    const cls = classnames(this.className, {
      [`${prefixCls}-transparent`]: transparent,
      [`${prefixCls}-popup`]: popup,
      [`${prefixCls}-popup-${animationType}`]: popup && animationType,
      [`${prefixCls}-android`]: platform === 'android'
    });
    return (
        // @ts-ignore
        <Dialog
            attrs={{...restProps}}
            maskClosable={this.maskClosable}
            visible={this.visible}
            prefixCls={prefixCls}
            title={this.title}
            closable={this.closable}
            class={cls}
            onClose={this.onClose || ((e) => {
              this.$emit('change', false);
              this.$emit('close', e);
            })}
            wrapClassName={wrapCls}
            transitionName={transitionName || transName}
            maskTransitionName={maskTransitionName || maskTransName}
            footer={footerDom}
        >{this.$slots.default}</Dialog>
    );
  }
}
