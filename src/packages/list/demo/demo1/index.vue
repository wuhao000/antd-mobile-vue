<template>
  <div>
    <div>
      <m-list title="这是标题">
        <m-list-item label-position="top"
                     title="标签在上">
          <div slot="extra">
            <ul>
              <li>这是一大段文字</li>
              <li>这是一大段文字</li>
            </ul>
          </div>
        </m-list-item>
        <m-list-item extra="这是我的值"
                     extra-position="left">Extra Left
        </m-list-item>
        <m-list-item extra="这是我的值"
                     extra-position="center">Extra Center
        </m-list-item>
        <m-list-item extra="这是我的值">Extra Right</m-list-item>
      </m-list>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MList from '../../index';

  Vue.use(MList);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
  }
</script>
<style scoped lang="less">
</style>
