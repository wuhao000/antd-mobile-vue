import { __decorate } from "tslib";
import { Options, Vue } from 'vue-class-component';
import { Button, Input, List, Range, Switch } from '../../index';
const Item = List.Item;
let BasicInput = class BasicInput extends Vue {
    constructor() {
        super(...arguments);
        this.data2 = {
            account: null,
            password: null
        };
        this.state = {
            value: 1,
            range: [20, 80]
        };
    }
    get form() {
        return this.$refs.form;
    }
    onSubmit() {
        this.form.validate().then(valid => {
            if (valid) {
                console.log(this.data);
            }
            else {
                alert('Validation failed');
            }
        });
    }
    onReset() {
        this.data2 = { account: null, password: null };
    }
    validateAccount(rule, value, callback) {
        if (value && value.length > 4) {
            callback();
        }
        else {
            callback(new Error('At least four characters for account'));
        }
    }
    render() {
        return (<form>
      <List ref="form" {...{ model: this.data }} renderHeader={() => 'Form Validation'} renderFooter={() => 'abc'}>
        <Input clear vModel={this.data2.account} placeholder="please input account">Account</Input>
        <Input vModel={this.data2.password} placeholder="please input password" type="password">
          Password
        </Input>
        <Item extra={<Switch />}>Confirm Infomation</Item>
        <Item>
          <div style={{ padding: '15px' }}><Range vModel={this.state.range}/></div>
        </Item>
        <Item>
          <Button type="primary" size="small" inline onClick={this.onSubmit.bind(this)}>Submit</Button>
          <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset.bind(this)}>Reset</Button>
        </Item>
      </List>
    </form>);
    }
};
BasicInput = __decorate([
    Options({
        name: 'BasicInput'
    })
], BasicInput);
export default BasicInput;
//# sourceMappingURL=demo3.jsx.map