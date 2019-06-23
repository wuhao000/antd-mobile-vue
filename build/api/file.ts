import ImportDeclaration from './import-declaration';
import Interface from './interface';
import Type from './type';
import {ApiConfig} from '../generate-api';
const fs = require('fs');
export const beanDefFileName = 'api-beans';

export function writeFile(config: ApiConfig, types: Type[], beanInterfaces: Interface[], toString, apiObject: object, apiImportList: ImportDeclaration[], toDefinitionString, apiInterfaces) {
  const filePath = `${config.typeRoot}/${beanDefFileName}.d.ts`;
  fs.writeFile(filePath,
      types.map(type => type.toString()).join('\n\n') +
      '\n\n' +
      beanInterfaces.map(i => i.toString()).join('\n\n'), () => {
      });
  const str = toString(apiObject);
  fs.writeFile(`${config.apiRoot}/definition.ts`, `import {GeneratedApis} from '../types/api-definition';
import {ApiDef} from 'aegis-ui';
export default ${str} as GeneratedApis<ApiDef>;\n`, () => {
  });
  fs.writeFile(`${config.typeRoot}/api-definition.d.ts`, `import {GenericAPI, StringIdAPI, NumberIdAPI} from 'aegis-ui';
${apiImportList.map(it => it.toString()).join('\n')}

interface GeneratedApis<T> ${toDefinitionString(apiObject)}

${apiInterfaces.map(a => {
    return `export interface ${a.name} ${a.body}`;
  }).join('\n\n')}
`, () => {
  });
}
