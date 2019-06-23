import Vue from 'vue';
import antInputDirective from '../utils/ant-input-directive';
import Input from './src';
import './style';

Vue.use(antInputDirective);

export default {
  install(Vue) {
    Vue.component('DInput', Input);
    Vue.component('DInputGroup', Input.Group);
    Vue.component('DInputSearch', Input.Search);
    Vue.component('DTextarea', Input.TextArea);
  }
};
