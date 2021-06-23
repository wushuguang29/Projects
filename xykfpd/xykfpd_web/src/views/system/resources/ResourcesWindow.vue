<template>
  <lh-window
    :windowItem="windowItem"
    :editStatus="editStatus"
    :rowData="rowData"
    labelWidth="100px"
    @handleConfirm="handleConfirm"
    ref="windowRef"
  ></lh-window>
</template>

<script>
import { getBaseConfig } from "../../../utils/common";
import { addResources, editResources } from "@/api/resources.js";
export default {
  name: "resourcesWindow",
  props: {
    editStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    rowData: {
      type: Object,
    },
    selectRouter: {
      type: Array,
    },
  },
  data() {
    return {
      selectExtra: "",
      selectMiddleware: "",
      windowItem: [
        {
          element: "input",
          name: "id",
          hidden: true,
          hiddenfield: true,
        },
        {
          element: "input",
          label: "资源名称",
          name: "title",
          disabled: false,
        },
        {
          element: "select",
          label: "请求方法",
          name: "method",
          options: [
            {
              id: "post",
              name: "post",
            },
            {
              id: "get",
              name: "get",
            },
            {
              id: "put",
              name: "put",
            },
            {
              id: "delete",
              name: "delete",
            },
          ],
          disabled: false,
        },
        {
          element: "select",
          label: "附件文件类型",
          name: "attachment_folder_type",
          options: getBaseConfig("AFFILIATION_TYPE", true),
          // options: [{
          //   id: 1,
          //   name: '分户档案'
          // }, {
          //   id: 2,
          //   name: '征地档案'
          // }, {
          //   id: 3,
          //   name: '迁坟档案'
          // }, {
          //   id: 4,
          //   name: '项目档案'
          // }, {
          //   id: 5,
          //   name: '其他档案'
          // }],
          disabled: false,
        },
        {
          element: "checkboxGroup",
          defaultValue: [],
          name: "extra_value",
          label: "其他作用",
          min: 0, //最少能选择的项数
          max: 5, //最多选择的项数
          disabled: false,
          options: this.$typeData.resources.extra,
          events: {
            change: this.selectExtraChange,
          },
        },
        {
          element: "checkboxGroup",
          defaultValue: [],
          name: "middleware_value",
          label: "中间件",
          min: 1, //最少能选择的项数
          max: 4, //最多选择的项数
          disabled: false,
          options: this.$typeData.resources.middleware,
          events: {
            change: this.selectMiddlewareChange,
          },
        },
        {
          element: "select",
          label: "父级路由",
          name: "pid",
          options: this.selectRouter,
          disabled: false,
        },
        {
          element: "input",
          label: "完整url",
          name: "url",
          disabled: false,
        },
        {
          element: "input",
          label: "后端路由路径",
          name: "router",
          disabled: false,
        },
        {
          element: "input",
          label: "前端路由名称",
          name: "front_router_name",
          disabled: false,
        },
        {
          element: "input",
          label: "前端路由标识",
          name: "identifier",
          disabled: false,
        },
        {
          element: "radioGroup",
          label: "前端按钮打开方式",
          name: "open_mode",
          defaultValue: 1,
          options: this.$typeData.resources.open_mode,
          disabled: false,
        },
        {
          element: "radioGroup",
          label: "隐藏菜单",
          name: "hidden",
          defaultValue: 2,
          options: this.$typeData.resources.hidden,
          disabled: false,
        },
        {
          element: "radioGroup",
          label: "资源类型",
          name: "type",
          defaultValue: 1,
          options: this.$typeData.resources.type,
          disabled: false,
        },
        {
          element: "radioGroup",
          label: "状态",
          name: "status",
          defaultValue: 1,
          options: this.$typeData.resources.status,
          disabled: false,
        },
        {
          element: "input",
          label: "图标",
          name: "icon",
          disabled: false,
        },
        {
          element: "number",
          label: "排序",
          name: "sort",
          disabled: false,
        },
        {
          element: "input",
          label: "备注说明",
          name: "remark",
          disabled: false,
        },
      ],
    };
  },
  methods: {
    handleAddConfirm: function (params) {
      addResources(params).then((res) => {
        this.$message(res.msg);
        this.$parent.$emit("updateList");
        this.$parent.$emit("handleClose", false);
      });
    },
    handleEditConfirm: function (params) {
      editResources(params).then((res) => {
        this.$message(res.msg);
        this.$parent.$emit("updateList");
        this.$parent.$emit("handleClose", false);
      });
    },
    handleConfirm: function (params) {
      params["extra"] = this.selectExtra ? this.selectExtra : params["extra"];
      params["middleware"] = this.selectMiddleware
        ? this.selectMiddleware
        : params["middleware"];
      if (this.editStatus) {
        this.handleEditConfirm(params);
      } else {
        this.handleAddConfirm(params);
      }
    },
    selectExtraChange: function (params) {
      //对extra数据进行处理，选中对字段值为1
      this.selectExtr = "";
      let extra = {
        competence: 0,
        annex: 0,
        business: 0,
        hot_key: 0,
        review: 0,
      };
      params.forEach((item) => {
        extra[item] = 1;
      });
      this.selectExtra = extra;
      console.log(this.selectExtra);
    },
    selectMiddlewareChange: function (params) {
      //对middleware字段进行处理，对数据按顺序进行拼接
      let middleware = "";
      this.selectMiddleware = "";
      this.$typeData.resources.middleware.forEach((item) => {
        console.log(item);
        if (params.indexOf(item.name) > -1) {
          middleware = middleware + item.name + ",";
        }
      });
      middleware = middleware.substr(0, middleware.length - 1);
      this.selectMiddleware = middleware;
    },
  },
};
</script>

<style lang="scss">
.el-dialog {
  /deep/ .el-dialog__body {
    max-height: 1000px !important;
  }
}
</style>