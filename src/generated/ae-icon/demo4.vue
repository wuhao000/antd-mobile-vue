<template>
  <div class="demo">
    <code-box :code="code"
              :markdown="md">
      <demo-comp slot="demo"/>
    </code-box>
  </div>
</template>
<script lang="ts">
  import source from './demo4.txt';
  import md from '@/packages/ae-icon/demo/demo4/index.md';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import CodeBox from '../../components/code-box.vue';
  import DemoComp from '@/packages/ae-icon/demo/demo4/index.vue';

  @Component({
    name: 'Demo4',
    components: {CodeBox, DemoComp}
 })
  export default class Demo4 extends Vue {
    public code = source;
    public md = md;
  }
</script>
