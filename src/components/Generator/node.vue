<template>
  <div>
    <NodeWrap
      v-if="
        nodeValue.type == 'start' ||
        nodeValue.type == 'approver' ||
        nodeValue.type == 'notifier'
      "
      :node="nodeValue"
      @addnode="addnode"
      @delNode="delNode"
    />
    <ConditionNode
      v-if="node.type == 'condition'"
      :node="nodeValue"
      @update:node="nodeValue = $event"
      @addnode="addnode"
      @delConditionNode="delConditionNode"
      @addConditionFactor="addConditionFactor"
    />
    <BranchWrap
      v-if="nodeValue.type == 'route'"
      :node="nodeValue"
      @addnode="addnode"
      @delNode="delNode"
    />
  </div>
</template>
<script>
export default {
  name: "node",
};
</script>
<script setup>
import NodeWrap from "@/components/Generator/node-wrap.vue";
import ConditionNode from "@/components/Generator/condition-node.vue";
import BranchWrap from "@/components/Generator/branch-wrap.vue";

import { ref, defineProps, watch, } from "vue";
const emit = defineEmits([
  "addConditionFactor",
  "addnode",
  "delNode",
  "delConditionNode",
]); //获取父组件的方法emit
const props = defineProps({
  node: {
    type: Object,
    default: undefined,
  },
});

const nodeValue = ref(props.node);
watch(
  () => props.node,
  (newValue, oldValue) => {
   nodeValue.value = newValue
  }
);
const addnode = (node) => {
  emit("addnode", node);
};
const delNode = () => {
  emit("delNode");
};
const delConditionNode = () => {
  emit("delConditionNode");
};
const addConditionFactor = (node) => {
  emit("addConditionFactor", node);
  nodeValue.value = node;
};
</script>
