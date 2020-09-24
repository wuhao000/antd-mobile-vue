import {Events} from '@vue/runtime-dom';
import Vue from 'vue';

declare module '@vue/runtime-dom' {

  type StringKeyOf<T> = Extract<keyof T, string>

  type EventHandlers<E> = {
    [K in StringKeyOf<E>]?: E[K] extends Function ? E[K] : (payload: E[K]) => void
  }

  interface AriaAttributes {

  }
  export interface HTMLAttributes extends AriaAttributes, EventHandlers<Events> {
    vTime?: any;
    format?: string;
    vModel?: any;
    slot?: any;
    ref?: any;
    class?: any;
    defaultValue?: any;
  }
}
