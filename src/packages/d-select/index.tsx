import './style';
import Select from './src';

export default {
  install(Vue) {
    Vue.component('DSelect', Select);
    Vue.component('DSelectOption', Select.Option);
    Vue.component('DSelectOptionGroup', Select.OptionGroup);
  }
};
