import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'FlexItem'
})
export default class FlexItem extends Vue {
  @Prop({type: Boolean, default: false})
  public disabled?: boolean;
  @Prop({type: String, default: 'am-flexbox'})
  public prefixCls?: string;

  public render() {
    const {prefixCls, ...restProps} = this;
    const wrapCls = classnames(`${prefixCls}-item`);
    return (
        <div class={wrapCls} {...{props: restProps}}>
          {this.$slots.default}
        </div>
    );
  }
}
