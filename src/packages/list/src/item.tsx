/* tslint:disable:jsx-no-multiline-js */
import classNames from 'classnames';
import {VNode} from 'vue';
import {Options, Vue} from 'vue-class-component';
import TouchFeedback from '../../vmc-feedback';
import toast from '../../toast';

@Options({
  name: 'Brief',
  props: {
    prefixCls: {},
    role: {}
  }
})
export class Brief extends Vue {
  public prefixCls?: string;
  public role?: string;

  public render(): any {
    return (
      <div class="am-list-brief">
        {this.$slots.default()}
      </div>
    );
  }
}

@Options({
  name: 'ListItem',
  props: {
    text: {type: Boolean, default: false},
    prefixCls: {default: 'am-list'},
    role: {type: String},
    platform: {type: String, default: 'iOS'},
    thumb: {type: [String, Object]},
    extra: [String, Object],
    extraPosition: {type: String, default: 'right'},
    activeStyle: {type: Object},
    multipleLine: {type: Boolean, default: false},
    error: {type: Boolean, default: false},
    errorMessage: {type: String},
    disabled: {type: Boolean, default: false},
    align: {type: String, default: 'middle'},
    wrap: {type: Boolean},
    arrow: {type: String},
    title: {type: [String, Object], default: ''},
    labelPosition: {type: String, default: 'left'},
    contentStyle: {
      type: Object, default: () => {
        return {};
      }
    },
    extraStyle: {
      type: Object, default: () => {
        return {};
      }
    },
    touchFeedback: {type: Boolean, default: true},
    required: {type: Boolean, default: false},
    suffix: {},
    errorDisplayType: {type: String, default: 'text'}
  },
  inject: {
    list: {
      from: 'list', default: undefined
    }
  }
})
class Item extends Vue {
  public text: boolean;
  public prefixCls?: string;
  public role?: string;
  public platform: 'android' | 'ios';
  public thumb: string | object;
  public extra: string | VNode;
  public extraPosition: 'left' | 'center' | 'right';
  public activeStyle: any;
  public multipleLine: boolean;
  public error: false;
  public errorMessage: string;
  public disabled: false;
  public align: 'top' | 'middle' | 'bottom';
  public wrap: boolean;
  public arrow: 'horizontal' | 'down' | 'up' | 'empty' | '';
  public title: string | VNode;
  public labelPosition: 'top' | 'left';
  public static Brief = Brief;
  public debounceTimeout: any;
  public coverRippleStyle: any = {display: 'none'};
  public rippleClicked = false;
  public list: any;
  public contentStyle: object;
  public extraStyle: object;
  public touchFeedback: boolean;
  public required: boolean;
  public suffix: VNode | undefined;
  private errorDisplayType: 'toast' | 'popover' | 'text';
  private showErrorPopover: boolean = false;

  public beforeDestroy() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  }

  public onClick(ev: any) {
    const isAndroid = this.platform === 'android';
    if (isAndroid) {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = null;
      }
      const Item = ev.currentTarget;
      const RippleWidth = Math.max(Item.offsetHeight, Item.offsetWidth);
      const ClientRect = ev.currentTarget.getBoundingClientRect();
      const pointX = ev.clientX - ClientRect.left - Item.offsetWidth / 2;
      const pointY = ev.clientY - ClientRect.top - Item.offsetWidth / 2;
      this.coverRippleStyle = {
        width: `${RippleWidth}px`,
        height: `${RippleWidth}px`,
        left: `${pointX}px`,
        top: `${pointY}px`
      };
      this.rippleClicked = true;
      this.debounceTimeout = setTimeout(() => {
        this.coverRippleStyle = {display: 'none'};
        this.rippleClicked = false;
      }, 1000);
    }
    this.$emit('click');
  }

  get actualError() {
    return this.error || this.$parent['error'];
  }

  get actualErrorMessage() {
    return this.errorMessage || this.$parent['errorMessage'];
  }

  get actualDisabled() {
    return this.disabled;
  }

  get actualErrorDisplayType() {
    return this.errorDisplayType && this.$parent['errorDisplayType'];
  }

  public render(): any {
    const {
      prefixCls,
      activeStyle,
      align,
      wrap,
      disabled,
      multipleLine,
      arrow
    } = this;
    const {coverRippleStyle, rippleClicked} = this;
    const section = this.$parent['section'];
    const actualError = this.actualError;
    const wrapCls = classNames(`${prefixCls}-item`,
      `${prefixCls}-item-label-` + this.labelPosition,
      {
        [`${prefixCls}-item-disabled`]: this.actualDisabled,
        [`${prefixCls}-item-error`]: actualError,
        [`${prefixCls}-item-error-text`]: actualError && this.actualErrorDisplayType === 'text',
        [`${prefixCls}-item-top`]: align === 'top',
        [`${prefixCls}-item-middle`]: align === 'middle',
        [`${prefixCls}-item-bottom`]: align === 'bottom',
        [`${prefixCls}-item-section`]: section,
        [`${prefixCls}-item-extra-left`]: this.extraPosition === 'left',
        [`${prefixCls}-item-extra-center`]: this.extraPosition === 'center',
        [`${prefixCls}-item-extra-right`]: this.extraPosition === 'right'
      });

    const rippleCls = classNames(`${prefixCls}-ripple`, {
      [`${prefixCls}-ripple-animate`]: rippleClicked
    });

    const lineCls = classNames(`${prefixCls}-line`, {
      [`${prefixCls}-line-multiple`]: multipleLine,
      [`${prefixCls}-line-wrap`]: wrap
    });

    const arrowCls = classNames(`${prefixCls}-arrow`, {
      [`${prefixCls}-arrow-horizontal`]: arrow === 'horizontal',
      [`${prefixCls}-arrow-vertical`]: arrow === 'down' || arrow === 'up',
      [`${prefixCls}-arrow-vertical-up`]: arrow === 'up'
    });
    const content = (
      <div onClick={this.onClick} class={wrapCls}>
        {this.renderThumb()}
        <div class={lineCls}>
          {this.renderLabel()}
          {this.renderControl()}
          {this.renderExtra()}
          {arrow && <div class={arrowCls}
                         aria-hidden="true"/>}
          {this.actualError && this.errorDisplayType !== 'text' ? (
            <div
              class={`${prefixCls}-error-extra`}
              onClick={(e) => {
                if (this.actualErrorMessage) {
                  if (this.actualErrorDisplayType === 'toast') {
                    toast.fail(this.actualErrorMessage);
                  }
                  if (this.actualErrorDisplayType === 'popover' && !this.showErrorPopover) {
                    this.showErrorPopover = true;
                  }
                }
                this.$emit('error-click', e);
                this.$emit('errorClick', e);
              }}>
              <m-popover vModel={this.showErrorPopover}
                         mask={false}>
                <m-popover-item slot="content">
                  {this.errorMessage}
                </m-popover-item>
              </m-popover>
            </div>

          ) : null}
          {this.$slots.suffix || this.suffix ? <div class={this.prefixCls + '-suffix'}>
            {this.$slots.suffix?.() || this.suffix}
          </div> : null}
        </div>
        <div style={coverRippleStyle} class={rippleCls}/>
      </div>
    );

    return (
      // @ts-ignore
      <TouchFeedback
        disabled={disabled || !this.$attrs.onClick || !this.touchFeedback || (this.list && !this.list.touchFeedback)}
        activeStyle={activeStyle}
        activeClassName={`${prefixCls}-item-active`}>
        {content}
      </TouchFeedback>
    );
  }

  private renderExtra() {
    return (this.$slots.extra !== undefined || this.extra) ? (
      <div style={this.extraStyle}
           class={classNames(`${this.prefixCls}-extra`, {
             [this.prefixCls + '-extra-text']: this.text
           })}>{this.$slots.extra?.() || this.extra}
        {
          this.errorDisplayType === 'text' && this.actualError && this.actualErrorMessage ?
            <div>
              {this.actualErrorMessage}
            </div> : null
        }
      </div>
    ) : null;
  }

  private renderThumb() {
    const {thumb, prefixCls} = this;
    if (this.$slots.thumb) {
      return <div class={`${prefixCls}-thumb`}>{this.$slots.thumb()}</div>;
    } else if (thumb) {
      return <div class={`${prefixCls}-thumb`}>
        {typeof thumb === 'string' ? <img src={thumb}/> : thumb}
      </div>;
    } else if (this.required) {
      return <div class={`${prefixCls}-required`}/>;
    } else {
      return null;
    }
  }

  private renderLabel() {
    if (this.$slots.default !== undefined) {
      return (
        <div class={`${this.prefixCls}-content`}
             style={this.contentStyle}>{this.$slots.default()}</div>
      );
    } else if (this.title) {
      return (
        <div class={`${this.prefixCls}-content`}
             style={this.contentStyle}>{this.title}</div>
      );
    } else {
      return null;
    }
  }

  private renderControl() {
    return this.$slots.control ? <div class={this.prefixCls + '-control'}>{this.$slots.control()}</div> : null;
  }
}

export default Item;
