<template>
  <button class="add-branch" @click="addCondition">添加条件</button>
</template>
<script>
export default {
  name: "AddBranch",
};
</script>
<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits(["addCondition"]); //获取父组件的方法emit

const addCondition = () => {
  this.$emit("addCondition");
};
</script>
