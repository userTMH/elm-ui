<template>
  <el-table
      v-bind="$attrs"
    :data="tableData"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-background="elementLoadingBackground"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    @row-click="rowClick"
  >
    <!-- template只渲染非操作项的数据 -->
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
          :label="item.label"
          :align="item.align"
          :width="item.width"
        v-if="item.type === 'selection'"
        type="selection"
      ></el-table-column>
      <el-table-column
          :label="item.label"
          :align="item.align"
          :width="item.width"
        v-else-if="item.type === 'index'"
        type="index"
      ></el-table-column>
      <el-table-column
          :label="item.label"
          :align="item.align"
          :width="item.width"
        v-else-if="item.type === 'expand'"
        type="expand"
      ></el-table-column>
      <!-- 优化之后的 -->
      <el-table-column
        v-else
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
      <!--  点击编辑之后, 切换到编辑行界面-->
          <template v-if="scope.row.rowEdit">
            <el-input v-model="scope.row[item.prop!]"></el-input>
          </template>
      <!--非编辑行界面-->
         <template v-else>
           <!-- 编辑状态 -->
           <template v-if="currentEdit === scope.$index + scope.column.id">
             <div style="display: flex">
               <el-input v-model="scope.row[item.prop!]"></el-input>
               <div>
                 <slot
                     v-if="$slots.cellEdit"
                     name="cellEdit"
                     :scope="scope"
                 ></slot>
                 <div v-else class="action-icon">
                   <el-icon-check
                       @click.stop="check(scope)"
                       class="check"
                   ></el-icon-check>
                   <el-icon-close
                       @click.stop="close(scope)"
                       class="close"
                   ></el-icon-close>
                 </div>
               </div>
             </div>
           </template>
           <!-- 非编辑状态 -->
           <template v-else>
             <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
             <span v-else>{{ scope.row[item.prop!] }}</span>
             <!-- <el-icon-edit
               @click="clickEdit(scope)"
               class="edit"
               v-if="item.editable"
             ></el-icon-edit> -->
             <component
                 @click.stop="clickEdit(scope)"
                 class="edit"
                 v-if="item.editable"
                 :is="`el-icon-${toLine(editIcon)}`"
             ></component>
           </template>
         </template>
        </template>
      </el-table-column>


    </template>

    <!-- 操作项 -->
    <el-table-column
      v-if="actionOptions"
      :label="actionOptions!.label"
      :align="actionOptions!.align"
      :width="actionOptions!.width"
    >
      <template #default="scope">
        <slot v-if="scope.row.rowEdit" name="editRow" :scope="scope" ></slot>
        <slot v-else name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>


  <div class="pagination" v-if="pagination && !isLoading" :style="{'justify-content' :justifyContent }">
    <el-pagination
        v-bind="$attrs"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :layout="layout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, type PropType, onMounted, watch} from "vue";
import type { TableOptions } from "./types";
import { toLine } from "../../../utils";
import cloneDeep from "lodash/cloneDeep";

// 接收父组件传递过来的表单配置项数据
let props = defineProps({
  // 表单配置项数据
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  // 表格数据
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  // 加载文案
  elementLoadingText: {
    type: String,
  },
  // 加载图标名
  elementLoadingSpinner: {
    type: String,
  },
  // 加载背景颜色
  elementLoadingBackground: {
    type: String,
  },
  // 加载图标是svg
  elementLoadingSvg: {
    type: String,
  },
  // 加载团是svg的配置
  elementLoadingSvgViewBox: {
    type: String,
  },
  // 自定义编辑图标
  editIcon: {
    type: String,
    default: "edit",
  },
  // 配置当前行是否可编辑
  isEditRow : {
    type: Boolean,
    default: false
  },
  // 编辑按钮的标识
  editRowIndex : {
    type: String,
    default : ""
  },
  // 是否显示分页 false 不显示 true显示
  pagination: {
    type: Boolean,
    default: false
  },
  // 显示分页的对齐方式
  paginationAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  // 当前是第几页
  currentPage: {
    type: Number,
    default: 1
  },
  // 当前一页多少条数据
  pageSize: {
    type: Number,
    default: 10
  },
  // 显示分页数据多少条的选项
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 40]
  },
  layout : {
    type : String,
    default : 'total, sizes, prev, pager, next, jumper'
  },
  // 数据总条数
  total: {
    type: Number,
    default: 0
  }
});

// 分页的显示位置
const justifyContent = computed(() => {
  // left center right

  // if(position === "left"){
  //   return "flex-start";
  // }else if(position === "center"){
  //   return "center"
  // }else if(position === "right"){
  //   return "flex-end";
  // }

  const position = props.paginationAlign
  const obj = {
    left : 'flex-start',
    center : 'center',
    right : 'flex-end',
  }
  return obj[position]
})

// 定义子传父事件
let emits = defineEmits(["confirm", "cancel", "update:editRowIndex","sizeChange", "currentChange"]);

// 深拷贝表格的数据
let tableData = ref<any[]>(cloneDeep(props.data))

// 定义点击当前行的方法
const rowClick = (row : any, column : any) => {
  // 设置点击操作项进行触发
  if(column.label === actionOptions.value!.label){

    // 点击编辑按钮的时候才能触发
    if(props.isEditRow && props.editRowIndex === 'edit'){
      console.log("row", row)
      // 将点击当前行的状态进行切换 true
      row.rowEdit = !row.rowEdit

      tableData.value.map(item => {
        // 将没有点击的编辑行变成false
        if(row !== item) item.rowEdit = false
      })

      if(!row.rowEdit) emits("update:editRowIndex", "");
    }

  }
}

// 监听表格数据发生变化, 重新添加editRow属性
watch(() => props.data,(val) => {
  if(val){
    tableData.value = cloneDeep(val)
    tableData.value.map(item => {
      item.editRow = false
    })
  }
},{deep : true})

// 页面加载的时候, 给表格的数据添加一个自定义属性, 用来控制当前行的是否是可编辑状态, 如果值为false , 不可编辑 true 编辑
onMounted(() => {
  tableData.value.map(item => {
    item.editRow = false
  })
  console.log("tableData",tableData.value)
})

//  过滤非操作项配置数据
const tableOptions = computed(() => {
  return props.options.filter((item) => !item.action);
});

// 过滤出操作项的配置数据
const actionOptions = computed(() => {
  return props.options.find((item) => item.action);
});

// 定义loading加载状态
const isLoading = computed(() => {
  return !props.data || !props.data.length;
});

// 声明一个变量, 保存当前点击的单元格的标识
let currentEdit = ref<string>("");

// 点击编辑图标事件
const clickEdit = (scope: any) => {
  currentEdit.value = scope.$index + scope.column.id;
};



// 勾的方法
const check = (scope: any) => {
  emits("confirm", scope);
  currentEdit.value = "";
};
// 叉的方法
const close = (scope: any) => {
  emits("cancel", scope);
  currentEdit.value = "";
};

// 改变每页条数的方法
const handleSizeChange = (size : number) => {
  emits("sizeChange",size)
}
// 改变每页页码的方法
const handleCurrentChange = (page : number) => {
  emits("currentChange",page)
}
</script>

<style scoped lang="scss">
.edit {
  width: 1em;
  height: 1em;
  position: relative;
  left: 5px;
  top: 2px;
  cursor: pointer;
}
.action-icon {
  display: flex;
  align-items: center;
  height: 100%;

  svg {
    width: 1em;
    height: 1em;
    margin-left: 8px;
    // position: relative;
    // top: 8px;
    cursor: pointer;
  }

  .check {
    color: red;
  }
  .close {
    color: green;
  }
}

.pagination{
  margin-top: 16px;
  display: flex;
}
</style>
