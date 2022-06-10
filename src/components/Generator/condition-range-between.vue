<template>
  <div class="range-between">
    <span class="range-group">
      <ConditionRangeBetweenNumber :value="num1"  @update:value="num1=$event" />
      <ConditionRangeBetweenSelect :value="val1"  @update:value="val1=$event" />
    </span>
    <span class="range-group-label">{{ data.paramLabel }}</span>
    <span class="range-group">
      <ConditionRangeBetweenSelect :value="val2" @update:value="val2=$event" />
      <ConditionRangeBetweenNumber :value="num2" @update:value="num2=$event" />
    </span>
  </div>
</template>
<script>
export default {
  name: "ConditionRangeBetween",
};
</script>
<script setup>
import ConditionRangeBetweenSelect from '@/components/Generator/condition-range-between-select.vue'
import ConditionRangeBetweenNumber from '@/components/Generator/condition-range-between-number.vue'
import { ref,  defineProps, defineEmits, onMounted,watch,getCurrentInstance } from "vue";


const props = defineProps({
  data: {
      type: Object,
      default: undefined
    }
});

const val1=ref({
        key: '',
        label: ''
      })
      const val2=ref({
        key: '',
        label: ''
      })
      const num1 = ref(undefined);
      const data1 = ref(undefined);
      const num2 = ref(undefined);


watch(
  () => val1.value,
  (newValue, oldValue) => {
      if (newValue.key === 'lt') {
          data1.value.lowerBound = data1.value.lowerBoundEqual
          data1.value.lowerBoundEqual = undefined
        } else {
          data1.value.lowerBoundEqual = data1.value.lowerBound
          data1.value.lowerBound = undefined
        }
        $emit('update:data', data1.value)
  }
);

watch(
  () => val2.value,
  (newValue, oldValue) => {
      if (newValue.key === 'lt') {
          data1.value.upperBound = data1.value.upperBoundEqual
          data1.value.upperBoundEqual = undefined
        } else {
          data1.value.upperBoundEqual = data1.value.upperBound
          data1.value.upperBound = undefined
        }
        $emit('update:data', data1.value)
  }
);
watch(
  () => num1.value,
  (newValue, oldValue) => {
      if (val1.value.key === 'lt') {
          data1.value.lowerBound = newValue
      } else {
        data1.value.lowerBoundEqual = newValue
      }
        $emit('update:data', data1.value)
  }
);
watch(
  () => num2.value,
  (newValue, oldValue) => {
      if (val2.value.key === 'lt') {
          data1.value.upperBound = newValue
      } else {
        data1.value.upperBoundEqual = newValue
      }
        $emit('update:data', data1.value)
  }
);

onMounted(() => {
 data1.value = data
    getVal1()
    getVal2()
    num1.value = data1.value.lowerBound && data1.value.lowerBound !== '' ? data1.value.lowerBound : data1.value.lowerBoundEqual
    num2.value = data1.value.upperBound && data1.value.upperBound !== '' ? data1.value.upperBound : data1.value.upperBoundEqual
});
  const  getVal1 = () => {
      if (data1.value.lowerBound && data1.value.lowerBound !== '') {
        val1.value.key = 'lt'
        val1.value.label = '<'
      } else {
        val1.value.key = 'le'
        val1.value.label = '≤'
      }
    };
   const getVal2 =()=> {
      if (data1.value.upperBound && data1.value.upperBound !== '') {
        val2.value.key = 'lt'
        val2.value.label = '<'
      } else {
        val2.value.key = 'le'
        val2.value.label = '≤'
      }
    }
</script>
