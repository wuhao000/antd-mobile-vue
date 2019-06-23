# 表单组件

## 扩展说明

1. 支持和element-ui同样的表单校验写法
    a. 使用model属性接收校验对象    
    b. 使用rules属性接收校验规则
    c. 表单内的输入组件必须是d-开头的组件（进行了扩展，否则无法自动触发校验）
2. 支持label-width属性指定表单项的标签宽度
3. 支持使用label-cols和wrapper-cols属性进行统一的布局，属性使用的数据格式同a-form-item的label-col和wrapper-col
4. 支持表单内控件整体禁用（disabled属性）
5. 支持表单内控制统一设置尺寸（size属性）
