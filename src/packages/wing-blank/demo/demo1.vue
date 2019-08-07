<template>
  <div :style="{ padding : '15px 0' }">
    <m-wing-blank>
      <place-holder/>
    </m-wing-blank>
    <m-white-space size="lg"/>
    <m-wing-blank size="md">
      <place-holder/>
    </m-wing-blank>
    <m-white-space size="lg"/>
    <m-wing-blank size="sm">
      <place-holder/>
    </m-wing-blank>
  </div>
</template>
<script lang="ts">
  import PlaceHolder from '../../flex/demo/place-holder.vue';

  export default {
    name: 'DemoDemo1',
    components: {
      PlaceHolder
    }
  };
</script>
