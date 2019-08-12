import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import CarouselBase from './base';
let DotDecorator = class DotDecorator extends Vue {
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
};
tslib_1.__decorate([
    Prop(Number)
], DotDecorator.prototype, "slideCount", void 0);
tslib_1.__decorate([
    Prop(Number)
], DotDecorator.prototype, "slidesToScroll", void 0);
tslib_1.__decorate([
    Prop(Number)
], DotDecorator.prototype, "currentSlide", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-carousel' })
], DotDecorator.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: Object })
], DotDecorator.prototype, "dotActiveStyle", void 0);
tslib_1.__decorate([
    Prop({ type: Object })
], DotDecorator.prototype, "dotStyle", void 0);
DotDecorator = tslib_1.__decorate([
    Component({
        name: 'DotDecorator'
    })
], DotDecorator);
let Carousel = class Carousel extends Vue {
    constructor() {
        super(...arguments);
        this.selectedIndex = 0;
    }
    onChange(index) {
        this.selectedIndex = index;
        if (this.afterChange) {
            this.afterChange(index);
        }
    }
    render() {
        const { infinite, selectedIndex, beforeChange, afterChange, dots, prefixCls, dotActiveStyle, dotStyle, vertical } = this;
        const newProps = Object.assign({}, this.$props, { wrapAround: infinite, slideIndex: selectedIndex, beforeSlide: beforeChange });
        let Decorators = [];
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
        return (<CarouselBase props={Object.assign({}, newProps, { decorators: Decorators, afterSlide: this.onChange })} class={wrapCls}>
        {this.$slots.default}
      </CarouselBase>);
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: 'am-carousel' })
], Carousel.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop()
], Carousel.prototype, "beforeChange", void 0);
tslib_1.__decorate([
    Prop()
], Carousel.prototype, "afterChange", void 0);
tslib_1.__decorate([
    Prop()
], Carousel.prototype, "swipeSpeed", void 0);
tslib_1.__decorate([
    Prop()
], Carousel.prototype, "easing", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return {};
        }
    })
], Carousel.prototype, "dotStyle", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return {};
        }
    })
], Carousel.prototype, "dotActiveStyle", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Carousel.prototype, "frameOverflow", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'center' })
], Carousel.prototype, "cellAlign", void 0);
tslib_1.__decorate([
    Prop(Number)
], Carousel.prototype, "cellSpacing", void 0);
tslib_1.__decorate([
    Prop([String, Number])
], Carousel.prototype, "slideWidth", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Carousel.prototype, "dots", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Carousel.prototype, "vertical", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Carousel.prototype, "autoplay", void 0);
tslib_1.__decorate([
    Prop(Number)
], Carousel.prototype, "autoplayInterval", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Carousel.prototype, "infinite", void 0);
tslib_1.__decorate([
    Prop(Number)
], Carousel.prototype, "initialSlideWidth", void 0);
Carousel = tslib_1.__decorate([
    Component({
        name: 'Carousel'
    })
], Carousel);
export default Carousel;
//# sourceMappingURL=index.jsx.map