<template>
  <div class="demo">
    <code-box :code="code"
              :markdown="md">
      <demo-comp slot="demo"/>
    </code-box>
  </div>
</template>
<script lang="ts">
  import source from './demo3.txt';
  import md from '@/packages/carousel/demo/demo3/index.md';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import CodeBox from '../../components/code-box.vue';
  import DemoComp from '@/packages/carousel/demo/demo3/index.vue';

  @Component({
    name: 'Demo3',
    components: {CodeBox, DemoComp}
 })
  export default class Demo3 extends Vue {
    public code = source;
    public md = md;
  }
</script>
