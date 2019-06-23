<template>
  <div class="demo">
    <code-box :code="code"
              :markdown="md">
      <demo-comp slot="demo"/>
    </code-box>
  </div>
</template>
<script lang="ts">
  import source from './demo2.txt';
  import md from '@/packages/time-directive/demo/demo2/index.md';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import CodeBox from '../../components/code-box.vue';
  import DemoComp from '@/packages/time-directive/demo/demo2/index.vue';

  @Component({
    name: 'Demo2',
    components: {CodeBox, DemoComp}
 })
  export default class Demo2 extends Vue {
    public code = source;
    public md = md;
  }
</script>
