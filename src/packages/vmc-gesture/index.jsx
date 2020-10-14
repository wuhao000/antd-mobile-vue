/* tslint:disable:no-console */
import { cloneVNode, defineComponent, ref } from 'vue';
import { DIRECTION_ALL, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL, PRESS } from './config';
import { calcMoveStatus, calcMutliFingerStatus, calcRotation, getDirectionEventName, getEventName, getMovingDirection, now, shouldTriggerDirection, shouldTriggerSwipe } from './util';
const directionMap = {
    all: DIRECTION_ALL,
    vertical: DIRECTION_VERTICAL,
    horizontal: DIRECTION_HORIZONTAL
};
const Gesture = defineComponent({
    name: 'Gesture',
    props: {
        enableRotate: {
            type: Boolean,
            default: false
        },
        enablePinch: {
            type: Boolean,
            default: false
        },
        direction: {
            type: String,
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
    setup(props, { emit, slots }) {
        const gesture = ref(null);
        const event = ref(null);
        const pressTimer = ref(null);
        const directionSetting = ref(null);
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
            const { scale } = gesture.value;
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
                gesture.value = {};
            }
            // cache the previous touches
            if (gesture.value.touches) {
                gesture.value.preTouches = gesture.value.touches;
            }
            gesture.value = Object.assign(Object.assign({}, gesture.value), params);
        };
        const getGestureState = () => {
            if (!gesture.value) {
                return gesture.value;
            }
            else {
                // shallow copy
                return Object.assign({}, gesture.value);
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
            const { enablePinch, enableRotate } = props;
            const { touches } = gesture.value;
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
            const { pinch, rotate, touches, startMutliFingerStatus, mutliFingerStatus } = gesture.value;
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
            const { pan, touches, moveStatus, preTouches, availablePan = true } = gesture.value;
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
                setGestureState({ direction });
                const eventName = getDirectionEventName(direction);
                if (!allowGesture()) {
                    // if the first move is unavailable, then judge all of remaining touch movings are also invalid.
                    if (!pan) {
                        setGestureState({ availablePan: false });
                    }
                    return;
                }
                if (!pan) {
                    triggerCombineEvent('onPan', 'start');
                    setGestureState({
                        pan: true,
                        availablePan: true
                    });
                }
                else {
                    triggerCombineEvent('onPan', eventName);
                    triggerSubEvent('onPan', 'move');
                }
            }
        };
        const checkIfMultiTouchEnd = (status) => {
            const { pinch, rotate } = gesture.value;
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
            const { startTime, startTouches, pinch, rotate } = gesture.value;
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
            }
            else {
                triggerSubEvent(type, status);
            }
        };
        const doSingleTouchEnd = (status) => {
            const { moveStatus, pinch, rotate, press, pan, direction } = gesture.value;
            if (pinch || rotate) {
                return;
            }
            if (moveStatus) {
                const { z, velocity } = moveStatus;
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
            const { enablePinch, enableRotate } = props;
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
        const children = this.$slots.default();
        const child = children.length >= 1 ? children[0] : null;
        const touchAction = this.getTouchAction();
        child.props = Object.assign({
            onTouchstart: this._handleTouchStart,
            onTouchmove: this._handleTouchMove,
            onTouchcancel: this._handleTouchCancel,
            onTouchend: this._handleTouchEnd
        }, child.props || {});
        return cloneVNode(child, {
            style: {
                touchAction
            }
        });
    }
});
export default Gesture;
//# sourceMappingURL=index.jsx.map