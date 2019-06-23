/* tslint:disable:no-console */
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
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

@Component({
  name: 'Gesture'
})
export default class Gesture extends Vue {
  @Prop({type: Boolean, default: false})
  public enableRotate: boolean;
  @Prop({type: Boolean, default: false})
  public enablePinch: boolean;
  @Prop({type: String, default: 'all'})
  public direction: string;
  // pinch: s.zoom
  @Prop()
  public onPinch?: GestureHandler;
  @Prop()
  public onPinchStart?: GestureHandler;
  @Prop()
  public onPinchMove?: GestureHandler;
  @Prop()
  public onPinchEnd?: GestureHandler;
  @Prop()
  public onPinchCancel?: GestureHandler;
  @Prop()
  public onPinchIn?: GestureHandler;
  @Prop()
  public onPinchOut?: GestureHandler;

  // rotate: s.angle
  @Prop()
  public onRotate?: GestureHandler;
  @Prop()
  public onRotateStart?: GestureHandler;
  @Prop()
  public onRotateMove?: GestureHandler;
  @Prop()
  public onRotateEnd?: GestureHandler;
  @Prop()
  public onRotateCancel?: GestureHandler;

  // pan: s.delta
  @Prop()
  public onPan?: GestureHandler;
  @Prop()
  public onPanStart?: GestureHandler;
  @Prop()
  public onPanMove?: GestureHandler;
  @Prop()
  public onPanEnd?: GestureHandler;
  @Prop()
  public onPanCancel?: GestureHandler;
  @Prop()
  public onPanLeft?: GestureHandler;
  @Prop()
  public onPanRight?: GestureHandler;
  @Prop()
  public onPanUp?: GestureHandler;
  @Prop()
  public onPanDown?: GestureHandler;

  // tap
  @Prop()
  public onTap?: GestureHandler;

  // long tap
  @Prop()
  public onPress?: GestureHandler;
  @Prop()
  public onPressUp?: GestureHandler;

  // swipe
  @Prop()
  public onSwipe?: GestureHandler;
  @Prop()
  public onSwipeLeft?: GestureHandler;
  @Prop()
  public onSwipeRight?: GestureHandler;
  @Prop()
  public onSwipeUp?: GestureHandler;
  @Prop()
  public onSwipeDown?: GestureHandler;

  // original dom element event handler
  @Prop()
  public onTouchStart?: any;
  @Prop()
  public onTouchMove?: any;
  @Prop()
  public onTouchEnd?: any;
  @Prop()
  public onTouchCancel?: any;
  protected gesture: IGestureStatus;
  protected event: any;
  private pressTimer: NodeJS.Timer;
  private directionSetting: number;

  public created() {
    this.directionSetting = directionMap[this.$props.direction];
  }

  public triggerEvent(name, ...args) {
    const cb = this.$props[name];
    if (typeof cb === 'function') {
      // always give user gesture object as first params first
      cb(this.getGestureState(), ...args);
    }
  }

  public triggerCombineEvent(mainEventName, eventStatus, ...args) {
    this.triggerEvent(mainEventName, ...args);
    this.triggerSubEvent(mainEventName, eventStatus, ...args);

  }

  public triggerSubEvent(mainEventName, eventStatus, ...args) {
    if (eventStatus) {
      const subEventName = getEventName(mainEventName, eventStatus);
      this.triggerEvent(subEventName, ...args);
    }
  }

  public triggerPinchEvent(mainEventName, eventStatus, ...args) {
    const {scale} = this.gesture;
    if (eventStatus === 'move' && typeof scale === 'number') {
      if (scale > 1) {
        this.triggerEvent('onPinchOut');
      }
      if (scale < 1) {
        this.triggerEvent('onPinchIn');
      }
    }
    this.triggerCombineEvent(mainEventName, eventStatus, ...args);
  }

  public initPressTimer() {
    this.cleanPressTimer();
    this.pressTimer = setTimeout(() => {
      this.setGestureState({
        press: true
      });
      this.triggerEvent('onPress');
    }, PRESS.time);
  }

  public cleanPressTimer() {
    /* tslint:disable:no-unused-expression */
    this.pressTimer && clearTimeout(this.pressTimer);
  }

  public setGestureState(params) {
    if (!this.gesture) {
      this.gesture = {} as any;
    }

    // cache the previous touches
    if (this.gesture.touches) {
      this.gesture.preTouches = this.gesture.touches;
    }
    this.gesture = {
      ...this.gesture,
      ...params
    };
  }

  public getGestureState() {
    if (!this.gesture) {
      return this.gesture;
    } else {
      // shallow copy
      return {
        ...this.gesture
      };
    }
  }

  public cleanGestureState() {
    delete this.gesture;
  }

  public getTouches(e) {
    return Array.prototype.slice.call(e.touches).map(item => ({
      x: item.screenX,
      y: item.screenY
    }));
  }

  public triggerUserCb(status, e) {
    const cbName = getEventName('onTouch', status);
    if (cbName in this.$props && this.$props[cbName]) {
      this.$props[cbName](e);
    }
  }

  public _handleTouchStart(e) {
    this.triggerUserCb('start', e);
    this.event = e;
    if (e.touches.length > 1) {
      e.preventDefault();
    }
    this.initGestureStatus(e);
    this.initPressTimer();
    this.checkIfMultiTouchStart();
  }

  public initGestureStatus(e) {
    this.cleanGestureState();
    // store the gesture start state
    const startTouches = this.getTouches(e);
    const startTime = now();
    const startMutliFingerStatus = calcMutliFingerStatus(startTouches);
    this.setGestureState({
      startTime,
      startTouches,
      startMutliFingerStatus,
      /* copy for next time touch move cala convenient*/
      time: startTime,
      touches: startTouches,
      mutliFingerStatus: startMutliFingerStatus,
      srcEvent: this.event
    });
  }

  public checkIfMultiTouchStart() {
    const {enablePinch, enableRotate} = this;
    const {touches} = this.gesture;
    if (touches.length > 1 && (enablePinch || enableRotate)) {
      if (enablePinch) {
        const startMutliFingerStatus = calcMutliFingerStatus(touches);
        this.setGestureState({
          startMutliFingerStatus,

          /* init pinch status */
          pinch: true,
          scale: 1
        });
        this.triggerCombineEvent('onPinch', 'start');
      }
      if (enableRotate) {
        this.setGestureState({
          /* init rotate status */
          rotate: true,
          rotation: 0
        });
        this.triggerCombineEvent('onRotate', 'start');
      }
    }
  }

  public _handleTouchMove(e) {
    this.triggerUserCb('move', e);
    this.event = e;
    if (!this.gesture) {
      // sometimes weird happen: touchstart -> touchmove..touchmove.. --> touchend --> touchmove --> touchend
      // so we need to skip the unnormal event cycle after touchend
      return;
    }

    // not a long press
    this.cleanPressTimer();

    this.updateGestureStatus(e);
    this.checkIfSingleTouchMove();
    this.checkIfMultiTouchMove();
  }

  public checkIfMultiTouchMove() {
    const {pinch, rotate, touches, startMutliFingerStatus, mutliFingerStatus} = this.gesture as any;
    if (!pinch && !rotate) {
      return;
    }
    if (touches.length < 2) {
      this.setGestureState({
        pinch: false,
        rotate: false
      });
      // Todo: 2 finger -> 1 finger, wait to test this situation
      pinch && this.triggerCombineEvent('onPinch', 'cancel');
      rotate && this.triggerCombineEvent('onRotate', 'cancel');
      return;
    }

    if (pinch) {
      const scale = mutliFingerStatus.z / startMutliFingerStatus.z;
      this.setGestureState({
        scale
      });
      this.triggerPinchEvent('onPinch', 'move');
    }
    if (rotate) {
      const rotation = calcRotation(startMutliFingerStatus, mutliFingerStatus);
      this.setGestureState({
        rotation
      });
      this.triggerCombineEvent('onRotate', 'move');
    }
  }

  public allowGesture() {
    return shouldTriggerDirection(this.gesture.direction, this.directionSetting);
  }

  public checkIfSingleTouchMove() {
    const {pan, touches, moveStatus, preTouches, availablePan = true} = this.gesture;
    if (touches.length > 1) {
      this.setGestureState({
        pan: false
      });
      // Todo: 1 finger -> 2 finger, wait to test this situation
      pan && this.triggerCombineEvent('onPan', 'cancel');
      return;
    }

    // add avilablePan condition to fix the case in scrolling, which will cause unavailable pan move.
    if (moveStatus && availablePan) {
      const direction = getMovingDirection(preTouches[0], touches[0]);
      this.setGestureState({direction});

      const eventName = getDirectionEventName(direction);
      if (!this.allowGesture()) {
        // if the first move is unavailable, then judge all of remaining touch movings are also invalid.
        if (!pan) {
          this.setGestureState({availablePan: false});
        }
        return;
      }
      if (!pan) {
        this.triggerCombineEvent('onPan', 'start');
        this.setGestureState({
          pan: true,
          availablePan: true
        });
      } else {
        this.triggerCombineEvent('onPan', eventName);
        this.triggerSubEvent('onPan', 'move');
      }
    }
  }

  public checkIfMultiTouchEnd(status) {
    const {pinch, rotate} = this.gesture;
    if (pinch) {
      this.triggerCombineEvent('onPinch', status);
    }
    if (rotate) {
      this.triggerCombineEvent('onRotate', status);
    }
  }

  public updateGestureStatus(e) {
    const time = now();
    this.setGestureState({
      time
    });
    if (!e.touches || !e.touches.length) {
      return;
    }
    const {startTime, startTouches, pinch, rotate} = this.gesture;
    const touches = this.getTouches(e);
    const moveStatus = calcMoveStatus(startTouches, touches, time - startTime);
    let mutliFingerStatus;
    if (pinch || rotate) {
      mutliFingerStatus = calcMutliFingerStatus(touches);
    }

    this.setGestureState({
      /* update status snapshot */
      touches,
      mutliFingerStatus,
      /* update duration status */
      moveStatus

    });
  }

  public _handleTouchEnd(e) {
    this.triggerUserCb('end', e);
    this.event = e;
    if (!this.gesture) {
      return;
    }
    this.cleanPressTimer();
    this.updateGestureStatus(e);
    this.doSingleTouchEnd('end');
    this.checkIfMultiTouchEnd('end');
  }

  public _handleTouchCancel(e) {
    this.triggerUserCb('cancel', e);
    this.event = e;
    // Todo: wait to test cancel case
    if (!this.gesture) {
      return;
    }
    this.cleanPressTimer();
    this.updateGestureStatus(e);
    this.doSingleTouchEnd('cancel');
    this.checkIfMultiTouchEnd('cancel');
  }

  public triggerAllowEvent(type, status) {
    if (this.allowGesture()) {
      this.triggerCombineEvent(type, status);
    } else {
      this.triggerSubEvent(type, status);
    }
  }

  public doSingleTouchEnd(status) {
    const {moveStatus, pinch, rotate, press, pan, direction} = this.gesture;

    if (pinch || rotate) {
      return;
    }
    if (moveStatus) {
      const {z, velocity} = moveStatus;
      const swipe = shouldTriggerSwipe(z, velocity);
      this.setGestureState({
        swipe
      });
      if (pan) {
        // pan need end, it's a process
        // sometimes, start with pan left, but end with pan right....
        this.triggerAllowEvent('onPan', status);
      }
      if (swipe) {
        const directionEvName = getDirectionEventName(direction);
        // swipe just need a direction, it's a endpoint
        this.triggerAllowEvent('onSwipe', directionEvName);
        return;
      }
    }

    if (press) {
      this.triggerEvent('onPressUp');
      return;
    }
    this.triggerEvent('onTap');
  }

  public componentWillUnmount() {
    this.cleanPressTimer();
  }

  public getTouchAction() {
    const {enablePinch, enableRotate} = this;
    const {directionSetting} = this;
    if (enablePinch || enableRotate || directionSetting === DIRECTION_ALL) {
      return 'pan-x pan-y';
    }
    if (directionSetting === DIRECTION_VERTICAL) {
      return 'pan-x';
    }
    if (directionSetting === DIRECTION_HORIZONTAL) {
      return 'pan-y';
    }
    return 'auto';
  }

  public render() {
    const child: VNode = this.$slots.default.length >= 1 ? this.$slots.default[0] : null;
    const touchAction = this.getTouchAction();

    child.data.on = Object.assign({
      touchstart: this._handleTouchStart,
      touchmove: this._handleTouchMove,
      touchcancel: this._handleTouchCancel,
      touchend: this._handleTouchEnd
    }, child.data.on || {});
    return cloneElement(child, {
      style: {
        touchAction
      }
    });
  }
}
