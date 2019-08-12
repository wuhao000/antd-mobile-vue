'use strict';
import * as tslib_1 from "tslib";
import ExecutionEnvironment from 'exenv';
import requestAnimationFrame from 'raf';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import decorators from './decorators';
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
    }
    else if (elem.attachEvent) {
        elem.attachEvent('on' + type, eventHandle);
    }
    else {
        elem['on' + type] = eventHandle;
    }
};
const removeEvent = (elem, type, eventHandle) => {
    if (elem === null || typeof (elem) === 'undefined') {
        return;
    }
    if (elem.removeEventListener.bind(elem)) {
        elem.removeEventListener(type, eventHandle, false);
    }
    else if (elem.detachEvent) {
        elem.detachEvent('on' + type, eventHandle);
    }
    else {
        elem['on' + type] = null;
    }
};
let CarouselBase = class CarouselBase extends Vue {
    constructor() {
        super(...arguments);
        this.touchObject = {};
        this.clickSafe = true;
        this.state = {
            slidesToShow: this.slidesToShow,
            slideHeight: 0,
            currentSlide: this.slideIndex,
            dragging: false,
            frameWidth: 0,
            left: 0,
            slideCount: 0,
            lidesToShow: 0,
            slidesToScroll: typeof this.slidesToScroll === 'number' ? this.slidesToScroll : 1,
            slideWidth: 0,
            top: 0,
            tweenQueue: []
        };
    }
    created() {
        this.setInitialDimensions();
    }
    mounted() {
        this.setDimensions();
        this.bindEvents();
        this.setExternalData();
        if (this.autoplay) {
            this.startAutoplay();
        }
    }
    setState(object, callback) {
        Object.keys(object).forEach(key => {
            this.state[key] = object[key];
        });
        if (callback) {
            callback();
        }
    }
    slideIndexChanged(value) {
        if (value !== this.state.currentSlide) {
            this.goToSlide(value);
        }
    }
    autoplayChanged(value) {
        if (value) {
            this.startAutoplay();
        }
        else {
            this.stopAutoplay();
        }
    }
    beforeDestroy() {
        this.unbindEvents();
        this.stopAutoplay();
        requestAnimationFrame.cancel(this._rafID);
        this._rafID = -1;
    }
    // react-tween-state
    tweenState(path, { easing, duration, delay, beginValue, endValue, onEnd, stackBehavior: configSB }) {
        let cursor = this.state;
        let stateName;
        // see comment below on pash hash
        let pathHash;
        if (typeof path === 'string') {
            stateName = path;
            pathHash = path;
        }
        else {
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
        let newTweenQueue = this.state.tweenQueue;
        if (newConfig.stackBehavior === stackBehavior.DESTRUCTIVE) {
            newTweenQueue = this.state.tweenQueue.filter(item => item.pathHash !== pathHash);
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
            this._rafID = requestAnimationFrame(this._rafCb.bind(this));
        }
        // this will also include the above mutated update
        this.state.tweenQueue = newTweenQueue;
    }
    getTweeningValue(path) {
        const state = this.state;
        let tweeningValue;
        let pathHash;
        if (typeof path === 'string') {
            tweeningValue = state[path];
            pathHash = path;
        }
        else {
            tweeningValue = state;
            for (let i = 0; i < path.length; i++) {
                tweeningValue = tweeningValue[path[i]];
            }
            pathHash = path.join('|');
        }
        const now = Date.now();
        for (let i = 0; i < state.tweenQueue.length; i++) {
            const { pathHash: itemPathHash, initTime, config } = state.tweenQueue[i];
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
            const easeValue = config.duration === 0 ? config.endValue : config.easing(progressTime, config.beginValue, config.endValue, config.duration
            // TODO: some funcs accept a 5th param
            );
            const contrib = easeValue - config.endValue;
            tweeningValue += contrib;
        }
        return tweeningValue;
    }
    _rafCb() {
        const state = this.state;
        if (state.tweenQueue.length === 0) {
            return;
        }
        const now = Date.now();
        const newTweenQueue = [];
        for (let i = 0; i < state.tweenQueue.length; i++) {
            const item = state.tweenQueue[i];
            const { initTime, config } = item;
            if (now - initTime < config.duration) {
                newTweenQueue.push(item);
            }
            else {
                if (config.onEnd) {
                    config.onEnd();
                }
            }
        }
        // onEnd might trigger a parent callback that removes this component
        // -1 means we've canceled it in componentWillUnmount
        if (this._rafID === -1) {
            return;
        }
        this.state.tweenQueue = newTweenQueue;
        this._rafID = requestAnimationFrame(this._rafCb);
    }
    beforeUpdate() {
        this.setDimensions();
    }
    render() {
        this.state.slideCount = this.$slots.default.length;
        const children = this.childrenCount() > 1 ? this.formatChildren(this.$slots.default) : this.$slots.default;
        return (<div class={'slider'} ref={'slider'} style={Object.assign({}, this.getSliderStyles())}>
        <div class={'slider-frame'} ref={'frame'} style={this.getFrameStyles()} on={Object.assign({}, this.getTouchEvents(), this.getMouseEvents())} onClick={this.handleClick.bind(this)}>
          <ul class={'slider-list'} ref={'list'} style={this.getListStyles()}>
            {children}
          </ul>
        </div>
        {this.decorators ?
            this.decorators.map((Decorator, index) => (<div style={Object.assign({}, this.getDecoratorStyles(Decorator.position), (Decorator.style || {}))} class={'slider-decorator-' + index} key={index}>
              <Decorator.component props={{
                currentSlide: this.state.currentSlide,
                slideCount: this.state.slideCount,
                frameWidth: this.state.frameWidth,
                slideWidth: this.state.slideWidth,
                slidesToScroll: this.state.slidesToScroll,
                cellSpacing: this.cellSpacing,
                slidesToShow: this.slidesToShow,
                wrapAround: this.wrapAround,
                nextSlide: this.nextSlide.bind(this),
                previousSlide: this.previousSlide.bind(this),
                goToSlide: this.goToSlide.bind(this)
            }}/>
            </div>)) : null}
        <style type={'text/css'} dangerouslySetInnerHTML={{ __html: this.getStyleTagStyles() }}/>
      </div>);
    }
    // Touch Events
    getTouchEvents() {
        const self = this;
        if (this.swiping === false) {
            return null;
        }
        return {
            touchstart(e) {
                self.touchObject = {
                    startX: e.touches[0].pageX,
                    startY: e.touches[0].pageY
                };
                self.handleMouseOver();
            },
            touchmove(e) {
                const direction = self.swipeDirection(self.touchObject.startX, e.touches[0].pageX, self.touchObject.startY, e.touches[0].pageY);
                if (direction !== 0) {
                    e.preventDefault();
                }
                const length = self.vertical ? Math.round(Math.sqrt(Math.pow(e.touches[0].pageY - self.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - self.touchObject.startX, 2)));
                self.touchObject = {
                    startX: self.touchObject.startX,
                    startY: self.touchObject.startY,
                    endX: e.touches[0].pageX,
                    endY: e.touches[0].pageY,
                    length,
                    direction
                };
                self.setState({
                    left: self.vertical ? 0 : self.getTargetLeft(self.touchObject.length * self.touchObject.direction),
                    top: self.vertical ? self.getTargetLeft(self.touchObject.length * self.touchObject.direction) : 0
                });
            },
            touchend(e) {
                self.handleSwipe(e);
                self.handleMouseOut();
            },
            touchcancel(e) {
                self.handleSwipe(e);
            }
        };
    }
    getMouseEvents() {
        const self = this;
        if (this.dragging === false) {
            return null;
        }
        return {
            mouseover() {
                self.handleMouseOver();
            },
            mouseout() {
                self.handleMouseOut();
            },
            mousedown(e) {
                self.touchObject = {
                    startX: e.clientX,
                    startY: e.clientY
                };
                self.setState({
                    dragging: true
                });
            },
            mousemove(e) {
                if (!self.state.dragging) {
                    return;
                }
                const direction = self.swipeDirection(self.touchObject.startX, e.clientX, self.touchObject.startY, e.clientY);
                if (direction !== 0) {
                    e.preventDefault();
                }
                const length = self.vertical ? Math.round(Math.sqrt(Math.pow(e.clientY - self.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.clientX - self.touchObject.startX, 2)));
                self.touchObject = {
                    startX: self.touchObject.startX,
                    startY: self.touchObject.startY,
                    endX: e.clientX,
                    endY: e.clientY,
                    length,
                    direction
                };
                self.setState({
                    left: self.vertical ? 0 : self.getTargetLeft(self.touchObject.length * self.touchObject.direction),
                    top: self.vertical ? self.getTargetLeft(self.touchObject.length * self.touchObject.direction) : 0
                });
            },
            mouseup(e) {
                if (!self.state.dragging) {
                    return;
                }
                self.handleSwipe(e);
            },
            mouseleave(e) {
                if (!self.state.dragging) {
                    return;
                }
                self.handleSwipe(e);
            }
        };
    }
    handleMouseOver() {
        if (this.autoplay) {
            this.autoplayPaused = true;
            this.stopAutoplay();
        }
    }
    handleMouseOut() {
        if (this.autoplay && this.autoplayPaused) {
            this.startAutoplay();
            this.autoplayPaused = null;
        }
    }
    handleClick(e) {
        if (this.clickSafe === true) {
            e.preventDefault();
            e.stopPropagation();
            if (e.nativeEvent) {
                e.nativeEvent.stopPropagation();
            }
        }
    }
    handleSwipe(_) {
        this.clickSafe = !!(typeof (this.touchObject.length) !== 'undefined' && this.touchObject.length > 44);
        const slidesToShow = this.slidesToShow;
        const { slidesToScroll, swipeSpeed } = this;
        // var slidesToShow = this.slidesToShow;
        if (slidesToScroll === 'auto') {
            this.state.lidesToShow = this.state.slidesToScroll;
        }
        if (this.childrenCount() > 1 && this.touchObject.length > (this.state.slideWidth / slidesToShow) / swipeSpeed) {
            if (this.touchObject.direction === 1) {
                if (this.state.currentSlide >= this.childrenCount() - slidesToShow &&
                    !this.wrapAround) {
                    this.animateSlide(this.edgeEasing);
                }
                else {
                    this.nextSlide();
                }
            }
            else if (this.touchObject.direction === -1) {
                if (this.state.currentSlide <= 0 && !this.wrapAround) {
                    this.animateSlide(this.edgeEasing);
                }
                else {
                    this.previousSlide();
                }
            }
        }
        else {
            this.goToSlide(this.state.currentSlide);
        }
        this.touchObject = {};
        this.state.dragging = false;
    }
    swipeDirection(x1, x2, y1, y2) {
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
        if (this.vertical === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 1;
            }
            else {
                return -1;
            }
        }
        return 0;
    }
    autoplayIterator() {
        if (this.wrapAround) {
            return this.nextSlide();
        }
        if (this.state.currentSlide !== this.state.slideCount - this.state.slidesToShow) {
            this.nextSlide();
        }
        else {
            this.stopAutoplay();
        }
    }
    startAutoplay() {
        if (this.childrenCount() <= 1) {
            return;
        }
        this.autoplayID = setInterval(this.autoplayIterator, this.autoplayInterval);
    }
    resetAutoplayFun() {
        if (this.resetAutoplay && this.autoplay && !this.autoplayPaused) { // by warmhug
            this.stopAutoplay();
            this.startAutoplay();
        }
    }
    stopAutoplay() {
        if (this.autoplayID) {
            clearInterval(this.autoplayID);
        }
    }
    // Action Methods
    goToSlide(index) {
        const { beforeSlide, afterSlide } = this;
        if ((index >= this.childrenCount() || index < 0)) {
            if (!this.wrapAround) {
                return;
            }
            if (index >= this.childrenCount()) {
                beforeSlide(this.state.currentSlide, 0);
                return this.setState({
                    currentSlide: 0
                }, () => {
                    this.animateSlide(null, null, this.getTargetLeft(null, index), () => {
                        this.animateSlide(null, 0.01);
                        afterSlide(0);
                        this.resetAutoplayFun();
                        this.setExternalData();
                    });
                });
            }
            else {
                const endSlide = this.childrenCount() - this.state.slidesToScroll;
                beforeSlide(this.state.currentSlide, endSlide);
                return this.setState({
                    currentSlide: endSlide
                }, () => {
                    this.animateSlide(null, null, this.getTargetLeft(null, index), () => {
                        this.animateSlide(null, 0.01);
                        afterSlide(endSlide);
                        this.resetAutoplayFun();
                        this.setExternalData();
                    });
                });
            }
        }
        beforeSlide(this.state.currentSlide, index);
        this.state.currentSlide = index;
        this.animateSlide();
        this.afterSlide(index);
        this.resetAutoplayFun();
        this.setExternalData();
    }
    nextSlide() {
        const childrenCount = this.childrenCount();
        let slidesToShow = this.slidesToShow;
        if (this.slidesToScroll === 'auto') {
            slidesToShow = this.state.slidesToScroll;
        }
        if (this.state.currentSlide >= childrenCount - slidesToShow && !this.wrapAround) {
            return;
        }
        if (this.wrapAround) {
            this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
        }
        else {
            if (this.slideWidth !== 1) {
                return this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
            }
            this.goToSlide(Math.min(this.state.currentSlide + this.state.slidesToScroll, childrenCount - slidesToShow));
        }
    }
    previousSlide() {
        if (this.state.currentSlide <= 0 && !this.wrapAround) {
            return;
        }
        if (this.wrapAround) {
            this.goToSlide(this.state.currentSlide - this.state.slidesToScroll);
        }
        else {
            this.goToSlide(Math.max(0, this.state.currentSlide - this.state.slidesToScroll));
        }
    }
    // Animation
    animateSlide(easing, duration, endValue, callback) {
        this.tweenState(this.vertical ? 'top' : 'left', {
            easing: easing || this.easing,
            duration: duration || this.speed,
            endValue: endValue || this.getTargetLeft(),
            delay: null,
            beginValue: null,
            onEnd: callback || null,
            stackBehavior
        });
    }
    getTargetLeft(touchOffset, slide) {
        let offset;
        const target = slide || this.state.currentSlide;
        const cellSpacing = this.cellSpacing;
        switch (this.cellAlign) {
            case 'left': {
                offset = 0;
                offset -= cellSpacing * (target);
                break;
            }
            case 'center': {
                offset = (this.state.frameWidth - this.state.slideWidth) / 2;
                offset -= cellSpacing * (target);
                break;
            }
            case 'right': {
                offset = this.state.frameWidth - this.state.slideWidth;
                offset -= cellSpacing * (target);
                break;
            }
            default:
                break;
        }
        let left = this.state.slideWidth * target;
        const lastSlide = this.state.currentSlide > 0 && target + this.state.slidesToScroll >= this.state.slideCount;
        if (lastSlide && this.slideWidth !== 1 && !this.wrapAround && this.slidesToScroll === 'auto') {
            left = (this.state.slideWidth * this.state.slideCount) - this.state.frameWidth;
            offset = 0;
            offset -= cellSpacing * (this.state.slideCount - 1);
        }
        offset -= touchOffset || 0;
        console.log(left);
        return (left - offset) * -1;
    }
    // Bootstrapping
    bindEvents() {
        if (ExecutionEnvironment.canUseDOM) {
            addEvent(window, 'resize', this.onResize.bind(this));
            addEvent(document, 'readystatechange', this.onReadyStateChange.bind(this));
        }
    }
    onResize() {
        this.setDimensions();
    }
    onReadyStateChange() {
        this.setDimensions();
    }
    unbindEvents() {
        if (ExecutionEnvironment.canUseDOM) {
            removeEvent(window, 'resize', this.onResize.bind(this));
            removeEvent(document, 'readystatechange', this.onReadyStateChange.bind(this));
        }
    }
    formatChildren(children) {
        const positionValue = this.vertical ? this.getTweeningValue('top') : this.getTweeningValue('left');
        return children.map((child, index) => {
            return <li class={'slider-slide'} style={this.getSlideStyles(index, positionValue)} key={index}>{child}</li>;
        });
    }
    setInitialDimensions() {
        const { vertical, initialSlideHeight, initialSlideWidth, slidesToShow, cellSpacing } = this;
        const slideWidth = vertical ? (initialSlideHeight || 0) : (initialSlideWidth || 0);
        const slideHeight = initialSlideHeight ? initialSlideHeight * slidesToShow : 0;
        const frameHeight = slideHeight + (cellSpacing * (slidesToShow - 1));
        this.setState({
            slideHeight,
            frameWidth: vertical ? frameHeight : '100%',
            slideCount: this.childrenCount(),
            slideWidth
        }, () => {
            this.setLeft();
            this.setExternalData();
        });
    }
    setDimensions() {
        let frameWidth;
        let frameHeight;
        let slideHeight;
        let slideWidth;
        const slidesToScroll = this.slidesToScroll;
        const frame = this.$refs.frame;
        const firstSlide = frame && frame.childNodes[0].childNodes[0];
        if (firstSlide) {
            firstSlide.style.height = 'auto';
            slideHeight = this.vertical ?
                firstSlide.offsetHeight * this.slidesToShow :
                firstSlide.offsetHeight;
        }
        else {
            slideHeight = 100;
        }
        if (typeof this.slideWidth !== 'number') {
            slideWidth = parseInt(this.slideWidth, 10);
        }
        else {
            if (this.vertical) {
                slideWidth = (slideHeight / this.slidesToShow) * this.slideWidth;
            }
            else {
                if (frame) {
                    slideWidth = (frame.offsetWidth / this.slidesToShow) * this.slideWidth;
                }
            }
        }
        if (!this.vertical) {
            slideWidth -= this.cellSpacing * ((100 - (100 / this.slidesToShow)) / 100);
        }
        frameHeight = slideHeight + (this.cellSpacing * (this.slidesToShow - 1));
        if (frame) {
            frameWidth = this.vertical ? frameHeight : frame.offsetWidth;
        }
        if (this.slidesToScroll === 'auto') {
            this.state.slidesToScroll = Math.floor(frameWidth / (slideWidth + this.cellSpacing));
        }
        this.setState({
            slideHeight,
            frameWidth,
            slideWidth,
            slidesToScroll,
            left: this.vertical ? 0 : this.getTargetLeft(),
            top: this.vertical ? this.getTargetLeft() : 0
        }, () => {
            this.setLeft();
        });
    }
    setLeft() {
        this.setState({
            left: this.vertical ? 0 : this.getTargetLeft(),
            top: this.vertical ? this.getTargetLeft() : 0
        });
    }
    // Data
    setExternalData() {
        if (this.data) {
            this.data();
        }
    }
    childrenCount() {
        return this.$slots.default && this.$slots.default.length || 0;
    }
    // Styles
    getListStyles() {
        const listWidth = this.state.slideWidth * this.childrenCount();
        const cellSpacing = this.cellSpacing;
        const spacingOffset = cellSpacing * this.childrenCount();
        const transform = 'translate3d(' +
            this.getTweeningValue('left') + 'px, ' +
            this.getTweeningValue('top') + 'px, 0)';
        return {
            transform,
            WebkitTransform: transform,
            msTransform: 'translate(' +
                this.getTweeningValue('left') + 'px, ' +
                this.getTweeningValue('top') + 'px)',
            position: 'relative',
            display: 'block',
            margin: this.vertical ? (cellSpacing / 2) * -1 + 'px 0px'
                : '0px ' + (cellSpacing / 2) * -1 + 'px',
            padding: 0,
            height: this.vertical ? ((listWidth + spacingOffset) + 'px') : (this.state.slideHeight + 'px'),
            width: this.vertical ? 'auto' : ((listWidth + spacingOffset) + 'px'),
            cursor: this.state.dragging ? 'pointer' : 'inherit',
            boxSizing: 'border-box',
            MozBoxSizing: 'border-box'
        };
    }
    getFrameStyles() {
        return {
            position: 'relative',
            display: 'block',
            overflow: this.frameOverflow,
            height: this.vertical ? (this.state.frameWidth + 'px') || 'initial' : 'auto',
            margin: this.framePadding,
            padding: 0,
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
            msTransform: 'translate(0, 0)',
            boxSizing: 'border-box',
            MozBoxSizing: 'border-box'
        };
    }
    getSlideStyles(index, positionValue) {
        const targetPosition = this.getSlideTargetPosition(index, positionValue);
        const cellSpacing = this.cellSpacing;
        return {
            position: 'absolute',
            left: this.vertical ? 0 : (targetPosition + 'px'),
            top: this.vertical ? (targetPosition + 'px') : 0,
            display: this.vertical ? 'block' : 'inline-block',
            listStyleType: 'none',
            verticalAlign: 'top',
            width: this.vertical ? '100%' : (this.state.slideWidth + 'px'),
            height: 'auto',
            boxSizing: 'border-box',
            MozBoxSizing: 'border-box',
            marginLeft: this.vertical ? 'auto' : (cellSpacing / 2 + 'px'),
            marginRight: this.vertical ? 'auto' : (cellSpacing / 2 + 'px'),
            marginTop: this.vertical ? (cellSpacing / 2 + 'px') : 'auto',
            marginBottom: this.vertical ? (cellSpacing / 2 + 'px') : 'auto'
        };
    }
    getSlideTargetPosition(index, positionValue) {
        const slidesToShow = (this.state.frameWidth / this.state.slideWidth);
        const targetPosition = (this.state.slideWidth + this.cellSpacing) * index;
        const end = ((this.state.slideWidth + this.cellSpacing) * slidesToShow) * -1;
        if (this.wrapAround) {
            const slidesBefore = Math.ceil(positionValue / (this.state.slideWidth));
            if (this.state.slideCount - slidesBefore <= index) {
                return (this.state.slideWidth + this.cellSpacing) *
                    (this.state.slideCount - index) * -1;
            }
            let slidesAfter = Math.ceil((Math.abs(positionValue) - Math.abs(end)) / this.state.slideWidth);
            if (this.state.slideWidth !== 1) {
                slidesAfter = Math.ceil((Math.abs(positionValue) - (this.state.slideWidth)) / this.state.slideWidth);
            }
            if (index <= slidesAfter - 1) {
                return (this.state.slideWidth + this.cellSpacing) * (this.state.slideCount + index);
            }
        }
        return targetPosition;
    }
    getSliderStyles() {
        return {
            position: 'relative',
            display: 'block',
            width: this.width,
            height: 'auto',
            boxSizing: 'border-box',
            MozBoxSizing: 'border-box',
            visibility: this.state.slideWidth ? 'visible' : 'hidden'
        };
    }
    getStyleTagStyles() {
        return '.slider-slide > img {width: 100%; display: block;}';
    }
    getDecoratorStyles(position) {
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
    }
};
tslib_1.__decorate([
    Prop({
        default: () => () => {
        }
    })
], CarouselBase.prototype, "afterSlide", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], CarouselBase.prototype, "autoplay", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], CarouselBase.prototype, "resetAutoplay", void 0);
tslib_1.__decorate([
    Prop({ default: 12 })
], CarouselBase.prototype, "swipeSpeed", void 0);
tslib_1.__decorate([
    Prop({ default: 3000 })
], CarouselBase.prototype, "autoplayInterval", void 0);
tslib_1.__decorate([
    Prop({
        default: () => () => {
        }
    })
], CarouselBase.prototype, "beforeSlide", void 0);
tslib_1.__decorate([
    Prop({ default: 'left' })
], CarouselBase.prototype, "cellAlign", void 0);
tslib_1.__decorate([
    Prop({ default: 0 })
], CarouselBase.prototype, "cellSpacing", void 0);
tslib_1.__decorate([
    Prop({
        default: () => () => {
        }
    })
], CarouselBase.prototype, "data", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return decorators;
        }
    })
], CarouselBase.prototype, "decorators", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], CarouselBase.prototype, "dragging", void 0);
tslib_1.__decorate([
    Prop({ default: () => easeOutCirc })
], CarouselBase.prototype, "easing", void 0);
tslib_1.__decorate([
    Prop({ default: () => linear })
], CarouselBase.prototype, "edgeEasing", void 0);
tslib_1.__decorate([
    Prop({ default: '0px' })
], CarouselBase.prototype, "framePadding", void 0);
tslib_1.__decorate([
    Prop({ default: 'hidden' })
], CarouselBase.prototype, "frameOverflow", void 0);
tslib_1.__decorate([
    Prop()
], CarouselBase.prototype, "initialSlideHeight", void 0);
tslib_1.__decorate([
    Prop()
], CarouselBase.prototype, "initialSlideWidth", void 0);
tslib_1.__decorate([
    Prop({ default: 0 })
], CarouselBase.prototype, "slideIndex", void 0);
tslib_1.__decorate([
    Prop({ default: 1 })
], CarouselBase.prototype, "slidesToShow", void 0);
tslib_1.__decorate([
    Prop({ default: 1 })
], CarouselBase.prototype, "slidesToScroll", void 0);
tslib_1.__decorate([
    Prop({ default: 1 })
], CarouselBase.prototype, "slideWidth", void 0);
tslib_1.__decorate([
    Prop({ default: 500 })
], CarouselBase.prototype, "speed", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], CarouselBase.prototype, "swiping", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], CarouselBase.prototype, "vertical", void 0);
tslib_1.__decorate([
    Prop({ default: '100%' })
], CarouselBase.prototype, "width", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], CarouselBase.prototype, "wrapAround", void 0);
tslib_1.__decorate([
    Watch('slideIndex')
], CarouselBase.prototype, "slideIndexChanged", null);
tslib_1.__decorate([
    Watch('autoplay')
], CarouselBase.prototype, "autoplayChanged", null);
CarouselBase = tslib_1.__decorate([
    Component({
        name: 'CarouselBase'
    })
], CarouselBase);
export default CarouselBase;
//# sourceMappingURL=base.jsx.map