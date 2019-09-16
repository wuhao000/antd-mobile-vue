import {Drawer} from 'ant-design-vue';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import BaseFormComponent from '../../mixins/base-input-component';
import Touchable from '../../vmc-feedback/feedback';

Vue.use(Drawer);

@Component({
  name: 'MPopup'
})
class MPopup extends BaseFormComponent {

  @Prop({type: String, default: '取消'})
  public cancelText: string;
  @Prop({type: Boolean, default: false})
  public showCancel: boolean;
  @Prop({type: Object})
  public cancelButton: VNode;
  @Prop({type: Boolean, default: true})
  public showOk: boolean;
  @Prop({type: [String, Object], default: ''})
  public title: string | VNode;
  @Prop({type: String, default: 'am-popup'})
  public prefixCls: string;
  public static install: (Vue) => void;
  @Prop({type: String})
  public height: string;
  @Prop({type: String})
  public width: string;
  @Prop({type: String, default: 'bottom'})
  public placement: string;
  @Prop({type: Boolean, default: true})
  public showTitle: boolean;
  @Prop({type: Boolean, default: true})
  public closable: boolean;

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
      width: this.width || 'auto',
      disabled: this.isDisabled,
      placement: this.placement,
      visible: this.isDisabled ? false : this.stateValue
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
    return 'a-drawer';
  }

  private renderHeader() {
    return this.showTitle ? <div class={this.prefixCls + '-title-wrap'}>
      {this.renderCancel()}
      <div class={`${this.prefixCls}-item ${this.prefixCls}-title`}>{this.title}</div>
      {this.renderOk()}
    </div> : null;
  }

  private renderCancel() {
    return this.showCancel ?
      <Touchable activeClassName={`${this.prefixCls}-item-active`}>
        {
          this.cancelButton ? this.cancelButton
            : <div onclick={this.onCancel}
                   class={`${this.prefixCls}-item ${this.prefixCls}-header-left`}>
              {this.cancelText}
            </div>
        }
      </Touchable> : null;
  }

  private renderOk() {
    return this.showOk ?
      <Touchable activeClassName={`${this.prefixCls}-item-active`}>
        <div onclick={this.onOk} class={`${this.prefixCls}-item ${this.prefixCls}-header-right`}>确定</div>
      </Touchable> : null;
  }
}

export default MPopup as any;
