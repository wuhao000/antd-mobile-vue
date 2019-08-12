export const getOptionProperty = function getOptionProperty(option, property) {
    if (typeof option === 'string') {
        return option;
    }
    else if (typeof property === 'string') {
        return option[property];
    }
    else if (typeof property === 'function') {
        return property(option);
    }
};
//# sourceMappingURL=option.js.map