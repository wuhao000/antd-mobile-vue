declare module 'async-validator' {
  class AsyncValidator {
    constructor(any)

    public validate(a, b, c);
  }

  export default AsyncValidator;

  type Type = 'string' | 'number' | 'boolean' | 'method'
    | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum'
    | 'date' | 'url' | 'hex' | 'email';
  type Trigger = 'blur' | 'change';

  export interface ValidateRule {
    type?: Type;
    required?: boolean;
    trigger?: Trigger;
    pattern?: RegExp;
    min?: number;
    max?: number;
    len?: number;
    message?: string;
    enum?: any[];
    whitespace?: boolean;
    fields?: { [key: string]: ValidateRule[] };
    /**
     * The defaultField property can be used with the array or object type for validating all values of the container. It may be an object or array containing validation rules. For example:
     * <pre>
     * var descriptor = {
     *   urls: {
     *    type: "array", required: true,
     *    defaultField: {type: "url"}
     *   }
     * }
     * </pre>
     * Note that defaultField is expanded to fields, see deep rules.
     */
    defaultField?: ValidateRule;
    asyncValidator?: (rule: ValidateRule, value: any, callback) => any;
  }

  export type ValidateRules = { [key: string]: ValidateRule[] };
}
