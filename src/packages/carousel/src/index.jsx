import classnames from 'classnames';
import { defineComponent, ref } from 'vue';
import CarouselBase from './base';
const DotDecorator = defineComponent({
    name: 'DotDecorator',
    inheritAttrs: false,
    props: {
        slideCount: {
            type: Number
        },
        slidesToScroll: {
            type: Number
        },
        currentSlide: {
            type: Number
        },
        prefixCls: {
            type: String,
            default: 'am-carousel'
        },
        dotActiveStyle: {
            type: Object
        },
        dotStyle: {
            type: Object
        }
    },
    render() {
        const arr = [];
        for (let i = 0; i < this.slideCount; i += this.slidesToScroll) {
            arr.push(i);
        }
        const dotDom = arr.map(index => {
            const dotCls = classnames(`${this.prefixCls}-wrap-dot`, {
                [`${this.prefixCls}-wrap-dot-active`]: index === this.currentSlide
            });
            const currentDotStyle = index === this.currentSlide ? this.dotActiveStyle : this.dotStyle;
            return (<div class={dotCls} key={index}>
          <span style={currentDotStyle}/>
        </div>);
        });
        return <div class={`${this.prefixCls}-wrap`}>{dotDom}</div>;
    }
});
const Carousel = defineComponent({
    name: 'Carousel',
    props: {
        prefixCls: {
            type: String,
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
            type: String
        },
        cellAlign: {
            type: String,
            default: 'center'
        },
        cellSpacing: {
            type: Number
        },
        slideWidth: {
            type: [String, Number]
        },
        dots: {
            type: Boolean,
            default: true
        },
        vertical: {
            type: Boolean
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        autoplayInterval: {
            type: Number
        },
        infinite: {
            type: Boolean,
            default: false
        },
        initialSlideWidth: {
            type: Number
        }
    },
    setup(props, { emit, slots }) {
        const selectedIndex = ref(0);
        const onChange = (index) => {
            selectedIndex.value = index;
            if (props.afterChange) {
                props.afterChange(index);
            }
        };
        return { onChange, selectedIndex };
    },
    render() {
        const { infinite, selectedIndex, beforeChange, afterChange, dots, prefixCls, dotActiveStyle, dotStyle, vertical } = this;
        const newProps = Object.assign(Object.assign({}, this.$props), { wrapAround: infinite, slideIndex: selectedIndex, beforeSlide: beforeChange });
        let Decorators = [];
        if (dots) {
            Decorators = [{
                    component: DotDecorator,
                    position: 'BottomCenter'
                }];
        }
        const wrapCls = classnames(prefixCls, {
            [`${prefixCls}-vertical`]: vertical
        });
        return (<CarouselBase {...Object.assign(Object.assign({}, newProps), { decorators: Decorators, afterSlide: this.onChange })} class={wrapCls}>
        {this.$slots.default()}
      </CarouselBase>);
    }
});
export default Carousel;
//# sourceMappingURL=index.jsx.map