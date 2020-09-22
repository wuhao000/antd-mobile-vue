import classnames from 'classnames';
import {Options, Vue} from 'vue-class-component';

@Options({
  name: 'WhiteSpace',
  props: {
    size: {type: String, default: 'md'},
    prefixCls: {type: String, default: 'am-whitespace'}
  }
})
export default class WhiteSpace extends Vue {
  public size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  public prefixCls?: string;

  public render(): any {
    const wrapCls = classnames(this.prefixCls, `${this.prefixCls}-${this.size}`);

    return <div class={wrapCls} onClick={(e) => {
      this.$emit('click', e);
    }
    }/>;
  }
}
