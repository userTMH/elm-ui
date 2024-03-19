<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>

  <div class="m-choose-icon-dialog-body-height">
    <el-dialog :title="title" v-model="dialogVisible">
      <div class="container">
        <div
          class="item"
          v-for="(item, index) in Object.keys(ElementPlusIconsVue)"
          :key="index"
          @click="clickItem(item)"
        >
          <div class="icon">
            <component :is="`el-icon-${toLine(item)}`"></component>
          </div>
          <div class="text">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from "vue";

// 导入所有element plus icon图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { toLine } from "../../../utils";
import { useCopy } from "../../../hooks/useCopy";
// console.log("ElementPlusIconsVue", Object.keys(ElementPlusIconsVue));

// 接受父组件传递的数据
const props = defineProps<{
  // 标题
  title: string;
  // 是否显示弹窗
  visible: boolean;
}>();

// 拷贝visible
const dialogVisible = ref<boolean>(props.visible);

// 子传父
const emits = defineEmits(["update:visible"]);

// 开启或者关闭弹窗方法
const handleClick = () => {
  emits("update:visible", !props.visible);
};

// 点击复制
const clickItem = (item: string) => {
  // 转化图标名称
  const text = `<el-icon-${toLine(item)} />`;

  // 进行拷贝
  useCopy(text);

  // 关闭弹窗
  dialogVisible.value = false;
};

// 监听visible的变化, 只能监听第一次的变化
watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  }
);

// 监听组件内部dialogVisible的变化
watch(
  () => dialogVisible.value,
  (val) => {
    emits("update:visible", val);
  }
);
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.item {
  width: 25%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  height: 60px;
}
.text {
  font-size: 14px;
}
.icon {
  flex: 1;
}
svg {
  width: 2em;
  height: 2em;
}
</style>
