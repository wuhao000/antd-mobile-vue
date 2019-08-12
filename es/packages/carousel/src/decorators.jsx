'use strict';
import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let IDecoratorProps = class IDecoratorProps extends Vue {
};
tslib_1.__decorate([
    Prop({ type: Number })
], IDecoratorProps.prototype, "currentSlide", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], IDecoratorProps.prototype, "slideCount", void 0);
tslib_1.__decorate([
    Prop({ type: [Number, String] })
], IDecoratorProps.prototype, "frameWidth", void 0);
tslib_1.__decorate([
    Prop({ type: [Number, String] })
], IDecoratorProps.prototype, "slideWidth", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], IDecoratorProps.prototype, "slidesToScroll", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], IDecoratorProps.prototype, "cellSpacing", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], IDecoratorProps.prototype, "slidesToShow", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], IDecoratorProps.prototype, "wrapAround", void 0);
tslib_1.__decorate([
    Prop()
], IDecoratorProps.prototype, "nextSlide", void 0);
tslib_1.__decorate([
    Prop()
], IDecoratorProps.prototype, "previousSlide", void 0);
tslib_1.__decorate([
    Prop()
], IDecoratorProps.prototype, "goToSlide", void 0);
IDecoratorProps = tslib_1.__decorate([
    Component({ name: 'DefaultDecorator' })
], IDecoratorProps);
export { IDecoratorProps };
let Decorator1 = class Decorator1 extends IDecoratorProps {
    render() {
        return (<button style={this.getButtonStyles(this.currentSlide === 0 && !this.wrapAround)} onClick={this.handleClick.bind(this)}>PREV</button>);
    }
    handleClick(e) {
        e.preventDefault();
        this.previousSlide();
    }
    getButtonStyles(disabled) {
        return {
            border: 0,
            background: 'rgba(0,0,0,0.4)',
            color: 'white',
            padding: 10,
            outline: 0,
            opacity: disabled ? 0.3 : 1,
            cursor: 'pointer'
        };
    }
};
Decorator1 = tslib_1.__decorate([
    Component({ name: 'Decorator1' })
], Decorator1);
let Decorator2 = class Decorator2 extends IDecoratorProps {
    render() {
        return (<button style={this.getButtonStyles(this.currentSlide + this.slidesToScroll >= this.slideCount && !this.wrapAround)} onClick={this.handleClick.bind(this)}>NEXT</button>);
    }
    handleClick(e) {
        e.preventDefault();
        if (this.nextSlide) {
            this.nextSlide();
        }
    }
    getButtonStyles(disabled) {
        return {
            border: 0,
            background: 'rgba(0,0,0,0.4)',
            color: 'white',
            padding: 10,
            outline: 0,
            opacity: disabled ? 0.3 : 1,
            cursor: 'pointer'
        };
    }
};
Decorator2 = tslib_1.__decorate([
    Component({ name: 'DefaultDecorator' })
], Decorator2);
let Decorator3 = class Decorator3 extends IDecoratorProps {
    render() {
        const indexes = this.getIndexes(this.slideCount, this.slidesToScroll);
        return (<ul style={this.getListStyles()}>
          {indexes.map((index) => {
            return (<li style={this.getListItemStyles()} key={index}>
                    <button style={this.getButtonStyles(this.currentSlide === index)} onClick={this.goToSlide && this.goToSlide.bind(null, index)}>
                      &bull;
                    </button>
                  </li>);
        })}
        </ul>);
    }
    getIndexes(count, inc) {
        const arr = [];
        for (let i = 0; i < count; i += inc) {
            arr.push(i);
        }
        return arr;
    }
    getListStyles() {
        return {
            position: 'relative',
            margin: 0,
            top: -10,
            padding: 0
        };
    }
    getListItemStyles() {
        return {
            listStyleType: 'none',
            display: 'inline-block'
        };
    }
    getButtonStyles(active) {
        return {
            border: 0,
            background: 'transparent',
            color: 'black',
            cursor: 'pointer',
            padding: 10,
            outline: 0,
            fontSize: 24,
            opacity: active ? 1 : 0.5
        };
    }
};
Decorator3 = tslib_1.__decorate([
    Component({ name: 'DefaultDecorator' })
], Decorator3);
const DefaultDecorators = [
    {
        component: Decorator1,
        position: 'CenterLeft'
    },
    {
        component: Decorator2,
        position: 'CenterRight'
    },
    {
        component: Decorator3,
        position: 'BottomCenter'
    }
];
export default DefaultDecorators;
//# sourceMappingURL=decorators.jsx.map