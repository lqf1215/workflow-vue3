<template>
  <div class="condition-node">
    <ConditionNodeBox
      :node="nodeValue"
      @addnode="addnode"
      @delConditionNode="delConditionNode"
      @addConditionFactor="addConditionFactor"
      @updateCondition="updateCondition"
    />
  </div>
</template>
<script>
export default {
  name: "ConditionNode",
};
</script>
<script setup>
import ConditionNodeBox from "@/components/Generator/condition-node-box.vue";

import { ref,  defineProps, defineEmits, onMounted, watch } from "vue";
const emit = defineEmits([
  "addnode",
  "delConditionNode",
  "addConditionFactor",
  "updateCondition",
]); //获取父组件的方法emit

const props = defineProps({
  value: {
    type: Number,
    default: 1,
  },
  text: {
    type: String,
    default: "请设置条件",
  },
  node: {
    type: Object,
    default: undefined,
  },
});

const nodeValue = ref(props.node);

const addnode = (node) => {
  emit("addnode", node);
};
const delConditionNode = () => {
  emit("delConditionNode");
};
const addConditionFactor = (node) => {
  emit("addConditionFactor", node);
};
const updateCondition = (node) => {
  emit("updateCondition", node);
};
</script>
