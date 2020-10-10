import classnames from 'classnames';
import {defineComponent, onMounted, Ref, ref} from 'vue';
import loadSprite from './load-sprite';

const Icon = defineComponent({
  inheritAttrs: false,
  name: 'MIcon',
  props: {
    size: {type: [String, Number], default: 'md'},
    type: {type: String, required: true},
    color: String
  },
  setup(props, {emit, attrs}) {
    onMounted(() => {
      loadSprite();
    });
    return {};
  },
  render() {
    const {type, size, ...restProps} = this;
    const cls = classnames(
      'am-icon',
      `am-icon-${type}`,
      `am-icon-${size}`
    );
    const style: any = {};
    if (this.color) {
      style.color = this.color;
    }
    if (typeof this.size === 'number') {
      style.width = this.size + 'px';
      style.height = this.size + 'px';
    }
    return (
      <svg class={cls} style={style}
           {...{props: restProps}}>
        <use xlinkHref={`#${type}`}/>
      </svg>
    );
  }
});

export default Icon;
