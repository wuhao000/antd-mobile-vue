import {UIComponent} from './component';

export declare class ToastComponent extends UIComponent {
  static fail: (message: string, duration?: number) => NoticeInstance;
  /**
   *
   * @param {string} message 要显示的内容
   * @param {number} duration 持续的时间（单位：秒）
   */
  static info: (message: string, duration?: number) => NoticeInstance;
  static loading: (message: string, duration?: number) => NoticeInstance;
  static offline: (message: string, duration?: number) => NoticeInstance;
  static success: (message: string, duration?: number) => NoticeInstance;
}

interface NoticeInstance {
  hide: () => void;
}

interface Toast {
  fail: (message: string, duration?: number) => NoticeInstance;
  /**
   *
   * @param {string} message 要显示的内容
   * @param {number} duration 持续的时间（单位：秒）
   */
  info: (message: string, duration?: number) => NoticeInstance;
  loading: (message: string, duration?: number) => NoticeInstance;
  offline: (message: string, duration?: number) => NoticeInstance;
  success: (message: string, duration?: number) => NoticeInstance;
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast;
  }
}
