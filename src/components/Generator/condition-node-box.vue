<template>
  <div class="condition-node-box">
    <div class="auto-judge node_8f5e_917f">
      <div class="sort-left">&lt;</div>
      <div class="title-wrapper">
        <span style="float: right; color: grey" @click="delConditionNode"
          >X</span
        >
        <span
          class="editable-title"
          data-spm-anchor-id="0.0.0.i35.2f244490ZxXSWD"
          >{{ nodeValue.name }}</span
        >
      </div>
      <div class="content" @click="setProperties">
        <div>{{ text1 }}</div>
      </div>
    </div>
    <AddNodeBtn :node="nodeValue" @addnode="addnode" />
    <AddNodeCondition
      :show="show"
      @update:show="show=$event"
      :properties="nodeValue.properties"
      @on-success="setPropertiesOK"
    />
  </div>
</template>
<script>
export default {
  name: "conditionNodeBox",
};
</script>
<script setup>
import AddNodeBtn from "@/components/Generator/add-node-btn.vue";
import AddNodeCondition from "@/components/Generator/add-node-condition.vue";
const emit = defineEmits(["delConditionNode", "addnode", "addConditionFactor"]); //获取父组件的方法emit

import {
  ref,
  defineProps,
  defineEmits,
  onMounted,
} from "vue";
const props = defineProps({
  text: {
    type: String,
    default: "请设置条件",
  },
  node: {
    type: Object,
    default: undefined,
  },
});

const show = ref(false);
const text1 = ref("");


const nodeValue = ref(props.node)

onMounted(() => {
  text1.value = getText();
  if (!nodeValue.value.properties) {
    nodeValue.value.properties = {
      conditions: [[]],
    };
  }
});
const addnode = () => {
  emit("addnode");
};
const delConditionNode = () => {
  emit("delConditionNode");
};
const setProperties = () => {
  show.value = true;
};
const setPropertiesOK = (properties) => {
  nodeValue.value.properties = properties;
  emit("addConditionFactor", nodeValue.value);
  // text1.set(getText())
  text1.value = getText();
};
const getText = () => {
  var text = "请设置条件";
  if (!nodeValue.value.properties) {
    return text;
  }
  text = "";
  nodeValue.value.properties.conditions[0].forEach((cond) => {
    var temp = "";
    temp += cond.paramLabel;
    switch (cond.key) {
      case "lt":
        temp += "<" + cond.upperBound;
        break;
      case "le":
        temp += "≤" + cond.upperBoundEqual;
        break;
      case "eq":
        temp += "=" + cond.boundEqual;
        break;
      case "gt":
        temp += ">" + cond.lowerBound;
        break;
      case "ge":
        temp += "≥" + cond.lowerBoundEqual;
        break;
      case "between":
        temp = "";
        if (cond.lowerBound && cond.lowerBound !== "") {
          temp = cond.lowerBound + "<";
        } else {
          temp = cond.lowerBoundEqual + "≤";
        }
        temp += cond.paramLabel;
        if (cond.upperBound && cond.upperBound !== "") {
          temp += "<" + cond.upperBound;
        } else {
          temp += "≤" + cond.upperBoundEqual;
        }
        break;
      default:
    }
    temp += " 且 ";
    text += temp;
  });
  text = text.substring(0, text.length - 2);
  return text;
};
</script>
