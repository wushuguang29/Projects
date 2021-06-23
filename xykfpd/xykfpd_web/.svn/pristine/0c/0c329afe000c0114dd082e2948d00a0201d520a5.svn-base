<template>
  <el-container class="data-share">
    <el-aside>
      <p
        v-for="item in modelList"
        :key="item.id"
        @click="modelClick(item.id)"
        :class="listId == item.id?'activeP':''"
      >{{item.title}}</p>
    </el-aside>
    <el-main>
      <div class="data-panel-add">
        <el-button type="success" icon="iconfont el-icon-plus" @click="addButtonClick" v-allow="'add'">新建</el-button>
      </div>
      <lh-table
        :gridData="dataShareList"
        :table="table"
        :needPaging="false"
        @handleDelete="handleDelete"
       
      ></lh-table>
      <data-share-window
        :dialogVisible.sync="dialogVisible"
        v-if="createDialog"
        @updateList="updateList"
      ></data-share-window>
    </el-main>
  </el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {getShareList,deleteShare} from '@/api/permission.js'
import DataShareWindow from './DataShareWindow.vue'
export default {
  name: "dataShare",
  components:{DataShareWindow},
  data() {
    return {
      dialogVisible:false,
      table:{
        hasRowsNumber:true,
        hasOperation: true,
        columns:[{
          text:'数据源',
          dataIndex:'share_from_name'
        },{
          text:'共享数据',
          dataIndex:'title'
        },{
          text:'共享范围',
          dataIndex:'share_target_name'
        },{
          text:'创建时间',
          dataIndex:'create_time'
        }],
        operation: {
          width: 80,
          data: [
            {
              text: "删除",
              Fun: "handleDelete",
              type: "danger",
              permission:'delete'
            },
          ],
        },
      },
      listId:0
    };
  },
  computed: {
    ...mapGetters({
      tableData: "basePermission/list/gridData",
      dataShareList:"basePermission/shareList/gridData",
      loading:"basePermission/shareList/loading",
    }),
    modelList:function(){
      return this.tableData
    },
    createDialog: function() {
      return this.dialogVisible;
    },
  },
  watch:{
    tableData:function(newValue,oldValue){
      let data = newValue.length?newValue:oldValue;
      if(data && data.length){
      this.listId = data[0].resources_id;
      this.modelClick(this.listId)
      }

    }
  },
  methods:{
    ...mapActions({
      getGridData: "basePermission/shareList/getGridData",
      deleteGrid: "basePermission/list/deleteGrid",
    }),
    modelClick:function(id){
      this.listId = id;
      this.getGridData({list:getShareList,params:{id:id}})
    },
    updateList:function(){
      this.getGridData({list:getShareList,params:{id:this.listId}})
    },
    addButtonClick:function(){
      this.dialogVisible = true;
    },
    handleDelete(options) {
      const { row, index } = options;
      this.deleteGrid({ deleteFun: deleteShare, params: { id: row.id } }).then(
        (res) => {
          this.$message(res.msg);
          this.getGridData({ list: getShareList ,params:{id:this.listId}});
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.data-share {
  height: 100%;
  /deep/ .el-aside {
    width: 260px;
    margin-right: 10px;
    background: #fff;
    p {
      margin: 0px;
      font-size: 12px;
      padding: 10px;
      display: block;
    }
    p.activeP {
      color: #4277fc;
    }
  }
  /deep/ .el-main {
    padding: 0;
    overflow: hidden;
  }
  .data-panel-add {
    padding: 10px 0;
    text-align: right;
  }
}
</style>