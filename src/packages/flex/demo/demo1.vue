<template>
  <div class="flex-container">
    <div class="sub-title">Basic</div>
    <m-flex>
      <m-flex-item>
        <place-holder/>
      </m-flex-item>
      <m-flex-item>
        <PlaceHolder/>
      </m-flex-item>
    </m-flex>
    <m-white-space size="lg"/>
    <m-flex>
      <m-flex-item>
        <PlaceHolder/>
      </m-flex-item>
      <m-flex-item>
        <PlaceHolder/>
      </m-flex-item>
      <m-flex-item>
        <PlaceHolder/>
      </m-flex-item>
    </m-flex>
    <white-space size="lg"/>
    <m-flex>
      <m-flex-item>
        <PlaceHolder/>
      </m-flex-item>
      <m-flex-item>
        <PlaceHolder/>
      </m-flex-item>
      <m-flex-item>
        <PlaceHolder/>
      </m-flex-item>
      <m-flex-item>
        <PlaceHolder/>
      </m-flex-item>
    </m-flex>
    <m-white-space size="lg"/>
    <div class="sub-title">Wrap</div>
    <m-flex wrap="wrap">
      <place-holder class="inline"/>
      <place-holder class="inline"/>
      <place-holder class="inline"/>
      <place-holder class="inline"/>
      <place-holder class="inline"/>
      <place-holder class="inline"/>
      <place-holder class="inline"/>
    </m-flex>
    <m-white-space size="lg"/>
    <div class="sub-title">Align</div>
    <m-flex justify="center">
      <PlaceHolder class="inline"/>
      <PlaceHolder class="inline"/>
      <PlaceHolder class="inline"/>
    </m-flex>
    <m-white-space/>
    <m-flex justify="end">
      <PlaceHolder class="inline"/>
      <PlaceHolder class="inline"/>
      <PlaceHolder class="inline"/>
    </m-flex>
    <m-white-space/>
    <m-flex justify="between">
      <PlaceHolder class="inline"/>
      <PlaceHolder class="inline"/>
      <PlaceHolder class="inline"/>
    </m-flex>
    <WhiteSpace/>
    <m-flex align="start">
      <PlaceHolder class="inline"/>
      <PlaceHolder class="inline small"/>
      <PlaceHolder class="inline"/>
    </m-flex>
    <m-white-space/>
    <m-flex align="end">
      <PlaceHolder class="inline"/>
      <PlaceHolder class="inline small"/>
      <PlaceHolder class="inline"/>
    </m-flex>
    <m-white-space/>
    <m-flex align="baseline">
      <PlaceHolder class="inline"/>
      <PlaceHolder class="inline small"/>
      <PlaceHolder class="inline"/>
    </m-flex>
  </div>
</template>
<script lang="ts">
  import WhiteSpace from '@/packages/white-space/src';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import PlaceHolder from './place-holder.vue';

  @Component({
    name: 'FlexDemo1',
    components: {
      WhiteSpace,
      PlaceHolder
    }
  })
  export default class FlexDemo1 extends Vue {

  }
</script>
<style>
  .flex-container {
    margin: 0 15px;
  }
  .flex-container .inline {
    width: 80px!important;
    margin: 9px 9px 9px 0;
  }
  .flex-container .small {
    height: 20px!important;
    line-height: 20px!important;
  }
  .sub-title {
    color: #888;
    font-size: 14px;
    padding: 30px 0 18px 0;
  }
  .placeholder {
    background-color: #ebebef;
    color: #bbb;
    text-align: center;
    height: 30px;
    line-height: 30px;
    width: 100%;
  }
</style>
