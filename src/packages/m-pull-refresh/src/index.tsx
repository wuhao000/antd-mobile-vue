import {getScrollEventTarget, getScrollTop} from './util';
import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Icon from '../../ae-icon';
import {Indicator} from './prop-types';

function setTransform(nodeStyle: any, value: any) {
  nodeStyle.transform = value;
  nodeStyle.webkitTransform = value;
  nodeStyle.MozTransform = value;
}

const isWebView = typeof navigator !== 'undefined' &&
    /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
const DOWN = 'down';
const UP = 'up';
const INDICATOR = {
  activate: 'release',
  deactivate: 'pull',
  release: 'loading',
  finish: 'finish'
};

let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('test', null as any, opts);
} catch (e) {
  // empty
}
const willPreventDefault = supportsPassive ? {passive: false} : false;
// const willNotPreventDefault = supportsPassive ? { passive: true } : false;

type ICurrSt = 'activate' | 'deactivate' | 'release' | 'finish';

@Component({
  name: 'PullToRefresh'
})
export default class PullToRefresh extends Vue {
  @Prop({type: String, default: '松开刷新'})
  public activateText: string;
  @Prop({type: String, default: '取消刷新'})
  public deactivateText: string;
  @Prop({type: String, default: '刷新完成'})
  public finishText: string;
  @Prop({
    default: () => {
      return () => undefined;
    }
  })
  public getScrollContainer?: () => any;
  @Prop({type: String, default: DOWN})
  public direction?: 'down' | 'up';
  @Prop()
  public value?: boolean;
  @Prop({type: Number, default: 35})
  public distanceToRefresh?: number;
  @Prop({type: String, default: 'am-pull-to-refresh'})
  public prefixCls?: string;
  @Prop({type: Number, default: 80})
  public damping?: number;
  @Prop({type: Number, default: 40})
  public indicatorHeight: number;

  // https://github.com/yiminghe/zscroller/blob/2d97973287135745818a0537712235a39a6a62a1/src/Scroller.js#L355
  // currSt: `activate` / `deactivate` / `release` / `finish`
  public currSt: ICurrSt = 'deactivate';
  public dragOnEdge: boolean = false;
  private scrollEl: any;

  get containerRef(): HTMLDivElement {
    return this.$refs['container'] as HTMLDivElement;
  }

  get contentRef(): HTMLDivElement {
    return this.$refs['content'] as HTMLDivElement;
  }

  public _to: any;
  public _ScreenY: any;
  public _startScreenY: any;
  public _lastScreenY: number;
  public _timer: any;
  public _isMounted = false;
  @Prop()
  private className: string;

  get indicator(): Indicator {
    return {
      activate: this.activateText,
      deactivate: this.deactivateText,
      release: <Icon type={'loading'}/>,
      finish: this.finishText
    };
  }

  public updated() {
    if (!this.value) {
      // triggerPullToRefresh 需要尽可能减少 setState 次数
      this.triggerPullToRefresh();
    }
  }

  public mounted() {
    this.scrollEl = getScrollEventTarget(this.$el as HTMLElement);
    // `getScrollContainer` most likely return React.Node at the next tick. Need setTimeout
    setTimeout(() => {
      this.init(this.getScrollContainer() || this.containerRef);
      this.triggerPullToRefresh();
      this._isMounted = true;
    });
  }

  public beforeDestroy() {
    // Should have no setTimeout here!
    this.destroy(this.getScrollContainer() || this.containerRef);
  }

  public triggerPullToRefresh() {
    // 在初始化时、用代码 自动 触发 pullToRefresh
    // 注意：当 direction 为 up 时，当 visible length < content length 时、则看不到效果
    // 添加this._isMounted的判断，否则组建一实例化，currSt就会是finish
    if (!this.dragOnEdge && this._isMounted) {
      if (this.value) {
        if (this.direction === UP) {
          this._lastScreenY = -this.distanceToRefresh - 1;
        }
        if (this.direction === DOWN) {
          this._lastScreenY = this.distanceToRefresh + 1;
        }
        // change dom need after setState
        this.currSt = 'release';
        this.setContentStyle(this._lastScreenY);
      } else {
        this.currSt = 'finish';
        this.reset();
      }
    }
  }

  public init(ele: any) {
    if (!ele) {
      // like return in destroy fn ???!!
      return;
    }
    this._to = {
      touchstart: this.onTouchStart.bind(this).bind(this, ele),
      touchmove: this.onTouchMove.bind(this).bind(this, ele),
      touchend: this.onTouchEnd.bind(this).bind(this, ele),
      touchcancel: this.onTouchEnd.bind(this).bind(this, ele)
    };
    Object.keys(this._to).forEach(key => {
      ele.addEventListener(key, this._to[key], willPreventDefault);
    });
  }

  public destroy(ele: any) {
    if (!this._to || !ele) {
      // componentWillUnmount fire before componentDidMount, like forceUpdate ???!!
      return;
    }
    Object.keys(this._to).forEach(key => {
      ele.removeEventListener(key, this._to[key]);
    });
  }

  public onTouchStart(_ele: any, e: any) {
    this._ScreenY = this._startScreenY = e.touches[0].screenY;
    // 一开始 value 为 true 时 this._lastScreenY 有值
    this._lastScreenY = this._lastScreenY || 0;
  }

  public isEdge() {
    const direction = this.direction;
    const container = this.getScrollContainer() || this.containerRef;
    if (container && container === document.body) {
      // In chrome61 `document.body.scrollTop` is invalid
      const scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
      if (direction === UP) {
        return scrollNode.scrollHeight - scrollNode.scrollTop <= window.innerHeight;
      }
      if (direction === DOWN) {
        return scrollNode.scrollTop <= 0;
      }
    }
    const scrollTop = getScrollTop(this.scrollEl);
    if (direction === UP) {
      return this.scrollEl.scrollHeight - scrollTop === this.scrollEl.clientHeight;
    }
    if (direction === DOWN) {
      return scrollTop <= 0;
    }
    return undefined;
  }

  public dampingFunc(dy: number): number {
    if (Math.abs(this._lastScreenY) > this.damping) {
      return 0;
    }
    const ratio = Math.abs(this._ScreenY - this._startScreenY) / window.screen.height;
    return dy * (1 - ratio) * 0.6;
  }

  public onTouchMove(ele: any, e: any) {
    // 使用 pageY 对比有问题
    const _screenY = e.touches[0].screenY;

    // 拖动方向不符合的不处理
    if (this.direction === UP && this._startScreenY < _screenY ||
        this.direction === DOWN && this._startScreenY > _screenY) {
      return;
    }

    if (this.isEdge()) {
      if (!this.dragOnEdge) {
        // 当用户开始往上滑的时候isEdge还是false的话，会导致this._ScreenY不是想要的，只有当isEdge为true时，再上滑，才有意义
        // 下面这行代码解决了上面这个问题
        this._ScreenY = this._startScreenY = e.touches[0].screenY;
        this.dragOnEdge = true;
      }
      e.preventDefault();
      // add stopPropagation with fastclick will trigger content onClick event. why?
      // ref https://github.com/ant-design/ant-design-mobile/issues/2141
      // e.stopPropagation();

      const _diff = Math.round(_screenY - this._ScreenY);
      this._ScreenY = _screenY;
      this._lastScreenY += this.dampingFunc(_diff);

      this.setContentStyle(this._lastScreenY);

      if (Math.abs(this._lastScreenY) < this.distanceToRefresh) {
        if (this.currSt !== 'deactivate') {
          this.currSt = 'deactivate';
        }
      } else {
        if (this.currSt === 'deactivate') {
          this.currSt = 'activate';
        }
      }

      // https://github.com/ant-design/ant-design-mobile/issues/573#issuecomment-339560829
      // iOS UIWebView issue, It seems no problem in WKWebView
      if (isWebView && e.changedTouches[0].clientY < 0) {
        this.onTouchEnd();
      }
    }
  }

  public onTouchEnd() {
    if (this.dragOnEdge) {
      this.dragOnEdge = false;
    }
    if (this.currSt === 'activate') {
      this.currSt = 'release';
      this._timer = setTimeout(() => {
        if (!this.value) {
          this.currSt = 'finish';
          this.reset();
        }
        this._timer = undefined;
      }, 1000);
      this.setContentStyle(this.indicatorHeight);
      this.$emit('refresh');
      this.$emit('input', true);
    } else {
      this.reset();
    }
  }

  public reset() {
    this._lastScreenY = 0;
    this.setContentStyle(0);
  }

  public setContentStyle(ty: number) {
    // todos: Why sometimes do not have `this.contentRef` ?
    if (this.contentRef) {
      setTransform(this.contentRef.style, `translate3d(0px,${ty}px,0)`);
    }
  }

  public render() {
    const {
      prefixCls, getScrollContainer,
      direction, value, indicator, distanceToRefresh, ...restProps
    } = this;

    const renderChildren = <div>{this.$slots.default}</div>;

    const renderRefresh = (cls: string) => {
      const cla = classNames(cls, !this.dragOnEdge && `${prefixCls}-transition`);
      return (
          <div class={`${prefixCls}-content-wrapper`}>
            <div class={cla} ref={'content'}>
              {direction === UP ? renderChildren : null}
              <div class={`${prefixCls}-indicator`}>
                {indicator[this.currSt] || INDICATOR[this.currSt]}
              </div>
              {direction === DOWN ? renderChildren : null}
            </div>
          </div>
      );
    };

    if (getScrollContainer()) {
      return renderRefresh(`${prefixCls}-content ${prefixCls}-${direction}`);
    }
    return (
        <div
            ref={'container'}
            class={classNames(this.className, prefixCls, `${prefixCls}-${direction}`)}
            {...restProps}
        >
          {renderRefresh(`${prefixCls}-content`)}
        </div>
    );
  }
}
