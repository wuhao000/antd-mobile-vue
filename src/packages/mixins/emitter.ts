import Vue from 'vue';
import Component from 'vue-class-component';

function broadcast(this: any, componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.componentName;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]) as any);
    }
  });
}

@Component({
  name: 'Emitter'
})
export default class Emitter extends Vue {
  public dispatch(componentName: string, eventName: any, params?: any[]) {
    let parent = this.$parent || this.$root;
    let name = parent.$options.name;
    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;
      if (parent) {
        name = parent.$options.name;
      }
    }
    if (parent) {
      parent.$emit.apply(parent, params ? [eventName].concat(params) as any : [eventName]);
    }
  }

  public broadcast(componentName, eventName, params) {
    broadcast.call(this, componentName, eventName, params);
  }
}
