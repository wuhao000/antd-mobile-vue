"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 解析swagger中的类型对应的ts类型
 */
function resolveRef(ref, definitions) {
    // Response只取data部分
    return resolveInner(ref.replace(/Response<(.*?)>/i, '$1')
        .replace(/ResponseSimpleEnum<(.*?)>/i, '$1')).replace(/_{/g, '<')
        .replace(/}_/g, '>');
    function resolveInner(ref) {
        // 解析泛型参数
        const match = /(?!Array<)(\w+)<([^<>]+)>/.exec(ref);
        let copyRef = ref;
        if (match) {
            const name = match[1];
            let typeParameter = match[2];
            if (typeParameter.includes(',')) {
                typeParameter = typeParameter.split(',')
                    .map(it => resolveInner(it)).join(',');
            }
            else {
                typeParameter = resolveInner(typeParameter);
            }
            if (['HashMap', 'Map', 'TreeMap'].includes(name)) {
                copyRef = copyRef.replace(match[0], `{[key: string]: ${typeParameter.replace(/(.*?),(.*?)/, '$2')}}`);
            }
            else if (['List', 'ArrayList', 'LinkedList'].includes(name)) {
                if (typeParameter.startsWith('{')) {
                    copyRef = copyRef.replace(match[0], `Array_{${typeParameter}}_`);
                }
                else {
                    copyRef = copyRef.replace(match[0], `${typeParameter}[]`);
                }
            }
            if (ref === copyRef) {
                ref = ref.replace(/(ArrayList|LinkedList|List)/g, 'Array');
                return ref;
            }
            else if (copyRef.includes('<')) {
                return resolveInner(copyRef);
            }
            else {
                return copyRef;
            }
        }
        else {
            if (['int', 'long', 'double', 'float'].includes(copyRef)) {
                return 'number';
            }
            else if (copyRef === 'Unit') {
                return 'never';
            }
            else if (copyRef === 'object') {
                return 'any';
            }
            else {
                return copyRef;
            }
        }
    }
}
exports.resolveRef = resolveRef;
