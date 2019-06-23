import {BodyParameter} from '../../types/api-generate';

export default class Api {
  public bodyParameter: BodyParameter = null;
  public definitionPath: any[];
  public id: string;
  public isFormData: boolean;
  public method: string;
  public name: string;
  public parameters: any[];
  public path: string;
  public responseType: string;
  public summary: string;
  public type: any;
  public url: string;

  constructor() {
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
