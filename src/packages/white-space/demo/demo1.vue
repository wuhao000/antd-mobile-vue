<template>
  <div>
    <m-white-space size="xs"/>
    <place-holder/>
    <m-white-space size="sm"/>
    <place-holder/>
    <m-white-space/>
    <place-holder/>
    <m-white-space size="lg"/>
    <place-holder/>
    <m-white-space size="xl"/>
    <place-holder/>
  </div>
</template>
<script lang="ts">
  import PlaceHolder from '../../flex/demo/place-holder.vue';

  export default {
    name: 'DemoDemo1',
    components: {PlaceHolder}
  };
</script>
