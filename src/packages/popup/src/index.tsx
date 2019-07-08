import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import BaseFormComponent from '../../../mixins/base-input-component';
import Touchable from '../../vmc-feedback/feedback';

@Component({
  name: 'MPopup'
})
export default class MPopup extends BaseFormComponent {

  @Prop({type: String, default: '取消'})
  public cancelText: string;
  @Prop({type: Boolean, default: false})
  public showCancel: boolean;
  @Prop({type: Object})
  public cancelButton: VNode;
  @Prop({type: Boolean, default: true})
  public showOk: boolean;
  @Prop({type: String, default: ''})
  public title: string;
  @Prop({type: String, default: 'am-popup'})
  public prefixCls: string;
  public static install: (Vue) => void;
  @Prop({type: String})
  public height: string;

  private onCancel(): any {
    // @ts-ignore
    if (this.value !== undefined) {
      this.$emit('input', false);
    } else {
      // @ts-ignore
      this.stateValue = false;
    }
    this.$emit('cancel');
  }

  private onOk(): any {
    // @ts-ignore
    if (this.value !== undefined) {
      this.$emit('input', false);
    } else {
      // @ts-ignore
      this.stateValue = false;
    }
    this.$emit('ok');
  }

  @Watch('value')
  public valueChanged(value: boolean) {
    this.stateValue = value;
  }

  public getProps(): {} {
    return {
      title: this.renderHeader(),
      height: this.height || 'auto',
      placement: 'bottom',
      // @ts-ignore
      visible: this.stateValue
    };
  }

  public getListeners(): {} {
    return {
      close: (e) => {
        this.$emit('cancel');
        // @ts-ignore
        this.stateValue = false;
      }
    };
  }

  public getInputComponent() {
    return window.antd.Drawer;
  }

  private renderHeader() {
    const MTouchable = Touchable as any;
    return <div class={this.prefixCls + '-title-wrap'}>
      {this.showCancel ?
        <MTouchable activeClassName={`${this.prefixCls}-item-active`}>
          {
            this.cancelButton ? this.cancelButton
              : <div onclick={this.onCancel}
                     class={`${this.prefixCls}-item ${this.prefixCls}-header-left`}>
                {this.cancelText}
              </div>
          }
        </MTouchable>
        : null}
      <div class={`${this.prefixCls}-item ${this.prefixCls}-title`}>{this.title}</div>
      {this.showOk ?
        <MTouchable activeClassName={`${this.prefixCls}-item-active`}>
          <div onclick={this.onOk} class={`${this.prefixCls}-item ${this.prefixCls}-header-right`}>确定</div>
        </MTouchable>
        : null}
    </div>;
  }
}
