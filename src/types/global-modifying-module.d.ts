import Vue from 'vue';

declare global {
  export interface Window {
    Vue: Vue;
    antd: any;
    CodeMirror: any;
    AntDesignIcons: any;
  }
}
