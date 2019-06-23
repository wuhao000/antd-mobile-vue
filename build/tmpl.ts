const fs = require('fs');

export const render = (path: string, data: { [key: string]: string }) => {
  let tmpl = fs.readFileSync(path).toString();
  const keys = Object.keys(data);
  keys.forEach(key => {
    while (tmpl.includes(`{{{${key}}}}`)) {
      tmpl = tmpl.replace(`{{{${key}}}}`, data[key]);
    }
  });
  return tmpl;
};
