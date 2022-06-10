<template>
  <div class="node-wrap">
    <NodeWrapBox :node="node" @delNode="delNode" />
    <AddNodeBtnBox :node="node" @addnode="addnode" />
  </div>
</template>
<script>
export default {
  name: "nodeWrap",
};
</script>
<script setup>
import NodeWrapBox from   "@/components/Generator/node-wrap-box.vue";
import AddNodeBtnBox from "@/components/Generator/add-node-btn-box.vue";
import { ref,  defineProps } from "vue";
const emit = defineEmits(["addnode", "delNode"]); //获取父组件的方法emit
const props = defineProps({
  node: {
    type: Object,
    default: undefined,
  },
});

const nodeValue = ref(props.node);

const addnode = (node) => {
  emit("addnode", node);
};
const delNode = () => {
  emit("delNode");
};
</script>
