var camel = function camel(key) {
  return key.replace(/(-[a-z])/g, function ($1) {
    return $1.toUpperCase().replace('-', '');
  });
};

export var camelAttrs = function camelAttrs(attrs) {
  for (var i in attrs) {
    if (attrs) {
      var key = camel(i);
      attrs[key] = attrs[i];

      if (key !== i) {
        delete attrs[i];
      }
    }
  }

  return attrs;
};