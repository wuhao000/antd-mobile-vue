<template>
  <div>
    <m-chart :data="data"
             :width="400">
      <m-chart-scale x
                     field="year"/>
      <m-chart-scale y
                     field="value"
                     :min="0"
                     :tick-count="5"/>
      <m-chart-area series-field="country"
                    shape="smooth"/>
      <m-chart-line series-field="country"
                    shape="smooth"/>
      <m-chart-tooltip show-value-in-legend/>
      <m-chart-axis y
                    :label="labelFormat"/>
    </m-chart>
  </div>
</template>
<script lang="ts">
  import data from './area_compare.json';

  export default {
    name: 'Demo6Index',
    data() {
      return {
        labelFormat: (text) => {
          return {
            text: text / 1000 + 'k'
          };
        },
        data
      };
    }
  };
</script>
