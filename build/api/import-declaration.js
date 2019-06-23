"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImportDeclaration {
    constructor(name, members, module) {
        this.name = name;
        this.members = members;
        this.module = module;
    }
    toString() {
        return 'import ' + (this.name ? this.name : `{
  ${this.members.join(',\n\t')}
} from '${this.module}';`);
    }
}
exports.default = ImportDeclaration;
