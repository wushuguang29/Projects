<template>
  <el-container class="main-container">
    <el-header class="search-container" height="auto">
      <lh-search-bar
        :formItemData="formItemData"
        :operationData="operationData"
        @addHandler="addHandler"
        @resetHandler="resetHandler"
        @searchChange="getGridData"
      ></lh-search-bar>
    </el-header>
      <lh-table
        :table="table"
        :gridData="gridData"
        :needPaging="false"
        @pageChange="getGridData"
        @handleDelete="handleDelete"
        @handleEdit="handleEdit"
        @handleChildAdd="handleChildAdd"

        :loading="loading"
      ></lh-table>

      <lh-dialog
        :dialogVisible.sync="dialogVisible"
        v-if="createDialog"
        :windowTitle="windowTitle"
        :windowWidth="windowWidth"
        :hasButton="hasButton"
        :class="dialogStyle"
        @updateList="updateList"
      >
        <component :is="activeName" :selectRouter="selectRouter" :editStatus="editStatus" :rowData="rowData" :windowType="'Resources'" @updateList="updateList"/>
      </lh-dialog>
  </el-container>
</template>
<script>
import { getResourcesList, deleteResources,getParentList } from "@/api/resources.js";
import { mapActions, mapGetters } from "vuex";
import Resources from "./ResourcesWindow.vue";
function getInitData() {
  return {
    Resources: {
      activeName: "Resources",
      dialogVisible: true,
      editStatus: false,
      windowTitle: "新增路由",
      windowWidth: "40%",
      hasButton: true,
      rowData:{}
    },

  };
}
export default {
  name: "role",
  components: {
    Resources,

  },
  data() {
    return {
      activeName: "Role",
      hasButton: true,
      selectRouter:[],
      formItemData: [
        {
          element: "input",
          defaultValue: "",
          name: "title",
          disabled: false,
          placeholder: "请输入资源名称"
        }
      ],
      operationData: [
        {
          text: "新建",
          type: "success",
          Fun: "addHandler",
          permission:'add',
          icon: "iconfont el-icon-plus"
        }
      ],
      table: {
        // hasSelect: false,
        //hasRowsNumber:true,
        hasOperation: true,
        hasRowsNumber: false,
        rowKey: "id",
        columns: [
          {
            text: "创建时间",
            dataIndex: "create_time",
            width: 140
          },
          {
            text: "资源名称",
            dataIndex: "title",
            width:240,

          },
          {
            text: "请求方法",
            dataIndex: "method",
          },
          {
            text: "完整url",
            dataIndex: "url",
            width:260
          },
          {
            text: "后端路由路径",
            dataIndex: "router",
            width:240
          },
          {
            text: "打开方式",
            dataIndex: "open_mode",
            width:90,
            formatter:(row, column) => this.$format.idToName(row, column,'resources','open_mode')
          },
          {
            text: "状态",
            dataIndex: "status",
            formatter:(row, column) => this.$format.idToName(row, column,'resources','status')
          },
          {
            text: "资源类型",
            dataIndex: "type",
            formatter:(row, column) => this.$format.idToName(row, column,'resources','type')
          },
          {
            text: "隐藏菜单",
            dataIndex: "hidden",
            formatter:(row, column) => this.$format.idToName(row, column,'resources','hidden')
          },
          {
            text: "前端路由名称",
            dataIndex: "front_router_name",
          },

        ],
        operation: {
          width: 340,
          moreTitle:'',
          data: [
            {
              text: "编辑",
              Fun: "handleEdit",
              type: "success",
              permission:'edit'
            },
            {
              text: "删除",
              Fun: "handleDelete",
              type: "danger",
              permission:'delete'
            },
            {
              text: "新增子路由",
              Fun: "handleChildAdd",
              type: "success",
              permission:'add'
            },
          ]
        }
      },
      dialogVisible: false,
      windowTitle: "新增路由",
      editStatus: false,
      rowData: {},
      windowWidth: "40%",

    };
  },
  computed: {
    ...mapGetters({
      gridData: "baseRole/list/gridData",
      total: "baseRole/list/total",
      loading: "baseRole/list/loading",

    }),
    createDialog: function() {
      return this.dialogVisible;
    },
    dialogStyle:function(){
      if(this.activeName === 'Authority'){
        return 'dialog-common'
      }
      return ''
    }
  },
  methods: {
    ...mapActions({
      getGridData: "baseRole/list/getGridData",
      deleteGrid: "baseRole/list/deleteGrid",
      createTagPanel: "createTagPanel"
    }),
    addHandler: function() {
      let data = getInitData().Resources;
      console.log(data)
      Object.assign(this.$data, data);
    },
    handleChildAdd:function (options){
      let data = getInitData().Resources;
      data.windowTitle = "新增子路由";
      data.rowData.pid=options.row.id
      data.rowData['extra_value']=[];
      data.rowData['middleware_value']=[];
      Object.assign(this.$data, data);
    },
    handleEdit: function(options) {
      const { row, index } = options;
      row['extra_value']=this.selectExtraRecover(row['extra'])
      row['middleware_value']=row['middleware'].split(',');
      let data = getInitData().Resources;
      data.editStatus = true;
      data.windowTitle = "编辑路由";
      data.rowData = row;
      Object.assign(this.$data, data);
      console.log(row)
    },
    handleDelete: function(options) {
      const { row, index } = options;
      this.deleteGrid({
        deleteFun: deleteResources,
        params: {
          id: row.id
        }
      }).then(res => {
        this.$message(res.msg);
        this.getGridData({
          list: getResourcesList
        });
      });
    },
    resetHandler: function() {},
    updateList:function(){
      this.getGridData({
        list: getResourcesList
      });      
    },
    //将extra值还原为表单值
    selectExtraRecover:function (parms){
      let extra_value=[];
      for(let key in parms){
        if(parms[key]!=0){
          extra_value.push(key)
        }

      }
      return extra_value
    },
  },
  created() {
    this.getGridData({
      list: getResourcesList
    });

    getParentList().then(res => {

      this.selectRouter = res.data;

    });
  }
};
</script>

<style>

</style>
