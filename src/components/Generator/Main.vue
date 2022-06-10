<template>
  <div>
    <div class="fd-nav">
     	<div class="fd-nav-left">
				<div class="fd-nav-back" @click="toReturn"><i class="anticon anticon-left"></i></div>
				<div class="fd-nav-title">{{data1.title}}</div>
			</div>
      <div class="fd-nav-center">
        <div class="fd-nav-container">
          <div class="fd-nav-item">
            <span class="order-num">1</span>流程设计
          </div>
        </div>
      </div>
      <div class="fd-nav-right">
        <button type="button" class="ant-btn button-preview" @click="preview">
          <span>预 览</span>
        </button>
        <button type="button" class="ant-btn button-preview" @click="save">
          <span>发 布</span>
        </button>
      </div>
    </div>
    <div class="fd-nav-content">
      <div class="dingflow-design">
     	<div class="zoom">
					<div :class="'zoom-out'+ (nowVal==50?' disabled':'')" @click="zoomSize(1)"></div>
					<span>{{nowVal}}%</span>
					<div :class="'zoom-in'+ (nowVal==300?' disabled':'')" @click="zoomSize(2)"></div>
				</div>
        <div class="ie-polyfill-container">
          <div
          class="box-scale"
          id="box-scale"
          :style="
            'transform: scale(' +
            nowVal / 100 +
            '); transform-origin: 50% 0px 0px;'
          "
        >
            <Node
              v-for="(item, index) in items"
              :key="index"
              :node="item"
              @addnode="addnode"
              @delNode="deleleNode(item)"
            />
            <EndNode />
            <AModal :dialog="viewModal" @update:dialog="viewModal=$event">
              <pre
                style="
                  font-family: Monaco, Menlo, Consolas, Bitstream Vera Sans Mono,
                    monospace;
                  font-size: 14px;
                "
                >{{ JSON.stringify(data1.node, null, 4) }}</pre
              >
            </AModal>
            <ErrorsModal :dialog="errorsModalValue" @update:dialog="errorsModalValue=$event" :data="errorsValue" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "WorkflowUi",
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
const emit = defineEmits(["ok"]); //获取父组件的方法emit

import AModal from "@/components/AModal/AModal.vue";
import EndNode from "@/components/Generator/end-node.vue";
import ErrorsModal from "@/components/Generator/errors-modal.vue";
import { iteratorData, addNewNode, delNode, checkData } from "@/utils/process";

const props = defineProps({
  data: {
    type: Object,
    default: undefined,
  },
});
// const dataValue = ref(props.data)
const items = ref([]);
const errorsModalValue = ref(false);
const errorsValue = ref([]);
const viewModal = ref(false);
const nowVal = ref(100)
const data1 = ref({
  title: "请假",
  node: {
    name: "发起人",
    type: "start",
    nodeId: "sid-startevent",
    childNode: {},
  },
});
watch(
  () => props.data,
  (newValue, oldValue) => {
    data1.value = newValue;
  }
);
onMounted(() => {

  if (!data1.value.node) {
    initialNode();
  }
  initIteratorData(data1.value.node);
});

const initialNode = () => {
  data1.value.node = {
    name: "发起人",
    type: "start",
    nodeId: "sid-startevent",
  };
};
const initIteratorData = (data) => {
  items.value = [];
  iteratorData(items.value, data);
};
const addnode = (node) => {
  addNewNode(node, data1.value.node, items.value);

};
const deleleNode = (node) => {
  if(node.name=="发起人"){
    return false;
  }
  delNode(node, data1.value.node, items.value);
};
const save = () => {
  var errors = checkData(data1.value.node);
  if (errors.length > 0) {
    errorsModalValue.value = true;
    errorsValue.value = errors;
    return;
  }
  emit("ok", data1.value);
};
const preview = () => {
  var errors = checkData(data1.value.node);
  if (errors.length > 0) {
     errorsModalValue.value = true;
    errorsValue.value = errors;
    return;
  }
  viewModal.value = true;
};

const zoomSize = (type) => {
  if (type == 1) {
    if (nowVal.value == 50) {
      return;
    }
    nowVal.value -= 10;
  } else {
    if (nowVal.value == 300) {
      return;
    }
    nowVal.value += 10;
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.zoom {
    display: flex;
    position: fixed;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 40px;
    width: 125px;
    right: 40px;
    margin-top: 30px;
    z-index: 10
}

.zoom .zoom-in,
.zoom .zoom-out {
    width: 30px;
    height: 30px;
    background: #fff;
    color: #c1c1cd;
    cursor: pointer;
    background-size: 100%;
    background-repeat: no-repeat
}

.zoom .zoom-out {
    background-image: url(https://gw.alicdn.com/tfs/TB1s0qhBHGYBuNjy0FoXXciBFXa-90-90.png)
}

.zoom .zoom-out.disabled {
    opacity: .5
}

.zoom .zoom-in {
    background-image: url(https://gw.alicdn.com/tfs/TB1UIgJBTtYBeNjy1XdXXXXyVXa-90-90.png)
}

.zoom .zoom-in.disabled {
    opacity: .5
}

</style>
