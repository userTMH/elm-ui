<template>
  <m-form :options="formOptions" :inline="true" >
    <template #action="{form , model}">
      <div style="display: inline-flex;">
        <el-button type="primary">查询</el-button>
        <el-button type="primary">新增角色</el-button>
      </div>
    </template>
  </m-form>
  <m-table
    :data="tableData"
    :options="options"
    v-model:editRowIndex="editRowIndex"
    elementLoadingText="加载中..."
    elementLoadingBackground="rgba(0,0,0,.3)"
    elementLoadingSvgViewBox="-10, -10, 50, 50"
    :elementLoadingSvg="svg"
    @confirm="confirm"
    @cancel="cancel"
    isEditRow
    pagination
    border
    paginationAlign="center"
    :total="total"
    background
    @sizeChange="sizeChange"
    @currentChange="currentChange"
    :currentPage="currentPage"
    :pageSizes="[10, 20, 50, 100]"
    :pageSize="pageSize"
  >
    <template #status="{scope}">
      <el-tag v-if="scope.row.status === true">启用</el-tag>
      <el-tag v-else type="danger">停用</el-tag>
    </template>
    <template #action="{scope}">
      <el-button size="small" text type="primary">
        <el-icon-check style="margin-right: 5px"></el-icon-check>
        分配权限
      </el-button>
      <el-button size="small"  text type="warning">
        <el-icon-edit style="margin-right: 5px"></el-icon-edit>
        修改
      </el-button>
      <el-button size="small"  text type="danger">
        <el-icon-delete style="margin-right: 5px"></el-icon-delete>
        删除
      </el-button>
    </template>
<!--    <template #date="{ scope }">-->
<!--      <el-icon-timer></el-icon-timer>-->
<!--      {{ scope.row.date }}-->
<!--    </template>-->
<!--    <template #name="{ scope }">-->
<!--      <el-popover-->
<!--        placement="top-start"-->
<!--        title="Title"-->
<!--        :width="200"-->
<!--        trigger="hover"-->
<!--        content="this is content, this is content, this is content"-->
<!--      >-->
<!--        <template #reference>-->
<!--          <el-tag>{{ scope.row.name }}</el-tag>-->
<!--        </template>-->
<!--      </el-popover>-->
<!--    </template>-->

<!--    <template #action="{ scope }">-->
<!--      <el-button size="small" type="primary" @click="edit(scope)"-->
<!--        >编辑</el-button-->
<!--      >-->
<!--      <el-button size="small" type="danger" @click="remove(scope)"-->
<!--        >删除</el-button-->
<!--      >-->
<!--    </template>-->

<!--    <template #editRow="{ scope }">-->
<!--      <el-button size="small" type="primary"-->
<!--      >确认</el-button-->
<!--      >-->
<!--      <el-button size="small" type="danger"-->
<!--      >取消</el-button-->
<!--      >-->
<!--    </template>-->
  </m-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TableOptions } from "../../components/table/src/types";
import axios from "axios"
import {FormOptions} from "../../components/form/src/types/types.ts";

const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const initList = async () => {
  const res = await axios({
    url : 'http://vue3.mengxuegu.com/pro-api/system/role/search',
    method : 'POST',
    data : {
      current : currentPage.value,
      size : pageSize.value,
      name : ""
    }
  })

  console.log("res==>", res)
  tableData.value = res.data.data.records
  total.value = res.data.data.total
}

initList()

const sizeChange = (size : number) => {
  pageSize.value = size
  initList()
}

const currentChange = (page : number) => {
  currentPage.value = page
  initList()
}

// 初始化一个变量,用来保存编辑的标识
let editRowIndex = ref<string>("")

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

// 表格数据的ts类型
interface TableData {
  date: string;
  name: string;
  address: string;
}
const tableData = ref<TableData[]>([]);

// 表单配置项
const formOptions : FormOptions[] = [
  {
    label : "角色名称:",
    type : "input",
    placeholder : "请输入角色名称",
    attrs : {
      style : {
        width : "200px"
      }
    }
  }
]

// 表格配置项数据
const options: TableOptions[] = [
  {
    type : "index",
    label : "序号",
    width : "100",
  },
  {
    label: "角色名称",
    prop: "roleName",
    width: "180",
    align: "center",
  },
  {
    label: "角色编码",
    prop: "roleCode",
    align: "center",
  },
  {
    label: "角色状态",
    prop: "status",
    align: "center",
    slot : "status"
  },
  {
    label: "备注",
    prop: "remark",
    align: "center",
  },
  {
    label: "操作",
    align: "center",
    width : "300",
    action: true,
  },
];

// 编辑
const edit = (scope: any) => {
  console.log("edit", scope);
  editRowIndex.value = "edit"
};
// 删除
const remove = (scope: any) => {
  console.log("remove", scope);
};

// 监听勾的方法
const confirm = (scope: any) => {
  console.log("confrim", scope);
};
// 监听叉的方法
const cancel = (scope: any) => {
  console.log("cancel", scope);
};
</script>

<style scoped lang="scss">
svg{
  width: 1.5em;
  height: 1.5em;
}
</style>
