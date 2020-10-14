import { __rest } from "tslib";
import { filterHTMLAttrs } from '../../utils/dom';
import classNames from 'classnames';
import { computed, defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';
import Icon from '../../icon';
import { getScrollEventTarget, getScrollTop } from './util';
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
export default defineComponent({
    inheritAttrs: false,
    name: 'PullToRefresh',
    props: {
        activateText: {
            type: String,
            default: '松开刷新'
        },
        deactivateText: {
            type: String,
            default: '取消刷新'
        },
        finishText: {
            type: String,
            default: '刷新完成'
        },
        getScrollContainer: {
            default: () => {
                return () => undefined;
            }
        },
        direction: {
            type: String,
            default: DOWN
        },
        value: {},
        distanceToRefresh: {
            type: Number,
            default: 35
        },
        prefixCls: {
            type: String,
            default: 'am-pull-to-refresh'
        },
        damping: {
            type: Number,
            default: 80
        },
        indicatorHeight: {
            type: Number,
            default: 40
        },
        className: {}
    },
    setup(props, { emit }) {
        const currSt = ref('deactivate');
        const dragOnEdge = ref(false);
        const scrollEl = ref(null);
        const _to = ref(null);
        const _ScreenY = ref(null);
        const _startScreenY = ref(null);
        const _lastScreenY = ref(null);
        const _timer = ref(null);
        const _isMounted = ref(false);
        const containerRef = ref(null);
        const contentRef = ref(null);
        const indicator = computed(() => {
            return {
                activate: props.activateText,
                deactivate: props.deactivateText,
                release: <Icon type={'loading'}/>,
                finish: props.finishText
            };
        });
        const triggerPullToRefresh = () => {
            // 在初始化时、用代码 自动 触发 pullToRefresh
            // 注意：当 direction 为 up 时，当 visible length < content length 时、则看不到效果
            // 添加this._isMounted的判断，否则组建一实例化，currSt就会是finish
            if (!dragOnEdge.value && _isMounted.value) {
                if (props.value) {
                    if (props.direction === UP) {
                        _lastScreenY.value = -props.distanceToRefresh - 1;
                    }
                    if (props.direction === DOWN) {
                        _lastScreenY.value = props.distanceToRefresh + 1;
                    }
                    // change dom need after setState
                    currSt.value = 'release';
                    setContentStyle(_lastScreenY.value);
                }
                else {
                    currSt.value = 'finish';
                    reset();
                }
            }
        };
        const init = (ele) => {
            if (!ele) {
                // like return in destroy fn ???!!
                return;
            }
            _to.value = {
                touchstart: onTouchStart.bind(this).bind(this, ele),
                touchmove: onTouchMove.bind(this).bind(this, ele),
                touchend: onTouchEnd.bind(this).bind(this, ele),
                touchcancel: onTouchEnd.bind(this).bind(this, ele)
            };
            Object.keys(_to.value).forEach(key => {
                ele.addEventListener(key, _to.value[key], willPreventDefault);
            });
        };
        const destroy = (ele) => {
            if (!_to.value || !ele) {
                // componentWillUnmount fire before componentDidMount, like forceUpdate ???!!
                return;
            }
            Object.keys(_to.value).forEach(key => {
                ele.removeEventListener(key, _to.value[key]);
            });
        };
        const onTouchStart = (_ele, e) => {
            _ScreenY.value = _startScreenY.value = e.touches[0].screenY;
            // 一开始 value 为 true 时 this._lastScreenY 有值
            _lastScreenY.value = _lastScreenY.value || 0;
        };
        const isEdge = () => {
            const direction = props.direction;
            const container = props.getScrollContainer() || containerRef.value;
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
            const scrollTop = getScrollTop(scrollEl.value);
            if (direction === UP) {
                return scrollEl.value.scrollHeight - scrollTop === scrollEl.value.clientHeight;
            }
            if (direction === DOWN) {
                return scrollTop <= 0;
            }
            return undefined;
        };
        const dampingFunc = (dy) => {
            if (Math.abs(_lastScreenY.value) > props.damping) {
                return 0;
            }
            const ratio = Math.abs(_ScreenY.value - _startScreenY.value) / window.screen.height;
            return dy * (1 - ratio) * 0.6;
        };
        const onTouchMove = (ele, e) => {
            // 使用 pageY 对比有问题
            const _screenY = e.touches[0].screenY;
            // 拖动方向不符合的不处理
            if (props.direction === UP && _startScreenY.value < _screenY ||
                props.direction === DOWN && _startScreenY.value > _screenY) {
                return;
            }
            if (isEdge()) {
                if (!dragOnEdge.value) {
                    // 当用户开始往上滑的时候isEdge还是false的话，会导致this._ScreenY不是想要的，只有当isEdge为true时，再上滑，才有意义
                    // 下面这行代码解决了上面这个问题
                    _ScreenY.value = _startScreenY.value = e.touches[0].screenY;
                    dragOnEdge.value = true;
                }
                e.preventDefault();
                // add stopPropagation with fastclick will trigger content onClick event. why?
                // ref https://github.com/ant-design/ant-design-mobile/issues/2141
                // e.stopPropagation();
                const _diff = Math.round(_screenY - _ScreenY.value);
                _ScreenY.value = _screenY;
                _lastScreenY.value += dampingFunc(_diff);
                setContentStyle(_lastScreenY.value);
                if (Math.abs(_lastScreenY.value) < props.distanceToRefresh) {
                    if (currSt.value !== 'deactivate') {
                        currSt.value = 'deactivate';
                    }
                }
                else {
                    if (currSt.value === 'deactivate') {
                        currSt.value = 'activate';
                    }
                }
                // https://github.com/ant-design/ant-design-mobile/issues/573#issuecomment-339560829
                // iOS UIWebView issue, It seems no problem in WKWebView
                if (isWebView && e.changedTouches[0].clientY < 0) {
                    onTouchEnd();
                }
            }
        };
        const onTouchEnd = () => {
            if (dragOnEdge.value) {
                dragOnEdge.value = false;
            }
            if (currSt.value === 'activate') {
                currSt.value = 'release';
                _timer.value = setTimeout(() => {
                    if (!props.value) {
                        currSt.value = 'finish';
                        reset();
                    }
                    _timer.value = undefined;
                }, 1000);
                setContentStyle(props.indicatorHeight);
                emit('refresh');
                emit('update:value', true);
            }
            else {
                reset();
            }
        };
        const reset = () => {
            _lastScreenY.value = 0;
            setContentStyle(0);
        };
        const setContentStyle = (ty) => {
            // todos: Why sometimes do not have `this.contentRef` ?
            if (contentRef.value) {
                setTransform(contentRef.value.style, `translate3d(0px,${ty}px,0)`);
            }
        };
        onUpdated(() => {
            if (!props.value) {
                // triggerPullToRefresh 需要尽可能减少 setState 次数
                triggerPullToRefresh();
            }
        });
        const instance = getCurrentInstance();
        onMounted(() => {
            scrollEl.value = getScrollEventTarget(instance.vnode.el);
            // `getScrollContainer` most likely return React.Node at the next tick. Need setTimeout
            setTimeout(() => {
                init(props.getScrollContainer() || containerRef.value);
                triggerPullToRefresh();
                _isMounted.value = true;
            });
        });
        onBeforeUnmount(() => {
            // Should have no setTimeout here!
            destroy(props.getScrollContainer() || containerRef.value);
        });
        return {
            setContainerRef(el) {
                containerRef.value = el;
            },
            setContentRef(el) {
                contentRef.value = el;
            },
            indicator, dragOnEdge, currSt
        };
    },
    render() {
        const _a = this, { prefixCls, getScrollContainer, direction, value, indicator, distanceToRefresh } = _a, restProps = __rest(_a, ["prefixCls", "getScrollContainer", "direction", "value", "indicator", "distanceToRefresh"]);
        const renderChildren = <div>{this.$slots.default()}</div>;
        const renderRefresh = (cls) => {
            const cla = classNames(cls, !this.dragOnEdge && `${prefixCls}-transition`);
            return (<div class={`${prefixCls}-content-wrapper`}>
          <div class={cla} ref={this.setContentRef}>
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
        return (<div ref={this.setContainerRef} class={classNames(this.className, prefixCls, `${prefixCls}-${direction}`)} {...filterHTMLAttrs(restProps)}>
        {renderRefresh(`${prefixCls}-content`)}
      </div>);
    }
});
//# sourceMappingURL=index.jsx.map