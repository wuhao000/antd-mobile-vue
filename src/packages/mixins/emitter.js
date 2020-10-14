import { Subject } from 'rxjs';
import { inject, provide } from 'vue';
export const useEmitter = (instance) => {
    const emitter = inject('emitter', null);
    if (emitter) {
        return emitter;
    }
    else {
        const subscribes = {};
        const emitter = {
            subscribe(event, callback) {
                if (!subscribes[event]) {
                    subscribes[event] = new Subject();
                }
                subscribes[event].subscribe({
                    next(value) {
                        let parent = value.instance;
                        while (parent !== undefined && parent !== null && parent.uid !== instance.uid) {
                            parent = parent.parent;
                        }
                        callback(...value.params);
                    }
                });
            },
            dispatch(component, eventName, params) {
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
//# sourceMappingURL=emitter.js.map