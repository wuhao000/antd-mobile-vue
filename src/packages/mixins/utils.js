export const getPropByPath = function getPropByPath(obj, path, strict) {
    let tempObj = obj;
    let copyPath = path;
    copyPath = copyPath.replace(/\[(\w+)]/g, '.$1');
    copyPath = copyPath.replace(/^\./, '');
    const keyArr = copyPath.split('.');
    let i = 0;
    for (const len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) {
            break;
        }
        const key = keyArr[i];
        if (key in tempObj) {
            tempObj = tempObj[key];
        }
        else {
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
export const noop = function noop(a, b) {
};
//# sourceMappingURL=utils.js.map