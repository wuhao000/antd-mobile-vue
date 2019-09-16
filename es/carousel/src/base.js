'use strict';

import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26;

import ExecutionEnvironment from 'exenv';
import requestAnimationFrame from 'raf';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import decorators from './decorators'; // from https://github.com/chenglou/tween-functions

function easeOutCirc(t, b, _c, d) {
  var c = _c - b;
  var t2 = t; // 差之毫厘，谬之千里

  return c * Math.sqrt(1 - (t2 = t2 / d - 1) * t2) + b;
}

function linear(t, b, _c, d) {
  var c = _c - b;
  return c * t / d + b;
}

var DEFAULT_STACK_BEHAVIOR = 'ADDITIVE';
var DEFAULT_DURATION = 300;
var DEFAULT_DELAY = 0;
var stackBehavior = {
  ADDITIVE: 'ADDITIVE',
  DESTRUCTIVE: 'DESTRUCTIVE'
};

var addEvent = function addEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
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

var removeEvent = function removeEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
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

var CarouselBase = (_dec = Component({
  name: 'CarouselBase'
}), _dec2 = Prop({
  default: function _default() {
    return function () {};
  }
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Prop({
  type: Boolean,
  default: true
}), _dec5 = Prop({
  default: 12
}), _dec6 = Prop({
  default: 3000
}), _dec7 = Prop({
  default: function _default() {
    return function () {};
  }
}), _dec8 = Prop({
  default: 'left'
}), _dec9 = Prop({
  default: 0
}), _dec10 = Prop({
  default: function _default() {
    return function () {};
  }
}), _dec11 = Prop({
  default: function _default() {
    return decorators;
  }
}), _dec12 = Prop({
  type: Boolean,
  default: true
}), _dec13 = Prop({
  default: function _default() {
    return easeOutCirc;
  }
}), _dec14 = Prop({
  default: function _default() {
    return linear;
  }
}), _dec15 = Prop({
  default: '0px'
}), _dec16 = Prop({
  default: 'hidden'
}), _dec17 = Prop(), _dec18 = Prop(), _dec19 = Prop({
  default: 0
}), _dec20 = Prop({
  default: 1
}), _dec21 = Prop({
  default: 1
}), _dec22 = Prop({
  default: 1
}), _dec23 = Prop({
  default: 500
}), _dec24 = Prop({
  type: Boolean,
  default: true
}), _dec25 = Prop({
  type: Boolean,
  default: false
}), _dec26 = Prop({
  default: '100%'
}), _dec27 = Prop({
  type: Boolean,
  default: false
}), _dec28 = Watch('slideIndex'), _dec29 = Watch('autoplay'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(CarouselBase, _Vue);

  function CarouselBase() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "afterSlide", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "autoplay", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "resetAutoplay", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "swipeSpeed", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "autoplayInterval", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "beforeSlide", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cellAlign", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cellSpacing", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "data", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "decorators", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dragging", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "easing", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "edgeEasing", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "framePadding", _descriptor14, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "frameOverflow", _descriptor15, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "initialSlideHeight", _descriptor16, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "initialSlideWidth", _descriptor17, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "slideIndex", _descriptor18, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "slidesToShow", _descriptor19, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "slidesToScroll", _descriptor20, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "slideWidth", _descriptor21, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "speed", _descriptor22, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "swiping", _descriptor23, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "vertical", _descriptor24, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "width", _descriptor25, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "wrapAround", _descriptor26, _assertThisInitialized(_this)), _this.touchObject = {}, _this.clickSafe = true, _this.state = {
      slidesToShow: _this.slidesToShow,
      slideHeight: 0,
      currentSlide: _this.slideIndex,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      lidesToShow: 0,
      slidesToScroll: typeof _this.slidesToScroll === 'number' ? _this.slidesToScroll : 1,
      slideWidth: 0,
      top: 0,
      tweenQueue: []
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = CarouselBase.prototype;

  _proto.created = function created() {
    this.setInitialDimensions();
  };

  _proto.mounted = function mounted() {
    this.setDimensions();
    this.bindEvents();
    this.setExternalData();

    if (this.autoplay) {
      this.startAutoplay();
    }
  };

  _proto.setState = function setState(object, callback) {
    var _this2 = this;

    Object.keys(object).forEach(function (key) {
      _this2.state[key] = object[key];
    });

    if (callback) {
      callback();
    }
  };

  _proto.slideIndexChanged = function slideIndexChanged(value) {
    if (value !== this.state.currentSlide) {
      this.goToSlide(value);
    }
  };

  _proto.autoplayChanged = function autoplayChanged(value) {
    if (value) {
      this.startAutoplay();
    } else {
      this.stopAutoplay();
    }
  };

  _proto.beforeDestroy = function beforeDestroy() {
    this.unbindEvents();
    this.stopAutoplay();
    requestAnimationFrame.cancel(this._rafID);
    this._rafID = -1;
  } // react-tween-state
  ;

  _proto.tweenState = function tweenState(path, _ref) {
    var easing = _ref.easing,
        duration = _ref.duration,
        delay = _ref.delay,
        beginValue = _ref.beginValue,
        endValue = _ref.endValue,
        onEnd = _ref.onEnd,
        configSB = _ref.stackBehavior;
    var cursor = this.state;
    var stateName; // see comment below on pash hash

    var pathHash;

    if (typeof path === 'string') {
      stateName = path;
      pathHash = path;
    } else {
      for (var i = 0; i < path.length - 1; i++) {
        cursor = cursor[path[i]];
      }

      stateName = path[path.length - 1];
      pathHash = path.join('|');
    } // see the reasoning for these defaults at the top of file


    var newConfig = {
      easing: easing,
      duration: duration == null ? DEFAULT_DURATION : duration,
      delay: delay == null ? DEFAULT_DELAY : delay,
      beginValue: beginValue == null ? cursor[stateName] : beginValue,
      endValue: endValue,
      onEnd: onEnd,
      stackBehavior: configSB || DEFAULT_STACK_BEHAVIOR
    };
    var newTweenQueue = this.state.tweenQueue;

    if (newConfig.stackBehavior === stackBehavior.DESTRUCTIVE) {
      newTweenQueue = this.state.tweenQueue.filter(function (item) {
        return item.pathHash !== pathHash;
      });
    } // we store path hash, so that during value retrieval we can use hash
    // comparison to find the path. See the kind of shitty thing you have to
    // do when you don't have value comparison for collections?


    newTweenQueue.push({
      pathHash: pathHash,
      config: newConfig,
      initTime: Date.now() + newConfig.delay
    }); // sorry for mutating. For perf reasons we don't want to deep clone.
    // guys, can we please all start using persistent collections so that
    // we can stop worrying about nonesense like this

    cursor[stateName] = newConfig.endValue;

    if (newTweenQueue.length === 1) {
      this._rafID = requestAnimationFrame(this._rafCb.bind(this));
    } // this will also include the above mutated update


    this.state.tweenQueue = newTweenQueue;
  };

  _proto.getTweeningValue = function getTweeningValue(path) {
    var state = this.state;
    var tweeningValue;
    var pathHash;

    if (typeof path === 'string') {
      tweeningValue = state[path];
      pathHash = path;
    } else {
      tweeningValue = state;

      for (var i = 0; i < path.length; i++) {
        tweeningValue = tweeningValue[path[i]];
      }

      pathHash = path.join('|');
    }

    var now = Date.now();

    for (var _i = 0; _i < state.tweenQueue.length; _i++) {
      var _state$tweenQueue$_i = state.tweenQueue[_i],
          itemPathHash = _state$tweenQueue$_i.pathHash,
          initTime = _state$tweenQueue$_i.initTime,
          config = _state$tweenQueue$_i.config;

      if (itemPathHash !== pathHash) {
        continue;
      }

      var progressTime = now - initTime > config.duration ? config.duration : Math.max(0, now - initTime); // `now - initTime` can be negative if initTime is scheduled in the
      // future by a delay. In this case we take 0
      // if duration is 0, consider that as jumping to endValue directly. This
      // is needed because the easing functino might have undefined behavior for
      // duration = 0

      var easeValue = config.duration === 0 ? config.endValue : config.easing(progressTime, config.beginValue, config.endValue, config.duration // TODO: some funcs accept a 5th param
      );
      var contrib = easeValue - config.endValue;
      tweeningValue += contrib;
    }

    return tweeningValue;
  };

  _proto._rafCb = function _rafCb() {
    var state = this.state;

    if (state.tweenQueue.length === 0) {
      return;
    }

    var now = Date.now();
    var newTweenQueue = [];

    for (var i = 0; i < state.tweenQueue.length; i++) {
      var item = state.tweenQueue[i];
      var initTime = item.initTime,
          config = item.config;

      if (now - initTime < config.duration) {
        newTweenQueue.push(item);
      } else {
        if (config.onEnd) {
          config.onEnd();
        }
      }
    } // onEnd might trigger a parent callback that removes this component
    // -1 means we've canceled it in componentWillUnmount


    if (this._rafID === -1) {
      return;
    }

    this.state.tweenQueue = newTweenQueue;
    this._rafID = requestAnimationFrame(this._rafCb);
  };

  _proto.beforeUpdate = function beforeUpdate() {
    this.setDimensions();
  };

  _proto.render = function render() {
    var _this3 = this;

    var h = arguments[0];
    this.state.slideCount = this.$slots.default.length;
    var children = this.childrenCount() > 1 ? this.formatChildren(this.$slots.default) : this.$slots.default;
    return h("div", {
      "class": "slider",
      "ref": "slider",
      "style": _extends({}, this.getSliderStyles())
    }, [h("div", _mergeJSXProps([{
      "class": "slider-frame",
      "ref": "frame",
      "style": this.getFrameStyles()
    }, {
      "on": _extends({}, this.getTouchEvents(), this.getMouseEvents())
    }, {
      "on": {
        "click": this.handleClick.bind(this)
      }
    }]), [h("ul", {
      "class": "slider-list'} ref={'list",
      "style": this.getListStyles()
    }, [children])]), this.decorators ? this.decorators.map(function (Decorator, index) {
      return h("div", {
        "style": _extends({}, _this3.getDecoratorStyles(Decorator.position), Decorator.style || {}),
        "class": 'slider-decorator-' + index,
        "key": index
      }, [h(Decorator.component, _mergeJSXProps2([{}, {
        "props": {
          currentSlide: _this3.state.currentSlide,
          slideCount: _this3.state.slideCount,
          frameWidth: _this3.state.frameWidth,
          slideWidth: _this3.state.slideWidth,
          slidesToScroll: _this3.state.slidesToScroll,
          cellSpacing: _this3.cellSpacing,
          slidesToShow: _this3.slidesToShow,
          wrapAround: _this3.wrapAround,
          nextSlide: _this3.nextSlide.bind(_this3),
          previousSlide: _this3.previousSlide.bind(_this3),
          goToSlide: _this3.goToSlide.bind(_this3)
        }
      }]))]);
    }) : null, h("style", {
      "attrs": {
        "type": "text/css",
        "dangerouslySetInnerHTML": {
          __html: this.getStyleTagStyles()
        }
      }
    })]);
  } // Touch Events
  ;

  _proto.getTouchEvents = function getTouchEvents() {
    var self = this;

    if (this.swiping === false) {
      return null;
    }

    return {
      touchstart: function touchstart(e) {
        self.touchObject = {
          startX: e.touches[0].pageX,
          startY: e.touches[0].pageY
        };
        self.handleMouseOver();
      },
      touchmove: function touchmove(e) {
        var direction = self.swipeDirection(self.touchObject.startX, e.touches[0].pageX, self.touchObject.startY, e.touches[0].pageY);

        if (direction !== 0) {
          e.preventDefault();
        }

        var length = self.vertical ? Math.round(Math.sqrt(Math.pow(e.touches[0].pageY - self.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - self.touchObject.startX, 2)));
        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: e.touches[0].pageX,
          endY: e.touches[0].pageY,
          length: length,
          direction: direction
        };
        self.setState({
          left: self.vertical ? 0 : self.getTargetLeft(self.touchObject.length * self.touchObject.direction),
          top: self.vertical ? self.getTargetLeft(self.touchObject.length * self.touchObject.direction) : 0
        });
      },
      touchend: function touchend(e) {
        self.handleSwipe(e);
        self.handleMouseOut();
      },
      touchcancel: function touchcancel(e) {
        self.handleSwipe(e);
      }
    };
  };

  _proto.getMouseEvents = function getMouseEvents() {
    var self = this;

    if (this.dragging === false) {
      return null;
    }

    return {
      mouseover: function mouseover() {
        self.handleMouseOver();
      },
      mouseout: function mouseout() {
        self.handleMouseOut();
      },
      mousedown: function mousedown(e) {
        self.touchObject = {
          startX: e.clientX,
          startY: e.clientY
        };
        self.setState({
          dragging: true
        });
      },
      mousemove: function mousemove(e) {
        if (!self.state.dragging) {
          return;
        }

        var direction = self.swipeDirection(self.touchObject.startX, e.clientX, self.touchObject.startY, e.clientY);

        if (direction !== 0) {
          e.preventDefault();
        }

        var length = self.vertical ? Math.round(Math.sqrt(Math.pow(e.clientY - self.touchObject.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.clientX - self.touchObject.startX, 2)));
        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: e.clientX,
          endY: e.clientY,
          length: length,
          direction: direction
        };
        self.setState({
          left: self.vertical ? 0 : self.getTargetLeft(self.touchObject.length * self.touchObject.direction),
          top: self.vertical ? self.getTargetLeft(self.touchObject.length * self.touchObject.direction) : 0
        });
      },
      mouseup: function mouseup(e) {
        if (!self.state.dragging) {
          return;
        }

        self.handleSwipe(e);
      },
      mouseleave: function mouseleave(e) {
        if (!self.state.dragging) {
          return;
        }

        self.handleSwipe(e);
      }
    };
  };

  _proto.handleMouseOver = function handleMouseOver() {
    if (this.autoplay) {
      this.autoplayPaused = true;
      this.stopAutoplay();
    }
  };

  _proto.handleMouseOut = function handleMouseOut() {
    if (this.autoplay && this.autoplayPaused) {
      this.startAutoplay();
      this.autoplayPaused = null;
    }
  };

  _proto.handleClick = function handleClick(e) {
    if (this.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();

      if (e.nativeEvent) {
        e.nativeEvent.stopPropagation();
      }
    }
  };

  _proto.handleSwipe = function handleSwipe(_) {
    this.clickSafe = !!(typeof this.touchObject.length !== 'undefined' && this.touchObject.length > 44);
    var slidesToShow = this.slidesToShow;
    var slidesToScroll = this.slidesToScroll,
        swipeSpeed = this.swipeSpeed; // var slidesToShow = this.slidesToShow;

    if (slidesToScroll === 'auto') {
      this.state.lidesToShow = this.state.slidesToScroll;
    }

    if (this.childrenCount() > 1 && this.touchObject.length > this.state.slideWidth / slidesToShow / swipeSpeed) {
      if (this.touchObject.direction === 1) {
        if (this.state.currentSlide >= this.childrenCount() - slidesToShow && !this.wrapAround) {
          this.animateSlide(this.edgeEasing);
        } else {
          this.nextSlide();
        }
      } else if (this.touchObject.direction === -1) {
        if (this.state.currentSlide <= 0 && !this.wrapAround) {
          this.animateSlide(this.edgeEasing);
        } else {
          this.previousSlide();
        }
      }
    } else {
      this.goToSlide(this.state.currentSlide);
    }

    this.touchObject = {};
    this.state.dragging = false;
  };

  _proto.swipeDirection = function swipeDirection(x1, x2, y1, y2) {
    var xDist = x1 - x2;
    var yDist = y1 - y2;
    var r = Math.atan2(yDist, xDist);
    var swipeAngle = Math.round(r * 180 / Math.PI);

    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }

    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return 1;
    }

    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return 1;
    }

    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return -1;
    }

    if (this.vertical === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 1;
      } else {
        return -1;
      }
    }

    return 0;
  };

  _proto.autoplayIterator = function autoplayIterator() {
    if (this.wrapAround) {
      return this.nextSlide();
    }

    if (this.state.currentSlide !== this.state.slideCount - this.state.slidesToShow) {
      this.nextSlide();
    } else {
      this.stopAutoplay();
    }
  };

  _proto.startAutoplay = function startAutoplay() {
    if (this.childrenCount() <= 1) {
      return;
    }

    this.autoplayID = setInterval(this.autoplayIterator, this.autoplayInterval);
  };

  _proto.resetAutoplayFun = function resetAutoplayFun() {
    if (this.resetAutoplay && this.autoplay && !this.autoplayPaused) {
      // by warmhug
      this.stopAutoplay();
      this.startAutoplay();
    }
  };

  _proto.stopAutoplay = function stopAutoplay() {
    if (this.autoplayID) {
      clearInterval(this.autoplayID);
    }
  } // Action Methods
  ;

  _proto.goToSlide = function goToSlide(index) {
    var _this4 = this;

    var beforeSlide = this.beforeSlide,
        afterSlide = this.afterSlide;

    if (index >= this.childrenCount() || index < 0) {
      if (!this.wrapAround) {
        return;
      }

      if (index >= this.childrenCount()) {
        beforeSlide(this.state.currentSlide, 0);
        return this.setState({
          currentSlide: 0
        }, function () {
          _this4.animateSlide(null, null, _this4.getTargetLeft(null, index), function () {
            _this4.animateSlide(null, 0.01);

            afterSlide(0);

            _this4.resetAutoplayFun();

            _this4.setExternalData();
          });
        });
      } else {
        var endSlide = this.childrenCount() - this.state.slidesToScroll;
        beforeSlide(this.state.currentSlide, endSlide);
        return this.setState({
          currentSlide: endSlide
        }, function () {
          _this4.animateSlide(null, null, _this4.getTargetLeft(null, index), function () {
            _this4.animateSlide(null, 0.01);

            afterSlide(endSlide);

            _this4.resetAutoplayFun();

            _this4.setExternalData();
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
  };

  _proto.nextSlide = function nextSlide() {
    var childrenCount = this.childrenCount();
    var slidesToShow = this.slidesToShow;

    if (this.slidesToScroll === 'auto') {
      slidesToShow = this.state.slidesToScroll;
    }

    if (this.state.currentSlide >= childrenCount - slidesToShow && !this.wrapAround) {
      return;
    }

    if (this.wrapAround) {
      this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
    } else {
      if (this.slideWidth !== 1) {
        return this.goToSlide(this.state.currentSlide + this.state.slidesToScroll);
      }

      this.goToSlide(Math.min(this.state.currentSlide + this.state.slidesToScroll, childrenCount - slidesToShow));
    }
  };

  _proto.previousSlide = function previousSlide() {
    if (this.state.currentSlide <= 0 && !this.wrapAround) {
      return;
    }

    if (this.wrapAround) {
      this.goToSlide(this.state.currentSlide - this.state.slidesToScroll);
    } else {
      this.goToSlide(Math.max(0, this.state.currentSlide - this.state.slidesToScroll));
    }
  } // Animation
  ;

  _proto.animateSlide = function animateSlide(easing, duration, endValue, callback) {
    this.tweenState(this.vertical ? 'top' : 'left', {
      easing: easing || this.easing,
      duration: duration || this.speed,
      endValue: endValue || this.getTargetLeft(),
      delay: null,
      beginValue: null,
      onEnd: callback || null,
      stackBehavior: stackBehavior
    });
  };

  _proto.getTargetLeft = function getTargetLeft(touchOffset, slide) {
    var offset;
    var target = slide || this.state.currentSlide;
    var cellSpacing = this.cellSpacing;

    switch (this.cellAlign) {
      case 'left':
        {
          offset = 0;
          offset -= cellSpacing * target;
          break;
        }

      case 'center':
        {
          offset = (this.state.frameWidth - this.state.slideWidth) / 2;
          offset -= cellSpacing * target;
          break;
        }

      case 'right':
        {
          offset = this.state.frameWidth - this.state.slideWidth;
          offset -= cellSpacing * target;
          break;
        }

      default:
        break;
    }

    var left = this.state.slideWidth * target;
    var lastSlide = this.state.currentSlide > 0 && target + this.state.slidesToScroll >= this.state.slideCount;

    if (lastSlide && this.slideWidth !== 1 && !this.wrapAround && this.slidesToScroll === 'auto') {
      left = this.state.slideWidth * this.state.slideCount - this.state.frameWidth;
      offset = 0;
      offset -= cellSpacing * (this.state.slideCount - 1);
    }

    offset -= touchOffset || 0;
    console.log(left);
    return (left - offset) * -1;
  } // Bootstrapping
  ;

  _proto.bindEvents = function bindEvents() {
    if (ExecutionEnvironment.canUseDOM) {
      addEvent(window, 'resize', this.onResize.bind(this));
      addEvent(document, 'readystatechange', this.onReadyStateChange.bind(this));
    }
  };

  _proto.onResize = function onResize() {
    this.setDimensions();
  };

  _proto.onReadyStateChange = function onReadyStateChange() {
    this.setDimensions();
  };

  _proto.unbindEvents = function unbindEvents() {
    if (ExecutionEnvironment.canUseDOM) {
      removeEvent(window, 'resize', this.onResize.bind(this));
      removeEvent(document, 'readystatechange', this.onReadyStateChange.bind(this));
    }
  };

  _proto.formatChildren = function formatChildren(children) {
    var _this5 = this;

    var h = this.$createElement;
    var positionValue = this.vertical ? this.getTweeningValue('top') : this.getTweeningValue('left');
    return children.map(function (child, index) {
      return h("li", {
        "class": "slider-slide",
        "style": _this5.getSlideStyles(index, positionValue),
        "key": index
      }, [child]);
    });
  };

  _proto.setInitialDimensions = function setInitialDimensions() {
    var _this6 = this;

    var vertical = this.vertical,
        initialSlideHeight = this.initialSlideHeight,
        initialSlideWidth = this.initialSlideWidth,
        slidesToShow = this.slidesToShow,
        cellSpacing = this.cellSpacing;
    var slideWidth = vertical ? initialSlideHeight || 0 : initialSlideWidth || 0;
    var slideHeight = initialSlideHeight ? initialSlideHeight * slidesToShow : 0;
    var frameHeight = slideHeight + cellSpacing * (slidesToShow - 1);
    this.setState({
      slideHeight: slideHeight,
      frameWidth: vertical ? frameHeight : '100%',
      slideCount: this.childrenCount(),
      slideWidth: slideWidth
    }, function () {
      _this6.setLeft();

      _this6.setExternalData();
    });
  };

  _proto.setDimensions = function setDimensions() {
    var _this7 = this;

    var frameWidth;
    var frameHeight;
    var slideHeight;
    var slideWidth;
    var slidesToScroll = this.slidesToScroll;
    var frame = this.$refs.frame;
    var firstSlide = frame && frame.childNodes[0].childNodes[0];

    if (firstSlide) {
      firstSlide.style.height = 'auto';
      slideHeight = this.vertical ? firstSlide.offsetHeight * this.slidesToShow : firstSlide.offsetHeight;
    } else {
      slideHeight = 100;
    }

    if (typeof this.slideWidth !== 'number') {
      slideWidth = parseInt(this.slideWidth, 10);
    } else {
      if (this.vertical) {
        slideWidth = slideHeight / this.slidesToShow * this.slideWidth;
      } else {
        if (frame) {
          slideWidth = frame.offsetWidth / this.slidesToShow * this.slideWidth;
        }
      }
    }

    if (!this.vertical) {
      slideWidth -= this.cellSpacing * ((100 - 100 / this.slidesToShow) / 100);
    }

    frameHeight = slideHeight + this.cellSpacing * (this.slidesToShow - 1);

    if (frame) {
      frameWidth = this.vertical ? frameHeight : frame.offsetWidth;
    }

    if (this.slidesToScroll === 'auto') {
      this.state.slidesToScroll = Math.floor(frameWidth / (slideWidth + this.cellSpacing));
    }

    this.setState({
      slideHeight: slideHeight,
      frameWidth: frameWidth,
      slideWidth: slideWidth,
      slidesToScroll: slidesToScroll,
      left: this.vertical ? 0 : this.getTargetLeft(),
      top: this.vertical ? this.getTargetLeft() : 0
    }, function () {
      _this7.setLeft();
    });
  };

  _proto.setLeft = function setLeft() {
    this.setState({
      left: this.vertical ? 0 : this.getTargetLeft(),
      top: this.vertical ? this.getTargetLeft() : 0
    });
  } // Data
  ;

  _proto.setExternalData = function setExternalData() {
    if (this.data) {
      this.data();
    }
  };

  _proto.childrenCount = function childrenCount() {
    return this.$slots.default && this.$slots.default.length || 0;
  } // Styles
  ;

  _proto.getListStyles = function getListStyles() {
    var listWidth = this.state.slideWidth * this.childrenCount();
    var cellSpacing = this.cellSpacing;
    var spacingOffset = cellSpacing * this.childrenCount();
    var transform = 'translate3d(' + this.getTweeningValue('left') + 'px, ' + this.getTweeningValue('top') + 'px, 0)';
    return {
      transform: transform,
      WebkitTransform: transform,
      msTransform: 'translate(' + this.getTweeningValue('left') + 'px, ' + this.getTweeningValue('top') + 'px)',
      position: 'relative',
      display: 'block',
      margin: this.vertical ? cellSpacing / 2 * -1 + 'px 0px' : '0px ' + cellSpacing / 2 * -1 + 'px',
      padding: 0,
      height: this.vertical ? listWidth + spacingOffset + 'px' : this.state.slideHeight + 'px',
      width: this.vertical ? 'auto' : listWidth + spacingOffset + 'px',
      cursor: this.state.dragging ? 'pointer' : 'inherit',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    };
  };

  _proto.getFrameStyles = function getFrameStyles() {
    return {
      position: 'relative',
      display: 'block',
      overflow: this.frameOverflow,
      height: this.vertical ? this.state.frameWidth + 'px' || 'initial' : 'auto',
      margin: this.framePadding,
      padding: 0,
      transform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      msTransform: 'translate(0, 0)',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box'
    };
  };

  _proto.getSlideStyles = function getSlideStyles(index, positionValue) {
    var targetPosition = this.getSlideTargetPosition(index, positionValue);
    var cellSpacing = this.cellSpacing;
    return {
      position: 'absolute',
      left: this.vertical ? 0 : targetPosition + 'px',
      top: this.vertical ? targetPosition + 'px' : 0,
      display: this.vertical ? 'block' : 'inline-block',
      listStyleType: 'none',
      verticalAlign: 'top',
      width: this.vertical ? '100%' : this.state.slideWidth + 'px',
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      marginLeft: this.vertical ? 'auto' : cellSpacing / 2 + 'px',
      marginRight: this.vertical ? 'auto' : cellSpacing / 2 + 'px',
      marginTop: this.vertical ? cellSpacing / 2 + 'px' : 'auto',
      marginBottom: this.vertical ? cellSpacing / 2 + 'px' : 'auto'
    };
  };

  _proto.getSlideTargetPosition = function getSlideTargetPosition(index, positionValue) {
    var slidesToShow = this.state.frameWidth / this.state.slideWidth;
    var targetPosition = (this.state.slideWidth + this.cellSpacing) * index;
    var end = (this.state.slideWidth + this.cellSpacing) * slidesToShow * -1;

    if (this.wrapAround) {
      var slidesBefore = Math.ceil(positionValue / this.state.slideWidth);

      if (this.state.slideCount - slidesBefore <= index) {
        return (this.state.slideWidth + this.cellSpacing) * (this.state.slideCount - index) * -1;
      }

      var slidesAfter = Math.ceil((Math.abs(positionValue) - Math.abs(end)) / this.state.slideWidth);

      if (this.state.slideWidth !== 1) {
        slidesAfter = Math.ceil((Math.abs(positionValue) - this.state.slideWidth) / this.state.slideWidth);
      }

      if (index <= slidesAfter - 1) {
        return (this.state.slideWidth + this.cellSpacing) * (this.state.slideCount + index);
      }
    }

    return targetPosition;
  };

  _proto.getSliderStyles = function getSliderStyles() {
    return {
      position: 'relative',
      display: 'block',
      width: this.width,
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      visibility: this.state.slideWidth ? 'visible' : 'hidden'
    };
  };

  _proto.getStyleTagStyles = function getStyleTagStyles() {
    return '.slider-slide > img {width: 100%; display: block;}';
  };

  _proto.getDecoratorStyles = function getDecoratorStyles(position) {
    switch (position) {
      case 'TopLeft':
        {
          return {
            position: 'absolute',
            top: 0,
            left: 0
          };
        }

      case 'TopCenter':
        {
          return {
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            WebkitTransform: 'translateX(-50%)',
            msTransform: 'translateX(-50%)'
          };
        }

      case 'TopRight':
        {
          return {
            position: 'absolute',
            top: 0,
            right: 0
          };
        }

      case 'CenterLeft':
        {
          return {
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            WebkitTransform: 'translateY(-50%)',
            msTransform: 'translateY(-50%)'
          };
        }

      case 'CenterCenter':
        {
          return {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            WebkitTransform: 'translate(-50%, -50%)',
            msTransform: 'translate(-50%, -50%)'
          };
        }

      case 'CenterRight':
        {
          return {
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            WebkitTransform: 'translateY(-50%)',
            msTransform: 'translateY(-50%)'
          };
        }

      case 'BottomLeft':
        {
          return {
            position: 'absolute',
            bottom: 0,
            left: 0
          };
        }

      case 'BottomCenter':
        {
          return {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            textAlign: 'center'
          };
        }

      case 'BottomRight':
        {
          return {
            position: 'absolute',
            bottom: 0,
            right: 0
          };
        }

      default:
        {
          return {
            position: 'absolute',
            top: 0,
            left: 0
          };
        }
    }
  };

  return CarouselBase;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "afterSlide", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "autoplay", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "resetAutoplay", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "swipeSpeed", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "autoplayInterval", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "beforeSlide", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "cellAlign", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "cellSpacing", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "data", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "decorators", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "dragging", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "easing", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "edgeEasing", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "framePadding", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "frameOverflow", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "initialSlideHeight", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "initialSlideWidth", [_dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "slideIndex", [_dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "slidesToShow", [_dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "slidesToScroll", [_dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "slideWidth", [_dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "swiping", [_dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "vertical", [_dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "width", [_dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "wrapAround", [_dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "slideIndexChanged", [_dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "slideIndexChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "autoplayChanged", [_dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "autoplayChanged"), _class2.prototype)), _class2)) || _class);
export default CarouselBase;