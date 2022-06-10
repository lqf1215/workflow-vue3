<template>
  <div
    class="ant-row-flex ant-row-flex-space-around ant-row-flex-middle condition-group"
  >
    <div class="ant-col ant-col-4 group-title">
      <span>参数 {{ pos + 1 }}</span>
    </div>
    <div class="ant-col ant-col-17">
      <div>
        <div class="condition-panel-range-set">
          <div class="ant-input-number" style="width: 50%">
            <div class="ant-input-number-input-wrap">
              <input
                v-model="data1.paramKey"
                class="ant-input-number-input"
                placeholder="请输入key,如: day"
              />
            </div>
          </div>
          <div class="ant-input-number" style="width: 50%">
            <div class="ant-input-number-input-wrap">
              <input
                v-model="data1.paramLabel"
                class="ant-input-number-input"
                placeholder="请输入label,如: 请假天数"
              />
            </div>
          </div>
        </div>
        <div class="condition-panel-range-set">
          <ConditionRange
            :name="data1.key"
            @update:name="data1.key=$event"
            :label="data1.label"
            @update:label="data1.label=$event"
            :items="items"
          />
          <ConditionInputNumber
            v-if="data1.key !== 'between'"
            :value="inputVal"
            @update:value="inputVal=$event"
          />
          <ConditionRangeBetween
            v-if="data1.key === 'between'"
            :data="data1"
            @update:data="data1=$event"
          />
        </div>
      </div>
    </div>
    <div class="ant-col ant-col-1 group-delete" @click="del">
      <i
        aria-label="icon: delete"
        class="anticon anticon-delete"
        style="color: rgba(25, 31, 37, 0.56); font-size: 13px"
        ><svg
          viewBox="64 64 896 896"
          focusable="false"
          class=""
          data-icon="delete"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
          /></svg
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "conditionGroup",
};
</script>
<script setup>
import ConditionRange from "@/components/Generator/condition-range.vue";
import ConditionInputNumber from "@/components/Generator/condition-input-number.vue";
import ConditionRangeBetween from "@/components/Generator/condition-range-between.vue";
import {
  ref,
  reactive,
  defineProps,
  defineEmits,
  onMounted,
  watch,
  getCurrentInstance,
} from "vue";
const emit = defineEmits(["update:data"]); //获取父组件的方法emit

const props = defineProps({
  data: {
    type: Object,
    default: undefined,
  },
  pos: {
    type: Number,
    default: undefined,
  },
});

const inputVal = ref(undefined);
const data1 = ref({
  paramKey: "",
  paramLabel: "",
});
const items = reactive([
  { key: "lt", label: "小于", value: "upperBound" },
  { key: "le", label: "小于等于", value: "upperBoundEqual" },
  { key: "eq", label: "等于", value: "boundEqual" },
  { key: "gt", label: "大于", value: "lowerBound" },
  { key: "ge", label: "大于等于", value: "lowerBoundEqual" },
  { key: "between", label: "介于(两个数之间)", value: "" },
]);
const key = computed(() => {
  return data1.value.key;
});

watch(
  () => props.data,
  (newValue, oldValue) => {
    data1.value = newValue;
  }
);

watch(
  () => data1.value,
  (newValue, oldValue) => {
    emit("update:data", newValue);
  }
);

watch(
  () => key,
  (newValue, oldValue) => {
    // 监测key,变化之后要重新赋值
    if (oldValue === undefined) return;
    data1.value.upperBound = "";
    data1.value.upperBoundEqual = "";
    data1.value.boundEqual = "";
    data1.value.lowerBound = "";
    data1.value.lowerBoundEqual = "";
    inputVal.value = undefined;
  }
);

watch(
  () => inputVal.value,
  (newValue, oldValue) => {
    // 监测key,变化之后要重新赋值
    if (!newValue) return;
    var key = data1.value.key;
    if (!key) {
      alert("先设置操作符");
      return;
    }
    switch (key) {
      case "lt":
        data1.value.upperBound = newValue;
        break;
      case "le":
        data1.value.upperBoundEqual = newValue;
        break;
      case "eq":
        data1.value.boundEqual = newValue;
        break;
      case "gt":
        data1.value.lowerBound = newValue;
        break;
      case "ge":
        data1.value.lowerBoundEqual = newValue;
        break;
      case "between":
        data1.value.boundEqual = newValue;
        break;
      default:
    }
  }
);

onMounted(() => {
  data1.value = data;
  setValue(data1.value);
});

const del = () => {
  emit("del");
};
const setValue = (val) => {
  if (!val) return;
  if (val.key && val.key !== "") {
    switch (val.key) {
      case "lt":
        inputVal.value = val.upperBound;
        val.label = "小于";
        break;
      case "le":
        inputVal.value = val.upperBoundEqual;
        val.label = "小于等于";
        break;
      case "eq":
        inputVal.value = val.boundEqual;
        val.label = "等于";
        break;
      case "gt":
        inputVal.value = val.lowerBound;
        val.label = "大于";
        break;
      case "ge":
        inputVal.value = val.lowerBoundEqual;
        val.label = "大于等于";
        break;
      case "between":
        val.label = "介于(两个数之间)";
        break;
      default:
    }
  } else {
    if (val.lowerBound && val.lowerBound !== "") {
      val.key = "gt";
      inputVal.value = val.lowerBound;
      val.label = "大于";
    }
    if (val.upperBound && val.upperBound !== "") {
      val.key = "lt";
      inputVal.value = val.upperBound;
      val.label = "小于";
    }
  }
};
</script>
