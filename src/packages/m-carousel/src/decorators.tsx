'use strict';

import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({name: 'DefaultDecorator'})
export class IDecoratorProps extends Vue {
  @Prop({type: Number})
  public currentSlide: number;
  @Prop({type: Number})
  public slideCount: number;
  @Prop({type: [Number, String]})
  public frameWidth: number | string;
  @Prop({type: [Number, String]})
  public slideWidth: number | string;
  @Prop({type: Number})
  public slidesToScroll: number;
  @Prop({type: Number})
  public cellSpacing?: number;
  @Prop({type: Number})
  public slidesToShow?: number;
  @Prop({type: Boolean})
  public wrapAround?: boolean;
  @Prop()
  public nextSlide?: () => void;
  @Prop()
  public previousSlide: () => void;
  @Prop()
  public goToSlide?: (index: number) => void;
}

@Component({name: 'Decorator1'})
class Decorator1 extends IDecoratorProps {
  public render() {
    return (
        <button
            style={this.getButtonStyles(this.currentSlide === 0 && !this.wrapAround)}
            onClick={this.handleClick.bind(this)}>PREV</button>
    );
  }

  public handleClick(e) {
    e.preventDefault();
    this.previousSlide();
  }

  public getButtonStyles(disabled) {
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
}

@Component({name: 'DefaultDecorator'})
class Decorator2 extends IDecoratorProps {
  public render() {
    return (
        <button
            style={
              this.getButtonStyles(
                  this.currentSlide + this.slidesToScroll >= this.slideCount && !this.wrapAround
              )
            }
            onClick={this.handleClick.bind(this)}>NEXT</button>
    );
  }

  public handleClick(e) {
    e.preventDefault();
    if (this.nextSlide) {
      this.nextSlide();
    }
  }

  public getButtonStyles(disabled) {
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
}

@Component({name: 'DefaultDecorator'})
class Decorator3 extends IDecoratorProps {
  public render() {
    const indexes = this.getIndexes(this.slideCount, this.slidesToScroll);
    return (
        <ul style={this.getListStyles()}>
          {
            indexes.map((index) => {
              return (
                  <li style={this.getListItemStyles()} key={index}>
                    <button
                        style={this.getButtonStyles(this.currentSlide === index)}
                        onClick={this.goToSlide && this.goToSlide.bind(null, index)}>
                      &bull;
                    </button>
                  </li>
              );
            })
          }
        </ul>
    );
  }

  public getIndexes(count, inc) {
    const arr: number[] = [];
    for (let i = 0; i < count; i += inc) {
      arr.push(i);
    }
    return arr;
  }

  public getListStyles() {
    return {
      position: 'relative',
      margin: 0,
      top: -10,
      padding: 0
    };
  }

  public getListItemStyles() {
    return {
      listStyleType: 'none',
      display: 'inline-block'
    };
  }

  public getButtonStyles(active) {
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
}

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
