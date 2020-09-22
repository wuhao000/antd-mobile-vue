<template>
  <div v-html="source"
       class="markdown-body">
  </div>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  name: 'Markdown',
  props: {
    source: {type: String}
  }
})
export default class Markdown extends Vue {
  public source: string;
}
</script>
