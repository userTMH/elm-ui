<template>
  <div>
    <m-table border :data="list" :options="options">
      <template #status="{ scope }">
        <el-button
          size="small"
          :type="scope.row.status === 1 ? 'success' : 'warning'"
          plain
        >
          {{ scope.row.status === 1 ? "启用" : "禁用" }}</el-button
        >
      </template>
      <template #action="{ scope }">
        <el-button-group>
          <el-button
            class="is-plain"
            size="small"
            type="primary"
            plain
            @click="edit(scope)"
          >
            修改</el-button
          >
          <el-button
            style="color: #f56c6c; background: #fef0f0; border-color: #fbc4c4"
            size="small"
            type="danger"
            plain
            @click="remove(scope)"
          >
            删除</el-button
          >
        </el-button-group>
      </template>
    </m-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TableOptions } from "../../components/table/src/types";

const options: TableOptions[] = [
  {
    type: "selection",
  },
  {
    label: "规则名称",
    prop: "name",
    align: "left",
  },
  {
    label: "规格值",
    prop: "default",
    align: "left",
  },
  {
    label: "排序",
    prop: "order",
    align: "left",
  },
  {
    label: "状态",
    prop: "status",
    align: "left",
    slot: "status",
  },
  {
    label: "操作",
    align: "left",
    action: true,
  },
];

interface ListType {
  id: number;
  name: string;
  type: number;
  create_time: string;
  update_time: string;
  status: number;
  order: number;
  default: string;
}
const list = ref<ListType[]>([
  {
    id: 209,
    name: "张威",
    type: 2,
    create_time: "2021-04-12 16:52:36",
    update_time: "2021-06-10 19:46:03",
    status: 1,
    order: 22225,
    default: "222222222222",
  },
  {
    id: 208,
    name: "嗡嗡嗡",
    type: 0,
    create_time: "2021-04-12 16:51:47",
    update_time: "2021-06-08 17:04:24",
    status: 1,
    order: 999,
    default: "000000",
  },
  {
    id: 207,
    name: "身高",
    type: 2,
    create_time: "1970-01-01 08:33:41",
    update_time: "2021-03-31 22:11:11",
    status: 0,
    order: 100,
    default: "170,185",
  },
  {
    id: 167,
    name: "今天好气啊111",
    type: 2,
    create_time: "2020-02-25 14:35:03",
    update_time: "2021-04-12 08:10:41",
    status: 1,
    order: 90,
    default: "为什么生气",
  },
  {
    id: 203,
    name: "11111",
    type: 0,
    create_time: "2020-12-07 08:37:30",
    update_time: "2021-04-12 08:10:43",
    status: 1,
    order: 80,
    default: "shengeml'd;as\nshdjkjskdjsal\ndsadsdsa",
  },
  {
    id: 190,
    name: "马冬梅",
    type: 0,
    create_time: "2020-12-03 18:18:59",
    update_time: "2021-06-08 18:21:33",
    status: 1,
    order: 75,
    default: "我是谁",
  },
  {
    id: 192,
    name: "555",
    type: 1,
    create_time: "2020-12-03 18:34:22",
    update_time: "2020-12-12 16:24:16",
    status: 1,
    order: 70,
    default: "少时诵诗书所所所所所所",
  },
  {
    id: 186,
    name: "我没有闪",
    type: 1,
    create_time: "2020-12-03 15:34:48",
    update_time: "2020-12-12 16:24:12",
    status: 1,
    order: 66,
    default: "我大意了",
  },
  {
    id: 166,
    name: "品牌",
    type: 1,
    create_time: "2020-02-25 11:18:45",
    update_time: "2020-12-03 15:30:43",
    status: 1,
    order: 66,
    default: "我大意了",
  },
  {
    id: 189,
    name: "7777",
    type: 2,
    create_time: "2020-12-03 18:11:35",
    update_time: "2021-04-12 08:10:45",
    status: 1,
    order: 65,
    default: "2222222",
  },
]);

const edit = (scope: any) => {
  console.log(scope);
};
const remove = (scope: any) => {
  console.log(scope);
};
</script>

<style scoped lang="scss">
.is-plain {
  color: teal;
  background: #e6f2f2;
  border-color: #9cc;
}
.is-plain:hover {
  background-color: teal;
  color: #fff;
}
</style>
