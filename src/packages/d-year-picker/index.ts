import component from './src/index.vue';

export default {
  install(Vue) {
    Vue.component(component.name, component);
  }
};
