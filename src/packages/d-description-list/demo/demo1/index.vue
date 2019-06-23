<template>
  <div>
    <d-card :bordered="false">
      <d-description-list size="large"
                          title="退款申请"
                          :style="{ marginBottom : 32 }">
        <d-description term="取货单号">{{application.id}}</d-description>
        <d-description term="状态">{{application.status}}</d-description>
        <d-description term="销售单号">{{application.orderNo}}</d-description>
        <d-description term="子订单">{{application.childOrderNo}}</d-description>
      </d-description-list>
      <d-divider :style="{ marginBottom : 32 }"/>
      <d-description-list size="large"
                          style="margin-bottom:32px"
                          title="用户信息">
        <d-description term="用户姓名">{{userInfo.name}}</d-description>
        <d-description term="联系电话">{{userInfo.tel}}</d-description>
        <d-description term="常用快递">{{userInfo.delivery}}</d-description>
        <d-description term="取货地址">{{userInfo.addr}}</d-description>
        <d-description term="备注">{{userInfo.remark}}</d-description>
      </d-description-list>
      <d-divider :style="{ marginBottom : 32 }"/>
    </d-card>
  </div>
</template>
<script lang="tsx">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DDescription from '../../index';

  Vue.use(DDescription);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public application = {
      id: 1,
      status: '已取货',
      orderNo: '2222224',
      childOrderNo: '9999944444'
    };
    public userInfo = {
      name: '张三',
      tel: '18100000000',
      delivery: '菜鸟物流',
      addr: '浙江省杭州市西湖区万塘路18号',
      remark: '备注'
    };
  }
</script>
<style scoped lang="less">
</style>
