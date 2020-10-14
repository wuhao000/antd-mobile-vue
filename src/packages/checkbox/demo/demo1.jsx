import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Test',
    props: {},
    setup(props, { emit, slots }) {
        const onChange = (val) => {
            console.log(val);
        };
        return { onChange };
    },
    render() {
        const data = [
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' }
        ];
        return (<div>
      <m-list renderHeader={() => 'CheckboxItem demo'}>
        {data.map(i => (<m-checkbox-item key={i.value} onChange={() => this.onChange(i.value)}>
            {i.label}
          </m-checkbox-item>))}
        <m-checkbox-item key="disabled" disabled defaultChecked multipleLine>
          Undergraduate
          <m-list-item-brief>Auxiliary text</m-list-item-brief>
        </m-checkbox-item>
      </m-list>
      <m-flex>
        <m-flex-item>
          <m-agree-item onChange={e => console.log('checkbox', e)}>
            Agree <a onClick={(e) => {
            e.preventDefault();
            alert('agree it');
        }}>agreement</a>
          </m-agree-item>
        </m-flex-item>
      </m-flex>
    </div>);
    }
});
//# sourceMappingURL=demo1.jsx.map