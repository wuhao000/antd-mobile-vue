const camel = function(key) {
  return key.replace(/(-[a-z])/g, function($1) {
    return $1.toUpperCase().replace('-', '');
  });
};

export const camelAttrs = function(attrs) {
  for (const i in attrs) {
    if (attrs) {
      const key = camel(i);
      attrs[key] = attrs[i];
      if (key !== i) {
        delete attrs[i];
      }
    }
  }
  return attrs;
};
