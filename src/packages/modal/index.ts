import MModal from './src';
import './style';
import Vue from 'vue';

MModal.install = Vue => {
  Vue.component('MModal', MModal);
};

export default MModal;
