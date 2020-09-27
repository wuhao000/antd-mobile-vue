/* tslint:disable:no-console */
import {defineComponent, PropType, ref, Ref, VNode} from 'vue';
import {cloneElement} from '../utils/vnode';
import {DIRECTION_ALL, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL, PRESS} from './config';
import {
  calcMoveStatus,
  calcMutliFingerStatus,
  calcRotation,
  getDirectionEventName,
  getEventName,
  getMovingDirection,
  now,
  shouldTriggerDirection,
  shouldTriggerSwipe
} from './util';

export declare type GestureHandler = (s: IGestureStatus) => void;

export declare type Finger = {
  x: number; // e.touches[i].pageX
  y: number; // e.touches[i].pageY
};

export declare type MultiFingerStatus = {
  x: number;
  y: number;
  z: number;
  angle: number;
};

export declare type SingeFingerMoveStatus = {
  x: number;
  y: number;
  z: number;
  time: number;
  velocity: number;
  angle: number;
};

export interface IGesture {
  // config options
  enableRotate?: boolean;
  enablePinch?: boolean;

  // control allowed direction
  direction?: 'all' | 'vertical' | 'horizontal';

  // pinch: s.zoom
  onPinch?: GestureHandler;
  onPinchStart?: GestureHandler;
  onPinchMove?: GestureHandler;
  onPinchEnd?: GestureHandler;
  onPinchCancel?: GestureHandler;
  onPinchIn?: GestureHandler;
  onPinchOut?: GestureHandler;

  // rotate: s.angle
  onRotate?: GestureHandler;
  onRotateStart?: GestureHandler;
  onRotateMove?: GestureHandler;
  onRotateEnd?: GestureHandler;
  onRotateCancel?: GestureHandler;

  // pan: s.delta
  onPan?: GestureHandler;
  onPanStart?: GestureHandler;
  onPanMove?: GestureHandler;
  onPanEnd?: GestureHandler;
  onPanCancel?: GestureHandler;
  onPanLeft?: GestureHandler;
  onPanRight?: GestureHandler;
  onPanUp?: GestureHandler;
  onPanDown?: GestureHandler;

  // tap
  onTap?: GestureHandler;

  // long tap
  onPress?: GestureHandler;
  onPressUp?: GestureHandler;

  // swipe
  onSwipe?: GestureHandler;
  onSwipeLeft?: GestureHandler;
  onSwipeRight?: GestureHandler;
  onSwipeUp?: GestureHandler;
  onSwipeDown?: GestureHandler;

  // original dom element event handler
  onTouchStart?: any;
  onTouchMove?: any;
  onTouchEnd?: any;
  onTouchCancel?: any;
}

// http://hammerjs.github.io/api/#event-object
export interface IGestureStatus {
  /* start status snapshot */
  startTime: number;
  startTouches: Finger[];

  startMutliFingerStatus?: MultiFingerStatus[];

  /* now status snapshot */
  time: number;
  touches: Finger[];
  preTouches: Finger[];

  mutliFingerStatus?: MultiFingerStatus[];

  /* delta status from touchstart to now, just for singe finger */
  moveStatus?: SingeFingerMoveStatus;

  /* whether is a long tap */
  press?: boolean;

  /* whether is a pan */
  pan?: boolean;
  /* whether is an available pan */
  availablePan?: boolean;

  /* whether is a swipe*/
  swipe?: boolean;
  direction?: number;

  /* whether is in pinch process */
  pinch?: boolean;
  scale?: number;

  /* whether is in rotate process */
  rotate?: boolean;
  rotation?: number; // Rotation (in deg) that has been done when multi-touch. 0 on a single touch.

  /* event, such as TouchEvent, MouseEvent, PointerEvent */
  srcEvent: any;
}

const directionMap = {
  all: DIRECTION_ALL,
  vertical: DIRECTION_VERTICAL,
  horizontal: DIRECTION_HORIZONTAL
};

const Gesture = defineComponent({
  name: 'Gesture',
  props: {
    enableRotate: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    enablePinch: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    direction: {
      type: String as PropType<string>,
      default: 'all'
    },
    onPinch: {},
    onPinchStart: {},
    onPinchMove: {},
    onPinchEnd: {},
    onPinchCancel: {},
    onPinchIn: {},
    onPinchOut: {},
    onRotate: {},
    onRotateStart: {},
    onRotateMove: {},
    onRotateEnd: {},
    onRotateCancel: {},
    onPan: {},
    onPanStart: {},
    onPanMove: {},
    onPanEnd: {},
    onPanCancel: {},
    onPanLeft: {},
    onPanRight: {},
    onPanUp: {},
    onPanDown: {},
    onTap: {},
    onPress: {},
    onPressUp: {},
    onSwipe: {},
    onSwipeLeft: {},
    onSwipeRight: {},
    onSwipeUp: {},
    onSwipeDown: {},
    onTouchStart: {},
    onTouchMove: {},
    onTouchEnd: {},
    onTouchCancel: {}
  },
  setup(props, {emit, slots}) {
    const gesture: Ref<IGestureStatus> = ref(null);
    const event: Ref<any> = ref(null);
    const pressTimer: Ref<NodeJS.Timer> = ref(null);
    const directionSetting: Ref<number> = ref(null);


    const triggerEvent = (name, ...args) => {
      const cb = props[name];
      if (typeof cb === 'function') {
        // always give user gesture object as first params first
        cb(getGestureState(), ...args);
      }
    };
    const triggerCombineEvent = (mainEventName, eventStatus, ...args) => {
      triggerEvent(mainEventName, ...args);
      triggerSubEvent(mainEventName, eventStatus, ...args);

    };
    const triggerSubEvent = (mainEventName, eventStatus, ...args) => {
      if (eventStatus) {
        const subEventName = getEventName(mainEventName, eventStatus);
        triggerEvent(subEventName, ...args);
      }
    };
    const triggerPinchEvent = (mainEventName, eventStatus, ...args) => {
      const {scale} = gesture.value;
      if (eventStatus === 'move' && typeof scale === 'number') {
        if (scale > 1) {
          triggerEvent('onPinchOut');
        }
        if (scale < 1) {
          triggerEvent('onPinchIn');
        }
      }
      triggerCombineEvent(mainEventName, eventStatus, ...args);
    };
    const initPressTimer = () => {
      cleanPressTimer();
      pressTimer.value = setTimeout(() => {
        setGestureState({
          press: true
        });
        triggerEvent('onPress');
      }, PRESS.time);
    };
    const cleanPressTimer = () => {
      /* tslint:disable:no-unused-expression */
      pressTimer.value && clearTimeout(pressTimer.value);
    };
    const setGestureState = (params) => {
      if (!gesture.value) {
        gesture.value = {} as any;
      }

      // cache the previous touches
      if (gesture.value.touches) {
        gesture.value.preTouches = gesture.value.touches;
      }
      gesture.value = {
        ...gesture.value,
        ...params
      };
    };
    const getGestureState = () => {
      if (!gesture.value) {
        return gesture.value;
      } else {
        // shallow copy
        return {
          ...gesture.value
        };
      }
    };
    const cleanGestureState = () => {
      delete gesture.value;
    };
    const getTouches = (e) => {
      return Array.prototype.slice.call(e.touches).map(item => ({
        x: item.screenX,
        y: item.screenY
      }));
    };
    const triggerUserCb = (status, e) => {
      const cbName = getEventName('onTouch', status);
      if (cbName in props && props[cbName]) {
        props[cbName](e);
      }
    };
    const _handleTouchStart = (e) => {
      triggerUserCb('start', e);
      event.value = e;
      if (e.touches.length > 1) {
        e.preventDefault();
      }
      initGestureStatus(e);
      initPressTimer();
      checkIfMultiTouchStart();
    };
    const initGestureStatus = (e) => {
      cleanGestureState();
      // store the gesture start state
      const startTouches = getTouches(e);
      const startTime = now();
      const startMutliFingerStatus = calcMutliFingerStatus(startTouches);
      setGestureState({
        startTime,
        startTouches,
        startMutliFingerStatus,
        /* copy for next time touch move cala convenient*/
        time: startTime,
        touches: startTouches,
        mutliFingerStatus: startMutliFingerStatus,
        srcEvent: event.value
      });
    };
    const checkIfMultiTouchStart = () => {
      const {enablePinch, enableRotate} = props;
      const {touches} = gesture.value;
      if (touches.length > 1 && (enablePinch || enableRotate)) {
        if (enablePinch) {
          const startMutliFingerStatus = calcMutliFingerStatus(touches);
          setGestureState({
            startMutliFingerStatus,

            /* init pinch status */
            pinch: true,
            scale: 1
          });
          triggerCombineEvent('onPinch', 'start');
        }
        if (enableRotate) {
          setGestureState({
            /* init rotate status */
            rotate: true,
            rotation: 0
          });
          triggerCombineEvent('onRotate', 'start');
        }
      }
    };
    const _handleTouchMove = (e) => {
      triggerUserCb('move', e);
      event.value = e;
      if (!gesture.value) {
        // sometimes weird happen: touchstart -> touchmove..touchmove.. --> touchend --> touchmove --> touchend
        // so we need to skip the unnormal event cycle after touchend
        return;
      }

      // not a long press
      cleanPressTimer();

      updateGestureStatus(e);
      checkIfSingleTouchMove();
      checkIfMultiTouchMove();
    };
    const checkIfMultiTouchMove = () => {
      const {pinch, rotate, touches, startMutliFingerStatus, mutliFingerStatus} = gesture.value as any;
      if (!pinch && !rotate) {
        return;
      }
      if (touches.length < 2) {
        setGestureState({
          pinch: false,
          rotate: false
        });
        // Todo: 2 finger -> 1 finger, wait to test this situation
        pinch && triggerCombineEvent('onPinch', 'cancel');
        rotate && triggerCombineEvent('onRotate', 'cancel');
        return;
      }

      if (pinch) {
        const scale = mutliFingerStatus.z / startMutliFingerStatus.z;
        setGestureState({
          scale
        });
        triggerPinchEvent('onPinch', 'move');
      }
      if (rotate) {
        const rotation = calcRotation(startMutliFingerStatus, mutliFingerStatus);
        setGestureState({
          rotation
        });
        triggerCombineEvent('onRotate', 'move');
      }
    };
    const allowGesture = () => {
      return shouldTriggerDirection(gesture.value.direction, directionSetting.value);
    };
    const checkIfSingleTouchMove = () => {
      const {pan, touches, moveStatus, preTouches, availablePan = true} = gesture.value;
      if (touches.length > 1) {
        setGestureState({
          pan: false
        });
        // Todo: 1 finger -> 2 finger, wait to test this situation
        pan && triggerCombineEvent('onPan', 'cancel');
        return;
      }

      // add avilablePan condition to fix the case in scrolling, which will cause unavailable pan move.
      if (moveStatus && availablePan) {
        const direction = getMovingDirection(preTouches[0], touches[0]);
        setGestureState({direction});

        const eventName = getDirectionEventName(direction);
        if (!allowGesture()) {
          // if the first move is unavailable, then judge all of remaining touch movings are also invalid.
          if (!pan) {
            setGestureState({availablePan: false});
          }
          return;
        }
        if (!pan) {
          triggerCombineEvent('onPan', 'start');
          setGestureState({
            pan: true,
            availablePan: true
          });
        } else {
          triggerCombineEvent('onPan', eventName);
          triggerSubEvent('onPan', 'move');
        }
      }
    };
    const checkIfMultiTouchEnd = (status) => {
      const {pinch, rotate} = gesture.value;
      if (pinch) {
        triggerCombineEvent('onPinch', status);
      }
      if (rotate) {
        triggerCombineEvent('onRotate', status);
      }
    };
    const updateGestureStatus = (e) => {
      const time = now();
      setGestureState({
        time
      });
      if (!e.touches || !e.touches.length) {
        return;
      }
      const {startTime, startTouches, pinch, rotate} = gesture.value;
      const touches = getTouches(e);
      const moveStatus = calcMoveStatus(startTouches, touches, time - startTime);
      let mutliFingerStatus;
      if (pinch || rotate) {
        mutliFingerStatus = calcMutliFingerStatus(touches);
      }

      setGestureState({
        /* update status snapshot */
        touches,
        mutliFingerStatus,
        /* update duration status */
        moveStatus

      });
    };
    const _handleTouchEnd = (e) => {
      triggerUserCb('end', e);
      event.value = e;
      if (!gesture.value) {
        return;
      }
      cleanPressTimer();
      updateGestureStatus(e);
      doSingleTouchEnd('end');
      checkIfMultiTouchEnd('end');
    };
    const _handleTouchCancel = (e) => {
      triggerUserCb('cancel', e);
      event.value = e;
      // Todo: wait to test cancel case
      if (!gesture.value) {
        return;
      }
      cleanPressTimer();
      updateGestureStatus(e);
      doSingleTouchEnd('cancel');
      checkIfMultiTouchEnd('cancel');
    };
    const triggerAllowEvent = (type, status) => {
      if (allowGesture()) {
        triggerCombineEvent(type, status);
      } else {
        triggerSubEvent(type, status);
      }
    };
    const doSingleTouchEnd = (status) => {
      const {moveStatus, pinch, rotate, press, pan, direction} = gesture.value;

      if (pinch || rotate) {
        return;
      }
      if (moveStatus) {
        const {z, velocity} = moveStatus;
        const swipe = shouldTriggerSwipe(z, velocity);
        setGestureState({
          swipe
        });
        if (pan) {
          // pan need end, it's a process
          // sometimes, start with pan left, but end with pan right....
          triggerAllowEvent('onPan', status);
        }
        if (swipe) {
          const directionEvName = getDirectionEventName(direction);
          // swipe just need a direction, it's a endpoint
          triggerAllowEvent('onSwipe', directionEvName);
          return;
        }
      }

      if (press) {
        triggerEvent('onPressUp');
        return;
      }
      triggerEvent('onTap');
    };
    const componentWillUnmount = () => {
      cleanPressTimer();
    };
    const getTouchAction = () => {
      const {enablePinch, enableRotate} = props;
      if (enablePinch || enableRotate || directionSetting.value === DIRECTION_ALL) {
        return 'pan-x pan-y';
      }
      if (directionSetting.value === DIRECTION_VERTICAL) {
        return 'pan-x';
      }
      if (directionSetting.value === DIRECTION_HORIZONTAL) {
        return 'pan-y';
      }
      return 'auto';
    };
    {
      directionSetting.value = directionMap[props.direction];
    }

    return {
      getTouchAction,
      _handleTouchStart,
      _handleTouchMove,
      _handleTouchCancel,
      _handleTouchEnd
    };
  },
  render() {
    const child: VNode = this.$slots.default.length >= 1 ? this.$slots.default[0] : null;
    const touchAction = this.getTouchAction();

    child.props = Object.assign({
      onTouchstart: this._handleTouchStart,
      onTouchmove: this._handleTouchMove,
      onTouchcancel: this._handleTouchCancel,
      onTouchend: this._handleTouchEnd
    }, child.props || {});
    return cloneElement(child, {
      style: {
        touchAction
      }
    });
  }
});

export default Gesture as any;
