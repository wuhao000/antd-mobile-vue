import {computed, defineComponent, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, PropType, Ref, ref, watch} from 'vue';
import Popup from '../../popup';
import TouchFeedback from '../../vmc-feedback';

const ActionSheet = defineComponent({
  install: null,
  name: 'ActionSheet',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-action-sheet'
    },
    /**
     * 取消按钮文本
     */
    cancelText: {
      type: String as PropType<string>,
      default: '取消'
    },
    /**
     * 是否在点击遮罩层时关闭
     */
    closeOnClickingMask: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    /**
     * 是否在点击按钮后关闭
     */
    closeOnClickingMenu: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    menus: {
      type: [Object, Array] as PropType<any[]>,
      default: () => []
    },
    /**
     * 是否显示取消按钮
     */
    showCancel: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    theme: {
      type: String as PropType<string>,
      default: 'ios'
    },
    value: {
      type: Boolean as PropType<boolean>
    },
    type: {
      type: String as PropType<'normal' | 'share'>,
      default: 'normal'
    },
    title: {
      type: String as PropType<string>
    }
  },
  setup(props, {emit, slots}) {
    const $tabbar: Ref<Element> = ref(null);
    const hasHeaderSlot = ref(false);
    const show = ref(props.value || false);
    const iOSMenuRef = ref(null);
    watch(() => show.value, (val) => {
      emit('input', val);
      if (val) {
        fixIos(-1);
      } else {
        setTimeout(() => {
          fixIos(100);
        }, 200);
      }
    });
    watch(() => props.value, (val) => {
      show.value = val;
    }, {
      immediate: true
    });
    const showStyle = computed(() => {
      const style: any = {};
      if (!show.value) {
        style.display = 'none';
      }
      return style;
    });
    const listClassPrefix = computed(() => {
      return props.prefixCls + '-button-list';
    });
    const cancelClick = () => {
      emit('input', false);
      show.value = false;
    };
    const emitEvent = (event, menu, item) => {
      if (event === 'on-click-menu' && !/.noop/.test(menu)) {
        let _item = item;
        if (typeof _item === 'object') {
          _item = JSON.parse(JSON.stringify(_item));
        }
        emit(event, menu, _item);
        emit(`${event}-${menu}`);
        props.closeOnClickingMenu && (show.value = false);
      }
    };
    const instance = getCurrentInstance();
    const fixIos = (zIndex) => {
      if (instance.vnode.el.parentNode && (instance.vnode.el.parentNode as Element).className.indexOf('v-transfer-dom') !== -1) {
        return;
      }
      if ($tabbar.value && /iphone/i.test(navigator.userAgent)) {
        ($tabbar.value as HTMLElement).style.zIndex = zIndex;
      }
    };
    const onClickingMask = () => {
      emit('click-mask');
      props.closeOnClickingMask && (show.value = false);
    };
    const onMenuClick = (text, key) => {
      if (typeof text === 'string') {
        emitEvent('click-menu', key, text);
      } else {
        if (text.type !== 'disabled' && text.type !== 'info') {
          if (text.value || text.value === 0) {
            emitEvent('click-menu', text.value, text);
          } else {
            emitEvent('click-menu', '', text);
            show.value = false;
          }
        }
      }
    };
    const onTransitionEnd = () => {
      emit(show.value ? 'on-after-show' : 'on-after-hide');
    };
    const renderSheet = () => {
      if (props.theme === 'android') {
        return <div class="weui-skin_android">
          <transition name="vux-android-actionsheet"
                      onAfterEnter={() => {
                        emit('after-show');
                      }}
                      onAfterLeave={() => {
                        emit('after-hide');
                      }}>
            <div style={showStyle.value}
                 class="weui-actionsheet">
              <div class="weui-actionsheet__menu">
                {renderButtons()}
              </div>
            </div>
          </transition>
        </div>;
      } else {
        return <div ref={(el) => {
          iOSMenuRef.value = el;
        }}>
          <div class="am-action-sheet-content">
            <div class="am-action-sheet-body">
              <div>
                {renderTitle()}
                {renderButtons()}
              </div>
            </div>
          </div>
        </div>;
      }
    };
    const renderButtons = () => {
      return (<div class={listClassPrefix.value} role="group">
        {props.menus.map(it => renderMenu(it))}
        {props.showCancel ? renderCancelButton() : null}
      </div>);
    };
    const renderTitle = () => {
      return props.title ? <div class={props.prefixCls + '-message'}>{props.title}</div> : null;
    };
    const renderMenu = (menu: any) => {
      const MTouchFeedback = TouchFeedback as any;
      const itemClassPrefix = listClassPrefix.value + '-item';
      const classes = {
        [itemClassPrefix]: true,
        [listClassPrefix.value + '-badge']: menu.badge
      };
      return <MTouchFeedback activeClassName={itemClassPrefix + '-active'}>
        <div class={classes} role="button">
          <span class={itemClassPrefix + '-content'}>{menu.label}</span>
          {renderBadge(menu.badge)}
        </div>
      </MTouchFeedback>;
    };
    const renderBadge = (badge: string | boolean | number | undefined) => {
      if (badge) {
        const supClass = typeof badge === 'boolean' ? 'am-badge-dot' : 'am-badge-text';
        return badge ? <span class="am-badge am-badge-not-a-wrapper">
                <sup class={supClass}>
                  {typeof badge === 'boolean' ? null : badge}
                </sup>
              </span> : null;
      }
    };
    const renderCancelButton = () => {
      const MTouchFeedback = TouchFeedback as any;
      const itemClassPrefix = listClassPrefix.value + '-item';
      const classes = itemClassPrefix + ` ${props.prefixCls}-cancel-button`;
      return <MTouchFeedback activeClassName={itemClassPrefix + '-active'}>
        <div class={classes} role="button"
             onClick={cancelClick}>
          <span class={itemClassPrefix + '-content'}>取消</span>
          <span class={props.prefixCls + '-cancel-button-mask'}/>
        </div>
      </MTouchFeedback>;
    };
    onMounted(() => {
      hasHeaderSlot.value = !!slots.header?.();
      nextTick(() => {
        $tabbar.value = document.querySelector('.weui-tabbar');
        iOSMenuRef.value && (iOSMenuRef.value as any).addEventListener('transitionend', onTransitionEnd);
      });
    });
    onBeforeUnmount(() => {
      fixIos(100);
      iOSMenuRef.value && (iOSMenuRef.value as any).removeEventListener('transitionend', onTransitionEnd);
    });

    return {
      cancelClick, renderSheet, show
    };
  },
  render() {
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
});

export default ActionSheet;
