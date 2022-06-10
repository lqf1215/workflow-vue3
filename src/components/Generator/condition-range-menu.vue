<template>
  <div style="position: absolute; top: 0px; left: 0px; width: 100%">
    <div v-if="show">
      <div
        class="ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft"
        style="width: 150px; left: 1%; top: 30px"
      >
        <div
          id="03450996-9dae-41a7-e523-76744d26b0fe"
          style="overflow: auto; transform: translateZ(0px)"
        >
          <ul
            role="listbox"
            class="ant-select-dropdown-menu ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical"
            tabindex="0"
          >
            <li
              v-for="(item, index) in items1"
              :key="index"
              role="option"
              unselectable="on"
              :class="[
                item.label === value1.label
                  ? 'ant-select-dropdown-menu-item ant-select-dropdown-menu-item-selected'
                  : 'ant-select-dropdown-menu-item',
              ]"
              aria-selected="false"
              style="user-select: none"
              @click="click(item)"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ConditionRangeMenu",
};
</script>
<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  onMounted,
  watch,
} from "vue";
const emit = defineEmits(["update:show", "update:value"]); //获取父组件的方法emit

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Object,
    default: undefined,
  },
  items: {
    type: Array,
    default: undefined,
  },
});

const show1 = ref(false);
const value1 = ref({
  key: "",
  label: "",
});

const itemsValue =ref(props.props)

const items1 = ref([
  { key: "1", label: "选择1", value: "" },
  { key: "2", label: "选项2", value: "" },
]);

watch(
  () => props.show,
  (newValue, oldValue) => {
    show1.value = val;
  }
);

watch(
  () => show1.value,
  (newValue, oldValue) => {
    emit("update:show", newValue);
  }
);
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

onMounted(() => {
  if (itemsValue.value) items1.value = itemsValue.value;
});

const click = (item) => {
  value1.value = item;
  show1.value = false;
};
</script>
