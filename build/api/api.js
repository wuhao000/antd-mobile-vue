"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Api {
    constructor() {
        this.bodyParameter = null;
        this.name = '';
        this.summary = '';
        this.definitionPath = [];
        this.id = '';
        this.bodyParameter = null;
        this.url = '';
        this.isFormData = false;
        this.method = '';
        this.parameters = [];
        this.responseType = '';
    }
    toString() {
        return `{
    url: ${this.path},
    method: ${this.type},
    errorHandleType: 'custom'
    }`;
    }
}
exports.default = Api;
