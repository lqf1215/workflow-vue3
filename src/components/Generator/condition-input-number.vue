<template>
  <div class="ant-input-number" style="width: 50%">
    <div class="ant-input-number-handler-wrap">
      <span class="ant-input-number-handler ant-input-number-handler-up"
        ><i
          aria-label="icon: up"
          class="anticon anticon-up ant-input-number-handler-up-inner"
          ><svg
            viewBox="64 64 896 896"
            focusable="false"
            class=""
            data-icon="up"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 0 0 140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
            /></svg></i></span
      ><span
        unselectable="unselectable"
        role="button"
        aria-label="Decrease Value"
        aria-disabled="false"
        class="ant-input-number-handler ant-input-number-handler-down"
        ><i
          aria-label="icon: down"
          class="anticon anticon-down ant-input-number-handler-down-inner"
          ><svg
            viewBox="64 64 896 896"
            focusable="false"
            class=""
            data-icon="down"
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
    <div class="ant-input-number-input-wrap">
      <input v-model="value1" class="ant-input-number-input" />
    </div>
  </div>
</template>
<script>
export default {
  name: "conditionInputNumber",
};
</script>
<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  watch,
} from "vue";
const emit = defineEmits(["update:value", "update:flowPermission"]); //获取父组件的方法emit

const props = defineProps({
  value: {
    type: Object,
    default: undefined,
  },
});

const value1 = ref(undefined);
watch(
  () => props.value,
  (newValue, oldValue) => {
    value1.value = newValue;
  }
);

watch(
  () => value1.value,
  (newValue, oldValue) => {
    emit("update:value", newValue);
  }
);
</script>
