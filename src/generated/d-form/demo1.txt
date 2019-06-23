<template>
  <div>
    <d-card>
      <d-form ok-cancel
              @ok="$message.success('ok clicked')"
              @cancel="$message.error('cancel clicked')"
              layout="horizontal">
        <d-form-item label="标题">
          <d-input/>
        </d-form-item>
        <d-form-item label="起止日期">
          <d-input/>
        </d-form-item>
        <d-form-item label="目标描述"></d-form-item>
        <d-form-item label="衡量标准"></d-form-item>
      </d-form>
    </d-card>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

  }
</script>
<style scoped lang="less">
</style>
