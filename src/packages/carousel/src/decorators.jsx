import { defineComponent } from 'vue';
'use strict';
const IDecoratorProps = {
    currentSlide: {
        type: Number
    },
    slideCount: {
        type: Number
    },
    frameWidth: {
        type: [Number, String]
    },
    slideWidth: {
        type: [Number, String]
    },
    slidesToScroll: {
        type: Number
    },
    cellSpacing: {
        type: Number
    },
    slidesToShow: {
        type: Number
    },
    wrapAround: {
        type: Boolean
    },
    nextSlide: { type: Function },
    previousSlide: { type: Function },
    goToSlide: {
        type: Function
    }
};
const Decorator1 = defineComponent({
    name: 'Decorator1',
    props: Object.assign({}, IDecoratorProps),
    setup(props) {
        const handleClick = (e) => {
            e.preventDefault();
            props.previousSlide();
        };
        const getButtonStyles = (disabled) => {
            return {
                border: 0,
                background: 'rgba(0,0,0,0.4)',
                color: 'white',
                padding: 10,
                outline: 0,
                opacity: disabled ? 0.3 : 1,
                cursor: 'pointer'
            };
        };
        return { getButtonStyles, handleClick };
    },
    render() {
        return (<button style={this.getButtonStyles(this.currentSlide === 0 && !this.wrapAround)} onClick={this.handleClick.bind(this)}>PREV</button>);
    }
});
const Decorator2 = defineComponent({
    name: 'DefaultDecorator',
    props: Object.assign({}, IDecoratorProps),
    setup(props) {
        const handleClick = (e) => {
            e.preventDefault();
            if (props.nextSlide) {
                props.nextSlide();
            }
        };
        const getButtonStyles = (disabled) => {
            return {
                border: 0,
                background: 'rgba(0,0,0,0.4)',
                color: 'white',
                padding: 10,
                outline: 0,
                opacity: disabled ? 0.3 : 1,
                cursor: 'pointer'
            };
        };
        return { getButtonStyles, handleClick };
    },
    render() {
        return (<button style={this.getButtonStyles(this.currentSlide + this.slidesToScroll >= this.slideCount && !this.wrapAround)} onClick={this.handleClick.bind(this)}>NEXT</button>);
    }
});
const Decorator3 = defineComponent({
    name: 'DefaultDecorator',
    props: Object.assign({}, IDecoratorProps),
    setup() {
        const getIndexes = (count, inc) => {
            const arr = [];
            for (let i = 0; i < count; i += inc) {
                arr.push(i);
            }
            return arr;
        };
        const getListStyles = () => {
            return {
                position: 'relative',
                margin: 0,
                top: -10,
                padding: 0
            };
        };
        const getListItemStyles = () => {
            return {
                listStyleType: 'none',
                display: 'inline-block'
            };
        };
        const getButtonStyles = (active) => {
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
        };
        return {
            getIndexes, getListStyles, getButtonStyles, getListItemStyles
        };
    },
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
});
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