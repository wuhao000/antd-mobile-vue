import Vue from 'vue';
import Component from 'vue-class-component';
import {Button, Input, List, Range, Switch} from '../../index';

const Item = List.Item;

@Component({
  name: 'BasicInput'
})
export default class BasicInput extends Vue {

  public data = {
    account: null,
    password: null
  };
  public state = {
    value: 1
  };

  get form() {
    return this.$refs.form as any;
  }

  public onSubmit() {
    this.form.validate().then(valid => {
      if (valid) {
        console.log(this.data);
      } else {
        alert('Validation failed');
      }
    });
  }

  public onReset() {
    this.data = {account: null, password: null};
  }

  public validateAccount(rule, value, callback) {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('At least four characters for account'));
    }
  }

  public render() {
    return (<form>
      <List ref="form"
            attrs={{model: this.data}}
            renderHeader={() => 'Form Validation'}
            renderFooter={() => 'abc'}>
        <Input clear vModel={this.data.account}
               placeholder="please input account"
        >Account</Input>
        <Input vModel={this.data.password}
               placeholder="please input password" type="password">
          Password
        </Input>
        <Item
            extra={<Switch/>}
        >Confirm Infomation</Item>
        <Item>
          <div style={{padding: 7}}><Range defaultValue={[20, 80]}/></div>
        </Item>
        <Item>
          <Button type="primary" size="small" inline onClick={this.onSubmit.bind(this)}>Submit</Button>
          <Button size="small" inline style={{marginLeft: '2.5px'}} onClick={this.onReset.bind(this)}>Reset</Button>
        </Item>
      </List>
    </form>);
  }
}
