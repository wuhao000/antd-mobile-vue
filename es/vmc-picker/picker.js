import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

import classNames from 'classnames';
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import PickerMixin from './picker-mixin';
import { PickerProps } from './picker-types';
var Picker = (_dec = Component({
  name: 'Picker'
}), _dec2 = Prop(), _dec3 = Prop(), _dec4 = Prop(), _dec5 = Prop({
  type: Boolean,
  default: false
}), _dec6 = Watch('selectedValue'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_mixins) {
  _inheritsLoose(Picker, _mixins);

  function Picker() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _mixins.call.apply(_mixins, [this].concat(args)) || this, _initializerDefineProperty(_this, "computeChildIndex", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "select", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "doScrollingComplete", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "noAnimate", _descriptor4, _assertThisInitialized(_this)), _this.state = {}, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Picker.prototype;

  _proto.created = function created() {
    var selectedValueState;
    var selectedValue = this.selectedValue,
        defaultSelectedValue = this.defaultSelectedValue;

    if (selectedValue !== undefined) {
      selectedValueState = selectedValue;
    } else if (defaultSelectedValue !== undefined) {
      selectedValueState = defaultSelectedValue;
    } else {
      var children = this.$slots.default;
      selectedValueState = children && children[0] && children[0].value;
    }

    this.state.selectedValue = selectedValueState;
  };

  _proto.mounted = function mounted() {
    var _this2 = this;

    var contentRef = this.contentRef,
        indicatorRef = this.indicatorRef,
        maskRef = this.maskRef,
        rootRef = this.rootRef;
    var rootHeight = rootRef.clientHeight; // https://github.com/react-component/m-picker/issues/18

    var itemHeight = this.itemHeight = indicatorRef.clientHeight;
    var num = Math.floor(rootHeight / itemHeight);

    if (num % 2 === 0) {
      num--;
    }

    num--;
    num /= 2;
    contentRef.style.padding = itemHeight * num + "px 0";
    indicatorRef.style.top = itemHeight * num + "px";
    maskRef.style.backgroundSize = "100% " + itemHeight * num + "px";
    this.scrollHanders.setDisabled(this.disabled);
    this.select(this.state.selectedValue, this.itemHeight, this.scrollTo.bind(this));
    var passiveSupported = this.passiveSupported();
    var willPreventDefault = passiveSupported ? {
      passive: false
    } : false;
    var willNotPreventDefault = passiveSupported ? {
      passive: true
    } : false;
    Object.keys(this.scrollHanders).forEach(function (key) {
      if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
        var pd = key.indexOf('move') >= 0 ? willPreventDefault : willNotPreventDefault;
        rootRef.addEventListener(key, _this2.scrollHanders[key], pd);
      }
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this3 = this;

    Object.keys(this.scrollHanders).forEach(function (key) {
      if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
        _this3.rootRef.removeEventListener(key, _this3.scrollHanders[key]);
      }
    });
  };

  _proto.passiveSupported = function passiveSupported() {
    var passiveSupported = false;

    try {
      var options = Object.defineProperty({}, 'passive', {
        get: function get() {
          passiveSupported = true;
        }
      });
      window.addEventListener('test', null, options);
    } catch (err) {}

    return passiveSupported;
  };

  _proto.selectedValueChanged = function selectedValueChanged(value) {
    if (this.state.selectedValue !== value) {
      this.state.selectedValue = value;
      this.select(this.state.selectedValue, this.itemHeight, this.noAnimate ? this.scrollToWithoutAnimation.bind(this) : this.scrollTo.bind(this));
    }
  };

  _proto.updated = function updated() {
    this.scrollHanders.setDisabled(this.disabled);
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.select(this.state.selectedValue, this.itemHeight, this.scrollToWithoutAnimation.bind(this));
  };

  _proto.scrollTo = function scrollTo(top) {
    this.scrollHanders.scrollTo(0, top);
  };

  _proto.scrollToWithoutAnimation = function scrollToWithoutAnimation(top) {
    this.scrollHanders.scrollTo(0, top, 0);
  };

  _proto.fireValueChange = function fireValueChange(selectedValue) {
    if (selectedValue !== this.state.selectedValue) {
      if (!('selectedValue' in this)) {
        this.selectedValue = selectedValue;
      }

      this.$emit('update:value', selectedValue);
      this.$emit('input', selectedValue);
    }
  };

  _proto.onScrollChange = function onScrollChange() {
    var top = this.scrollHanders.getValue();

    if (top >= 0) {
      var children = this.$slots.default;
      var index = this.computeChildIndex(top, this.itemHeight, children.length);

      if (this.scrollValue !== index) {
        this.scrollValue = index;
        var child = children[index];
        this.$emit('scroll-change', child['value']);
      }
    }
  };

  _proto.scrollingComplete = function scrollingComplete() {
    var top = this.scrollHanders.getValue();

    if (top >= 0) {
      this.doScrollingComplete(top, this.itemHeight, this.fireValueChange.bind(this));
    }
  };

  _proto.getValue = function getValue() {
    if ('selectedValue' in this) {
      return this.selectedValue;
    }

    var children = this.$slots.default;
    return children && children[0] && children[0].props.value;
  };

  _proto.render = function render() {
    var _pickerCls;

    var h = arguments[0];
    var _this$$props = this.$props,
        prefixCls = _this$$props.prefixCls,
        itemStyle = _this$$props.itemStyle,
        indicatorStyle = _this$$props.indicatorStyle,
        _this$$props$indicato = _this$$props.indicatorClassName,
        indicatorClassName = _this$$props$indicato === void 0 ? '' : _this$$props$indicato;
    var selectedValue = this.state.selectedValue;
    var itemClassName = prefixCls + "-item";
    var selectedItemClassName = itemClassName + " " + prefixCls + "-item-selected";

    var map = function map(item) {
      var className = item.data && item.data.staticClass || '';
      var style = item.data && item.data.staticStyle;
      var value = item.componentOptions.propsData && item.componentOptions.propsData.value;
      var label = item.componentOptions.propsData && item.componentOptions.propsData.label || item.componentOptions.children;
      return h("div", {
        "style": _extends({}, itemStyle, style),
        "class": (selectedValue === value ? selectedItemClassName : itemClassName) + " " + className,
        "key": value
      }, [label]);
    };

    var items = this.$slots.default ? this.$slots.default.map(map) : [];
    var pickerCls = (_pickerCls = {}, _pickerCls[prefixCls] = true, _pickerCls);
    return h("div", {
      "class": classNames(pickerCls),
      "ref": "root"
    }, [h("div", {
      "class": prefixCls + "-mask",
      "ref": "mask"
    }), h("div", {
      "class": prefixCls + "-indicator " + indicatorClassName,
      "ref": "indicator",
      "style": indicatorStyle
    }), h("div", {
      "class": prefixCls + "-content",
      "ref": "content"
    }, [items])]);
  };

  _createClass(Picker, [{
    key: "rootRef",
    get: function get() {
      return this.$refs['root'];
    }
  }, {
    key: "maskRef",
    get: function get() {
      return this.$refs['mask'];
    }
  }, {
    key: "contentRef",
    get: function get() {
      return this.$refs['content'];
    }
  }, {
    key: "indicatorRef",
    get: function get() {
      return this.$refs['indicator'];
    }
  }, {
    key: "scrollHanders",
    get: function get() {
      var _this4 = this;

      var scrollY = -1;
      var lastY = 0;
      var startY = 0;
      var scrollDisabled = false;
      var isMoving = false;

      var setTransform = function setTransform(nodeStyle, value) {
        nodeStyle.transform = value;
        nodeStyle.webkitTransform = value;
      };

      var setTransition = function setTransition(nodeStyle, value) {
        nodeStyle.transition = value;
        nodeStyle.webkitTransition = value;
      };

      var scrollTo = function scrollTo(_x, y, time) {
        if (time === void 0) {
          time = .3;
        }

        if (scrollY !== y) {
          scrollY = y;

          if (time && !_this4.noAnimate) {
            setTransition(_this4.contentRef.style, "cubic-bezier(0,0,0.2,1.15) " + time + "s");
          }

          setTransform(_this4.contentRef.style, "translate3d(0," + -y + "px,0)");
          setTimeout(function () {
            _this4.scrollingComplete();

            if (_this4.contentRef) {
              setTransition(_this4.contentRef.style, '');
            }
          }, +time * 1000);
        }
      };

      var Velocity = function (minInterval, maxInterval) {
        if (minInterval === void 0) {
          minInterval = 30;
        }

        if (maxInterval === void 0) {
          maxInterval = 100;
        }

        var _time = 0;
        var _y = 0;
        var _velocity = 0;
        var recorder = {
          record: function record(y) {
            var now = +new Date();
            _velocity = (y - _y) / (now - _time);

            if (now - _time >= minInterval) {
              _velocity = now - _time <= maxInterval ? _velocity : 0;
              _y = y;
              _time = now;
            }
          },
          getVelocity: function getVelocity(y) {
            if (y !== _y) {
              recorder.record(y);
            }

            return _velocity;
          }
        };
        return recorder;
      }();

      var onFinish = function onFinish() {
        isMoving = false;
        var targetY = scrollY;
        var height = (_this4.$slots.default.length - 1) * _this4.itemHeight;
        var time = .3;
        var velocity = Velocity.getVelocity(targetY) * 4;

        if (velocity) {
          targetY = velocity * 40 + targetY;
          time = Math.abs(velocity) * .1;
        }

        if (targetY % _this4.itemHeight !== 0) {
          targetY = Math.round(targetY / _this4.itemHeight) * _this4.itemHeight;
        }

        if (targetY < 0) {
          targetY = 0;
        } else if (targetY > height) {
          targetY = height;
        }

        scrollTo(0, targetY, time < .3 ? .3 : time);

        _this4.onScrollChange();
      };

      var onStart = function onStart(y) {
        if (scrollDisabled) {
          return;
        }

        isMoving = true;
        startY = y;
        lastY = scrollY;
      };

      var onMove = function onMove(y) {
        if (scrollDisabled || !isMoving) {
          return;
        }

        scrollY = lastY - y + startY;
        Velocity.record(scrollY);

        _this4.onScrollChange();

        setTransform(_this4.contentRef.style, "translate3d(0," + -scrollY + "px,0)");
      };

      return {
        touchstart: function touchstart(evt) {
          return onStart(evt.touches[0].pageY);
        },
        mousedown: function mousedown(evt) {
          return onStart(evt.pageY);
        },
        touchmove: function touchmove(evt) {
          evt.preventDefault();
          onMove(evt.touches[0].pageY);
        },
        mousemove: function mousemove(evt) {
          evt.preventDefault();
          onMove(evt.pageY);
        },
        touchend: function touchend() {
          return onFinish();
        },
        touchcancel: function touchcancel() {
          return onFinish();
        },
        mouseup: function mouseup() {
          return onFinish();
        },
        getValue: function getValue() {
          return scrollY;
        },
        scrollTo: scrollTo,
        setDisabled: function setDisabled(disabled) {
          if (disabled === void 0) {
            disabled = false;
          }

          scrollDisabled = disabled;
        }
      };
    }
  }]);

  return Picker;
}(mixins(PickerProps)), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "computeChildIndex", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "select", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "doScrollingComplete", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "noAnimate", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "selectedValueChanged", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedValueChanged"), _class2.prototype)), _class2)) || _class);
export default PickerMixin(Picker);