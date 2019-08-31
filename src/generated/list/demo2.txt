import Vue from 'vue';
import Component from 'vue-class-component';
import {List} from '../../index';
import './index1.less';

const Item = List.Item;
const Brief = Item.Brief;

@Component({
  name: 'ListExample'
})
export default class ListExample extends Vue {

  public state = {
    disabled: false
  };
  public disabled: boolean = false;

  public onClick() {
    console.log('item clicked');
  }

  public render() {
    return (<div>
      <List renderHeader={() => 'Basic Style'} class="my-list">
        <Item onClick={this.onClick} extra={'extra content'}>Title</Item>
      </List>
      <List renderHeader={() => 'Subtitle'} class="my-list">
        <Item arrow="horizontal" multipleLine onClick={() => {
        }}>
          Title <Brief>subtitle</Brief>
        </Item>
        <Item
          arrow="horizontal"
          multipleLine
          onClick={() => {
          }}
          platform="android"
        >
          ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
          event.</Brief>
        </Item>
        <Item
          arrow="horizontal"
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          multipleLine
          onClick={() => {
          }}
        >
          Title <Brief>subtitle</Brief>
        </Item>
      </List>
      <List renderHeader={() => 'Customized Right Side（Empty Content / Text / Image）'} class="my-list">
        <Item>Title</Item>
        <Item arrow="horizontal" onClick={() => {
        }}>Title</Item>
        <Item extra="extra content" arrow="horizontal" onClick={() => {
        }}>Title</Item>
        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              multipleLine>
          Title <Brief>subtitle</Brief>
        </Item>
      </List>
      <List renderHeader={() => 'Align Vertical Center'} class="my-list">
        <Item multipleLine extra="extra content">
          Title <Brief>subtitle</Brief>
        </Item>
      </List>
      <List renderHeader={() => 'Icon in the left'}>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          arrow="horizontal"
          onClick={() => {
          }}
        >My wallet</Item>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
          onClick={() => {
          }}
          arrow="horizontal"
        >
          My Cost Ratio
        </Item>
      </List>
      <List renderHeader={() => 'Text Wrapping'} class="my-list">
        <Item data-seed="logId">Single line，long text will be hidden with ellipsis；</Item>
        <Item wrap>Multiple line，long text will wrap；Long Text Long Text Long Text Long Text Long Text Long Text</Item>
        <Item extra="extra content" multipleLine align="top" wrap>
          Multiple line and long text will wrap. Long Text Long Text Long Text
        </Item>
        <Item extra="no arrow" arrow="empty" class="spe" wrap>
          In rare cases, the text of right side will wrap in the single line with long text. long text long text long
          text
        </Item>
      </List>
      <List renderHeader={() => 'Other'} class="my-list">
        <Item disabled={this.state.disabled} extra="" onClick={() => {
          console.log('click', this.state.disabled);
          this.disabled = true;
        }}>Click to disable</Item>
        <Item>
          <select defaultValue="1">
            <option value="1">Html select element</option>
            <option value="2" disabled>Unable to select</option>
            <option value="3">option 3</option>
          </select>
        </Item>
      </List>
    </div>);
  }
}
