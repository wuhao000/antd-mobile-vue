import {VNode} from 'vue';

export interface ModalPropsType<T> {
  title?: string | VNode;
  visible: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  footer?: Array<Action<T>>;
  onClose?: () => void;
  transparent?: boolean;
  popup?: boolean;
  animated?: boolean;
  animationType?: any;
  onAnimationEnd?: (visible: boolean) => void;
  animateAppear?: boolean;
  operation?: boolean;
}

export interface Action<T> {
  text: string;
  onPress?: (...args: any[]) => void | Promise<any>;
  style?: T | string;
}

export type Callback = (valueOrLogin: string, password?: string) => void;
export type CallbackOrActions<T> = Callback | Array<Action<T>>;
