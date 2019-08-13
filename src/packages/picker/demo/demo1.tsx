import {district, provinceLite} from 'antd-mobile-demo-data';
import arrayTreeFilter from 'array-tree-filter';
import Vue from 'vue';
import Component from 'vue-class-component';
import List from '../../list';
import WhiteSpace from '../../white-space';
import Picker from '../index';

// 如果不是使用 List.Item 作为 children
@Component({
  name: 'CustomChildren'
})
class CustomChildren extends Vue {
  public render() {
    return <div
      onclick={(e) => {
        this.$emit('click', e);
      }}
      style={{backgroundColor: '#fff', paddingLeft: 15}}
    >
      <div class="test" style={{display: 'flex', height: '45px', lineHeight: '45px'}}>
        <div
          style={{flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{this.$slots.default}</div>
        <div style={{textAlign: 'right', color: '#888', marginRight: 15}}>{this.$attrs.extra}</div>
      </div>
    </div>;
  }
}

const seasons = [
  [
    {
      label: '2013',
      value: '2013'
    },
    {
      label: '2014',
      value: '2014'
    }
  ],
  [
    {
      label: '春',
      value: '春'
    },
    {
      label: '夏',
      value: '夏'
    }
  ]
];

const colorStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '16px',
  height: '16px',
  marginRight: '10px'
};


@Component({
  name: 'PickerExample'
})
export default class PickerExample extends Vue {
  public state = {
    data: [],
    cols: 1,
    pickerValue: [],
    asyncValue: [],
    sValue: ['2013', '春'],
    visible: false,
    colorValue: ['#00FF00']
  };

  public onClick() {
    setTimeout(() => {
      this.state.data = provinceLite;
    }, 120);
  }

  public onPickerChange(val) {
    console.log(val);
    let colNum = 1;
    const d = [...this.state.data];
    const asyncValue = [...val];
    if (val[0] === 'zj') {
      d.forEach((i) => {
        if (i.value === 'zj') {
          colNum = 2;
          if (!i.children) {
            i.children = [{
              value: 'zj-nb',
              label: '宁波'
            }, {
              value: 'zj-hz',
              label: '杭州'
            }];
            asyncValue.push('zj-nb');
          } else if (val[1] === 'zj-hz') {
            i.children.forEach((j) => {
              if (j.value === 'zj-hz') {
                j.children = [{
                  value: 'zj-hz-xh',
                  label: '西湖区'
                }];
                asyncValue.push('zj-hz-xh');
              }
            });
            colNum = 3;
          }
        }
      });
    } else {
      colNum = 1;
    }
    this.state.data = d;
    this.state.cols = colNum;
    this.state.asyncValue = asyncValue;
  }

  get colors() {
    return [
      {
        label:
          (<div>
      <span
        style={{...colorStyle, backgroundColor: '#FF0000'}}
      />
            <span>红色</span>
          </div>),
        value: '#FF0000'
      },
      {
        label:
          (<div>
      <span
        style={{...colorStyle, backgroundColor: '#00FF00'}}
      />
            <span>绿色</span>
          </div>),
        value: '#00FF00'
      },
      {
        label:
          (<div>
      <span
        style={{...colorStyle, backgroundColor: '#0000FF'}}
      />
            <span>蓝色</span>
          </div>),
        value: '#0000FF'
      }
    ];
  }

  public getSel() {
    const value = this.state.pickerValue;
    if (!value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(district, (c: any, level) => c.value === value[level]);
    return treeChildren.map(v => v.label).join(',');
  }

  public onChangeColor(color) {
    this.state.colorValue = color;
  }

  public render() {
    return (<div>
      <WhiteSpace size="lg"/>
      <List style={{backgroundColor: 'white'}} class="picker-list">
        <Picker extra="请选择(可选)"
                data={district}
                title="Areas"
                value={['340000', '341500', '341502']}
                onOk={e => console.log('ok', e)}
                onDismiss={e => console.log('dismiss', e)}
        >
          <List.Item arrow="horizontal">Multiple & cascader</List.Item>
        </Picker>
        <Picker
          data={seasons}
          title="选择季节"
          cascade={false}
          extra="请选择(可选)"
          value={this.state.sValue}
          onChange={v => this.state.sValue = v}
          onOk={v => this.state.sValue = v}
        >
          <List.Item arrow="horizontal">Multiple</List.Item>
        </Picker>
        <Picker data={district} cols={1} class="forss">
          <List.Item arrow="horizontal">Single</List.Item>
        </Picker>
        <Picker
          data={this.state.data}
          cols={this.state.cols}
          value={this.state.asyncValue}
          onPickerChange={this.onPickerChange.bind(this)}
          onOk={v => console.log(v)}
        >
          <List.Item arrow="horizontal" onClick={this.onClick.bind(this)}>Multiple & async</List.Item>
        </Picker>
        <Picker
          title="选择地区"
          extra="请选择(可选)"
          data={district}
          value={this.state.pickerValue}
          onChange={v => this.state.pickerValue = v}
          onOk={v => this.state.pickerValue = v}
        >
          <CustomChildren>Customized children</CustomChildren>
        </Picker>
        <Picker
          visible={this.state.visible}
          data={district}
          value={this.state.pickerValue}
          onChange={v => this.state.pickerValue = v}
          onOk={() => this.state.visible = false}
          onDismiss={() => this.state.visible = false}
        >
          <List.Item extra={this.getSel()} onClick={() => this.state.visible = true}>
            Visible state
          </List.Item>
        </Picker>
        <Picker
          data={this.colors}
          value={this.state.colorValue}
          cols={1}
          onChange={this.onChangeColor.bind(this)}
        >
          <List.Item arrow="horizontal">Complex Labels</List.Item>
        </Picker>
      </List>
    </div>);
  }
}
