<template>
  <div class="branch-wrap">
    <div class="branch-box-wrap">
      <BranchBox @addCondition="addCondition" @delNode="delNode">
        <ColBox
          v-for="(item, index) in node.conditionNodes"
          :key="index"
          :node="item"
          :pos="index"
          :total="node.conditionNodes ? node.conditionNodes.length : 0"
          @delConditionNode="deleleConditionNode(item)"
          @addConditionFactor="addConditionFactor"
        />
      </BranchBox>
      <AddNodeBtnBox :node="node" @addnode="addnode" />
    </div>
  </div>
</template>
<script>
export default {
  name: "branchWrap",
};
</script>
<script setup>
import BranchBox from "@/components/Generator/branch-box.vue";
import ColBox from "@/components/Generator/col-box.vue";
import AddNodeBtnBox from "@/components/Generator/add-node-btn-box.vue";
import { delConditionNode, setConditionFactor } from "@/utils/process";

import {
  ref,
  defineProps,
  defineEmits,
} from "vue";

const emit = defineEmits(["addnode", "delNode"]); //获取父组件的方法emit

const props = defineProps({
  node: {
    type: Object,
    default: undefined
  }
});

const addCondition = () => {
  var lastNode = node.conditionNodes[node.conditionNodes.length - 1];
  var name = "条件" + getName(lastNode.name);
  var node = {
    name: name,
    type: "condition",
    prevId: lastNode.prevId,
    nodeId: "" + new Date().getTime(),
  };
  node.conditionNodes.push(node);
};
const getName = (name) => {
  var num = parseInt(name.substring(2));
  return num + 1;
};
const addnode = (node) => {
  emit("addnode", node);
};
const deleleConditionNode = (item) => {
  delConditionNode(item, node);
  if (node.conditionNodes.length < 2) {
    emit("delNode");
  }
};
const delNode = () => {
  emit("delNode");
};
const addConditionFactor = (conditionNode) => {
  setConditionFactor(conditionNode, node);
};
</script>
