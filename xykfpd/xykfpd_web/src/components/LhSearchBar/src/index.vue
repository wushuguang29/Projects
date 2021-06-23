<template>
  <el-row class="search-bar-container" style="margin-top:10px;">
    <el-col :span="formCol">
      <el-form
        v-if="formItemData.length"
        label-position="right"
        :label-width="labelWidth"
        :inline="formType"
        class="search-form"
        :model="formData"
        ref="searchFrom"
        :disabled="formDisabled"
        :validate-on-rule-change="false"
        @validate="formValidate"
      >
        <el-form-item
          v-for="(item, index) in formItemData"
          :key="index"
          :label="item.label"
          :prop="item.name"
          :rules="item.rules"
        >
          <form-item :formItemOptions="item" :formData="formData" @searchChange="onSearchClick()"></form-item>
        </el-form-item>
        <template v-if="formItemData.length && showSearchBtn">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="onSearchClick"
            v-if="formItemData.length"
          >搜索</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            @click="onResetClick('searchFrom')"
            v-if="formItemData.length"
          >重置</el-button>
        </template>
        <div v-else style="width:100%;height:1px;"></div>
      </el-form>
    </el-col>
    <el-col :span="4" class="buttons-container">
      <div class="buttons">
        <template v-for="(item, index) in operationData">
          <el-button
            v-if="!item.btnType"
            :key="index"
            :type="item.type"
            @click.stop="handleOperation(item.Fun)"
            :icon="item.icon"
            v-allow="item.permission"
          >{{ item.text }}</el-button>
          <slot></slot>
        </template>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import FormItem from "./FormItem";
export default {
  name: "LhSearchBar",
  components: {
    FormItem,
  },
  props: {
    formDisabled: {
      type: Boolean,
      default: false,
    },
    formItemData: {
      // 查询表单元素数组
      type: Array,
      default() {
        return [];
      },
    },
    operationData: {
      // 操作按钮数据
      type: Array,
      default() {
        return [];
      },
    },
    /* 是否需要查询按钮与重置按钮 */
    needSearch: {
      type: Boolean,
      default: true,
    },
    /* 表单占栅格数 */
    formCol: {
      type: Number,
      default: 20,
    },
    /* 表单对齐方式 */
    formType: {
      type: Boolean,
      default: true,
    },
    /* label宽度 */
    labelWidth: {
      type: String,
      default: "80px",
    },
    formParams: {
      type: Object,
      default() {
        return {};
      },
    },
    formStatus: {
      type: String,
      default: "add",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showSearchBtn() {
      return this.needSearch === false ? false : true;
    },
  },
  data() {
    return {
      // 表单value键值对
      formData: {},
      // 分页参数
      pagingParam: {},
      needValidate: [],
    };
  },
  created() {
    console.log(this.needValidate);
    this.addInitValue();
    this.bus.$on("pageChange", (res) => {
      this.pagingParam = res;
    });
  },
  methods: {
    formValidate(prop, valid, msg) {
      let needValidate = this.needValidate;
      let index = needValidate.findIndex((each) => {
        return prop == each;
      });
      if (!valid) {
        if (index == -1) {
          needValidate.push(prop);
        }
      } else {
        if (index != -1) {
          needValidate.splice(index, 1);
        }
      }
      this.needValidate = needValidate;
    },

    addInitValue() {
      const obj = {};
      const needValidate = [];
      this.formItemData.forEach((v) => {
        obj[v.name] = v.defaultValue || "";
        if (v.rules) {
          needValidate.push(v.name);
        }
      });
      this.formData = obj;
      this.needValidate = needValidate;
      console.log(this.needValidate);
    },
    onSearchClick() {
      this.bus.$emit("searchChange", this.formData);
      this.$emit(
        "searchChange",
        Object.assign(this.pagingParam, this.formData)
      );
      // console.log(this.formData);
    },
    onResetClick(formName) {
      this.$refs[formName].resetFields();
      this.bus.$emit("searchChange", this.formData);
      this.$emit(
        "searchChange",
        Object.assign(this.pagingParam, this.formData)
      );
    },
    handleOperation(fun) {
      this.$emit(fun);
    },
  },
  beforeDestory() {
    this.bus.$off("pageChange");
  },
  watch: {
    needValidate(value) {
      // 判断表单数据是否全部验证通过
      // console.log(value);
      if (!value.length) {
        this.$emit("update:formParams", this.formData);
        this.$emit("update:validateSuccess", true);
      } else {
        this.$emit("update:validateSuccess", false);
      }
    },
    // formData: {
    //   handler: function(nowVal, oldVal) {
    //     console.log(nowVal);
    //   },
    //   deep: true,
    // },
  },
};
</script>

<style lang="scss">
.search-form {
  text-align: left;
  padding: 0 10px;
  .el-form-item {
    margin-bottom: 10px !important;
  }
}
.buttons-container {
  text-align: right;
  position: absolute;
  height: 100%;
  right: 0;
  .buttons {
    // float: right;
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    flex-wrap: wrap;
    button {
      float: left;
      margin: 0 10px 5px 0;
    }
  }
}
</style>
