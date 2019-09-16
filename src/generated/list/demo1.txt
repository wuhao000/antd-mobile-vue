import Vue from 'vue';
import Component from 'vue-class-component';
import {List} from '../../index';
import './index1.less';

const Item = List.Item;

const options = [{
  label: '选项1', value: 1
}, {
  label: '选项2', value: 2
}, {
  label: '选项3', value: 3
}];

@Component({
  name: 'ListExample'
})
export default class ListExample extends Vue {

  public state = {
    disabled: false,
    slider: 5,
    switch: false,
    range: [0, 100],
    readonly: false,
    error: false,
    errorMessage: '',
    errorDisplayType: 'text'
  };
  public disabled: boolean = false;

  public onClick() {
    console.log('item clicked');
  }

  public render() {
    return (<div>
      <List title="状态控制">
        <m-switch-item title="禁用" v-model={this.state.disabled}/>
        <m-switch-item title="只读" v-model={this.state.readonly}/>
        <m-switch-item title="错误状态" v-model={this.state.error}/>
      </List>
      <List title="表单" disabled={this.state.disabled}
            editable={!this.state.readonly}>
        <m-input required title="输入框" error={this.state.error} errorDisplayType={this.state.errorDisplayType}
                 errorMessage={this.state.errorMessage}/>
        <m-input title="数字"
                 type="number" error={this.state.error} errorDisplayType={this.state.errorDisplayType}
                 errorMessage={this.state.errorMessage}/>
        <m-date-picker-item required title="日期时间选择" value={new Date()} error={this.state.error}
                            errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-date-picker-item required title="日期选择" mode="date" value={new Date()} error={this.state.error}
                            errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-date-picker-item required title="年份选择" mode="year" value={new Date()} error={this.state.error}
                            errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-date-picker-item required title="月份选择" mode="month" value={new Date()} error={this.state.error}
                            errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-date-picker-item required title="时间选择" mode="time" value={new Date()} error={this.state.error}
                            errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-calendar-item required title="日期范围" value={[new Date(), new Date()]}/>
        <m-range-item title="范围选择" value={this.state.range} error={this.state.error}
                      errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-radio-popup-list required title="弹出单选"
                            value={1}
                            options={options}
                            error={this.state.error}
                            errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-checkbox-popup-list required title="弹出多选" options={options} error={this.state.error}
                               value={[1, 2]}
                               errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-switch-item title="开关" v-model={this.state.switch} error={this.state.error}
                       errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-textarea required rows={5} title="长文本"
                    value="这是一大段文字，这是一大段文字，这是一大段文字，这是一大段文字，这是一大段文字，这是一大段文字，这是一大段文字"
                    error={this.state.error}
                    errorDisplayType={this.state.errorDisplayType}
                    errorMessage={this.state.errorMessage}/>
        <m-slider-item title="滑动输入条" v-model={this.state.slider} error={this.state.error}
                       errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-radio-list required title="单选" options={options} error={this.state.error}
                      errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-checkbox-list required title="多选" options={options} error={this.state.error}
                         errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
      </List>
    </div>);
  }
}
