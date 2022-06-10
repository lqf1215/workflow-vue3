<template>
  <div class="col-box">
    <div v-if="pos == 0" class="top-left-cover-line" />
    <div v-if="pos == 0" class="bottom-left-cover-line" />
    <div v-if="pos == total - 1" class="top-right-cover-line" />
    <div v-if="pos == total - 1" class="bottom-right-cover-line" />
    <Node
      v-for="(item, index) in items"
      :key="index"
      :node="item"
      @addnode="addnode"
      @delNode="deleleNode(item)"
      @delConditionNode="delConditionNode"
      @addConditionFactor="addConditionFactor"
    />
  </div>
</template>
<script>
export default {
  name: "ColBox",
};
</script>
<script setup>
import { iteratorData, addNewNode, delNode } from "@/utils/process";

import { ref,  defineProps, defineEmits } from "vue";

const emit = defineEmits(["delConditionNode", "addConditionFactor"]); //获取父组件的方法emit

const props = defineProps({
  node: {
    type: Object,
    default: undefined,
  },
  total: {
    type: Number,
    default: 0,
  },
  pos: {
    type: Number,
    default: 0,
  },
});

const items = ref([]);
const node1 = ref(null);
watch(
  () => props.node,
  (newValue, oldValue) => {
    if (newValue) {
      getData(newValue);
      node1.value = newValue;
    }
  }
);
onMounted(() => {
  if (props.node) {
    getData(props.node);
    node1.value = props.node;
  }
});

const getData = (data) => {
  items.value = [];
  iteratorData(items.value, data);
};
const addnode = (node) => {
  // console.log(node1)
  addNewNode(node, node1.value, items.value);
};
const deleleNode = (node) => {
  delNode(node, node1.value, items.value);
};
const delConditionNode = () => {
  emit("delConditionNode");
};
const addConditionFactor = (node) => {
  emit("addConditionFactor", node);
};
</script>
