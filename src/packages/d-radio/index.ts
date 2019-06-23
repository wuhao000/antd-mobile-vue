import Radio from './src';

export default {
  install(Vue) {
    Vue.component('DRadio', Radio);
    Vue.component('DRadioGroup', Radio.Group);
    Vue.component('DRadioButton', Radio.Button);
  }
};
