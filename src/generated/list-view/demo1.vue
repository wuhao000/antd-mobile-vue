<template>
  <div class="demo">
    <code-box :code="code"
              :markdown="md">
      <demo-comp slot="demo"/>
    </code-box>
  </div>
</template>
<script lang="ts">
  import source from './demo1.txt';
  import md from '@/packages/list-view/demo/demo1/index.md';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import CodeBox from '../../components/code-box.vue';
  import DemoComp from '@/packages/list-view/demo/demo1/index.vue';

  @Component({
    name: 'Demo1',
    components: {CodeBox, DemoComp}
 })
  export default class Demo1 extends Vue {
    public code = source;
    public md = md;
  }
</script>
