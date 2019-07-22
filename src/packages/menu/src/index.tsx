import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import Button from '../../button';
import Flex from '../../flex';
import List from '../../list';
import {getComponentLocale} from '../../utils/getLocale';
import {DataItem, ValueType} from './props-type';
import SubMenu from './sub-menu';

export interface StateType {
  value?: ValueType;
  firstLevelSelectValue: string;
  height?: number;
}

@Component({
  name: 'Menu'
})
class Menu extends Vue {
  @Prop({
    type: String,
    default: 'am-menu'
  })
  public prefixCls?: string;
  @Prop({
    type: String,
    default: 'am-sub-menu'
  })
  public subMenuPrefixCls?: string;
  @Prop({
    type: String,
    default: 'am-radio'
  })
  public radioPrefixCls?: string;
  @Prop({
    type: String,
    default: 'am-multi-select-btns'
  })
  public multiSelectMenuBtnsCls?: string;
  @Prop({
    type: String,
    default: 'am-menu-select-container'
  })
  public MenuSelectContanerPrefixCls?: string;
  @Prop({
    default: () => {
      return [];
    }
  })
  public data?: DataItem[];
  @Prop({})
  public defaultValue?: ValueType;
  @Prop({})
  public value?: ValueType;
  @Prop({default: 2})
  public level?: 1 | 2;
  @Prop({type: Number})
  public height?: number;
  @Prop({
    type: Boolean,
    default: false
  })
  public multiSelect?: boolean;
  public state = {
    firstLevelSelectValue: this.getNewFsv(),
    value: this.value,
    height: this.height
  };
  public static contextTypes = {
    antLocale: PropTypes.object
  };
  public static install: (Vue) => void;

  @Watch('value')
  public valueChanged(value) {
    this.state.firstLevelSelectValue = this.getNewFsv();
    this.state.value = value;
  }

  @Watch('height')
  public heightChanged(height) {
    this.state.height = height;
  }

  public mounted() {
    if (!('height' in this)) {
      this.height = Math.round(document.documentElement.clientHeight / 2);
    }
  }

  public onMenuOk() {
    this.$emit('ok', this.state.value);
  }

  public onMenuCancel() {
    this.$emit('cancel');
  }

  public getNewFsv() {
    const {value, data} = this;
    let firstValue = '';
    if (value && value.length) {
      // if has init path, chose init first value
      firstValue = value[0] as string; // this is a contract
    } else if (data && data.length && !data[0].isLeaf) {
      // chose the first menu item if it's not leaf.
      firstValue = data[0].value;
    }

    return firstValue;
  }

  public onClickFirstLevelItem(dataItem: DataItem) {
    this.state.firstLevelSelectValue = dataItem.value;
    if (dataItem.isLeaf) {
      this.$emit('change', [dataItem.value]);
    }
  }

  public getSelectValue(dataItem: DataItem) {
    const {level, multiSelect} = this;
    if (multiSelect) {
      const {value, firstLevelSelectValue} = this.state;
      if (value && value.length > 0) {
        if (level === 2 && value[0] !== firstLevelSelectValue) {
          /* if level is 2, when first level is reselect, reset submenu array */
          return [firstLevelSelectValue, [dataItem.value]];
        } else {
          /* if level is 1, or first level isn't changed when level is 2, just do add or delete for submenu array  */
          const chosenValues = level === 2 ? (value[1] as string[]) : value; // FIXME: hack type
          const existIndex = chosenValues.indexOf(dataItem.value);
          if (existIndex === -1) {
            chosenValues.push(dataItem.value);
          } else {
            chosenValues.splice(existIndex, 1);
          }
          return value;
        }
      } else {
        /* if value is not exist before, init value */
        return level === 2
            ? [firstLevelSelectValue, [dataItem.value]]
            : [dataItem.value];
      }
    }

    return level === 2
        ? [this.state.firstLevelSelectValue, dataItem.value]
        : [dataItem.value];
  }

  public onClickSubMenuItem(dataItem: DataItem) {
    const value = this.getSelectValue(dataItem);
    this.state.value = value;
    setTimeout(() => {
      // if onChange will close the menu, set a little time to show its selection state.
      this.$emit('change', value);
    }, 300);
  }

  public render() {
    const {
      data = [],
      prefixCls,
      level,
      multiSelect,
      multiSelectMenuBtnsCls,
      MenuSelectContanerPrefixCls
    } = this;
    const {firstLevelSelectValue, value, height} = this.state;
    let subMenuData = data; // menu only has one level as init

    if (level === 2) {
      let parent = data;
      if (firstLevelSelectValue && firstLevelSelectValue !== '') {
        parent = data.filter(
            dataItem => dataItem.value === firstLevelSelectValue
        );
      }

      // tslint:disable-next-line:prefer-conditional-expression
      if (parent[0] && parent[0].children && parent[0].isLeaf !== true) {
        subMenuData = parent[0].children;
      } else {
        subMenuData = [];
      }
    }

    let subValue = (value && value.length > 0 && [...value]) || [];
    if (level === 2 && subValue.length > 1) {
      subValue.shift();
      if (multiSelect) {
        /* example: [[1,2,3]] -> [1,2,3] */
        subValue = subValue[0] as string[]; // FIXME: hack type
      }
    }

    const parentValue =
        value && value.length > 1 && level === 2 ? value[0] : null;
    const subSelInitItem = subMenuData
        .filter(dataItem => subValue.indexOf(dataItem.value) !== -1)
        .map(item => {
          return item.value;
        });

    let showSelect = true;
    if (level === 2 && parentValue !== firstLevelSelectValue) {
      showSelect = false;
    }

    // tslint:disable-next-line:variable-name
    const _locale = getComponentLocale(
        this.$props,
        this,
        'Menu',
        () => require('./locale/zh_CN')
    );

    const heightStyle =
        height !== undefined
            ? {
              height: `${height}px`
            }
            : {};

    return (
        <Flex
            class={prefixCls}
            style={{
              ...heightStyle
            }}
            direction="column"
            align="stretch"
        >
          <Flex
              align="start"
              class={classnames({
                [MenuSelectContanerPrefixCls as string]: true
              })}
          >
            {level === 2 && (
                <Flex.Item>
                  <List role="tablist">
                    {data.map((dataItem, index) => (
                        <List.Item
                            class={
                              dataItem.value === firstLevelSelectValue
                                  ? `${prefixCls}-selected`
                                  : ''
                            }
                            onClick={() => this.onClickFirstLevelItem(dataItem)}
                            key={`listitem-1-${index}`}
                            role="tab"
                            aria-selected={dataItem.value === firstLevelSelectValue}
                        >
                          {dataItem.label}
                        </List.Item>
                    ))}
                  </List>
                </Flex.Item>
            )}
            <Flex.Item
                role="tabpanel"
                aria-hidden="false"
                class={`${MenuSelectContanerPrefixCls}-submenu`}
            >
              <SubMenu
                  subMenuPrefixCls={this.subMenuPrefixCls}
                  radioPrefixCls={this.radioPrefixCls}
                  subMenuData={subMenuData}
                  selItem={subSelInitItem}
                  onClick={this.onClickSubMenuItem}
                  showSelect={showSelect}
                  multiSelect={multiSelect}
              />
            </Flex.Item>
          </Flex>
          {multiSelect && (
              <div class={multiSelectMenuBtnsCls}>
                <Button
                    inline
                    class={`${multiSelectMenuBtnsCls}-btn`}
                    onClick={this.onMenuCancel}
                >
                  {_locale.cancelText}
                </Button>
                <Button
                    inline
                    type="primary"
                    class={`${multiSelectMenuBtnsCls}-btn`}
                    onClick={this.onMenuOk}
                >
                  {_locale.okText}
                </Button>
              </div>
          )}
        </Flex>
    );
  }
}

export default Menu as any;
