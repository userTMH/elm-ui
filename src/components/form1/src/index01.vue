<template>
  <!-- <el-form>
    <template v-for="(item, index) in FormOptions">
      <el-form-item
        v-if="item.type === 'input'"
        :key="index"
        :label="item.label"
      >
        <el-input :placeholder="item.placeholder" />
      </el-form-item>
      <el-form-item
        v-else-if="
          item.type === 'select' && item.children && item.children.length > 0
        "
        :label="item.label"
      >
        <el-select>
          <el-option
            v-for="(child, i) in item.children"
            :label="child.label"
            :value="child.value"
            :key="i"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-else-if="
          item.type === 'radio-group' &&
          item.children &&
          item.children.length > 0
        "
        :label="item.label"
      >
        <el-radio-group>
          <el-radio
            v-for="(child, i) in item.children"
            :label="child.label"
            :value="child.value"
            :key="i"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
  </el-form> -->
</template>

<script lang="ts" setup>
defineProps({
  FormOptions: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="scss"></style>
