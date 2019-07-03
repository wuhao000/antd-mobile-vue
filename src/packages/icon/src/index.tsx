import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import loadSprite from './load-sprite';

@Component({
  name: 'MIcon'
})
export default class Icon extends Vue {

  @Prop({type: [String, Number], default: 'md'})
  public size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | number;
  @Prop({type: String, required: true})
  public type: string;
  @Prop(String)
  public color?: string;

  public mounted() {
    loadSprite();
  }

  public render() {
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
