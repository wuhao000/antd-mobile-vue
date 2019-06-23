"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Interface {
    constructor() {
        this.typeParameters = [];
        this.name = '';
        this.properties = [];
    }
    toString() {
        return `export interface ${this.name}${this.typeParameters && this.typeParameters.length ? (`<${this.typeParameters.join(', ')}>`) : ''} {
  ${this.properties.map(p => {
            return `${p.description ? `/**
\t * ${p.description.trim()}
\t */
\t` : ''}${this.name === 'Account' && p.name === 'id' ? '// @ts-ignore\n\t' : ''}${p.name}?: ${p.type};`;
        }).join('\n\t')}
}\n`;
    }
}
exports.default = Interface;
