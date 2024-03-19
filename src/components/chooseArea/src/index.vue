<template>
  <div style="display: flex">
    <el-select clearable placeholder="请选择省份" v-model="province">
      <el-option
        v-for="item in areas"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      ></el-option>
    </el-select>
    <el-select
      clearable
      :disabled="!province"
      placeholder="请选择城市"
      v-model="city"
    >
      <el-option
        v-for="item in selectCity"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      ></el-option>
    </el-select>
    <el-select
      clearable
      :disabled="!province || !city"
      placeholder="请选择区域"
      v-model="area"
    >
      <el-option
        v-for="item in selectArea"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      ></el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import AllAreas from "../lib/pca-code.json";
import type { AreaItem, Data } from "./types";

// 响应式的省市区的数据
const areas = ref<AreaItem[]>(AllAreas);

// 省
const province = ref<string>("");

// 市
const city = ref<string>("");

// 区
const area = ref<string>("");

// 保存城市的数据列表 城市下拉框的所有的值
const selectCity = ref<AreaItem[]>([]);

// 保存区(显)的数据列表 区(县)下拉框的所有的值
const selectArea = ref<AreaItem[]>([]);

// 监听选择省份
watch(
  () => province.value,
  (val: string) => {
    if (val) {
      // 匹配出所选择省份下的市区数据列表
      selectCity.value = areas.value.find(
        (item) => item.code === province.value
      )!.children!;
    }

    // 市 和 区的数据清空
    city.value = "";
    area.value = "";
  }
);

// 监听选择城市
watch(
  () => city.value,
  (val: string) => {
    if (val) {
      selectArea.value = selectCity.value.find(
        (item) => item.code === city.value
      )!.children!;
    }
    // 区的数据清空
    area.value = "";
  }
);

// 定义子传父
const emits = defineEmits(["change"]);

// 监听区(县)数据
watch(
  () => area.value,
  (val: string) => {
    if (val) {
      // 先获取省的数据
      const provinceData: Data = {
        code: province.value,
        name:
          province.value &&
          areas.value.find((item) => item.code === province.value)!.name!,
      };

      // 再获取市的数据
      const cityData: Data = {
        code: city.value,
        name:
          city.value &&
          selectCity.value.find((item) => item.code === city.value)!.name!,
      };

      // 再获取区的数据
      const areaData: Data = {
        code: area.value,
        name:
          area.value &&
          selectArea.value.find((item) => item.code === area.value)!.name!,
      };

      // 将选择省市区子数据传递给父组件
      emits("change", {
        province: provinceData,
        city: cityData,
        area: areaData,
      });
    }
  }
);

// 1. 省份 或者 市 数据切换的时候, 对应的下级数据重置为空
// 2. 点击清空按钮, 实现数据清空
// 3. 将选择省市区数据传递给父组件
</script>

<style scoped lang="scss"></style>
