import {VNode} from 'vue';
import {Action} from '../../src/packages/m-modal/src/props-type';
import {UIComponent} from './component';

export declare class MModalComponent extends UIComponent {
}


declare module 'vue/types/vue' {
  interface Vue {
    $malert: (title: (string | VNode), message: (string | VNode), actions?: {
      text: string
    }[], platform?: string) => Promise<any>;
    $mconfirm: (title: (string | VNode),
                message: (string | VNode),
                actions?: {
                  text: string
                }[],
                platform?: string) => Promise<any>;
    $moperation: (
        actions: Array<Action<any>>,
        platform?: string
    ) => {
      close: () => void
    };
    $mprompt: (title: (string | VNode),
               message: (string | VNode),
               callbackOrActions?: Array<{
                 text: string,
                 style?: object
               }>,
               type?: string, defaultValue?: string, placeholders?: string[],
               platform?: string) => Promise<any>;
  }
}
