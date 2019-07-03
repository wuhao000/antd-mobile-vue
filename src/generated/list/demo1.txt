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
        <m-list-item extra-position="left" extra="这是我的值">Extra Left</m-list-item>
        <m-list-item extra-position="center" extra="这是我的值">Extra Center</m-list-item>
        <m-list-item extra="这是我的值">列表项3</m-list-item>
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
    // TODO
  }
</script>
<style scoped lang="less">
</style>
