<template>
  <div class="add-node-btn">
    <button class="btn" type="button" @click="click">
      <span class="iconfont"
        ><svg
          viewBox="64 64 896 896"
          focusable="false"
          class=""
          data-icon="close"
          width="1em"
          height="1em"
          fill="currentColor"
        >
          <path
            d="M810.666667 554.666667h-256v256h-85.333334v-256H213.333333v-85.333334h256V213.333333h85.333334v256h256v85.333334z"
          /></svg
      ></span>
    </button>
    <AddNodeDialog :dialog="dialogValue"  @update:dialog="dialogValue=$event" :node="node" @addnode="addnode" />
  </div>
</template>
<script>
export default {
  name: "AddNodeBtn",
};
</script>
<script setup>
import AddNodeDialog from "@/components/Generator/add-node-dialog.vue";

import { ref, defineProps, defineEmits } from "vue";
const emit = defineEmits(["addnode"]); //获取父组件的方法emit

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
const dialogValue = ref(false);

const click = () => {
  dialogValue.value = true;
};
</script>
