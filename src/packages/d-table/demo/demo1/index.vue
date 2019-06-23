<template>
  <div>
    <d-table :columns="columns"
             :data-source="[]"/>
    <d-table bordered striped
             :columns="columns"
             :data-source="dataSource"
             :row-key="rowKey">
      <template slot="opts"
                slot-scope="record">
        <div>{{record}}</div>
      </template>
    </d-table>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DTable from '../../index';

  Vue.use(DTable);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public columns = [{title: '序号', dataType: 'index'}, {
      title: '标题',
      dataIndex: 'title'
    }, {
      title: '数量',
      dataType: 'number',
      dataIndex: 'count'
    }, {
      title: '时间',
      dataIndex: 'time',
      dataType: 'date'
    }, {
      title: '操作',
      scopedSlots: {
        customRender: 'opts'
      }
    }];

    public dataSource = [];

    public created() {
      for (let i = 0; i < 30; i++) {
        this.dataSource.push({
          title: '列' + i,
          count: i + 10,
          time: new Date()
        });
      }
    }

    public rowKey(row) {
      return row.title;
    }
  }
</script>
