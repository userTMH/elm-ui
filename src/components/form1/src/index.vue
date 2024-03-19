<template>
  <el-form
    v-bind="$attrs"
    :validate-on-rule-change="false"
    v-if="model"
    :model="model"
    :rules="rules"
  >
    <template v-for="(item, index) in FormOptions">
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        v-if="!item.children || !item.children.length"
      >
        <component
          v-bind="item.attrs"
          v-model="model[item.prop]"
          :is="`el-${item.type}`"
        ></component>
      </el-form-item>

      <el-form-item
        :label="item.label"
        :prop="item.prop"
        v-if="item.children && item.children.length"
      >
        <!-- {{ model }} -->
        <component
          v-bind="item.attrs"
          v-model="model[item.prop!]"
          :is="`el-${item.type}`"
        >
          <!-- <template> -->
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :label="child.label"
            :value="child.value"
            v-bind="child.attrs"
            :is="`el-${child.type}`"
          >
            <!-- {{ child }} -->
          </component>
          <!-- </template> -->
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import cloneDeep from "lodash/cloneDeep";

let props = defineProps({
  FormOptions: {
    type: Array,
    default: () => [],
  },
});

// 如何获取绑定输入的数据
let model = ref<any>(null);
let rules = ref<any>(null);

// dom渲染时触发
onMounted(() => {
  if (props.FormOptions && props.FormOptions.length) {
    let m = {};
    let r = {};

    props.FormOptions.map((item) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;
    });
    console.log("r==>", r);

    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
  }
});
</script>

<style scoped lang="scss"></style>
