import classnames from 'classnames';
import {defineComponent, PropType, ref, Ref} from 'vue';
import CarouselBase from './base';

type IFrameOverFlow = 'visible' | 'hidden';


const DotDecorator = defineComponent({
  name: 'DotDecorator',
  inheritAttrs: false,
  props: {
    slideCount: {
      type: Number as PropType<number>
    },
    slidesToScroll: {
      type: Number as PropType<number>
    },
    currentSlide: {
      type: Number as PropType<number>
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-carousel'
    },
    dotActiveStyle: {
      type: Object as PropType<object>
    },
    dotStyle: {
      type: Object as PropType<object>
    }
  },
  render() {
    const arr: number[] = [];
    for (let i = 0; i < this.slideCount; i += this.slidesToScroll) {
      arr.push(i);
    }
    const dotDom = arr.map(index => {
      const dotCls = classnames(`${this.prefixCls}-wrap-dot`, {
        [`${this.prefixCls}-wrap-dot-active`]: index === this.currentSlide
      });
      const currentDotStyle =
        index === this.currentSlide ? this.dotActiveStyle : this.dotStyle;
      return (
        <div class={dotCls} key={index}>
          <span style={currentDotStyle}/>
        </div>
      );
    });
    return <div class={`${this.prefixCls}-wrap`}>{dotDom}</div>;
  }
});

const Carousel = defineComponent({
  name: 'Carousel',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-carousel'
    },
    beforeChange: {},
    afterChange: {
      type: Function
    },
    swipeSpeed: {},
    easing: {},
    dotStyle: {
      default: () => {
        return {};
      }
    },
    dotActiveStyle: {
      default: () => {
        return {};
      }
    },
    frameOverflow: {
      type: String as PropType<IFrameOverFlow>
    },
    cellAlign: {
      type: String as PropType<string>,
      default: 'center'
    },
    cellSpacing: {
      type: Number as PropType<number>
    },
    slideWidth: {
      type: [String, Number] as PropType<string | number>
    },
    dots: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    vertical: {
      type: Boolean as PropType<boolean>
    },
    autoplay: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    autoplayInterval: {
      type: Number as PropType<number>
    },
    infinite: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    initialSlideWidth: {
      type: Number as PropType<number>
    }
  },
  setup(props, {emit, slots}) {
    const selectedIndex: Ref<number> = ref(0);

    const onChange = (index: number) => {
      selectedIndex.value = index;
      if (props.afterChange) {
        props.afterChange(index);
      }
    };


    return {onChange, selectedIndex};
  },
  render() {
    const {
      infinite,
      selectedIndex,
      beforeChange,
      afterChange,
      dots,
      prefixCls,
      dotActiveStyle,
      dotStyle,
      vertical
    } = this;

    const newProps = {
      ...this.$props,
      wrapAround: infinite,
      slideIndex: selectedIndex,
      beforeSlide: beforeChange
    };

    let Decorators: any[] = [];

    if (dots) {
      Decorators = [{
        component: DotDecorator,
        position: 'BottomCenter'
      }];
    }
    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-vertical`]: vertical
    });
    return (
      <CarouselBase
        {
          ...{
            ...newProps,
            decorators: Decorators,
            afterSlide: this.onChange
          }
        }
        class={wrapCls}>
        {this.$slots.default()}
      </CarouselBase>
    );
  }
});
export default Carousel;
