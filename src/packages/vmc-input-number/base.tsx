import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';

function defaultParser(input: string | number) {
  if (typeof input === 'number') {
    return input;
  }
  return input.replace(/[^\w\.-]+/g, '');
}

/**
 * When click and hold on a button - the speed of auto changin the value.
 */
const SPEED = 200;

/**
 * When click and hold on a button - the delay before auto changin the value.
 */
const DELAY = 600;

/**
 * Max Safe Integer -- on IE this is not available, so manually set the number in that case.
 * The reason this is used, instead of Infinity is because numbers above the MSI are unstable
 */
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;


@Component({
  name: 'BaseComponent'
})
export default class BaseComponent extends Vue {

  @Prop([String, Number])
  public step: number | string;
  @Prop({type: Function, default: defaultParser})
  public parser: (v: any) => any;
  @Prop(Number)
  public value: number;
  @Prop(Number)
  public defaultValue: number;
  @Prop(Number)
  public min: number;
  @Prop(Number)
  public max: number;
  @Prop({type: Boolean, default: false})
  public autoFocus: boolean;
  public autoStepTimer: any;
  public state = {
    inputValue: null,
    focused: this.autoFocus
  };
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop({type: Boolean, default: false})
  public readOnly: boolean;
  @Prop(Number)
  public precision: number;

  public created() {
    const value = this.value !== undefined ? this.toNumber(this.value) : this.defaultValue;
    this.state.inputValue = this.toPrecisionAsStep(value);
    this.$watch(() => this.value, () => {
      this.state.inputValue = this.state.focused
        ? this.value : this.getValidValue(this.value);
    });
  }

  public beforeDestroy() {
    this.stop();
  }

  public onChange(e: any) {
    const {parser} = this;
    const input = typeof e === 'number' ? e : (parser && parser(e.target.value));
    this.state.inputValue = parseFloat(input);
    this.$emit('change', this.toNumberWhenUserInput(input));
  }

  @Watch('value')
  public valueChanged(value: number) {
    const v = value !== undefined ? this.toNumber(value) : this.defaultValue;
    this.state.inputValue = this.toPrecisionAsStep(v);
  }

  public onFocus(...args: any[]) {
    this.state.focused = true;
    this.$emit('focus', ...args);
  }

  public onBlur(e: any, ...args: any[]) {
    this.state.focused = false;
    const value = this.getCurrentValidValue(this.state.inputValue);
    if (e.persist) {
      e.persist();  // fix https://github.com/react-component/input-number/issues/51
    }
    this.setValue(value, () => {
      this.$emit('blur', e, ...args);
    });
  }

  public getCurrentValidValue(value: any) {
    let val = value;
    if (val === '') {
      val = '';
    } else if (!this.isNotCompleteNumber(val)) {
      val = this.getValidValue(val);
    } else {
      val = this.state.inputValue;
    }
    return this.toNumber(val);
  }

  public getValidValue(value: number): number {
    let val = parseFloat(value.toString());
    if (isNaN(val)) {
      return value;
    }
    if (val < this.min) {
      val = this.min as number;
    }
    if (val > this.max) {
      val = this.max as number;
    }
    return val;
  }

  public setValue(v: any, callback?: any) {
    // trigger onChange
    const newValue = this.isNotCompleteNumber(parseFloat(v)) ? undefined : parseFloat(v);
    const changed = newValue !== this.state.inputValue ||
      `${newValue}` !== `${this.state.inputValue}`; // https://github.com/ant-design/ant-design/issues/7363
    if (this.value === undefined) {
      this.state.inputValue = this.toPrecisionAsStep(v);
      callback && callback();
    } else {
      // always set input value same as value
      this.state.inputValue = this.toPrecisionAsStep(v);
      callback && callback();
    }
    if (changed) {
      this.$emit('change', newValue);
    }
  }

  @Watch('state.inputValue')
  public stateValueChanged(v) {
    this.$emit('input', v);
  }

  public getPrecision(value: any) {
    if (this.precision) {
      return this.precision as number;
    }
    const valueString = value.toString();
    if (valueString.indexOf('e-') >= 0) {
      return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
    }
    let precision = 0;
    if (valueString.indexOf('.') >= 0) {
      precision = valueString.length - valueString.indexOf('.') - 1;
    }
    return precision;
  }

  public getMaxPrecision(currentValue: any, ratio = 1) {
    if (this.precision) {
      return this.precision as number;
    }
    const {step} = this;
    const ratioPrecision = this.getPrecision(ratio);
    const stepPrecision = this.getPrecision(step);
    const currentValuePrecision = this.getPrecision(currentValue);
    if (!currentValue) {
      return ratioPrecision + stepPrecision;
    }
    return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
  }

  public getPrecisionFactor(currentValue: any, ratio = 1) {
    const precision = this.getMaxPrecision(currentValue, ratio);
    return Math.pow(10, precision as number);
  }

  public toPrecisionAsStep(num: number): number {
    if (this.isNotCompleteNumber(num)) {
      return num;
    }
    const precision = Math.abs(this.getMaxPrecision(num));
    if (!isNaN(precision)) {
      return parseFloat(Number(num).toFixed(precision));
    }
    return num;
  }

  public isNotCompleteNumber(num: any) {
    return (
      isNaN(num) ||
      num === '' ||
      num === null ||
      (num && num.toString().indexOf('.') === num.toString().length - 1)
    );
  }

  public toNumber(num: any) {
    if (this.isNotCompleteNumber(num)) {
      return num;
    }
    if (this.precision) {
      return Number(Number(num).toFixed(this.precision));
    }
    return Number(num);
  }

  public toNumberWhenUserInput(num: any) {
    // num.length > 16 => prevent input large number will became Infinity
    if ((/\.\d*0$/.test(num) || num.length > 16) && this.state.focused) {
      return num;
    }
    return this.toNumber(num);
  }

  public stepCompute(type: 'up' | 'down', val: any, rat: any) {
    const {step, min} = this;
    const precisionFactor = this.getPrecisionFactor(val, rat);
    const precision = Math.abs(this.getMaxPrecision(val, rat));
    let result;
    const direct = type === 'up' ? 1 : -1;
    if (typeof val === 'number') {
      result = ((precisionFactor * val + direct * precisionFactor * +step * rat) /
        precisionFactor).toFixed(precision);
    } else {
      result = min === -Infinity ? direct * +step : min;
    }
    return this.toNumber(result);
  }

  public stepTo(type: 'up' | 'down', e: any, ratio = 1) {
    if (e) {
      e.preventDefault();
    }
    const props = this;
    if (this.disabled) {
      return false;
    }
    const value = this.getCurrentValidValue(this.state.inputValue) || 0;
    if (this.isNotCompleteNumber(value)) {
      return false;
    }
    let val = this.stepCompute(type, value, ratio);
    const outOfRange = val > props.max || val < props.min;
    if (val > props.max) {
      val = props.max;
    } else if (val < props.min) {
      val = props.min;
    }
    this.setValue(val);
    this.state.focused = true;
    return !outOfRange;
  }

  public stop() {
    if (this.autoStepTimer) {
      clearTimeout(this.autoStepTimer);
    }
  }

  public action(type: 'up' | 'down', e: any, ratio?: any, recursive?: any) {
    if (e.persist) {
      e.persist();
    }
    this.stop();
    if (this.stepTo(type, e, ratio)) {
      this.autoStepTimer = setTimeout(() => {
        this.action(type, e, ratio, true);
      }, recursive ? SPEED : DELAY);
    }
  }

  public down(e: any, ratio?: any, recursive?: any) {
    this.action('down', e, ratio, recursive);
  }

  public up(e: any, ratio?: any, recursive?: any) {
    this.action('up', e, ratio, recursive);
  }
}
