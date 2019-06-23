import {VNodeData} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {AeAlert, AePrompt, ModalOptions} from '../../../../types/components/ae-modal';
import BaseFormComponent from '../../../mixins/base-input-component';


@Component({
  name: 'AeModal',
  inheritAttrs: false
})
export default class DCascader extends BaseFormComponent {

  @Prop({type: String, default: '确定'})
  public okText: string;
  @Prop({type: String, default: '取消'})
  public cancelText: string;
  @Prop({type: Boolean, default: false})
  public hideCancel: boolean;
  @Prop({type: Boolean, default: false})
  public hideOk: boolean;

  public static install: (Vue) => void;
  public static confirm: (message: (string | ModalOptions), title: string, icon: string, options: ModalOptions) => Promise<any>;
  public static alert: AeAlert;
  public static info: (message: (string | ModalOptions), title?: string) => Promise<any>;
  public static success: (message: (string | ModalOptions), title?: string) => Promise<any>;
  public static error: (message: (string | ModalOptions), title?: string) => Promise<any>;
  public static warning: (message: (string | ModalOptions), title?: string) => Promise<any>;
  public static prompt: AePrompt;

  public getInputComponent() {
    return window.antd.Modal;
  }

  public getInitValue(): any {
    return false;
  }


  public onCancel() {
    this.stateValue = false;
    this.$emit('cancel');
  }

  public getListeners() {
    return {
      cancel: this.onCancel
    };
  }

  public getProps(): {} {
    const hideStyle = {display: 'none'};
    const noCustomFooter = (!this.$slots.footer && !this.$attrs.footer);
    const props: any = {
      cancelButtonProps: {
        staticStyle: this.hideCancel ? hideStyle : {}
      } as VNodeData,
      okButtonProps: {
        staticStyle: this.hideOk ? hideStyle : {}
      } as VNodeData
    };
    if (noCustomFooter && this.hideOk && this.hideCancel) {
      props.footer = '';
    }
    return props;
  }

}
