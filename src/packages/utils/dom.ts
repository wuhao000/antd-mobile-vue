import {HTMLAttributes} from 'vue';

const htmlAttrNames = ['innerHTML', 'class', 'style',
  'accesskey', 'contenteditable',
  'contextmenu', 'dir', 'draggable', 'hidden', 'id', 'lang',
  'placeholder', 'spellcheck', 'tabindex', 'title', 'translate',
  'radiogroup', 'role', 'about', 'datatype', 'inlist', 'prefix',
  'property', 'resource', 'typeof', 'vocab', 'autocapitalize',
  'autocorrect', 'autocave', 'color', 'itemprop', 'itemscope', 'itemtype',
  'itemid', 'itemref', 'results', 'security', 'unselectable'];

export const filterHTMLAttrs = (props: object): HTMLAttributes => {
  const res: HTMLAttributes = {};
  Object.keys(props).forEach(key => {
    if (htmlAttrNames.includes(key)) {
      res[key] = props[key];
    }
  });
  return res;
};
