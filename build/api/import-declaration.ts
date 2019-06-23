export default class ImportDeclaration {
  public members?: string[];
  public module: string;
  public name?: string;

  constructor(name?: string, members?: string[], module?: string) {
    this.name = name;
    this.members = members;
    this.module = module;
  }

  public toString(): string {
    return 'import ' + (this.name ? this.name : `{
  ${this.members.join(',\n\t')}
} from '${this.module}';`);
  }
}
