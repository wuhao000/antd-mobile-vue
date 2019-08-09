export default {
  render() {
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
    return <div>
      <m-checkbox-list options={options}></m-checkbox-list>
    </div>;
  }
};
