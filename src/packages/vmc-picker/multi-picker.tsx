import {MultiPickerProps} from '../vmc-picker/multi-picker-props';
import classnames from 'classnames';

import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {setListeners, setProps} from '../utils/vnode';
import MultiPickerMixin from './multi-picker-mixin';

@Component({name: 'MultiPicker'})
class MultiPicker extends MultiPickerProps {
  @Prop()
  public getValue: any;

  public render(): any {
    const {
      prefixCls
    } = this.$props;
    const selectedValue = this.getValue();
    const colElements = this.$slots.default.map((col: any, i) => {
      setProps(col, {
        selectedValue: selectedValue[i]
      });
      setListeners(col, {
        input: (...args) => {
          this.$emit('input', i, ...args);
        },
        scrollChange: (...args) => {
          this.$emit('scroll-change', i, ...args);
        }
      });
      return col;
    });
    return (
      <div class={classnames(prefixCls)}>
        {colElements}
      </div>
    );
  }
}

export default MultiPickerMixin(MultiPicker);
