<template>
  <div
    :class="[
      value1.key === 'between'
        ? 'range-select-type between ant-select ant-select-enabled'
        : 'range-select-type ant-select ant-select-enabled',
    ]"
  >
    <div
      class="ant-select-selection ant-select-selection--single"
      @click="show = !show"
    >
      <div class="ant-select-selection__rendered">
        <div
          class="ant-select-selection-selected-value"
          style="display: block; opacity: 1"
        >
          {{ value1.label }}
        </div>
      </div>
      <span class="ant-select-arrow" unselectable="on" style="user-select: none"
        ><i
          aria-label="icon: down"
          class="anticon anticon-down ant-select-arrow-icon"
          ><svg
            viewBox="64 64 896 896"
            focusable="false"
            class=""
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
            /></svg></i
      ></span>
    </div>
    <ConditionRangeMenu
      :show="show"
      :value="value1"
      @update:show="show = $event"
      @update:value="value1 = $event"
      :items="items"
    />
  </div>
</template>
<script>
export default {
  name: "ConditionRangeMenu",
};
</script>
<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
const emit = defineEmits(["update:value", "update:name", "update:label"]); //获取父组件的方法emit
import ConditionRangeMenu from "@/components/Generator/condition-range-menu.vue";
const props = defineProps({
  value: {
    type: Object,
    default: undefined,
  },
  name: {
    type: String,
    default: undefined,
  },
  label: {
    type: String,
    default: undefined,
  },
  items: {
    type: Array,
    default: undefined,
  },
});

const show = ref(false);
const value1 = ref({
  key: "",
  label: "",
});
watch(
  () => props.value,
  (newValue, oldValue) => {
    value1.value = newValue;
  }
);
watch(
  () => props.name,
  (newValue, oldValue) => {
    value1.value.key = newValue;
  }
);
watch(
  () => props.label,
  (newValue, oldValue) => {
    value1.value.label = newValue;
  }
);

watch(
  () => value1.value,
  (newValue, oldValue) => {
    emit("update:value", newValue);
    emit("update:name", newValue.key);
    emit("update:label", newValue.label);
  }
);
</script>
