import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import ReactCarousel from './base';

type IFrameOverFlow = 'visible' | 'hidden';


@Component({
  name: 'DotDecorator'
})
class DotDecorator extends Vue {

  @Prop(Number)
  public slideCount: number;
  @Prop(Number)
  public slidesToScroll: number;
  @Prop(Number)
  public currentSlide: number;
  @Prop({type: String, default: 'am-carousel'})
  public prefixCls: string;
  @Prop({type: Object})
  public dotActiveStyle: object;
  @Prop({type: Object})
  public dotStyle: object;

  public render() {
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
}

@Component({
  name: 'Carousel'
})
export default class Carousel extends Vue {
  public selectedIndex?: number = 0;
  @Prop({type: String, default: 'am-carousel'})
  public prefixCls?: string;
  @Prop()
  public beforeChange?: (from: number, to: number) => void;
  @Prop()
  public afterChange?: (current: number) => void;
  @Prop()
  public swipeSpeed?: number;
  @Prop()
  public easing?: () => void;
  @Prop({
    default: () => {
      return {};
    }
  })
  public dotStyle?: any;
  @Prop({
    default: () => {
      return {};
    }
  })
  public dotActiveStyle?: any;
  @Prop({type: String})
  public frameOverflow?: IFrameOverFlow;
  @Prop(Number)
  public cellSpacing?: number;
  @Prop([String, Number])
  public slideWidth?: string | number;
  @Prop({type: Boolean, default: true})
  public dots?: boolean;
  @Prop({type: Boolean})
  public vertical?: boolean;
  @Prop({type: Boolean, default: false})
  public autoplay?: boolean;
  @Prop(Number)
  public autoplayInterval?: number;
  @Prop({type: Boolean, default: false})
  public infinite?: boolean;
  @Prop(Number)
  public initialSlideWidth?: number;

  public onChange(index: number) {
    this.selectedIndex = index;
    if (this.afterChange) {
      this.afterChange(index);
    }
  }

  public render() {
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
      Decorators = [
        {
          component: DotDecorator,
          position: 'BottomCenter'
        }
      ];
    }

    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-vertical`]: vertical
    });
    const ReactCarousel2 = ReactCarousel as any;
    return (
        <ReactCarousel2
            props={
              {
                ...newProps,
                decorators: Decorators,
                afterSlide: this.onChange
              }
            }
            class={wrapCls}>
          {this.$slots.default}
        </ReactCarousel2>
    );
  }
}
