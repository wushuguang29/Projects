<template>
  <el-container
    class="main-container"
    ref="windowRef"
    @slotSubmit="slotSubmit"
    :windowType="windowType"
  >
    <el-tree
      :data="treeData"
      show-checkbox
      @check-change="handleCheckChange"
      node-key="id"
      :default-checked-keys="defaultKeys"
      ref="organizationTree"
      default-expand-all
      v-loading="loading"
      style="width:100%"
    ></el-tree>
  </el-container>
</template>

<script>
import {
  getOrganizationList,
  editOrganizationAccess,
  getOrganizationTree
} from "@/api/organization.js";
import { getRoleList, editRoleAccess ,getRoleTreeById} from "@/api/role.js";
import { mapActions } from "vuex";
export default {
  name: "authorityWindow",
  data() {
    return {
      treeData: null,
      arr:[],
      checkedIds:'',
      types: {
        Role: {
          listUrl: getRoleList,
          treeUrl:getRoleTreeById,
          editUrl: editRoleAccess
        },
        Organization: {
          listUrl: getOrganizationList,
          treeUrl:getOrganizationTree,
          editUrl: editOrganizationAccess
        }
      },
      loading:true
    };
  },
  props: {
    rowData: {
      type: Object,
      required: true
    },
    windowType: {
      type: String,
      required: true
    }
  },
  computed: {
    defaultKeys: function() {
      return this.rowData.access_permission
        ? this.rowData.access_permission.split(",")
        : [];
    }
  },
  methods: {
    ...mapActions({
      getRoleGridData: "baseRole/list/getGridData",
      getOrganizationGridData: "baseOrganization/list/getGridData"
    }),
    handleCheckChange: function(data, checked, indeterminate) {
      let nodes = this.$refs.organizationTree.getCheckedNodes();
      this.arr = [];
      if (nodes.length) {
        nodes.forEach(each => {
          this.arr.push(each.id);
        });
      }
      this.checkedIds = this.arr.join(",");
    },
    //插槽提交
    slotSubmit: function(params) {
      params.target_id = this.rowData.id;
      //获取编辑的api回调
      let funName = this.types[this.windowType]["editUrl"];
      funName(params).then(res => {
        //更新主列表
        this["get" + this.windowType + "GridData"]({
          list: this.types[this.windowType]["listUrl"]
        });
        //触发dialog的关闭事件
        this.$parent.$emit("handleClose", false);
        this.$message(res.msg)
      });
    },
    setCheckedData:function(arr){
      arr.forEach(each=>{
        if(each.checked){
          this.arr.push(each.id)
        }
        if(each.children?.length){
          this.setCheckedData(each.children)
        }
      })
    }
  },
  created() {
    //拿tree结构的数据
    const id = this.rowData.id;
    const funName = this.types[this.windowType]["treeUrl"];
    funName({ id: id }).then(res => {
      this.treeData = res.data;
      this.arr = [];
      this.setCheckedData(res.data)
      this.checkedIds = this.arr.join(',')
      this.$refs.organizationTree.setCheckedKeys(this.arr);
      this.loading=false;
    });
    //注册插槽提交事件
    this.bus.$on("slotSubmit", this.slotSubmit);
  },
  beforeDestroy() {
    //注销插槽提交事件
    this.bus.$off("slotSubmit");
  }
};
</script>

<style>
</style>