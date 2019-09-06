import classNames from 'classnames';
import Component, {mixins} from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import PickerMixin from './picker-mixin';
import {PickerProps} from './picker-types';

@Component({
  name: 'Picker'
})
class Picker extends mixins(PickerProps) {

  @Prop()
  public computeChildIndex: any;
  @Prop()
  public select: any;
  @Prop()
  public doScrollingComplete: any;


  get rootRef(): any {
    return this.$refs['root'];
  }

  get maskRef(): any {
    return this.$refs['mask'];
  }

  get contentRef(): any {
    return this.$refs['content'];
  }

  get indicatorRef(): any {
    return this.$refs['indicator'];
  }

  public itemHeight: number;
  public scrollValue: any;
  @Prop({type: Boolean, default: false})
  public noAnimate: boolean;
  private state: any = {};

  get scrollHanders() {
    let scrollY = -1;
    let lastY = 0;
    let startY = 0;
    let scrollDisabled = false;
    let isMoving = false;

    const setTransform = (nodeStyle: CSSStyleDeclaration, value: any) => {
      nodeStyle.transform = value;
      nodeStyle.webkitTransform = value;
    };

    const setTransition = (nodeStyle: CSSStyleDeclaration, value: any) => {
      nodeStyle.transition = value;
      nodeStyle.webkitTransition = value;
    };

    const scrollTo = (_x, y, time = .3) => {
      if (scrollY !== y) {
        scrollY = y;
        if (time && !this.noAnimate) {
          setTransition(this.contentRef.style, `cubic-bezier(0,0,0.2,1.15) ${time}s`);
        }
        setTransform(this.contentRef.style, `translate3d(0,${-y}px,0)`);
        setTimeout(() => {
          this.scrollingComplete();
          if (this.contentRef) {
            setTransition(this.contentRef.style, '');
          }
        }, +time * 1000);
      }
    };

    const Velocity = ((minInterval = 30, maxInterval = 100) => {
      let _time = 0;
      let _y = 0;
      let _velocity = 0;
      const recorder = {
        record: (y) => {
          const now = +new Date();
          _velocity = (y - _y) / (now - _time);
          if (now - _time >= minInterval) {
            _velocity = now - _time <= maxInterval ? _velocity : 0;
            _y = y;
            _time = now;
          }
        },
        getVelocity: (y) => {
          if (y !== _y) {
            recorder.record(y);
          }
          return _velocity;
        }
      };
      return recorder;
    })();

    const onFinish = () => {
      isMoving = false;
      let targetY = scrollY;

      const height = (this.$slots.default.length - 1) * this.itemHeight;

      let time = .3;

      const velocity = Velocity.getVelocity(targetY) * 4;
      if (velocity) {
        targetY = velocity * 40 + targetY;
        time = Math.abs(velocity) * .1;
      }

      if (targetY % this.itemHeight !== 0) {
        targetY = Math.round(targetY / this.itemHeight) * this.itemHeight;
      }

      if (targetY < 0) {
        targetY = 0;
      } else if (targetY > height) {
        targetY = height;
      }

      scrollTo(0, targetY, time < .3 ? .3 : time);
      this.onScrollChange();
    };

    const onStart = (y: number) => {
      if (scrollDisabled) {
        return;
      }

      isMoving = true;
      startY = y;
      lastY = scrollY;
    };

    const onMove = (y: number) => {
      if (scrollDisabled || !isMoving) {
        return;
      }

      scrollY = lastY - y + startY;
      Velocity.record(scrollY);

      this.onScrollChange();
      setTransform(this.contentRef.style, `translate3d(0,${-scrollY}px,0)`);
    };

    return {
      touchstart: (evt) => onStart(evt.touches[0].pageY),
      mousedown: (evt) => onStart(evt.pageY),
      touchmove: (evt) => {
        evt.preventDefault();
        onMove(evt.touches[0].pageY);
      },
      mousemove: (evt) => {
        evt.preventDefault();
        onMove(evt.pageY);
      },
      touchend: () => onFinish(),
      touchcancel: () => onFinish(),
      mouseup: () => onFinish(),
      getValue: () => {
        return scrollY;
      },
      scrollTo,
      setDisabled: (disabled: boolean = false) => {
        scrollDisabled = disabled;
      }
    };
  }

  public created() {
    let selectedValueState;
    const {selectedValue, defaultSelectedValue} = this;
    if (selectedValue !== undefined) {
      selectedValueState = selectedValue;
    } else if (defaultSelectedValue !== undefined) {
      selectedValueState = defaultSelectedValue;
    } else {
      const children: any = this.$slots.default;
      selectedValueState = children && children[0] && children[0].value;
    }
    this.state.selectedValue = selectedValueState;
  }

  public mounted() {
    const {contentRef, indicatorRef, maskRef, rootRef} = this;
    const rootHeight = (rootRef as HTMLElement).clientHeight;
    // https://github.com/react-component/m-picker/issues/18
    const itemHeight = this.itemHeight = indicatorRef.clientHeight;
    let num = Math.floor(rootHeight / itemHeight);
    if (num % 2 === 0) {
      num--;
    }
    num--;
    num /= 2;
    contentRef.style.padding = `${itemHeight * num}px 0`;
    indicatorRef.style.top = `${itemHeight * num}px`;
    maskRef.style.backgroundSize = `100% ${itemHeight * num}px`;
    this.scrollHanders.setDisabled(this.disabled);
    this.select(this.state.selectedValue, this.itemHeight, this.scrollTo.bind(this));

    const passiveSupported = this.passiveSupported();
    const willPreventDefault = passiveSupported ? {passive: false} : false;
    const willNotPreventDefault = passiveSupported ? {passive: true} : false;
    Object.keys(this.scrollHanders).forEach(key => {
      if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
        const pd = key.indexOf('move') >= 0 ? willPreventDefault : willNotPreventDefault;
        (rootRef as HTMLDivElement).addEventListener(key, this.scrollHanders[key], pd as any);
      }
    });
  }

  public componentWillUnmount() {
    Object.keys(this.scrollHanders).forEach(key => {
      if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
        (this.rootRef as HTMLDivElement).removeEventListener(key, this.scrollHanders[key]);
      }
    });
  }

  public passiveSupported() {
    let passiveSupported = false;

    try {
      const options = Object.defineProperty({}, 'passive', {
        get: () => {
          passiveSupported = true;
        }
      });
      window.addEventListener('test', null as any, options);
    } catch (err) {
    }
    return passiveSupported;
  }

  @Watch('selectedValue')
  public selectedValueChanged(value: any) {
    if (this.state.selectedValue !== value) {
      this.state.selectedValue = value;
      this.select(
          this.state.selectedValue,
          this.itemHeight,
          this.noAnimate ? this.scrollToWithoutAnimation.bind(this) : this.scrollTo.bind(this)
      );
    }
  }

  public updated() {
    this.scrollHanders.setDisabled(this.disabled);
  }

  public componentDidUpdate() {
    this.select(this.state.selectedValue, this.itemHeight, this.scrollToWithoutAnimation.bind(this));
  }

  public scrollTo(top) {
    this.scrollHanders.scrollTo(0, top);
  }

  public scrollToWithoutAnimation(top) {
    this.scrollHanders.scrollTo(0, top, 0);
  }

  public fireValueChange(selectedValue) {
    if (selectedValue !== this.state.selectedValue) {
      if (!('selectedValue' in this)) {
        this.selectedValue = selectedValue;
      }
      this.$emit('update:value', selectedValue);
      this.$emit('input', selectedValue);
    }
  }

  public onScrollChange() {
    const top = this.scrollHanders.getValue();
    if (top >= 0) {
      const children = this.$slots.default;
      const index = this.computeChildIndex(top, this.itemHeight, children.length);
      if (this.scrollValue !== index) {
        this.scrollValue = index;
        const child: any = children[index];
        this.$emit('scroll-change', child['value']);
      }
    }
  }

  public scrollingComplete() {
    const top = this.scrollHanders.getValue();
    if (top >= 0) {
      this.doScrollingComplete(top, this.itemHeight, this.fireValueChange.bind(this));
    }
  }

  public getValue() {
    if ('selectedValue' in this) {
      return this.selectedValue;
    }
    const children: any = this.$slots.default;
    return children && children[0] && children[0].props.value;
  }

  public render() {
    const {
      prefixCls,
      itemStyle,
      indicatorStyle,
      indicatorClassName = ''
    } = this.$props;
    const {selectedValue} = this.state;
    const itemClassName = `${prefixCls}-item`;
    const selectedItemClassName = `${itemClassName} ${prefixCls}-item-selected`;
    const map = (item: any) => {
      const className = item.data && item.data.staticClass || '';
      const style = item.data && item.data.staticStyle;
      const value = item.componentOptions.propsData && item.componentOptions.propsData.value;
      const label = item.componentOptions.propsData && item.componentOptions.propsData.label || item.componentOptions.children;
      return (
          <div style={{...itemStyle, ...style}}
               class={`${selectedValue === value ? selectedItemClassName : itemClassName} ${className}`}
               key={value}>
            {label}
          </div>
      );
    };
    const items = this.$slots.default ? this.$slots.default.map(map) : [];
    const pickerCls = {
      [prefixCls as string]: true
    };
    return (
        <div class={classNames(pickerCls)}
             ref="root">
          <div class={`${prefixCls}-mask`}
               ref="mask"/>
          <div
              class={`${prefixCls}-indicator ${indicatorClassName}`}
              ref="indicator"
              style={indicatorStyle}
          />
          <div class={`${prefixCls}-content`}
               ref="content">
            {items}
          </div>
        </div>
    );
  }
}

export default PickerMixin(Picker);
