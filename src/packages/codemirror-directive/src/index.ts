/* eslint-disable no-undef */
import {getCodeMirrorEditor, setCodeMirrorEditor} from './utils';
/**
 * Created by wuhao on 2016/11/23.
 */
import uuid from 'uuid';
import {VNode, VNodeDirective} from 'vue';
import beautify from '../../../utils/beautify';



export default {
  bind(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
    let config = {
      size: ['auto', 'auto']
    };
    let value = binding.value || '';
    const attrs = vnode.data.attrs || {};
    if (attrs.config) {
      config = vnode.data.attrs.config;
    }
    if (binding.modifiers.format) {
      const format = vnode.data.attrs.type || 'json';
      value = beautify(value, {format});
    }
    const mode = attrs.mode || 'application/ld+json';
    const defaultConfig: CodeMirror.EditorConfiguration = {
      value,
      lineNumbers: true,
      lineWrapping: false,
      tabSize: 2,
      foldGutter: true,
      gutters: ['codeMirror-linenumbers', 'codeMirror-foldgutter'],
      theme: 'blackboard',
      readOnly: true,
      mode: {name: mode, globalVars: true}
    };
    const viewer = window.CodeMirror(el, Object.assign(defaultConfig, config));
    if (config.size) {
      viewer.setSize(config.size[0], config.size[1]);
    }
    if (attrs.change) {
      viewer.on('change', () => {
        const content = viewer.getValue();
        attrs.change(content);
      });
    }
    const editorId = el.id || uuid.v4();
    if (!el.id) {
      el.id = editorId;
    }
    setCodeMirrorEditor(editorId, viewer);
  },
  inserted(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
    const editorId = el.id;
    getCodeMirrorEditor(editorId).refresh();
  },
  update(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
    const editorId = el.id;
    const editor = getCodeMirrorEditor(editorId);
    let value = binding.value;
    if (binding.modifiers.format) {
      const format = vnode.data.attrs.type || 'json';
      value = beautify(value, {format});
    }
    editor.setValue(value);
    editor.refresh();
  }
};
