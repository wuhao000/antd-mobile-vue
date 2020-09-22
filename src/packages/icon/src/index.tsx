import {Options, Vue} from 'vue-class-component';
import classnames from 'classnames';
import loadSprite from './load-sprite';

@Options({
  name: 'MIcon',
  props: {
    size: {type: [String, Number], default: 'md'},
    type: {type: String, required: true},
    color: String
  }
})

class Icon extends Vue {
  public size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | number;
  public type: string;
  public color?: string;

  public mounted() {
    loadSprite();
  }

  public render(): any {
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
}

export default Icon;
