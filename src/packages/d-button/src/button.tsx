import Component, {mixins} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {FormComponent} from '../../../mixins/form-component';
import ProxyComponent from '../../../mixins/proxy-component';

@Component({
  name: 'AButton'
})
class AButton extends mixins(FormComponent, ProxyComponent) {

  @Prop({type: String, default: 'ant-btn'})
  public prefixCls: string;
  @Prop({type: String, default: 'default'})
  public type: string;
  @Prop({type: Boolean, default: false})
  public circle: boolean;
  // @Prop({type: Boolean, default: false})
  // public plain: boolean;
  @Prop({type: Boolean, default: false})
  public text: boolean;
  @Prop({type: String})
  public shape: string;
  public static Group: any;
  public static install: (Vue) => void;

  public getProps(): {} {
    return {
      shape: this.circle ? 'circle' : this.shape,
      size: this.componentSize
    };
  }

  get cssClass(): object {
    return {
      // [this.prefixCls + '-plain']: this.plain,
      [this.prefixCls + '-text']: this.text
    };
  }

  public getInputComponent(): {} {
    return window.antd.Button;
  }

}

AButton.Group = window.antd.Button.Group;
export default AButton;
