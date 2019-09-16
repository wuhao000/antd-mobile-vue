import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36;

/* tslint:disable:no-console */
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { cloneElement } from '../utils/vnode';
import { DIRECTION_ALL, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL, PRESS } from './config';
import { calcMoveStatus, calcMutliFingerStatus, calcRotation, getDirectionEventName, getEventName, getMovingDirection, now, shouldTriggerDirection, shouldTriggerSwipe } from './util';
var directionMap = {
  all: DIRECTION_ALL,
  vertical: DIRECTION_VERTICAL,
  horizontal: DIRECTION_HORIZONTAL
};
var Gesture = (_dec = Component({
  name: 'Gesture'
}), _dec2 = Prop({
  type: Boolean,
  default: false
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Prop({
  type: String,
  default: 'all'
}), _dec5 = Prop(), _dec6 = Prop(), _dec7 = Prop(), _dec8 = Prop(), _dec9 = Prop(), _dec10 = Prop(), _dec11 = Prop(), _dec12 = Prop(), _dec13 = Prop(), _dec14 = Prop(), _dec15 = Prop(), _dec16 = Prop(), _dec17 = Prop(), _dec18 = Prop(), _dec19 = Prop(), _dec20 = Prop(), _dec21 = Prop(), _dec22 = Prop(), _dec23 = Prop(), _dec24 = Prop(), _dec25 = Prop(), _dec26 = Prop(), _dec27 = Prop(), _dec28 = Prop(), _dec29 = Prop(), _dec30 = Prop(), _dec31 = Prop(), _dec32 = Prop(), _dec33 = Prop(), _dec34 = Prop(), _dec35 = Prop(), _dec36 = Prop(), _dec37 = Prop(), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Gesture, _Vue);

  function Gesture() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "enableRotate", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "enablePinch", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "direction", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPinch", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPinchStart", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPinchMove", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPinchEnd", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPinchCancel", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPinchIn", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPinchOut", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onRotate", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onRotateStart", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onRotateMove", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onRotateEnd", _descriptor14, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onRotateCancel", _descriptor15, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPan", _descriptor16, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPanStart", _descriptor17, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPanMove", _descriptor18, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPanEnd", _descriptor19, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPanCancel", _descriptor20, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPanLeft", _descriptor21, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPanRight", _descriptor22, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPanUp", _descriptor23, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPanDown", _descriptor24, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onTap", _descriptor25, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPress", _descriptor26, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onPressUp", _descriptor27, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onSwipe", _descriptor28, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onSwipeLeft", _descriptor29, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onSwipeRight", _descriptor30, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onSwipeUp", _descriptor31, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onSwipeDown", _descriptor32, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onTouchStart", _descriptor33, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onTouchMove", _descriptor34, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onTouchEnd", _descriptor35, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onTouchCancel", _descriptor36, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Gesture.prototype;

  _proto.created = function created() {
    this.directionSetting = directionMap[this.$props.direction];
  };

  _proto.triggerEvent = function triggerEvent(name) {
    var cb = this.$props[name];

    if (typeof cb === 'function') {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      // always give user gesture object as first params first
      cb.apply(void 0, [this.getGestureState()].concat(args));
    }
  };

  _proto.triggerCombineEvent = function triggerCombineEvent(mainEventName, eventStatus) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      args[_key3 - 2] = arguments[_key3];
    }

    this.triggerEvent.apply(this, [mainEventName].concat(args));
    this.triggerSubEvent.apply(this, [mainEventName, eventStatus].concat(args));
  };

  _proto.triggerSubEvent = function triggerSubEvent(mainEventName, eventStatus) {
    if (eventStatus) {
      var subEventName = getEventName(mainEventName, eventStatus);

      for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      this.triggerEvent.apply(this, [subEventName].concat(args));
    }
  };

  _proto.triggerPinchEvent = function triggerPinchEvent(mainEventName, eventStatus) {
    var scale = this.gesture.scale;

    if (eventStatus === 'move' && typeof scale === 'number') {
      if (scale > 1) {
        this.triggerEvent('onPinchOut');
      }

      if (scale < 1) {
        this.triggerEvent('onPinchIn');
      }
    }

    for (var _len5 = arguments.length, args = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
      args[_key5 - 2] = arguments[_key5];
    }

    this.triggerCombineEvent.apply(this, [mainEventName, eventStatus].concat(args));
  };

  _proto.initPressTimer = function initPressTimer() {
    var _this2 = this;

    this.cleanPressTimer();
    this.pressTimer = setTimeout(function () {
      _this2.setGestureState({
        press: true
      });

      _this2.triggerEvent('onPress');
    }, PRESS.time);
  };

  _proto.cleanPressTimer = function cleanPressTimer() {
    /* tslint:disable:no-unused-expression */
    this.pressTimer && clearTimeout(this.pressTimer);
  };

  _proto.setGestureState = function setGestureState(params) {
    if (!this.gesture) {
      this.gesture = {};
    } // cache the previous touches


    if (this.gesture.touches) {
      this.gesture.preTouches = this.gesture.touches;
    }

    this.gesture = _extends({}, this.gesture, params);
  };

  _proto.getGestureState = function getGestureState() {
    if (!this.gesture) {
      return this.gesture;
    } else {
      // shallow copy
      return _extends({}, this.gesture);
    }
  };

  _proto.cleanGestureState = function cleanGestureState() {
    delete this.gesture;
  };

  _proto.getTouches = function getTouches(e) {
    return Array.prototype.slice.call(e.touches).map(function (item) {
      return {
        x: item.screenX,
        y: item.screenY
      };
    });
  };

  _proto.triggerUserCb = function triggerUserCb(status, e) {
    var cbName = getEventName('onTouch', status);

    if (cbName in this.$props && this.$props[cbName]) {
      this.$props[cbName](e);
    }
  };

  _proto._handleTouchStart = function _handleTouchStart(e) {
    this.triggerUserCb('start', e);
    this.event = e;

    if (e.touches.length > 1) {
      e.preventDefault();
    }

    this.initGestureStatus(e);
    this.initPressTimer();
    this.checkIfMultiTouchStart();
  };

  _proto.initGestureStatus = function initGestureStatus(e) {
    this.cleanGestureState(); // store the gesture start state

    var startTouches = this.getTouches(e);
    var startTime = now();
    var startMutliFingerStatus = calcMutliFingerStatus(startTouches);
    this.setGestureState({
      startTime: startTime,
      startTouches: startTouches,
      startMutliFingerStatus: startMutliFingerStatus,

      /* copy for next time touch move cala convenient*/
      time: startTime,
      touches: startTouches,
      mutliFingerStatus: startMutliFingerStatus,
      srcEvent: this.event
    });
  };

  _proto.checkIfMultiTouchStart = function checkIfMultiTouchStart() {
    var enablePinch = this.enablePinch,
        enableRotate = this.enableRotate;
    var touches = this.gesture.touches;

    if (touches.length > 1 && (enablePinch || enableRotate)) {
      if (enablePinch) {
        var startMutliFingerStatus = calcMutliFingerStatus(touches);
        this.setGestureState({
          startMutliFingerStatus: startMutliFingerStatus,

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
  };

  _proto._handleTouchMove = function _handleTouchMove(e) {
    this.triggerUserCb('move', e);
    this.event = e;

    if (!this.gesture) {
      // sometimes weird happen: touchstart -> touchmove..touchmove.. --> touchend --> touchmove --> touchend
      // so we need to skip the unnormal event cycle after touchend
      return;
    } // not a long press


    this.cleanPressTimer();
    this.updateGestureStatus(e);
    this.checkIfSingleTouchMove();
    this.checkIfMultiTouchMove();
  };

  _proto.checkIfMultiTouchMove = function checkIfMultiTouchMove() {
    var _ref = this.gesture,
        pinch = _ref.pinch,
        rotate = _ref.rotate,
        touches = _ref.touches,
        startMutliFingerStatus = _ref.startMutliFingerStatus,
        mutliFingerStatus = _ref.mutliFingerStatus;

    if (!pinch && !rotate) {
      return;
    }

    if (touches.length < 2) {
      this.setGestureState({
        pinch: false,
        rotate: false
      }); // Todo: 2 finger -> 1 finger, wait to test this situation

      pinch && this.triggerCombineEvent('onPinch', 'cancel');
      rotate && this.triggerCombineEvent('onRotate', 'cancel');
      return;
    }

    if (pinch) {
      var scale = mutliFingerStatus.z / startMutliFingerStatus.z;
      this.setGestureState({
        scale: scale
      });
      this.triggerPinchEvent('onPinch', 'move');
    }

    if (rotate) {
      var rotation = calcRotation(startMutliFingerStatus, mutliFingerStatus);
      this.setGestureState({
        rotation: rotation
      });
      this.triggerCombineEvent('onRotate', 'move');
    }
  };

  _proto.allowGesture = function allowGesture() {
    return shouldTriggerDirection(this.gesture.direction, this.directionSetting);
  };

  _proto.checkIfSingleTouchMove = function checkIfSingleTouchMove() {
    var _this$gesture = this.gesture,
        pan = _this$gesture.pan,
        touches = _this$gesture.touches,
        moveStatus = _this$gesture.moveStatus,
        preTouches = _this$gesture.preTouches,
        _this$gesture$availab = _this$gesture.availablePan,
        availablePan = _this$gesture$availab === void 0 ? true : _this$gesture$availab;

    if (touches.length > 1) {
      this.setGestureState({
        pan: false
      }); // Todo: 1 finger -> 2 finger, wait to test this situation

      pan && this.triggerCombineEvent('onPan', 'cancel');
      return;
    } // add avilablePan condition to fix the case in scrolling, which will cause unavailable pan move.


    if (moveStatus && availablePan) {
      var direction = getMovingDirection(preTouches[0], touches[0]);
      this.setGestureState({
        direction: direction
      });
      var eventName = getDirectionEventName(direction);

      if (!this.allowGesture()) {
        // if the first move is unavailable, then judge all of remaining touch movings are also invalid.
        if (!pan) {
          this.setGestureState({
            availablePan: false
          });
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
  };

  _proto.checkIfMultiTouchEnd = function checkIfMultiTouchEnd(status) {
    var _this$gesture2 = this.gesture,
        pinch = _this$gesture2.pinch,
        rotate = _this$gesture2.rotate;

    if (pinch) {
      this.triggerCombineEvent('onPinch', status);
    }

    if (rotate) {
      this.triggerCombineEvent('onRotate', status);
    }
  };

  _proto.updateGestureStatus = function updateGestureStatus(e) {
    var time = now();
    this.setGestureState({
      time: time
    });

    if (!e.touches || !e.touches.length) {
      return;
    }

    var _this$gesture3 = this.gesture,
        startTime = _this$gesture3.startTime,
        startTouches = _this$gesture3.startTouches,
        pinch = _this$gesture3.pinch,
        rotate = _this$gesture3.rotate;
    var touches = this.getTouches(e);
    var moveStatus = calcMoveStatus(startTouches, touches, time - startTime);
    var mutliFingerStatus;

    if (pinch || rotate) {
      mutliFingerStatus = calcMutliFingerStatus(touches);
    }

    this.setGestureState({
      /* update status snapshot */
      touches: touches,
      mutliFingerStatus: mutliFingerStatus,

      /* update duration status */
      moveStatus: moveStatus
    });
  };

  _proto._handleTouchEnd = function _handleTouchEnd(e) {
    this.triggerUserCb('end', e);
    this.event = e;

    if (!this.gesture) {
      return;
    }

    this.cleanPressTimer();
    this.updateGestureStatus(e);
    this.doSingleTouchEnd('end');
    this.checkIfMultiTouchEnd('end');
  };

  _proto._handleTouchCancel = function _handleTouchCancel(e) {
    this.triggerUserCb('cancel', e);
    this.event = e; // Todo: wait to test cancel case

    if (!this.gesture) {
      return;
    }

    this.cleanPressTimer();
    this.updateGestureStatus(e);
    this.doSingleTouchEnd('cancel');
    this.checkIfMultiTouchEnd('cancel');
  };

  _proto.triggerAllowEvent = function triggerAllowEvent(type, status) {
    if (this.allowGesture()) {
      this.triggerCombineEvent(type, status);
    } else {
      this.triggerSubEvent(type, status);
    }
  };

  _proto.doSingleTouchEnd = function doSingleTouchEnd(status) {
    var _this$gesture4 = this.gesture,
        moveStatus = _this$gesture4.moveStatus,
        pinch = _this$gesture4.pinch,
        rotate = _this$gesture4.rotate,
        press = _this$gesture4.press,
        pan = _this$gesture4.pan,
        direction = _this$gesture4.direction;

    if (pinch || rotate) {
      return;
    }

    if (moveStatus) {
      var z = moveStatus.z,
          velocity = moveStatus.velocity;
      var swipe = shouldTriggerSwipe(z, velocity);
      this.setGestureState({
        swipe: swipe
      });

      if (pan) {
        // pan need end, it's a process
        // sometimes, start with pan left, but end with pan right....
        this.triggerAllowEvent('onPan', status);
      }

      if (swipe) {
        var directionEvName = getDirectionEventName(direction); // swipe just need a direction, it's a endpoint

        this.triggerAllowEvent('onSwipe', directionEvName);
        return;
      }
    }

    if (press) {
      this.triggerEvent('onPressUp');
      return;
    }

    this.triggerEvent('onTap');
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cleanPressTimer();
  };

  _proto.getTouchAction = function getTouchAction() {
    var enablePinch = this.enablePinch,
        enableRotate = this.enableRotate;
    var directionSetting = this.directionSetting;

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
  };

  _proto.render = function render() {
    var child = this.$slots.default.length >= 1 ? this.$slots.default[0] : null;
    var touchAction = this.getTouchAction();
    child.data.on = _extends({
      touchstart: this._handleTouchStart,
      touchmove: this._handleTouchMove,
      touchcancel: this._handleTouchCancel,
      touchend: this._handleTouchEnd
    }, child.data.on || {});
    return cloneElement(child, {
      style: {
        touchAction: touchAction
      }
    });
  };

  return Gesture;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enableRotate", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "enablePinch", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "onPinch", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "onPinchStart", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "onPinchMove", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "onPinchEnd", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "onPinchCancel", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "onPinchIn", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "onPinchOut", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "onRotate", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "onRotateStart", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "onRotateMove", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "onRotateEnd", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "onRotateCancel", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "onPan", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "onPanStart", [_dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "onPanMove", [_dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "onPanEnd", [_dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "onPanCancel", [_dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "onPanLeft", [_dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "onPanRight", [_dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "onPanUp", [_dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "onPanDown", [_dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "onTap", [_dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "onPress", [_dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "onPressUp", [_dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "onSwipe", [_dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "onSwipeLeft", [_dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "onSwipeRight", [_dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "onSwipeUp", [_dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "onSwipeDown", [_dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "onTouchStart", [_dec34], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, "onTouchMove", [_dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, "onTouchEnd", [_dec36], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor36 = _applyDecoratedDescriptor(_class2.prototype, "onTouchCancel", [_dec37], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default Gesture;