<template>
  <div class="branch-box">
    <AddBranch @addCondition="addCondition" />
    <slot>branch-box</slot>
  </div>
</template>
<script>
export default {
  name: "BranchBox",
};
</script>
<script setup>
import AddBranch from '@/components/Generator/add-branch.vue'

import { defineEmits, } from "vue";
const emit = defineEmits(["addCondition", "delNode"]); //获取父组件的方法emit

 const addCondition =()=> {
      emit('addCondition')
    };
  const  delNode  =()=>  {
      emit('delNode')
    };

</script>
