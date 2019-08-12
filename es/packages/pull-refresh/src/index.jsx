import * as tslib_1 from "tslib";
import { getScrollEventTarget, getScrollTop } from './util';
import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
const Icon = aegis.AeIcon;
function setTransform(nodeStyle, value) {
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
    window.addEventListener('test', null, opts);
}
catch (e) {
    // empty
}
const willPreventDefault = supportsPassive ? { passive: false } : false;
let PullToRefresh = class PullToRefresh extends Vue {
    constructor() {
        super(...arguments);
        // https://github.com/yiminghe/zscroller/blob/2d97973287135745818a0537712235a39a6a62a1/src/Scroller.js#L355
        // currSt: `activate` / `deactivate` / `release` / `finish`
        this.currSt = 'deactivate';
        this.dragOnEdge = false;
        this._isMounted = false;
    }
    get containerRef() {
        return this.$refs['container'];
    }
    get contentRef() {
        return this.$refs['content'];
    }
    get indicator() {
        return {
            activate: this.activateText,
            deactivate: this.deactivateText,
            release: <Icon type={'loading'}/>,
            finish: this.finishText
        };
    }
    updated() {
        if (!this.value) {
            // triggerPullToRefresh 需要尽可能减少 setState 次数
            this.triggerPullToRefresh();
        }
    }
    mounted() {
        this.scrollEl = getScrollEventTarget(this.$el);
        // `getScrollContainer` most likely return React.Node at the next tick. Need setTimeout
        setTimeout(() => {
            this.init(this.getScrollContainer() || this.containerRef);
            this.triggerPullToRefresh();
            this._isMounted = true;
        });
    }
    beforeDestroy() {
        // Should have no setTimeout here!
        this.destroy(this.getScrollContainer() || this.containerRef);
    }
    triggerPullToRefresh() {
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
            }
            else {
                this.currSt = 'finish';
                this.reset();
            }
        }
    }
    init(ele) {
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
    destroy(ele) {
        if (!this._to || !ele) {
            // componentWillUnmount fire before componentDidMount, like forceUpdate ???!!
            return;
        }
        Object.keys(this._to).forEach(key => {
            ele.removeEventListener(key, this._to[key]);
        });
    }
    onTouchStart(_ele, e) {
        this._ScreenY = this._startScreenY = e.touches[0].screenY;
        // 一开始 value 为 true 时 this._lastScreenY 有值
        this._lastScreenY = this._lastScreenY || 0;
    }
    isEdge() {
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
    dampingFunc(dy) {
        if (Math.abs(this._lastScreenY) > this.damping) {
            return 0;
        }
        const ratio = Math.abs(this._ScreenY - this._startScreenY) / window.screen.height;
        return dy * (1 - ratio) * 0.6;
    }
    onTouchMove(ele, e) {
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
            }
            else {
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
    onTouchEnd() {
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
        }
        else {
            this.reset();
        }
    }
    reset() {
        this._lastScreenY = 0;
        this.setContentStyle(0);
    }
    setContentStyle(ty) {
        // todos: Why sometimes do not have `this.contentRef` ?
        if (this.contentRef) {
            setTransform(this.contentRef.style, `translate3d(0px,${ty}px,0)`);
        }
    }
    render() {
        const _a = this, { prefixCls, getScrollContainer, direction, value, indicator, distanceToRefresh } = _a, restProps = tslib_1.__rest(_a, ["prefixCls", "getScrollContainer", "direction", "value", "indicator", "distanceToRefresh"]);
        const renderChildren = <div>{this.$slots.default}</div>;
        const renderRefresh = (cls) => {
            const cla = classNames(cls, !this.dragOnEdge && `${prefixCls}-transition`);
            return (<div class={`${prefixCls}-content-wrapper`}>
            <div class={cla} ref={'content'}>
              {direction === UP ? renderChildren : null}
              <div class={`${prefixCls}-indicator`}>
                {indicator[this.currSt] || INDICATOR[this.currSt]}
              </div>
              {direction === DOWN ? renderChildren : null}
            </div>
          </div>);
        };
        if (getScrollContainer()) {
            return renderRefresh(`${prefixCls}-content ${prefixCls}-${direction}`);
        }
        return (<div ref={'container'} class={classNames(this.className, prefixCls, `${prefixCls}-${direction}`)} {...restProps}>
          {renderRefresh(`${prefixCls}-content`)}
        </div>);
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: '松开刷新' })
], PullToRefresh.prototype, "activateText", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '取消刷新' })
], PullToRefresh.prototype, "deactivateText", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '刷新完成' })
], PullToRefresh.prototype, "finishText", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return () => undefined;
        }
    })
], PullToRefresh.prototype, "getScrollContainer", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: DOWN })
], PullToRefresh.prototype, "direction", void 0);
tslib_1.__decorate([
    Prop()
], PullToRefresh.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 35 })
], PullToRefresh.prototype, "distanceToRefresh", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-pull-to-refresh' })
], PullToRefresh.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 80 })
], PullToRefresh.prototype, "damping", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 40 })
], PullToRefresh.prototype, "indicatorHeight", void 0);
tslib_1.__decorate([
    Prop()
], PullToRefresh.prototype, "className", void 0);
PullToRefresh = tslib_1.__decorate([
    Component({
        name: 'PullToRefresh'
    })
], PullToRefresh);
export default PullToRefresh;
//# sourceMappingURL=index.jsx.map