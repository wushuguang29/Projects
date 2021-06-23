<template>
  <div class="lh-tree-select" :style="{ width: width + 'px' }">
    <el-popover :width="width">
      <div slot="reference" class="selected-box">
        <div class="tag-box">
          <el-tag
            size="mini"
            v-for="item in selecteds"
            :key="item[nodeKey]"
            @close="tagClose(item[nodeKey])"
            :closable="closable"
          >
            {{ item[selfProps.label] }}
          </el-tag>
        </div>
        <div class="icon-box">
          <transition name="fade-rotate" mode="out-in">
            <i class="el-icon-arrow-down" v-if="!options_show" key="top"></i>
            <i class="el-icon-arrow-up" v-else key="btm"></i>
          </transition>
        </div>
      </div>
      <el-input placeholder="输入关键字进行查找" v-model="filterText">
      </el-input>
      <el-scrollbar style="height:100%">
        <el-tree
          ref="tree-select"
          class="lh-options-tree"
          highlight-current
          :default-expand-all="defaultExpandAll"
          :default-expanded-keys="defaultExpandedKeys"
          :data="selfData"
          :props="selfProps"
          :node-key="nodeKey"
          :show-checkbox="checkbox"
          :expand-on-click-node="false"
          :default-checked-keys="checkedArr"
          @check-change="handleCheckChange"
          @node-click="treeItemClick"
          :filter-node-method="filterNode"
          :check-strictly="checkStrictly"
        ></el-tree>
      </el-scrollbar>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: "LhSelectTree",
  props: {
    width: String,
    /* 是否展开全部 */
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    /* 默认展开的节点的 key 的数组 */
    defaultExpandedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    /* 选中的节点数组 */
    checked_keys: {
      type: Array,
      default() {
        return [];
      },
    },
    /* 数据options */
    props: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /* 数据key字段，默认为id */
    nodeKey: {
      type: String,
      default: "id",
    },
    /* 是否可选 */
    checkbox: {
      type: Boolean,
      default: false,
    },
    /* 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 true*/
    checkStrictly: {
      type: Boolean,
      default: true,
    },
    /* 父组件选中的数据数据 */
    selected: {
      type: Array,
      default() {
        return [];
      },
    },

    // 数据
    selfData: {
      type: Array,
      default() {
        return [
          {
            id: 1,
            label: "一级 2",
            showCheckbox: true,
            children: [
              {
                id: 3,
                label: "二级 2-1",
                children: [
                  {
                    id: 4,
                    label: "三级 3-1-1",
                  },
                  {
                    id: 5,
                    label: "三级 3-1-2",
                    // disabled: true,
                  },
                ],
              },
              {
                id: 2,
                label: "二级 2-2",
                // disabled: true,
                children: [
                  {
                    id: 6,
                    label: "三级 3-2-1",
                  },
                  {
                    id: 7,
                    label: "三级 3-2-2",
                    // disabled: true,
                  },
                ],
              },
            ],
          },
        ];
      },
    },
  },
  data() {
    return {
      filterText: "",
      selecteds: [], // 选中数据
      options_show: false,
    };
  },
  computed: {
    selfProps() {
      return {
        label: "label",
        children: "children",
        disabled: (data) => {
          return data.disabled;
        },
        ...this.props,
      };
    },
    checkedArr: {
      get: function() {
        return this.checked_keys;
      },
      set: function(value) {
        return value;
      },
    },
    closable() {
      return this.checkbox;
    },
  },
  mounted() {
    this.checkDefaultValue();
    console.log(this.defaultExpandedKeys);
  },

  methods: {
    // 处理默认选中数据
    checkDefaultValue() {
      if (this.checkedArr.length) {
        this.$nextTick(() => {
          this.selecteds = this.$refs["tree-select"].getCheckedNodes(
            this.checkStrictly ? false : true
          );
        });
      } else {
        this.selecteds = [];
        this.$nextTick(() => {
          this.$refs["tree-select"].setCheckedKeys([]);
        });
      }
    },
    handleCheckChange(val) {
      let checked_keys = [];
      let nodes = this.$refs["tree-select"].getCheckedNodes(
        this.checkStrictly ? false : true
      );
      this.selecteds = nodes;
      nodes.forEach((element) => {
        checked_keys.push(element.id);
      });
      this.checkedArr = checked_keys;
    },
    /* 单选事件 */
    treeItemClick(node) {
      if (this.checkbox || node.children) {
        return;
      }
      this.selecteds = [node];
      this.options_show = false;
    },
    /* 关闭tag,取消树选择 */
    tagClose(tag) {
      this.selecteds.splice(
        this.selecteds.findIndex((item) => item[this.nodeKey] === tag),
        1
      );
      this.checkbox
        ? this.$refs["tree-select"].setChecked(tag, false)
        : this.$refs["tree-select"].setCurrentKey(null);
    },
    /* 过滤树节点 */
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    valInDeep(arr = [], val, id = "Id", childs = "Children") {
      return arr.reduce((flat, item) => {
        return flat.concat(
          item[id] == val
            ? item
            : valInDeep(item[childs] || [], val, id, childs)
        );
      }, []);
    },
  },
  watch: {
    filterText(val) {
      this.$refs["tree-select"].filter(val);
    },
    selecteds(val) {
      //1、事件
      this.$emit("selectChange", val);
      //2、更新父组件selected
      this.$emit("update:selected", val);
    },
    checkedArr(val) {
      this.checkDefaultValue();
    },
  },
};
</script>
<style lang="scss">
.lh-tree-select {
  position: relative;
  display: inline-block;
  width: 240px;
  outline: none;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  .selected-box {
    display: flex;
    border: 1px solid #dcdfe6;
    padding: 0 10px;
    width: 100%;
    min-height: 28px;
    line-height: 26px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    &:focus {
      border-color: #409eff;
    }
    > .tag-box {
      display: inline-block;
      width: calc(100% - 20px);
      text-align: left;
    }
    > .icon-box {
      float: right;
      display: flex;
      width: 20px;
      justify-content: center;
      align-items: Center;
      color: #c0c4cc;
    }
  }
  .el-tag + .el-tag {
    margin-left: 4px;
  }
}
.lh-options-tree {
  height: 200px;
}

.fade-rotate-enter-active {
  animation: rotate 0.3s;
}
.fade-rotate-leave-active {
  animation: rotate 0.3s reverse;
}
@keyframes rotate {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
