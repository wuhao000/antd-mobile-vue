<template>
  <div>
    <m-chart :data="data"
             :width="400">
      <m-chart-scale y
                     :options="yOptions"/>
      <m-chart-tooltip disabled/>
      <m-chart-pie series-field="name"
                   :radius="0.85"/>
      <m-chart-legend :options="legendOptions"/>
    </m-chart>
  </div>
</template>
<script lang="ts">
  const map = {
    '芳华': '40%',
    '妖猫传': '20%',
    '机器之血': '18%',
    '心理罪': '15%',
    '寻梦环游记': '5%',
    '其他': '2%'
  };

  export default {
    name: 'Demo5Index',
    data() {
      return {
        legendOptions: {
          position: 'right',
          itemFormatter(val) {
            return val + '  ' + map[val];
          }
        },
        yOptions: {
          formatter(val) {
            return val * 100 + '%';
          }
        },
        map,
        data: [
          {name: '芳华', percent: 0.4, a: '1'},
          {name: '妖猫传', percent: 0.2, a: '1'},
          {name: '机器之血', percent: 0.18, a: '1'},
          {name: '心理罪', percent: 0.15, a: '1'},
          {name: '寻梦环游记', percent: 0.05, a: '1'},
          {name: '其他', percent: 0.02, a: '1'}
        ]
      };
    }
  };
</script>

