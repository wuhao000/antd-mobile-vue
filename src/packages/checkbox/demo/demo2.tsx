import {defineComponent, reactive, watch} from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      value: []
    });
    const options = [{
      label: '选项1',
      value: 0
    }, {
      label: '选项2',
      value: 1
    }, {
      label: '选项3',
      value: 2
    }];
    watch(() => state.value, (v) => {
      console.log(v);
    });
    return {
      state, options
    };
  },
  render() {
    return <div>
      <m-checkbox-list v-model={[this.state.value, 'value']}
                       options={this.options}></m-checkbox-list>
    </div>;
  }
});
