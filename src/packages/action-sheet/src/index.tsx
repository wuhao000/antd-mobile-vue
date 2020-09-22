import {Options, Vue} from 'vue-class-component';
import Popup from '../../popup';
import TouchFeedback from '../../vmc-feedback';
import { VNode } from 'vue';

interface ActionSheetMenu {
  label?: string | VNode;
  badge?: string | boolean | number | undefined
}

@Options({
  name: 'ActionSheet',
  props: {
    prefixCls: {type: String, default: 'am-action-sheet'},
    cancelText: {type: String, default: '取消'},
    closeOnClickingMask: {
      type: Boolean,
      default: true
    },
    closeOnClickingMenu: {
      type: Boolean,
      default: true
    },
    menus: {
      type: [Object, Array],
      default: () => []
    },
    showCancel: {type: Boolean, default: true},
    theme: {
      type: String,
      default: 'ios'
    },
    value: Boolean,
    type: {type: String, default: 'normal'},
    title: {type: String}
  },
  watch: {
    show(val) {
      this.$emit('input', val);
      if (val) {
        this.fixIos(-1);
      } else {
        setTimeout(() => {
          this.fixIos(100);
        }, 200);
      }
    },
    value: {
      immediate: true,
      handler(val) {
        this.show = val;
      }
    }
  }
})

class ActionSheet extends Vue {
  public prefixCls: string;
  /**
   * 取消按钮文本
   */
  public cancelText: string;
  /**
   * 是否在点击遮罩层时关闭
   */
  public closeOnClickingMask: boolean;
  /**
   * 是否在点击按钮后关闭
   */
  public closeOnClickingMenu: boolean;
  public menus: any[];
  /**
   * 是否显示取消按钮
   */
  public showCancel: boolean;
  public theme: string;
  public value: boolean;
  private tabbar: Element = null;
  public hasHeaderSlot = false;
  public show = this.value || false;
  public type: 'normal' | 'share';
  private title: string;
  public static install: (Vue) => void;

  private cancelClick() {
    this.$emit('input', false);
    this.show = false;
  }

  public mounted() {
    this.hasHeaderSlot = !!this.$slots.header;
    this.$nextTick(() => {
      this.tabbar = document.querySelector('.weui-tabbar');
      this.$refs.iOSMenu && (this.$refs.iOSMenu as any).addEventListener('transitionend', this.onTransitionEnd);
    });
  }

  public beforeDestroy() {
    this.fixIos(100);
    this.$refs.iOSMenu && (this.$refs.iOSMenu as any).removeEventListener('transitionend', this.onTransitionEnd);
  }

  public emitEvent(event, menu, item) {
    if (event === 'on-click-menu' && !/.noop/.test(menu)) {
      let _item = item;
      if (typeof _item === 'object') {
        _item = JSON.parse(JSON.stringify(_item));
      }
      this.$emit(event, menu, _item);
      this.$emit(`${event}-${menu}`);
      this.closeOnClickingMenu && (this.show = false);
    }
  }

  public fixIos(zIndex) {
    if (this.$el.parentNode && (this.$el.parentNode as Element).className.indexOf('v-transfer-dom') !== -1) {
      return;
    }
    if (this.tabbar && /iphone/i.test(navigator.userAgent)) {
      (this.tabbar as HTMLElement).style.zIndex = zIndex;
    }
  }

  public onClickingMask() {
    this.$emit('click-mask');
    this.closeOnClickingMask && (this.show = false);
  }

  public onMenuClick(text, key) {
    if (typeof text === 'string') {
      this.emitEvent('click-menu', key, text);
    } else {
      if (text.type !== 'disabled' && text.type !== 'info') {
        if (text.value || text.value === 0) {
          this.emitEvent('click-menu', text.value, text);
        } else {
          this.emitEvent('click-menu', '', text);
          this.show = false;
        }
      }
    }
  }

  public onTransitionEnd() {
    this.$emit(this.show ? 'on-after-show' : 'on-after-hide');
  }

  get showStyle() {
    const style: any = {};
    if (!this.show) {
      style.display = 'none';
    }
    return style;
  }

  public renderSheet() {
    if (this.theme === 'android') {
      return <div class="weui-skin_android">
        <transition name="vux-android-actionsheet"
                    onAfterEnter={() => {
                      this.$emit('after-show');
                    }}
                    onAfterLeave={() => {
                      this.$emit('after-hide');
                    }}>
          <div style={this.showStyle}
               class="weui-actionsheet">
            <div class="weui-actionsheet__menu">
              {this.renderButtons()}
            </div>
          </div>
        </transition>
      </div>;
    } else {
      return <div ref="iOSMenu">
        <div class="am-action-sheet-content">
          <div class="am-action-sheet-body">
            <div>
              {this.renderTitle()}
              {this.renderButtons()}
            </div>
          </div>
        </div>
      </div>;
    }
  }

  public render(): any {
    const classes = 'am-action-sheet am-action-sheet-' + this.type;
    // @ts-ignore
    return <Popup value={this.show}
                  wrapClassName={classes}
                  onCancel={this.cancelClick}>
      <div>
        {this.renderSheet()}
      </div>
    </Popup>;
  }

  get listClassPrefix() {
    return this.prefixCls + '-button-list';
  }

  private renderButtons() {
    return (<div class={this.listClassPrefix} role="group">
      {this.menus.map(it => this.renderMenu(it))}
      {this.showCancel ? this.renderCancelButton() : null}
    </div>);
  }

  private renderTitle() {
    return this.title ? <div class={this.prefixCls + '-message'}>{this.title}</div> : null;
  }

  private renderMenu(menu: ActionSheetMenu) {
    const MTouchFeedback = TouchFeedback as any;
    const itemClassPrefix = this.listClassPrefix + '-item';
    const classes = {
      [itemClassPrefix]: true,
      [this.listClassPrefix + '-badge']: menu.badge
    };
    return <MTouchFeedback activeClassName={itemClassPrefix + '-active'}>
      <div class={classes} role="button">
        <span class={itemClassPrefix + '-content'}>{menu.label}</span>
        {this.renderBadge(menu.badge)}
      </div>
    </MTouchFeedback>;
  }

  private renderBadge(badge: string | boolean | number | undefined) {
    if (badge) {
      const supClass = typeof badge === 'boolean' ? 'am-badge-dot' : 'am-badge-text';
      return badge ? <span class="am-badge am-badge-not-a-wrapper">
          <sup class={supClass}>
            {typeof badge === 'boolean' ? null : badge}
          </sup>
        </span> : null;
    }
  }

  private renderCancelButton() {
    const MTouchFeedback = TouchFeedback as any;
    const itemClassPrefix = this.listClassPrefix + '-item';
    const classes = itemClassPrefix + ` ${this.prefixCls}-cancel-button`;
    return <MTouchFeedback activeClassName={itemClassPrefix + '-active'}>
      <div class={classes} role="button"
           onClick={this.cancelClick}>
        <span class={itemClassPrefix + '-content'}>取消</span>
        <span class={this.prefixCls + '-cancel-button-mask'}/>
      </div>
    </MTouchFeedback>;
  }
}

export default ActionSheet;
