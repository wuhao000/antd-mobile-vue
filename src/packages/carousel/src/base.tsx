import {unwrapFragment} from '../../utils/vue';
import ExecutionEnvironment from 'exenv';
import requestAnimationFrame from 'raf';
import {
  defineComponent,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  PropType,
  reactive,
  Ref,
  ref,
  VNode,
  watch
} from 'vue';
import decorators from './decorators';

'use strict';

// from https://github.com/chenglou/tween-functions
function easeOutCirc(t, b, _c, d) {
  const c = _c - b;
  let t2 = t;
  // 差之毫厘，谬之千里
  return c * Math.sqrt(1 - (t2 = t2 / d - 1) * t2) + b;
}

function linear(t, b, _c, d) {
  const c = _c - b;
  return c * t / d + b;
}

function filterNotEmpty(nodes: NodeListOf<ChildNode>) {
  const n = [];
  nodes.forEach(it => {
    if (!(it instanceof Text) || (it as Text).textContent) {
      n.push(it);
    }
  });
  return n;
}

const DEFAULT_STACK_BEHAVIOR = 'ADDITIVE';
const DEFAULT_DURATION = 300;
const DEFAULT_DELAY = 0;

const stackBehavior = {
  ADDITIVE: 'ADDITIVE',
  DESTRUCTIVE: 'DESTRUCTIVE'
};

const addEvent = (elem, type, eventHandle) => {
  if (elem === null || typeof (elem) === 'undefined') {
    return;
  }
  if (elem.addEventListener.bind(elem)) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, eventHandle);
  } else {
    elem['on' + type] = eventHandle;
  }
};

const removeEvent = (elem, type, eventHandle) => {
  if (elem === null || typeof (elem) === 'undefined') {
    return;
  }
  if (elem.removeEventListener.bind(elem)) {
    elem.removeEventListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent('on' + type, eventHandle);
  } else {
    elem['on' + type] = null;
  }
};

export type IDecoratorPosition = 'TopLeft' | 'TopCenter' | 'TopRight' | 'CenterLeft' | 'CenterCenter' |
  'CenterRight' | 'BottomLeft' | 'BottomCenter' | 'BottomRight';

const CarouselBase = defineComponent({
  name: 'CarouselBase',
  inheritAttrs: false,
  props: {
    afterSlide: {
      type: Function as PropType<(index: number) => void>,
      default: () => () => {
      }
    },
    autoplay: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    resetAutoplay: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    swipeSpeed: {
      type: Number as PropType<number>,
      default: 12
    },
    autoplayInterval: {
      type: Number as PropType<number>,
      default: 3000
    },
    beforeSlide: {
      type: Function as PropType<(currentIndex: number, endIndex: number) => void>,
      default: () => () => {
      }
    },
    cellAlign: {
      default: 'left'
    },
    cellSpacing: {
      default: 0
    },
    data: {
      default: () => () => {
      }
    },
    decorators: {
      default: () => {
        return decorators;
      }
    },
    dragging: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    easing: {
      default: () => easeOutCirc
    },
    edgeEasing: {
      default: () => linear
    },
    framePadding: {
      default: '0px'
    },
    frameOverflow: {
      default: 'hidden'
    },
    initialSlideHeight: {
      type: Number as PropType<number>
    },
    initialSlideWidth: {},
    slideIndex: {
      default: 0
    },
    slidesToShow: {
      default: 1
    },
    slidesToScroll: {
      type: [Number, String] as PropType<number | 'auto'>,
      default: 1
    },
    slideWidth: {
      default: 1
    },
    speed: {
      default: 500
    },
    swiping: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    vertical: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    width: {
      default: '100%'
    },
    wrapAround: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit, slots}) {
    const touchObject: Ref = ref({});
    const autoplayPaused: Ref<any> = ref(null);
    const clickSafe: Ref<boolean> = ref(true);
    const autoplayID: Ref<any> = ref(null);
    const _rafID: Ref<any> = ref(null);
    const state = reactive({
      slidesToShow: props.slidesToShow,
      slideHeight: 0,
      currentSlide: props.slideIndex,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      lidesToShow: 0,
      slidesToScroll: typeof props.slidesToScroll === 'number' ? props.slidesToScroll : 1,
      slideWidth: 0,
      top: 0,
      tweenQueue: []
    });
    watch(() => props.slideIndex, (value: number) => {
      if (value !== state.currentSlide) {
        goToSlide(value);
      }
    });
    watch(() => props.autoplay, (value: boolean) => {
      if (value) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    });

    const setState = (object: object, callback?) => {
      Object.keys(object).forEach(key => {
        state[key] = object[key];
      });
      if (callback) {
        callback();
      }
    };
    const tweenState = (path, {easing, duration, delay, beginValue, endValue, onEnd, stackBehavior: configSB}) => {
      let cursor = state;
      let stateName;
      // see comment below on pash hash
      let pathHash;
      if (typeof path === 'string') {
        stateName = path;
        pathHash = path;
      } else {
        for (let i = 0; i < path.length - 1; i++) {
          cursor = cursor[path[i]];
        }
        stateName = path[path.length - 1];
        pathHash = path.join('|');
      }
      // see the reasoning for these defaults at the top of file
      const newConfig = {
        easing,
        duration: duration == null ? DEFAULT_DURATION : duration,
        delay: delay == null ? DEFAULT_DELAY : delay,
        beginValue: beginValue == null ? cursor[stateName] : beginValue,
        endValue,
        onEnd,
        stackBehavior: configSB || DEFAULT_STACK_BEHAVIOR
      };

      let newTweenQueue = state.tweenQueue;
      if (newConfig.stackBehavior === stackBehavior.DESTRUCTIVE) {
        newTweenQueue = state.tweenQueue.filter(item => item.pathHash !== pathHash);
      }
      // we store path hash, so that during value retrieval we can use hash
      // comparison to find the path. See the kind of shitty thing you have to
      // do when you don't have value comparison for collections?
      newTweenQueue.push({
        pathHash,
        config: newConfig,
        initTime: Date.now() + newConfig.delay
      });

      // sorry for mutating. For perf reasons we don't want to deep clone.
      // guys, can we please all start using persistent collections so that
      // we can stop worrying about nonesense like this
      cursor[stateName] = newConfig.endValue;
      if (newTweenQueue.length === 1) {
        _rafID.value = requestAnimationFrame(_rafCb.bind(this));
      }
      // this will also include the above mutated update
      state.tweenQueue = newTweenQueue;
    };
    const getTweeningValue = (path) => {
      let tweeningValue;
      let pathHash;
      if (typeof path === 'string') {
        tweeningValue = state[path];
        pathHash = path;
      } else {
        tweeningValue = state;
        for (let i = 0; i < path.length; i++) {
          tweeningValue = tweeningValue[path[i]];
        }
        pathHash = path.join('|');
      }
      const now = Date.now();
      for (let i = 0; i < state.tweenQueue.length; i++) {
        const {pathHash: itemPathHash, initTime, config} = state.tweenQueue[i];
        if (itemPathHash !== pathHash) {
          continue;
        }
        const progressTime = now - initTime > config.duration
          ? config.duration
          : Math.max(0, now - initTime);
        // `now - initTime` can be negative if initTime is scheduled in the
        // future by a delay. In this case we take 0

        // if duration is 0, consider that as jumping to endValue directly. This
        // is needed because the easing functino might have undefined behavior for
        // duration = 0
        const easeValue = config.duration === 0 ? config.endValue : config.easing(
          progressTime,
          config.beginValue,
          config.endValue,
          config.duration
          // TODO: some funcs accept a 5th param
        );
        const contrib = easeValue - config.endValue;
        tweeningValue += contrib;
      }
      return tweeningValue;
    };
    const _rafCb = () => {
      if (state.tweenQueue.length === 0) {
        return;
      }
      const now = Date.now();
      const newTweenQueue: Array<{}> = [];
      for (let i = 0; i < state.tweenQueue.length; i++) {
        const item = state.tweenQueue[i];
        const {initTime, config} = item;
        if (now - initTime < config.duration) {
          newTweenQueue.push(item);
        } else {
          if (config.onEnd) {
            config.onEnd();
          }
        }
      }

      // onEnd might trigger a parent callback that removes this component
      // -1 means we've canceled it in componentWillUnmount
      if (_rafID.value === -1) {
        return;
      }
      state.tweenQueue = newTweenQueue;
      _rafID.value = requestAnimationFrame(_rafCb);
    };
    const getTouchEvents = () => {
      if (props.swiping === false) {
        return null;
      }

      return {
        onTouchstart(e) {
          touchObject.value = {
            startX: e.touches[0].pageX,
            startY: e.touches[0].pageY
          };
          handleMouseOver();
        },
        onTouchmove(e) {
          const direction = swipeDirection(
            touchObject.value.startX,
            e.touches[0].pageX,
            touchObject.value.startY,
            e.touches[0].pageY
          );

          if (direction !== 0) {
            e.preventDefault();
          }

          const length = props.vertical ? Math.round(
            Math.sqrt(Math.pow(e.touches[0].pageY - touchObject.value.startY, 2))
          ) : Math.round(
            Math.sqrt(Math.pow(e.touches[0].pageX - touchObject.value.startX, 2))
          );

          touchObject.value = {
            startX: touchObject.value.startX,
            startY: touchObject.value.startY,
            endX: e.touches[0].pageX,
            endY: e.touches[0].pageY,
            length,
            direction
          };

          setState({
            left: props.vertical ? 0 : getTargetLeft(touchObject.value.length * touchObject.value.direction),
            top: props.vertical ? getTargetLeft(touchObject.value.length * touchObject.value.direction) : 0
          });
        },
        onTouchend(e) {
          handleSwipe(e);
          handleMouseOut();
        },
        onTouchcancel(e) {
          handleSwipe(e);
        }
      };
    };
    const getMouseEvents = () => {
      if (props.dragging === false) {
        return null;
      }

      return {
        onMouseover() {
          handleMouseOver();
        },
        onMouseout() {
          handleMouseOut();
        },
        onMousedown(e) {
          touchObject.value = {
            startX: e.clientX,
            startY: e.clientY
          };
          setState({
            dragging: true
          });
        },
        onMousemove(e) {
          if (!state.dragging) {
            return;
          }
          const direction = swipeDirection(
            touchObject.value.startX,
            e.clientX,
            touchObject.value.startY,
            e.clientY
          );

          if (direction !== 0) {
            e.preventDefault();
          }

          const length = props.vertical ? Math.round(
            Math.sqrt(Math.pow(e.clientY - touchObject.value.startY, 2))
          ) : Math.round(
            Math.sqrt(Math.pow(e.clientX - touchObject.value.startX, 2))
          );

          touchObject.value = {
            startX: touchObject.value.startX,
            startY: touchObject.value.startY,
            endX: e.clientX,
            endY: e.clientY,
            length,
            direction
          };

          setState({
            left: props.vertical ? 0 : getTargetLeft(touchObject.value.length * touchObject.value.direction),
            top: props.vertical ? getTargetLeft(touchObject.value.length * touchObject.value.direction) : 0
          });
        },
        onMouseup(e) {
          if (!state.dragging) {
            return;
          }
          handleSwipe(e);
        },
        onMouseleave(e) {
          if (!state.dragging) {
            return;
          }
          handleSwipe(e);
        }
      };
    };
    const handleMouseOver = () => {
      if (props.autoplay) {
        autoplayPaused.value = true;
        stopAutoplay();
      }
    };
    const handleMouseOut = () => {
      if (props.autoplay && autoplayPaused.value) {
        startAutoplay();
        autoplayPaused.value = null;
      }
    };
    const handleClick = (e) => {
      if (clickSafe.value === true) {
        e.preventDefault();
        e.stopPropagation();

        if (e.nativeEvent) {
          e.nativeEvent.stopPropagation();
        }
      }
    };
    const handleSwipe = (_) => {
      clickSafe.value = !!(typeof (touchObject.value.length) !== 'undefined' && touchObject.value.length > 44);
      const slidesToShow = props.slidesToShow;
      const {slidesToScroll, swipeSpeed} = props;
      // var slidesToShow = this.slidesToShow;
      if (slidesToScroll === 'auto') {
        state.lidesToShow = state.slidesToScroll;
      }
      if (childrenCount() > 1 && touchObject.value.length > (state.slideWidth / slidesToShow!) / swipeSpeed!) {
        if (touchObject.value.direction === 1) {
          if (
            state.currentSlide >= childrenCount() - slidesToShow! &&
            !props.wrapAround
          ) {
            animateSlide(props.edgeEasing);
          } else {
            nextSlide();
          }
        } else if (touchObject.value.direction === -1) {
          if (state.currentSlide <= 0 && !props.wrapAround) {
            animateSlide(props.edgeEasing);
          } else {
            previousSlide();
          }
        }
      } else {
        goToSlide(state.currentSlide);
      }
      touchObject.value = {};
      state.dragging = false;
    };
    const swipeDirection = (x1, x2, y1, y2) => {
      const xDist = x1 - x2;
      const yDist = y1 - y2;
      const r = Math.atan2(yDist, xDist);
      let swipeAngle = Math.round(r * 180 / Math.PI);
      if (swipeAngle < 0) {
        swipeAngle = 360 - Math.abs(swipeAngle);
      }
      if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
        return 1;
      }
      if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
        return 1;
      }
      if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
        return -1;
      }
      if (props.vertical === true) {
        if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
          return 1;
        } else {
          return -1;
        }
      }
      return 0;

    };
    const autoplayIterator = () => {
      if (props.wrapAround) {
        return nextSlide();
      }
      if (state.currentSlide !== state.slideCount - state.slidesToShow) {
        nextSlide();
      } else {
        stopAutoplay();
      }
    };
    const startAutoplay = () => {
      if (childrenCount() <= 1) {
        return;
      }
      autoplayID.value = setInterval(autoplayIterator,
        props.autoplayInterval);
    };
    const resetAutoplayFun = () => {
      if (props.resetAutoplay && props.autoplay && !autoplayPaused.value) {  // by warmhug
        stopAutoplay();
        startAutoplay();
      }
    };
    const stopAutoplay = () => {
      if (autoplayID.value) {
        clearInterval(autoplayID.value);
      }
    };
    const goToSlide = (index) => {
      const {beforeSlide, afterSlide} = props;
      if ((index >= childrenCount() || index < 0)) {
        if (!props.wrapAround) {
          return;
        }
        if (index >= childrenCount()) {
          beforeSlide(state.currentSlide, 0);
          return setState({
            currentSlide: 0
          }, () => {
            animateSlide(null, null, getTargetLeft(null, index), () => {
              animateSlide(null, 0.01);
              afterSlide!(0);
              resetAutoplayFun();
              setExternalData();
            });
          });
        } else {
          const endSlide = childrenCount() - state.slidesToScroll;
          beforeSlide(state.currentSlide, endSlide);
          return setState({
            currentSlide: endSlide
          }, () => {
            animateSlide(null, null, getTargetLeft(null, index), () => {
              animateSlide(null, 0.01);
              afterSlide!(endSlide);
              resetAutoplayFun();
              setExternalData();
            });
          });
        }
      }
      beforeSlide(state.currentSlide, index);
      state.currentSlide = index;
      animateSlide();
      props.afterSlide(index);
      resetAutoplayFun();
      setExternalData();
    };
    const nextSlide = () => {
      const count = childrenCount();
      let slidesToShow: number = props.slidesToShow!;
      if (props.slidesToScroll === 'auto') {
        slidesToShow = state.slidesToScroll;
      }
      if (state.currentSlide >= count - slidesToShow && !props.wrapAround) {
        return;
      }
      if (props.wrapAround) {
        goToSlide(state.currentSlide + (state.slidesToScroll as number));
      } else {
        if (props.slideWidth !== 1) {
          return goToSlide(state.currentSlide + (state.slidesToScroll as number));
        }
        goToSlide(
          Math.min(state.currentSlide + (state.slidesToScroll as number), count - slidesToShow)
        );
      }
    };
    const previousSlide = () => {
      if (state.currentSlide <= 0 && !props.wrapAround) {
        return;
      }

      if (props.wrapAround) {
        goToSlide(state.currentSlide - (state.slidesToScroll as number));
      } else {
        goToSlide(Math.max(0, state.currentSlide - (state.slidesToScroll as number)));
      }
    };
    const animateSlide = (easing?: any, duration?: any, endValue?: any, callback?: any) => {
      tweenState(props.vertical ? 'top' : 'left', {
        easing: easing || props.easing,
        duration: duration || props.speed,
        endValue: endValue || getTargetLeft(),
        delay: null,
        beginValue: null,
        onEnd: callback || null,
        stackBehavior
      });
    };
    const getTargetLeft = (touchOffset?: any, slide?: any) => {
      let offset;
      const target = slide || state.currentSlide;
      const cellSpacing: number = props.cellSpacing;
      switch (props.cellAlign) {
        case 'left': {
          offset = 0;
          offset -= cellSpacing * (target);
          break;
        }
        case 'center': {
          offset = (state.frameWidth - state.slideWidth) / 2;
          offset -= cellSpacing * (target);
          break;
        }
        case 'right': {
          offset = state.frameWidth - state.slideWidth;
          offset -= cellSpacing * (target);
          break;
        }
        default:
          break;
      }

      let left = state.slideWidth * target;

      const lastSlide = state.currentSlide > 0 && target + state.slidesToScroll >= state.slideCount;

      if (lastSlide && props.slideWidth !== 1 && !props.wrapAround && props.slidesToScroll === 'auto') {
        left = (state.slideWidth * state.slideCount) - state.frameWidth;
        offset = 0;
        offset -= cellSpacing * (state.slideCount - 1);
      }
      offset -= touchOffset || 0;
      return (left - offset) * -1;
    };
    const bindEvents = () => {
      if (ExecutionEnvironment.canUseDOM) {
        addEvent(window, 'resize', onResize.bind(this));
        addEvent(document, 'readystatechange', onReadyStateChange.bind(this));
      }
    };
    const onResize = () => {
      setDimensions();
    };
    const onReadyStateChange = () => {
      setDimensions();
    };
    const unbindEvents = () => {
      if (ExecutionEnvironment.canUseDOM) {
        removeEvent(window, 'resize', onResize.bind(this));
        removeEvent(document, 'readystatechange', onReadyStateChange.bind(this));
      }
    };
    const formatChildren = (children: VNode[]) => {
      const realChildren = unwrapFragment(children);
      const positionValue = props.vertical ? getTweeningValue('top') : getTweeningValue('left');
      return realChildren.map((child, index) => {
        return <li class="slider-slide"
                   style={getSlideStyles(index, positionValue)}
                   key={index}>{child}</li>;
      });
    };
    const setInitialDimensions = () => {
      const {vertical, initialSlideHeight, initialSlideWidth, slidesToShow, cellSpacing} = props;
      const slideWidth = vertical ? (initialSlideHeight || 0) : (initialSlideWidth || 0);
      const slideHeight = initialSlideHeight ? initialSlideHeight * slidesToShow! : 0;
      const frameHeight = slideHeight + (cellSpacing! * (slidesToShow! - 1));
      setState({
        slideHeight,
        frameWidth: vertical ? frameHeight : '100%',
        slideCount: childrenCount(),
        slideWidth
      }, () => {
        setLeft();
        setExternalData();
      });
    };
    const frameRef = ref(null);
    const setDimensions = () => {
      let frameWidth;
      let frameHeight;
      let slideHeight;
      let slideWidth;
      const slidesToScroll = props.slidesToScroll;
      const frame = frameRef.value;
      const firstSlide = filterNotEmpty(frame && (frame as any).childNodes[0].childNodes)[0];
      if (firstSlide) {
        firstSlide.style.height = 'auto';
        slideHeight = props.vertical ?
          firstSlide.offsetHeight * props.slidesToShow :
          firstSlide.offsetHeight;
      } else {
        slideHeight = 100;
      }
      if (typeof props.slideWidth !== 'number') {
        slideWidth = parseInt(props.slideWidth, 10);
      } else {
        if (props.vertical) {
          slideWidth = (slideHeight / props.slidesToShow) * props.slideWidth;
        } else {
          if (frame) {
            slideWidth = ((frame as any).offsetWidth / props.slidesToShow) * props.slideWidth;
          }
        }
      }

      if (!props.vertical) {
        slideWidth -= props.cellSpacing * ((100 - (100 / props.slidesToShow)) / 100);
      }

      frameHeight = slideHeight + (props.cellSpacing * (props.slidesToShow - 1));
      if (frame) {
        frameWidth = props.vertical ? frameHeight : (frame as any).offsetWidth;
      }
      if (props.slidesToScroll === 'auto') {
        state.slidesToScroll = Math.floor(frameWidth / (slideWidth + props.cellSpacing));
      }

      setState({
        slideHeight,
        frameWidth,
        slideWidth,
        slidesToScroll,
        left: props.vertical ? 0 : getTargetLeft(),
        top: props.vertical ? getTargetLeft() : 0
      }, () => {
        setLeft();
      });
    };
    const setLeft = () => {
      setState({
        left: props.vertical ? 0 : getTargetLeft(),
        top: props.vertical ? getTargetLeft() : 0
      });
    };
    const setExternalData = () => {
      if (props.data) {
        props.data();
      }
    };
    const childrenCount = () => {
      return unwrapFragment(slots.default()).length || 0;
    };
    const getListStyles = (): any => {
      const listWidth = state.slideWidth * childrenCount();
      const cellSpacing = props.cellSpacing!;
      const spacingOffset = cellSpacing * childrenCount();
      const transform = 'translate3d(' +
        getTweeningValue('left') + 'px, ' +
        getTweeningValue('top') + 'px, 0)';
      return {
        transform,
        WebkitTransform: transform,
        msTransform: 'translate(' +
          getTweeningValue('left') + 'px, ' +
          getTweeningValue('top') + 'px)',
        position: 'relative',
        display: 'block',
        margin: props.vertical ? (cellSpacing / 2) * -1 + 'px 0px'
          : '0px ' + (cellSpacing / 2) * -1 + 'px',
        padding: 0,
        height: props.vertical ? ((listWidth + spacingOffset) + 'px') : (state.slideHeight + 'px'),
        width: props.vertical ? 'auto' : ((listWidth + spacingOffset) + 'px'),
        cursor: state.dragging ? 'pointer' : 'inherit',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box'
      };
    };
    const getFrameStyles = (): any => {
      return {
        position: 'relative',
        display: 'block',
        overflow: props.frameOverflow,
        height: props.vertical ? (state.frameWidth + 'px') || 'initial' : 'auto',
        margin: props.framePadding,
        padding: 0,
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        msTransform: 'translate(0, 0)',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box'
      };
    };
    const getSlideStyles = (index, positionValue): any => {
      const targetPosition = getSlideTargetPosition(index, positionValue);
      const cellSpacing: number = props.cellSpacing!;
      return {
        position: 'absolute',
        left: props.vertical ? 0 : (targetPosition + 'px'),
        top: props.vertical ? (targetPosition + 'px') : 0,
        display: props.vertical ? 'block' : 'inline-block',
        listStyleType: 'none',
        verticalAlign: 'top',
        width: props.vertical ? '100%' : (state.slideWidth + 'px'),
        height: 'auto',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        marginLeft: props.vertical ? 'auto' : (cellSpacing / 2 + 'px'),
        marginRight: props.vertical ? 'auto' : (cellSpacing / 2 + 'px'),
        marginTop: props.vertical ? (cellSpacing / 2 + 'px') : 'auto',
        marginBottom: props.vertical ? (cellSpacing / 2 + 'px') : 'auto'
      };
    };
    const getSlideTargetPosition = (index, positionValue) => {
      const slidesToShow = (state.frameWidth / state.slideWidth);
      const targetPosition = (state.slideWidth + props.cellSpacing) * index;
      const end = ((state.slideWidth + props.cellSpacing) * slidesToShow) * -1;

      if (props.wrapAround) {
        const slidesBefore = Math.ceil(positionValue / (state.slideWidth));
        if (state.slideCount - slidesBefore <= index) {
          return (state.slideWidth + props.cellSpacing) *
            (state.slideCount - index) * -1;
        }

        let slidesAfter = Math.ceil((Math.abs(positionValue) - Math.abs(end)) / state.slideWidth);

        if (state.slideWidth !== 1) {
          slidesAfter = Math.ceil((Math.abs(positionValue) - (state.slideWidth)) / state.slideWidth);
        }

        if (index <= slidesAfter - 1) {
          return (state.slideWidth + props.cellSpacing) * (state.slideCount + index);
        }
      }

      return targetPosition;
    };
    const getSliderStyles = (): any => {
      return {
        position: 'relative',
        display: 'block',
        width: props.width,
        height: 'auto',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        visibility: state.slideWidth ? 'visible' : 'hidden'
      };
    };
    const getStyleTagStyles = () => {
      return '.slider-slide > img {width: 100%; display: block;}';
    };
    const getDecoratorStyles = (position) => {
      switch (position) {
        case 'TopLeft': {
          return {
            position: 'absolute',
            top: 0,
            left: 0
          };
        }
        case 'TopCenter': {
          return {
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            WebkitTransform: 'translateX(-50%)',
            msTransform: 'translateX(-50%)'
          };
        }
        case 'TopRight': {
          return {
            position: 'absolute',
            top: 0,
            right: 0
          };
        }
        case 'CenterLeft': {
          return {
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            WebkitTransform: 'translateY(-50%)',
            msTransform: 'translateY(-50%)'
          };
        }
        case 'CenterCenter': {
          return {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            WebkitTransform: 'translate(-50%, -50%)',
            msTransform: 'translate(-50%, -50%)'
          };
        }
        case 'CenterRight': {
          return {
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            WebkitTransform: 'translateY(-50%)',
            msTransform: 'translateY(-50%)'
          };
        }
        case 'BottomLeft': {
          return {
            position: 'absolute',
            bottom: 0,
            left: 0
          };
        }
        case 'BottomCenter': {
          return {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            textAlign: 'center'
          };
        }
        case 'BottomRight': {
          return {
            position: 'absolute',
            bottom: 0,
            right: 0
          };
        }
        default: {
          return {
            position: 'absolute',
            top: 0,
            left: 0
          };
        }
      }
    };
    {
      setInitialDimensions();
    }
    onMounted(() => {
      setDimensions();
      bindEvents();
      setExternalData();
      if (props.autoplay) {
        startAutoplay();
      }
    });
    onBeforeUnmount(() => {
      unbindEvents();
      stopAutoplay();
      requestAnimationFrame.cancel(_rafID.value);
      _rafID.value = -1;
    });
    onBeforeUpdate(() => {
      setDimensions();
    });

    return {
      state, childrenCount,
      getTouchEvents, getMouseEvents,
      getStyleTagStyles,
      handleClick, getDecoratorStyles,
      nextSlide, previousSlide, goToSlide,
      getSliderStyles, formatChildren, getFrameStyles,
      getListStyles,
      setFrameRef(el) {
        frameRef.value = el;
      }
    };
  },
  render() {
    this.state.slideCount = this.childrenCount();
    const children = this.childrenCount() > 1 ? this.formatChildren(
      this.$slots.default()
    ) : this.$slots.default();
    return (
      <div
        class="slider"
        ref="slider"
        style={{...this.getSliderStyles()}}>
        <div class="slider-frame"
             ref={this.setFrameRef}
             style={this.getFrameStyles()}
             {
               ...{
                 ...this.getTouchEvents(),
                 ...this.getMouseEvents()
               }
             }
             onClick={this.handleClick.bind(this)}>
          <ul class="slider-list" ref="list" style={this.getListStyles()}>
            {children}
          </ul>
        </div>
        {this.decorators ?
          this.decorators.map((Decorator: any, index) => (
            <div style={{...this.getDecoratorStyles(Decorator.position), ...(Decorator.style || {})}}
                 class={'slider-decorator-' + index}
                 key={index}>
              <Decorator.component
                {
                  ...{
                    currentSlide: this.state.currentSlide,
                    slideCount: this.state.slideCount,
                    frameWidth: this.state.frameWidth,
                    slideWidth: this.state.slideWidth,
                    slidesToScroll: this.state.slidesToScroll,
                    cellSpacing: this.cellSpacing,
                    slidesToShow: this.slidesToShow,
                    wrapAround: this.wrapAround,
                    nextSlide: this.nextSlide,
                    previousSlide: this.previousSlide,
                    goToSlide: this.goToSlide
                  }
                }/>
            </div>
          )) : null}
      </div>
    );
  }
});

export default CarouselBase as any;
