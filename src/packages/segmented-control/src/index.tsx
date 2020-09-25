import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Model, Prop, Watch} from 'vue-property-decorator';
import TouchFeedback from '../../vmc-feedback';

@Component({
  name: 'SegmentedControl'
})
class SegmentedControl extends Vue {
  @Prop({
    type: String,
    default: 'am-segment'
  })
  public prefixCls?: string;
  @Prop({
    type: String,
    default: ''
  })
  public tintColor?: string;
  @Prop({
    type: Boolean,
    default: false
  })
  public disabled?: boolean;
  @Prop({
    type: Number,
    default: 0
  })
  public value?: number;
  @Prop({
    default: () => {
      return [];
    }
  })
  public values?: string[];
  public state = {
    selectedIndex: this.value
  };
  public static install: (Vue) => void;

  @Watch('value')
  public selectedIndexChanged(value: number) {
    this.state.selectedIndex = value;
  }

  public onClick(e: any, index: any, value: any) {
    const {disabled} = this;
    if (!disabled && this.state.selectedIndex !== index) {
      // just do a mock so that the api to be the same as react-native
      e.nativeEvent = e.nativeEvent ? e.nativeEvent : ({} as any);
      (e.nativeEvent as any).selectedSegmentIndex = index;
      (e.nativeEvent as any).value = value;
      this.state.selectedIndex = index;
      this.$emit('update:value', index);
      this.$emit('change', index);
    }
  }

  public renderSegmentItem(idx: number, value: string, selected: boolean) {
    const {prefixCls, disabled, tintColor} = this;

    const itemCls = classnames(`${prefixCls}-item`, {
      [`${prefixCls}-item-selected`]: selected
    });

    const itemStyle = {
      color: selected ? '#fff' : tintColor,
      backgroundColor: selected ? tintColor : 'transparent',
      borderColor: tintColor
    };

    const activeInnerStyle: any = tintColor
        ? {
          backgroundColor: tintColor
        }
        : {};

    return (
        <TouchFeedback
            key={idx}
            disabled={disabled}
            activeClassName={`${prefixCls}-item-active`}
        >
          <div
              class={itemCls}
              style={itemStyle}
              role="tab"
              aria-selected={selected && !disabled}
              aria-disabled={disabled}
              onClick={disabled ? undefined : e => this.onClick(e, idx, value)}
          >
            <div class={`${prefixCls}-item-inner`} style={activeInnerStyle}/>
            {value}
          </div>
        </TouchFeedback>
    );
  }

  public render() {
    const {prefixCls, disabled, values = []} = this;

    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-disabled`]: disabled
    });

    return (
        <div class={wrapCls} role="tablist">
          {values.map((value, idx) =>
              // tslint:disable-next-line:jsx-no-multiline-js
              this.renderSegmentItem(idx, value, idx === this.state.selectedIndex)
          )}
        </div>
    );
  }
}

export default SegmentedControl as any;
