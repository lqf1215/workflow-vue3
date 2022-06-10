<template>
  <AModal :dialog="dialog1"  @update:dialog="dialog1=$event" @close="cancel">
    <div class="panel-approver">
      <div class="common-group approver-type-wrapper">
        <div class="group-title">选择审批对象</div>
        <div class="group-content">
          <div>
            <div class="ant-radio-group ant-radio-group-outline">
              <label
                v-for="(a, index) in approvers"
                :key="index"
                :class="[
                  currentApp === a.value
                    ? 'ant-radio-wrapper ant-radio-wrapper-checked'
                    : 'ant-radio-wrapper',
                ]"
                @click="setApprover(a)"
              >
                <span
                  :class="[
                    currentApp === a.value
                      ? 'ant-radio ant-radio-checked'
                      : 'ant-radio',
                  ]"
                >
                  <input
                    type="radio"
                    class="ant-radio-input"
                    :value="a.value" /><span class="ant-radio-inner"
                /></span>
                <span>{{ a.label }}</span>
              </label>
            </div>
          </div>
          <div
            v-if="currentApp === 'target_label' && !showAddRole"
            class="approver-actions"
          >
            <button
              type="button"
              class="ant-btn ant-btn-primary"
              ant-click-animating-without-extra-node="false"
              @click="addRole"
            >
              <i
                aria-label="icon: plus"
                class="anticon anticon-plus"
                style="color: rgb(255, 255, 255)"
                ><svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  class=""
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"
                  />
                  <path
                    d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"
                  /></svg></i
              ><span>添加角色</span>
            </button>
          </div>
          <div
            v-if="showAddRole"
            class="ant-row-flex ant-row-flex-space-around ant-row-flex-middle condition-group"
          >
            角色名&nbsp;&nbsp;
            <div class="ant-select ant-select-enabled" style="min-width: 150px">
              <div class="ant-input-number-input-wrap">
                <input
                  v-model="properties1.actionerRules[0].labelNames"
                  class="ant-input-number-input"
                  placeholder="输入角色名"
                />
              </div>
            </div>
          </div>
          <div
            v-if="currentApp === 'target_management'"
            class="approver-actions"
          >
            发起人的&nbsp;&nbsp;
            <div class="ant-select ant-select-enabled" style="min-width: 150px">
              <div
                class="ant-select-selection ant-select-selection--single"
                aria-expanded="false"
                tabindex="0"
              >
                <div
                  class="ant-select-selection__rendered"
                  data-spm-anchor-id="0.0.0.i263.2f244490UdKR44"
                >
                  <div
                    class="ant-select-selection-selected-value"
                    title="直接主管"
                    style="display: block; opacity: 1"
                    data-spm-anchor-id="0.0.0.i265.2f244490UdKR44"
                  >
                    直接主管
                  </div>
                </div>
              </div>
            </div>
            <div class="area-auto-up" />
          </div>
        </div>
      </div>
      <div class="common-group area-act-type-wrapper">
        <div class="group-title">
          <div>多人审批时采用的审批方式</div>
        </div>
        <div class="group-content">
          <div class="ant-radio-group ant-radio-group-outline">
            <label
              v-for="(a, i) in actTypes"
              :key="i"
              :class="[
                currentAction === a.value
                  ? 'ant-radio-wrapper ant-radio-wrapper-checked'
                  : 'ant-radio-wrapper',
              ]"
              @click="setAction(a)"
            >
              <span
                :class="[
                  currentAction === a.value
                    ? 'ant-radio ant-radio-checked'
                    : 'ant-radio',
                ]"
              >
                <input
                  type="radio"
                  class="ant-radio-input"
                  :value="a.value" /><span class="ant-radio-inner"
              /></span>
              <span>{{ a.label }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="common-group none-actioner-wrapper">
        <button type="button" class="ant-btn ant-btn-default" @click="cancel">
          <span>取 消</span></button
        ><button type="button" class="ant-btn ant-btn-primary" @click="save">
          <span>保 存</span>
        </button>
      </div>
      <div class="common-group none-actioner-wrapper">
        {{ properties1 }}
      </div>
    </div>
  </AModal>
</template>
<script>
export default {
  name: "addNodeApprover",
};
</script>
<script setup>
import AModal from "@/components/AModal/AModal.vue";
import {
  ref,
  defineProps,
  defineEmits,
  onMounted,
  watch,
} from "vue";

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  properties: {
    type: Object,
    default: undefined,
  },
});
const emit = defineEmits(["update:dialog", "setProperties"]); //获取父组件的方法emit

const dialog1 = ref(false);
const showAddRole = ref(false);
const currentApp = ref("target_management");
const currentAction = ref("or");
const temp = ref({});
const approvers = ref([
  { label: "主管", value: "target_management", color: "red" },
  { label: "角色", value: "target_label", color: "green" },
]);
const actTypes = ref([
  { label: "或签（一名审批人同意或拒绝即可）", value: "or", color: "red" },
  { label: "会签（须所有审批人同意）", value: "and", color: "green" },
]);
const properties1 = ref({
  actionerRules: [
    {
      type: "target_management",
      level: 1,
      isEmpty: false,
      autoUp: true,
      actType: "or",
    },
  ],
});
watch(
  () => props.dialog,
  (newValue, oldValue) => {
    dialog1.value = newValue;
  }
);

watch(
  () => dialog1.value,
  (newValue, oldValue) => {
    emit("update:dialog", newValue);
  }
);
const propertiesValue = ref(props.properties)
onMounted(() => {
  properties1.value = propertiesValue.value;
  init();
  Object.assign(temp.value,  properties1.value);
});

const init = () => {
   properties1.value =  properties1.value
    ?  properties1.value
    : {
        actionerRules: [
          {
            type: "target_management",
            level: 1,
            isEmpty: false,
            autoUp: true,
            actType: "or",
          },
        ],
      };
  var rule =  properties1.value.actionerRules &&  properties1.value.actionerRules[0];
  if (rule) {
    currentApp.value = rule.type;
    currentAction.value = rule.actType;
    if (rule.labelNames) showAddRole.value = true;
  }
};
const save = () => {
  var rule =  properties1.value.actionerRules[0];
  switch (rule.type) {
    case "target_label":
      if (!rule.labelNames || rule.labelNames === "") {
        alert("角色不能为空");
        return;
      }
      break;
  }
  dialog1.value = false;
  Object.assign(temp.value,  properties1.value);
  emit("setProperties",  properties1.value);
};
const cancel = () => {
  dialog1.value = false;
   properties1.value = {};
  Object.assign( properties1.value, temp.value);
  init();
  emit("setProperties",  properties1.value);
};
const setApprover = (app) => {
   currentApp.value = app.value;
  if (app.value === "target_label") {
  } else {
    showAddRole.value = false;
  }
   properties1.value.actionerRules = [];
  switch (app.value) {
    case "target_management":
       properties1.value.actionerRules.push({
        type: "target_management",
        level: 1,
        isEmpty: false,
        autoUp: true,
      });
      break;
    case "target_label":
       properties1.value.actionerRules.push({
        type: "target_label",
        labelNames: "",
        labels: "",
        isEmpty: false,
        memberCount: 1,
        actType: "or",
      });
      break;
    default:
  }
};
const setAction = (act) => {
  currentAction.value = act.value;
   properties1.value.actionerRules[0].actType = act.value;
};
const addRole = () => {
  showAddRole.value = true;
};
</script>
