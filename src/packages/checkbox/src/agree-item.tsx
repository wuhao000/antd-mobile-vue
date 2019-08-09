import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import getDataAttr from '../../utils/get-data-attr';
import Checkbox from './checkbox';


@Component({
  name: 'MAgreeItem'
})
export default class AgreeItem extends Vue {
  @Prop({type: String, default: 'am-checkbox'})
  public prefixCls?: string;
  @Prop({type: String})
  public name?: string;
  @Prop({type: Boolean})
  public wrapLabel?: boolean;
  @Prop({type: Boolean, default: false})
  public defaultChecked?: boolean;
  @Prop({type: Boolean, default: false})
  public checked?: boolean;
  @Prop({type: Boolean, default: false})
  public disabled?: boolean;

  public render() {
    const {...restProps} = this.$props;
    const {prefixCls} = restProps;
    const wrapCls = classnames(`${prefixCls}-agree`);

    return (
        <div {...getDataAttr(restProps)} class={wrapCls}>
          <Checkbox {...restProps} class={`${prefixCls}-agree-label`}>
            {this.$slots.default}
          </Checkbox>
        </div>
    );
  }
}
