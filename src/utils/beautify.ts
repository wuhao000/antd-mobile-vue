'use strict';

import cssbeautify from 'cssbeautify';
import {prettyPrint as html} from 'html';
import {js_beautify as jsBeautify} from 'js-beautify';

const clean = (data: any) => {
  if (~['"', '\''].indexOf(data[0]) &&
      ~['"', '\''].indexOf(data[data.length - 1]) &&
      data[0] === data[data.length - 1]
  ) {
    return data.substring(1, data.length - 1);
  }
  return data;
};

const beautify = (data: string, o: any) => {
  let copyData = data;
  if (!copyData || !copyData.length) {
    return '';
  }
  copyData = clean(copyData.trim());
  switch (o.format) {
    case 'css':
      return cssbeautify(copyData, {
        indent: '    ',
        autosemicolon: true
      });
    case 'json':
      return jsBeautify(copyData, {
        indent_size: 2
      });
    case 'js':
      return jsBeautify(copyData, {
        indent_size: 4
      });
    case 'html':
      return html(copyData, {
        indent_size: 2
      });
    case 'xml':
      return html(copyData, {
        indent_size: 2
      });
  }
};
export default beautify;
