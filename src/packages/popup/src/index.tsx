import {VNode} from 'vue';
import {Drawer} from 'ant-design-vue';
import {mixins, Options, Vue} from 'vue-class-component';
import BaseFormComponent from '../../mixins/base-input-component';
import Touchable from '../../vmc-feedback/feedback';

// @ts-ignore
@Options({
  name: 'MPopup',
  props: {
    cancelText: {type: String, default: '取消'},
    showCancel: {type: Boolean, default: false},
    cancelButton: {type: Object},
    showOk: {type: Boolean, default: true},
    title: {type: [String, Object], default: ''},
    prefixCls: {type: String, default: 'am-popup'},
    height: {type: String},
    width: {type: String},
    placement: {type: String, default: 'bottom'},
    showTitle: {type: Boolean, default: true},
    closable: {type: Boolean, default: true}
  },
  watch: {
    value(value) {
      this.stateValue = value;
    }
  }
})
class MPopup extends BaseFormComponent {
  public cancelText: string;
  public showCancel: boolean;
  public cancelButton: VNode;
  public showOk: boolean;
  public title: string | VNode;
  public prefixCls: string;
  public static install: (Vue) => void;
  public height: string;
  public width: string;
  public placement: string;
  public showTitle: boolean;
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
    return Drawer;
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
            : <div onClick={this.onCancel}
                   class={`${this.prefixCls}-item ${this.prefixCls}-header-left`}>
              {this.cancelText}
            </div>
        }
      </Touchable> : null;
  }

  private renderOk() {
    return this.showOk ?
      <Touchable activeClassName={`${this.prefixCls}-item-active`}>
        <div onClick={this.onOk} class={`${this.prefixCls}-item ${this.prefixCls}-header-right`}>确定</div>
      </Touchable> : null;
  }
}

export default MPopup as any;
