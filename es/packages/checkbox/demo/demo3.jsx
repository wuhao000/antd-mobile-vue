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
        const options2 = [{
                label: '选项1',
                value: 0
            }, {
                label: '选项2',
                value: 1,
                disabled: true
            }, {
                label: '选项3',
                value: 2
            }];
        return <div>
      <m-checkbox-popup-list title="点击选择" options={options}/>
      <m-checkbox-popup-list title="点击选择（包含禁用选项）" options={options2}/>
    </div>;
    }
};
//# sourceMappingURL=demo3.jsx.map