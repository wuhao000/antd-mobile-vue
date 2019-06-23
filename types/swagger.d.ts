interface SwaggerDocInfo {
  description?: string;
  version?: string;
  title?: string;
  termsOfService?: string;
  vendorExtensions?: {};
}

interface SwaggerTag {
  vendorExtensions: {};
  name: string;
  description: string;
}

export interface SwaggerDoc {
  swagger?: string;
  info?: SwaggerDocInfo;
  host?: string;
  basePath?: string;
  tags?: SwaggerTag[];
  schemes?: any[];
  consumes?: any[];
  produces?: any[];
  paths?: SwaggerPaths;
  securityDefinitions?: {};
  definitions?: ApiDefinitions;
  vendorExtensions?: { globalCode: {} };
  globalCode?: {};
}

interface SwaggerApiExt extends SwaggerAPI {
  name?: string;
  tagDescription?: string;
  tagName?: string;
  path: string;
  method: string;
}

interface SwaggerPaths {
  [key: string]: SwaggerPath;
}

interface ApiDefinitions {
  [key: string]: ApiDefinition;
}

interface ApiDefinition {
  type: string;
  discriminator: string;
  properties: ApiProperties;
  title: string;
  vendorExtensions: {};
  isSimple: boolean;
  description: string;
}

interface ApiProperties {
  content: ApiPropertyContent;
  first: {
    type: string;
    vendorExtensions: {}
  };
  last: {
    type: string;
    vendorExtensions: {}
  };
  number: {
    type: string;
    format: string;
    vendorExtensions: {};
  };
  numberOfElements: {
    type: string;
    format: string;
    vendorExtensions: {};
  };
  size: {
    type: string;
    format: string;
    vendorExtensions: {};
  };
  sort: {
    vendorExtensions: {};
    genericRef: {
      format: string;
      type: string;
      ref: string;
      simpleRef: string
    };
    $ref: string;
  };
  totalElements: {
    type: string;
    format: string;
    vendorExtensions: {};
  };
  totalPages: {
    type: string;
    format: string;
    vendorExtensions: {};
  };
}

interface ApiPropertyContent {
  type: string;
  vendorExtensions: {};
  items: { vendorExtensions: {}; genericRef: { format: string; type: string; ref: string; simpleRef: string }; $ref: string };
}

interface SwaggerAPI {
  vendorExtensions?: { [key: string]: any[] };
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  schemes?: any[];
  consumes?: any[];
  produces?: string[];
  parameters?: SwaggerParameter[];
  responses?: SwaggerResponses;
  security?: any[];
}

interface ResponseSchema {
  vendorExtensions: {};
  genericRef: GenericRef;
  $ref: string;
  items: any;
}

declare type ParameterPositionType = 'query' | 'path' | 'body';

interface SwaggerParameter {
  enum: string[];
  vendorExtensions: any;
  in: ParameterPositionType;
  name: string;
  description: string;
  required: boolean;
  schema?: ResponseSchema;
  type: string;
  default: number;
  allowEmptyValue: boolean;
  format: string;
}

interface GenericRef {
  format: string;
  type: string;
  ref: string;
  simpleRef: string;
}

interface SwaggerResponse {
  description: string;
  schema: ResponseSchema;
  examples: {};
  headers: {};
  vendorExtensions: {};
}

interface SwaggerResponses {
  [key: number]: SwaggerResponse;
}


type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface SwaggerPath {
  [key: string]: SwaggerAPI;
}

