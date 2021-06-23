<!--自动回复--自动回复-->
<template>
  <el-container class="main-container">
    <el-header class="search-container" height="auto">
      <lh-search-bar :formItemData="formItemData" @searchChange="getGridData" @addHandler="addHandler"  :operationData="addOper" />
    </el-header>
    <lh-table
      :table="table"
      :gridData="gridData"
      @pageChange="getGridData"
     
      :needPaging='true'
      :loading="loading"
      @handleEdit='handleEdit'
      @handleDelete="handleDelete"
      @handleUpload='handleUpload'
      @handleLook='handleLook'
      :total='total'
    ></lh-table>

    <lh-dialog
      :dialogVisible.sync="dialogVisible"
      v-if="createDialog"
      :windowTitle="windowTitle"
      :hasButton="false"
      @updateList="updateList"
    >
      <!-- <edit v-if="loShow" :editStatus="editStatus" :rowData="rowData" @handleClose="cancel" @updateList="updateList"></edit> -->
        <add v-if="!loShow" :editStatus="editStatus" :isLook="isLook" :rowData="rowData" @handleClose="cancel" @updateList="updateList"></add>
    </lh-dialog>
  </el-container>


</template>
<script>
// import {
//  getFinanceList
// } from "@/api/finance.js";
import { getList,create,update,deleteData } from "@/api/Response";
// import { getProjectAll } from "@/api/public.js";
import { mapActions, mapGetters } from "vuex";

  import add from "./add";
import { getBaseConfig } from "@/utils/common";
// import Audit from "./module/Audit";

export default {
  name: "index",
  components: {
    add
  },
  data() {
    return {
      editStatus:false,
     loShow:false,
      windowTitle:"",
    
      areaList: [],
      logData:[{id:2,title:"是这个吗",return_message:"内容"},{id:2,title:"是这个吗",return_message:"内容"}],
      formItemData: [
        {
          element: "input",
              defaultValue: "",
              name: "search",
              disabled: false,
              label: "关键字",
              placeholder: "请输入问题关键字"
        }
      ],
      table: {
        // hasSelect: false,
        hasRowsNumber: true,
         
        hasOperation: true,
        hasExpend: true,
        columns: [
          {
            text: "标识",
            dataIndex: "identification",
            showToolTip: true,
            // render: (h, params) => {
                            
            //                 let value = params.row["domain"],
                           
            //                   config = getBaseConfig("DOMAIN");
                              
            //                   return h("span", config[value]);
            //             }
          },
          {
            text: "问题关键字",
            dataIndex: "title",
            showToolTip: true,
            // render: (h, params) => {
                            
            //                 let value = params.row["domain"],
                           
            //                   config = getBaseConfig("DOMAIN");
                              
            //                   return h("span", config[value]);
            //             }
          },
          {
            text: "回复内容",
            dataIndex: "return_message",
            showToolTip: true,
          },
        //   {
        //     text: "得分范围/结果提示",
        //     dataIndex: "score_range",
        //     showToolTip: true,
        //     render: (h, params) => {
        //       let value = params.row["score_range"],text="",log="";
        //     //   if(value!=null){
        //     //      value=JSON.parse(value);
        //     //   console.log("value",value)
        //     //   value.forEach(element => {
        //     //    text='范围值:'+element.begin+'~'+element.end+'|提示:'+element.result+'|';
        //     //    console.log("text",text)
        //     //    log=''+text
        //     //   });
        //     //   }
        //     //  console.log("log",log)
        //     //   return h("span", log);
        //     console.log(value.split("<br />"));
        //     let arr = value.split("<br />")
        //     return (
        //       arr.map(item => {
        //         return <div style="text-align: left"> {item} </div>
        //       })
        //     )
        //     }
        //   },
        
        
        ],
         operation: {
              width: 340,
              data: [
                {
                  text: "查看",
                  Fun: "handleLook",
                  permission: "look",
                  type: "primary"
                },
                {
                  text: "编辑",
                  Fun: "handleEdit",
                  permission: "edit",
                  type: "primary"
                },
                 {
                  text: "删除",
                  Fun: "handleDelete",
                  permission: "delete",
                  type: "danger",
                  // controlBtnFun(e) {
                  //   if(e.isdel) {
                  //     return true
                  //   }else {
                  //     return false
                  //   }
                  // },
                },
               
                
              ]
            },
      },
      addOper: [
            {
              text: "新建",
              type: "success",
              Fun: "addHandler",
              permission: "add",
              icon: "iconfont el-icon-plus"
            }
          ],
      //element-ui的dialog控制显示隐藏属性
      dialogVisible: false,
      //标记编辑或者新增状态
      editStatus: false,
      //窗口带入回写的数据
      rowData: { house_district: {} },
      roleList: [],
    };
  },
  computed: {
    ...mapGetters({
      gridData: "automaticResponse/list/gridData",
      total:"automaticResponse/list/total",
      loading: "automaticResponse/list/loading",
    }),

    createDialog: function () {
      return this.dialogVisible;
    },
  },
  methods: {
    ...mapActions({
      getGridData: "automaticResponse/list/getGridData",
      deleteGrid: "automaticResponse/list/deleteGrid",
      createTagPanel: "createTagPanel",
    }),
    async project() {
    //   const { data } = await getProjectAll();
    //   const newData = this.dataArrSelect(data);
    //   this.formItemData[0].options = newData;
    //   let policyConfig = getBaseConfig("APPLY_STATUS", true);
    },
    handleDelete:function (options) {
         console.log('deleteAutoSponse');
          const { row, index } = options;
          this.deleteGrid({
            deleteFun: deleteData,
            params: {
              id: row.id
            }
          }).then(res => {
            this.$message(res.msg);
            this.getGridData({
              list: getList
            });
          });
    },
    addHandler: function() {
          this.dialogVisible = true;
          this.editStatus = false;
          this.loShow=false;
          this.isLook = false;
        //   this.rowAdd = false;
          this.windowTitle = "新增";
          this.rowData = {};
        },
     handleUpload(options) {
     
            // this.isUpload = true;
            // this.target_id = options.row.id;
            // this.project_id = options.project_id ? options.project_id : 0;
        },
        handleLook(options) {
        //   console.log(3333);
          this.isLook = true
          const { row, index } = options;
          this.editStatus = true;
          this.windowTitle = "查看";
          this.dialogVisible = true;
         
          this.rowData = {};
          Object.assign(this.rowData, row);
        },
       
       
        handleEdit: function (options) {
            this.loShow=false;
          console.log(3333);
          this.isLook = false
          const { row, index } = options;
          this.editStatus = true;
          this.windowTitle = "编辑";
          this.dialogVisible = true;
          this.isSee=false
          this.rowData = {};
          Object.assign(this.rowData, row);
        },
         //编辑或新增成功后刷新列表
         updateList() {
          this.getGridData({list:getList });//接口
        },
           cancel() {
          this.dialogVisible = false
          // this.updateList()
        },
    //下拉转换
    dataArrSelect(arr) {
    //   arr.forEach((item) => {
    //     item.name = item.project_name;
    //   });
    //   return arr;
    },
    policyGet() {
    //   let policyConfig = getBaseConfig("APPLY_STATUS", true);
    //   this.formItemData[0].options = policyConfig;
    },
  },
  //表格数据
  created() {
    //列表
    this.getGridData({
      list: getList,
    });
//    this.formItemData[1].options =getBaseConfig("DOMAIN",true)
  },
  mounted() {
    this.project();
  },
};
</script>
<style lang="less" scoped>
.el-dialog {
  width: 30% !important;
}
</style>