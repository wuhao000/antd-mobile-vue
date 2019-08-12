import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.componentName;
        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        }
        else {
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
let Emitter = class Emitter extends Vue {
    dispatch(componentName, eventName, params) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;
        while (parent && (!name || name !== componentName)) {
            parent = parent.$parent;
            if (parent) {
                name = parent.$options.name;
            }
        }
        if (parent) {
            parent.$emit.apply(parent, params ? [eventName].concat(params) : [eventName]);
        }
    }
    broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
    }
};
Emitter = tslib_1.__decorate([
    Component({
        name: 'Emitter'
    })
], Emitter);
export default Emitter;
//# sourceMappingURL=emitter.js.map