import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'MobileIcon'
})
export default class MobileIcon extends Vue {

  public render(h) {
    const cls = classnames(
        'am-icon',
        `am-icon-${this.$attrs.type}`,
        `am-icon-${this.$attrs.size}`
    );
    const style = {
      fill: 'blue',
      backgroundSize: 'cover'
    };
    return <svg class={cls} {...{props: this.$attrs}}>
      <use xlinkHref={`#${this.$attrs.type}`}/>
    </svg>;
  }
}
