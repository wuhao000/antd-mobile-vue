import {ComponentInternalInstance} from '@vue/runtime-core';
import {Subject} from 'rxjs';
import {inject, provide} from 'vue';

interface EmitterContext {
  component: string;
  params: Array<any>;
  instance: ComponentInternalInstance;
}

interface Emitter {
  dispatch(component: string, eventName: any, params?: any[]): void;

  subscribe(event: string, callback): void
}

export const useEmitter = (instance: ComponentInternalInstance) => {
  const emitter: Emitter = inject('emitter', null);
  if (emitter) {
    return emitter;
  } else {
    const subscribes: { [key: string]: Subject<EmitterContext> } = {};
    const emitter: Emitter = {
      subscribe(event: string, callback) {
        if (!subscribes[event]) {
          subscribes[event] = new Subject();
        }
        subscribes[event].subscribe({
          next(value: EmitterContext) {
            let parent = value.instance;
            while (parent !== undefined && parent !== null && parent.uid !== instance.uid) {
              parent = parent.parent;
            }
            callback(...value.params);
          }
        });
      },
      dispatch(component: string, eventName: any, params?: any[]) {
        if (subscribes[eventName]) {
          subscribes[eventName].next({
            component, params, instance
          });
        }
      }
    };
    provide('emitter', emitter);
    return emitter;
  }
};
