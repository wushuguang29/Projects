<template>
  <el-container class="main-container">
    <el-header class="search-container" height="auto">
      <lh-search-bar
        :formItemData="formItemData"
        :operationData="operationData"
        @searchChange="getTableData"
        @addHandler="addHandler"
      ></lh-search-bar>
      <lh-select-tree width="300" :checkbox="true"></lh-select-tree>
      <lh-select-tree :checked_keys="[4]"></lh-select-tree>
    </el-header>
    <el-main class="main-center">
      <lh-table
        :table="table"
        @pageChange="getTableData"
        :gridData="data"
        @handleEdit="handleEdit"
      >
      </lh-table>
    </el-main>
  </el-container>
</template>

<script>
import { summaryFunction } from "../../utils/common";
export default {
  name: "App",
  data() {
    return {
      // 查询表单数据
      formItemData: [
        {
          element: "input", //文本
          label: "测试组件", //label
          defaultValue: "", //默认值
          name: "search", //name 属性
          rules: [{ required: true, message: "必填项", trigger: "blur" }], //验证规则
          disabled: false, //是否禁用 默认为false
          events: {
            blur: this.selectChange,
          },
        },
        {
          element: "number", //数字
          label: "数字", //label
          defaultValue: "", //默认值
          name: "number", //name 属性
          rules: [{ required: true, message: "必填项", trigger: "blur" }], //验证规则
          disabled: false, //是否禁用
          step: 5, //递增递减的步数控制
          stepStrictly: false, //属性被设置为true，则只能输入步数的倍数。
          controlsPosition: "right", //控制按钮位置
          controls: false, //是否使用控制按钮,
          events: {
            change: this.selectChange,
          },
        },
        {
          element: "checkboxGroup",
          defaultValue: [1, 2],
          name: "sex",
          label: "性别",
          min: 1, //最少能选择的项数
          max: 2, //最多选择的项数
          disabled: false,
          options: [
            {
              id: 1,
              name: "测试",
            },
            {
              id: 2,
              name: "测试2号",
            },
            {
              id: 3,
              name: "测试2号",
            },
          ],
        },
        {
          element: "date", //日期范围选择控件开始-结束
          format: "yyyy-MM-dd",
          label: "签约日期", //label
          placeholder: "请输入默认内容",
          name: "time", //name 属性
          type: "daterange", //'date/daterange'控制日期范围或单个日期选择
          unlinkPanels: true, //true/false带
          events: {
            change: this.selectChange,
          },
        },
        {
          element: "date", //日期与时间选择控件
          label: "时间", //label
          format: "yyyy-MM-dd HH:mm:ss",
          placeholder: "请输入默认内容",
          name: "dateTime", //name 属性
          type: "datetime",
          disabled: false,
          events: {
            change: this.selectChange,
          },
        },
        {
          element: "time", //元素
          label: "签约时间", //label
          placeholder: "请输入默认内容",
          name: "time", //name 属性
          isRange: true, //选择时间范围
          disabled: false,
          events: {
            change: this.selectChange,
          },
        },
        {
          element: "select", //元素
          label: "项目名称", //label
          defaultValue: "1",
          placeholder: "请输入默认内容",
          name: "project_id", //name 属性
          filterable: true, //是否可以搜索
          disabled: false,
          options: [
            {
              id: "1",
              name: "测试",
            },
            {
              id: 2,
              name: "测试2号",
            },
          ],
          events: {
            change: this.selectChange,
          },
        },
      ],
      // 操作按钮数据
      operationData: [
        {
          text: "添加",
          type: "success",
          Fun: "addHandler",
          icon: "el-lhsoft-jia",
        },
        {
          text: "审核",
          type: "warning",
          Fun: "auditHandler",
          icon: "el-lhsoft-hetongshenpi",
        },
        {
          text: "导出",
          type: "info",
          Fun: "addHandler",
          icon: "el-lhsoft-batch-export",
        },
        {
          text: "打印",
          type: "info",
          Fun: "addHandler",
          icon: "el-lhsoft-dayin",
        },
        {
          text: "上传",
          type: "primary",
          btnType: "upload",
          icon: "el-lhsoft-shangchuan",
          action: "",
        },
      ],
      data: [
        {
          id: 1,
          area_name: true,
          state: 1,
          standard_name: "99",
          work_name: "",
          handler_name2: "",
          handler_name1: "",
          create_time: "",
        },
        {
          id: 2,
          area_name: true,
          state: 1,
          standard_name: "--",
          work_name: "",
          handler_name2: "",
          handler_name1: "",
          create_time: "",
        },
        {
          id: 3,
          area_name: true,
          state: 1,
          standard_name: "89",
          work_name: "",

          handler_name2: "",
          handler_name1: "",
          create_time: "",
        },
        {
          id: 4,
          area_name: true,
          state: 1,
          standard_name: "412",
          work_name: "",
          handler_name2: "",
          handler_name1: "",
          create_time: "",
        },
        {
          id: 5,
          area_name: true,
          state: 1,
          standard_name: "32",
          work_name: "",
          handler_name2: "",
          handler_name1: "",
          create_time: "5353",
        },
      ],

      table: {
        hasSelect: true,
        hasOperation: true,
        hasShowSummary: true,
        hasRowsNumber: true,
        getSummaries(params) {
          const summary = summaryFunction(params, [4]);
          return summary;
        },
        columns: [
          /*
					 **@text:列标题
					 **@dataIndex:列对应字段
					 **width:列宽度
					 **showToolTip：true:超出宽度部分不换行，显示tooltip
					 **minWidth：列最小宽度
					 * width：列宽
					 * fixed：left/right/true列固定
					 * render：列内容渲染
					 * columns：[{text: '项目名称',dataIndex: 'name'}]多表头

					 **/
          {
            text: "项目名称",
            dataIndex: "state",
            render: (h, params) => {
              return h("div", {
                domProps: {
                  innerHTML: `<label><input type="radio" name="role_type_${
                    params.row.id
                  }" value="1" ${
                    params.row.state == 1 ? "checked" : ""
                  }>私人${params.row.state ==
                    1}</label><label><input type="radio" name="role_type_${
                    params.row.id
                  }"  value="2">全部</label><label><input type="radio" name="role_type_${
                    params.row.id
                  }" value="0">同级</label>`,
                },
                on: {
                  click: this.setPermission,
                },
              });
            },
          },

          {
            text: "征土地补偿标准",
            dataIndex: "standard_name",
            formatter:this.standardFormatter
          },
          {
            text: "所属社区",
            dataIndex: "area_name",
            // showToolTip: true
          },
          {
            text: "所属工作组",
            dataIndex: "work_name",
            showToolTip: true,
          },
          {
            text: "项目管理员",
            // dataIndex: 'handler_name',
            minWidth: 300,
            columns: [
              {
                text: "项目管理员",
                dataIndex: "handler_name2",
              },
              {
                text: "项目管理员",
                dataIndex: "handler_name1",
              },
            ],
          },
          {
            text: "创建时间",
            dataIndex: "create_time",
          },
        ],

        operation: {
          width: 400,
          data: [
            {
              text: "删除",
              Fun: "handleDelete",
              type: "danger",
            },
            {
              text: "预览",
              Fun: "handleDelete",
              type: "primary",
            },
            {
              text: "附件",
              Fun: "handleAttachment",
              type: "info",
            },
            {
              text: "编辑/提交",
              Fun: "handleEdit",
              type: "success",
            },
            {
              text: "审核/记录",
              Fun: "handleAttachment",
              type: "warning",
            },
          ],
        },
      },
    };
  },
  methods: {
    getTableData(params) {
      console.log(params);
    },
    handleDelete(options) {
      const { row, index } = options;
    },
    handleAttachment(options) {
      const { row, index } = options;
    },
    handleEdit: function(options) {
      const { row, index } = options;
      row.area_name = !row.area_name;
    },
    addHandler(options) {
      console.log("添加");
    },
    selectChange(e) {
      console.log(e);
    },
    setPermission(e) {
      console.log(e);
    },
    standardFormatter(row,column,cellValue,index){
       console.log(row)
      return '测试'
     
    }
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  .search-container {
    padding: 20px 0 !important;
    background: #eee;
  }

  .main-center {
    height: 100%;
    padding: 0 !important;
  }
}
</style>
