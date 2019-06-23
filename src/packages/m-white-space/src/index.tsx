import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'WhiteSpace'
})
export default class WhiteSpace extends Vue {
  @Prop({type: String, default: 'md'})
  public size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  @Prop({type: String, default: 'am-whitespace'})
  public prefixCls?: string;

  public render() {
    const wrapCls = classnames(this.prefixCls, `${this.prefixCls}-${this.size}`);

    return <div class={wrapCls} onClick={(e) => {
      this.$emit('click', e);
    }
    }/>;
  }
}
