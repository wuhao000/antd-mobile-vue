import {ValidateRule} from 'async-validator';
import {VNode} from 'vue';
import {UIComponent} from './component';
import {DButtonComponent} from './d-button';

export interface ModalOptions {
  /**
   * Specify which button to autofocus
   * @default 'ok'
   * @type string | null
   */
  autoFocusButton?: string | null;
  /**
   * The cancel button props
   * @type object
   */
  cancelButtonProps?: DButtonComponent;
  /**
   * 当type为prompt时，输入框的默认值
   */
  inputValue?: string;
  /**
   * Text of the Cancel button
   * @default 'cancel'
   * @type string
   */
  cancelText?: string;
  /**
   * Centered Modal
   * @default false
   * @type boolean
   */
  centered?: boolean;
  /**
   * class of container
   * @type string
   */
  class?: string;
  /**
   * Modal content
   * @type string | VNode
   */
  content?: string | VNode;
  /**
   * Icon type of the Icon component
   * @default 'question-circle'
   * @type string
   */
  iconType?: string;
  /**
   * Whether support press esc to close
   * @default true
   * @type boolean
   */
  keyboard?: boolean;
  /**
   * 将content渲染为html
   */
  dangerousHtml?: boolean;
  /**
   * 当类型为promp时，输入值校验规则
   */
  rules?: ValidateRule[];
  /**
   * 当类型为promp时，是否要求必须输入内容
   */
  required?: boolean;
  /**
   * Whether to close the modal dialog when the mask (area outside the modal) is clicked
   * @default false
   * @type boolean
   */
  maskClosable?: boolean;
  /**
   * The ok button props
   * @type object
   */
  okButtonProps?: DButtonComponent;
  okCancel?: boolean;
  /**
   * Text of the OK button
   * @default 'OK'
   * @type string
   */
  okText?: string;
  /**
   * Button type of the OK button
   * @default 'primary'
   * @type string
   */
  okType?: string;
  /**
   * Specify a function that will be called when the user clicks the Cancel button.
   * The parameter of this function is a function whose execution should include closing the dialog.
   * You can also just return a promise and when the promise is resolved, the modal dialog will also be closed
   * @type Function
   */
  onCancel?: () => any;
  /**
   * Specify a function that will be called when the user clicks the OK button.
   * The parameter of this function is a function whose execution should include closing the dialog.
   * You can also just return a promise and when the promise is resolved, the modal dialog will also be closed
   * @type Function
   */
  onOk?: (...args: any) => any;
  /**
   * Title
   * @type string | VNode
   */
  title?: string | VNode;
  /**
   * Width of the modal dialog
   * @default 416
   * @type string | number
   */
  width?: string | number;
  /**
   * The z-index of the Modal
   * @default 100
   * @type number
   */
  zIndex?: number;
}

export interface ModalConfirm {
  /**
   * Destroy the current model instace
   */
  destroy(): void;

  /**
   * Updates modal options
   * @param modalOptions modal option
   */
  update(modalOptions: ModalOptions): void;
}

export declare class Modal extends UIComponent {
  /**
   * Specify a function that will be called when modal is closed completely.
   * @type Function
   */
  afterClose: () => any;

  /**
   * Body style for modal body element. Such as height, padding etc.
   * @default {}
   * @type object
   */
  bodyStyle: object;
  /**
   * The cancel button props, follow jsx rules
   * @type object
   */
  cancelButtonProps: {
    props: DButtonComponent;
    on: {}
  };
  /**
   * Text of the Cancel button
   * @default 'cancel'
   * @type string
   */
  cancelText: string;
  /**
   * Centered Modal
   * @default false
   * @type boolean
   */
  centered: boolean;
  /**
   * Whether a close (x) button is visible on top right of the modal dialog or not
   * @default true
   * @type boolean
   */
  closable: boolean;
  /**
   * Whether to apply loading visual effect for OK button or not
   * @default false
   * @type boolean
   */
  confirmLoading: boolean;
  /**
   * Whether to unmount child components on onClose
   * @default false
   * @type boolean
   */
  destroyOnClose: boolean;
  /**
   * Footer content, set as :footer="null" when you don't need default buttons
   * @default OK and Cancel buttons
   * @type any (string | slot)
   */
  footer: any;
  /**
   * Return the mount node for Modal
   * @default () => document.body
   * @type Function
   */
  getContainer: (instance: any) => HTMLElement;
  /**
   * Whether show mask or not.
   * @default true
   * @type boolean
   */
  mask: boolean;
  /**
   * Whether to close the modal dialog when the mask (area outside the modal) is clicked
   * @default true
   * @type boolean
   */
  maskClosable: boolean;
  /**
   * Style for modal's mask element.
   * @default {}
   * @type object
   */
  maskStyle: object;
  /**
   * The ok button props, follow jsx rules
   * @type object
   */
  okButtonProps: {
    props: DButtonComponent;
    on: {}
  };
  /**
   * Text of the OK button
   * @default 'OK'
   * @type string
   */
  okText: string;
  /**
   * Button type of the OK button
   * @default 'primary'
   * @type string
   */
  okType: 'primary' | 'danger' | 'dashed' | 'ghost' | 'default';
  /**
   * The modal dialog's title
   * @type any (string | slot)
   */
  title: any;

  /**
   * Whether the modal dialog is visible or not
   * @default false
   * @type boolean
   */
  visible: boolean;

  /**
   * Width of the modal dialog
   * @default 520
   * @type string | number
   */
  width: string | number;

  /**
   * The class name of the container of the modal dialog
   * @type string
   */
  wrapClassName: string;

  /**
   * The z-index of the Modal
   * @default 1000
   * @type number
   */
  zIndex: number;

  static confirm(options: ModalOptions): ModalConfirm;

  static error(options: ModalOptions): ModalConfirm;

  static info(options: ModalOptions): ModalConfirm;

  static success(options: ModalOptions): ModalConfirm;

  static warning(options: ModalOptions): ModalConfirm;
}

export declare class AeModalComponent extends UIComponent {
}

export interface AePrompt {
}

export interface AeAlert {
  info: (message: string | ModalOptions, title?: string) => Promise<any>;
  success: (message: string | ModalOptions, title?: string) => Promise<any>;
  error: (message: string | ModalOptions, title?: string) => Promise<any>;
  warning: (message: string | ModalOptions, title?: string) => Promise<any>;

  (message: string | ModalOptions, title?: string, icon?: string, options?: ModalOptions): Promise<any>;
}


declare module 'vue/types/vue' {
  interface Vue {
    $dalert: AeAlert;
    $dconfirm: (message: string | ModalOptions, title?: string, icon?: string, options?: ModalOptions) => Promise<any>;
    $dprompt: (message: string | ModalOptions, title?: string, value?: string, icon?: string, options?: ModalOptions) => Promise<any>;
  }
}
