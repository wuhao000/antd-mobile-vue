import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import ProxyComponent from '../../../mixins/proxy-component';


@Component({
  name: 'DTag'
})
export default class DTag extends ProxyComponent {

  @Prop({type: String, default: 'ant-tag'})
  public prefixCls: string;
  /**
   * 标签颜色
   */
  @Prop({type: String})
  public color: string;
  @Prop({type: String})
  public type: 'success' | 'info' | 'primary' | 'danger' | 'warning';
  /**
   * 标签尺寸
   */
  @Prop({type: String, default: 'small'})
  public size: 'small' | 'default' | 'large';

  public static install: (Vue) => void;

  get cssClass(): {} {
    return {
      [this.prefixCls + '-sm']: this.size === 'small',
      [this.prefixCls + '-lg']: this.size === 'large'
    };
  }

  get typeColor() {
    switch (this.type) {
      case 'danger':
        return 'red';
      case 'info':
        return 'blue';
      case 'primary':
        return '#108ee9';
      case 'success':
        return 'green';
      case 'warning':
        return 'orange';
    }
  }

  public getProps(): {} {
    return {
      color: this.color || this.typeColor
    };
  }

  public getInputComponent() {
    return window.antd.Tag;
  }

}
