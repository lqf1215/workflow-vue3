<template>
  <div class="add-node-btn-box">
    <AddNodeBtn
      :node="nodeValue"
      @addnode="addnode"
    />
  </div>
</template>
<script>
export default {
  name: "AddNodeBtnBox",
};
</script>
<script setup>
import AddNodeBtn from '@/components/Generator/add-node-btn.vue'
import { ref, defineProps, defineEmits } from "vue";
const emit = defineEmits(["addnode"]); //获取父组件的方法emit

const props = defineProps({
 node: {
      type: Object,
      default: undefined
    }
});

const nodeValue = ref(props.node)

  const  addnode =(node)=> {
      emit('addnode', node)
    };

</script>
