export var getPropByPath = function getPropByPath(obj, path, strict) {
  var tempObj = obj;
  var copyPath = path;
  copyPath = copyPath.replace(/\[(\w+)]/g, '.$1');
  copyPath = copyPath.replace(/^\./, '');
  var keyArr = copyPath.split('.');
  var i = 0;

  for (var len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) {
      break;
    }

    var key = keyArr[i];

    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }

      break;
    }
  }

  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};
export var noop = function noop(a, b) {};