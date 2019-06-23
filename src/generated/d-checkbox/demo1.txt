<template>
  <div>
    <div>
      <d-checkbox-group button
                        v-model="value"
                        :options="options"></d-checkbox-group>
    </div>
    <div>
      <d-checkbox-group v-model="value"
                        :options="options"></d-checkbox-group>
    </div>
    <div>
      <d-checkbox-group v-model="form.roles"
                        :options="roles"/>
    </div>
    <!--    <div class="m-t">-->
    <!--      <d-checkbox-group v-model="value2"-->
    <!--                        label-property="name"-->
    <!--                        value-property="id"-->
    <!--                        :options="options2"></d-checkbox-group>-->
    <!--    </div>-->
    <!--    <div class="m-t">-->
    <!--      <d-checkbox-group>-->
    <!--        <d-checkbox-button :value="1">选项1</d-checkbox-button>-->
    <!--        <d-checkbox-button :value="2">选项2</d-checkbox-button>-->
    <!--      </d-checkbox-group>-->
    <!--    </div>-->
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DCheckbox from '../../index';

  Vue.use(DCheckbox);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

    public options = [
      {label: '选项1', value: 1},
      {label: '选项2', value: 2}
    ];

    public options2 = [
      {name: '选项1', id: 1},
      {name: '选项2', id: 2}
    ];

    public roles = [
      {label: '运维人员', value: 'OS_OP'},
      {label: '运维管理员', value: 'OS_OP_MASTER'},
      {label: '开发人员', value: 'OS_DEVELOPER'},
      {label: 'ES管理员', value: 'OS_ES_MASTER'}
    ];
    private form = {
      id: 0,
      roles: null
    };

    public value = [];
    public value2 = [];
  }
</script>
<style scoped lang="less">
</style>
