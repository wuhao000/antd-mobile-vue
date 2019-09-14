/* tslint:disable:jsx-no-multiline-js */
import classNames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';
import TouchFeedback from '../../vmc-feedback';

@Component({
  name: 'Brief'
})
export class Brief extends Vue {
  @Prop()
  public prefixCls?: string;
  @Prop()
  public role?: string;

  public render() {
    return (
        <div class="am-list-brief">
          {this.$slots.default}
        </div>
    );
  }
}

@Component({
  name: 'ListItem'
})
class Item extends Vue {
  @Prop({type: Boolean, default: false})
  public text: boolean;
  @Prop({default: 'am-list'})
  public prefixCls?: string;
  @Prop({type: String})
  public role?: string;
  @Prop({type: String, default: 'iOS'})
  public platform: 'android' | 'ios';
  @Prop({type: [String, Object]})
  public thumb: string | object;
  @Prop([String, Object])
  public extra: string | VNode;
  @Prop({type: String, default: 'right'})
  public extraPosition: 'left' | 'center' | 'right';
  @Prop({type: Object})
  public activeStyle: any;
  @Prop({type: Boolean, default: false})
  public multipleLine: boolean;
  @Prop({type: Boolean, default: false})
  public error: false;
  @Prop({type: String})
  public errorMessage: string;
  @Prop({type: Boolean, default: false})
  public disabled: false;
  @Prop({type: String, default: 'middle'})
  public align: 'top' | 'middle' | 'bottom';
  @Prop({type: Boolean})
  public wrap: boolean;
  @Prop({type: String})
  public arrow: 'horizontal' | 'down' | 'up' | 'empty' | '';
  @Prop({type: [String, Object], default: ''})
  public title: string | VNode;
  @Prop({type: String, default: 'left'})
  public labelPosition: 'top' | 'left';
  public static Brief = Brief;
  public debounceTimeout: any;
  public coverRippleStyle: any = {display: 'none'};
  public rippleClicked = false;
  @Inject({
    from: 'list', default: undefined
  })
  public list: any;
  @Prop({
    type: Object, default: () => {
      return {};
    }
  })
  public contentStyle: object;
  @Prop({
    type: Object, default: () => {
      return {};
    }
  })
  public extraStyle: object;
  @Prop({type: Boolean, default: true})
  public touchFeedback: boolean;
  @Prop()
  public suffix: VNode | undefined;
  @Prop({type: String, default: 'text'})
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

  public render() {
    const {
      prefixCls,
      activeStyle,
      align,
      wrap,
      disabled,
      multipleLine,
      arrow
    } = this.$props;
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
                        if (this.$toast && this.actualErrorDisplayType === 'toast') {
                          this.$toast.fail(this.actualErrorMessage);
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
              {this.$slots.suffix || this.suffix}
            </div> : null}
          </div>
          <div style={coverRippleStyle} class={rippleCls}/>
        </div>
    );

    return (
        // @ts-ignore
        <TouchFeedback
            disabled={disabled || !this.$listeners.click || !this.touchFeedback || (this.list && !this.list.touchFeedback)}
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
             })}>{this.$slots.extra || this.extra}
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
      return <div class={`${prefixCls}-thumb`}>{this.$slots.thumb}</div>;
    } else if (thumb) {
      return <div class={`${prefixCls}-thumb`}>
        {typeof thumb === 'string' ? <img src={thumb}/> : thumb}
      </div>;
    } else {
      return null;
    }
  }

  private renderLabel() {
    if (this.$slots.default !== undefined) {
      return (
          <div class={`${this.prefixCls}-content`}
               style={this.contentStyle}>{this.$slots.default}</div>
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
    return this.$slots.control ? <div class={this.prefixCls + '-control'}>{this.$slots.control}</div> : null;
  }
}

export default Item;
