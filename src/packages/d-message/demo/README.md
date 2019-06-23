# 消息提示  DMessage

## 全局方法

Aegis UI 为 Vue.prototype 添加了全局属性 $message, 在vue实例中可以使用以下方式进行调用：

* this.$message.info('这是一条展示信息')
* this.$message.error('这是一条错误信息')
* this.$message.warning('这是一条警告信息')
* this.$message.loading('这是一条Loading信息')
* this.$message.success('这是一条成功信息')
