<template>
  <el-dialog title="新建数据共享" :visible="dialogVisible" width="600px" :before-close="handleClose">
    <el-form ref="submitFrom" :model="params" :rules="rules" class="data-share-form">
      <el-form-item label="数据来源于" required>
        <el-col :span="10">
          <el-form-item prop="from_type">
            <el-select
              clearable
              placeholder="请选择"
              v-model="params.from_type"
              @change="getRoleOne($event)"
              @clear="clearOne"
            >
              <el-option
                v-for="item in selectUserOneList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            prop="target_id_tree"
            :rules="[
              { required: typeOne ? true : false, message: '请选择数据来源' },
            ]"
            v-if="typeOne"
          >
            <lh-select-tree
              :selfData="selectDataOneList"
              :checkbox="true"
              :selected.sync="targetIdTree"
              v-model="params.target_id_tree"
              :checked_keys="targetIdArr"
              :defaultExpandedKeys="targetIdExpandArr"
            ></lh-select-tree>
          </el-form-item>
          <el-form-item
            v-else
            :rules="[
              { required: typeOne ? false : true, message: '请选择数据来源' },
            ]"
            prop="target_id_list"
          >
            <el-select
              placeholder="请选择"
              v-model="params.target_id_list"
              multiple
              @change="listChangeOne"
            >
              <el-option
                v-for="item in selectDataOneList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="共享的数据" required>
        <el-col :span="20">
          <el-form-item
            prop="resource_id"
            :rules="[{required: true,message:'请选择共享的数据',trigger:'blur'}]"
          >
            <el-select clearable placeholder="请选择" v-model="params.resource_id" multiple>
              <el-option
                v-for="item in tableData"
                :key="item.id"
                :label="item.title"
                :value="item.resources_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="数据共享到" required>
        <el-col :span="10">
          <el-form-item prop="share_type">
            <el-select
              clearable
              placeholder="请选择"
              v-model="params.share_type"
              @change="getRoleTwo($event)"
              @clear="clearTwo"
            >
              <el-option
                v-for="item in selectUserTwoList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            prop="share_target_id_tree"
            v-if="typeTwo"
            :rules="[
              { required: typeTwo ? true : false, message: '请选择数据共享人' },
            ]"
          >
            <lh-select-tree
              :selfData="selectDataTwoList"
              :checkbox="true"
              :selected.sync="shareTargetIdTree"
              v-model="params.share_target_id_tree"
              :checked_keys="shareTargetIdArr"
              :defaultExpandedKeys="shareTargetIdExpandArr"
            ></lh-select-tree>
          </el-form-item>
          <el-form-item
            v-else
            :rules="[
              { required: typeTwo ? false : true, message: '请选择数据共享人' },
            ]"
            prop="share_target_id_list"
          >
            <el-select
              placeholder="请选择"
              v-model="params.share_target_id_list"
              multiple
              @change="listChangeTwo"
            >
              <el-option
                v-for="item in selectDataTwoList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('submitFrom')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getShareTargetList, saveShareData } from "@/api/permission.js";
import { mapGetters } from "vuex";
import { getFilterBaseConfig } from "@/utils/common.js";
export default {
  name: "dataShareWindow",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectUserOneList: null,
      selectDataOneList: null,
      userOneObject: null,
      selectUserTwoList: null,
      selectDataTwoList: null,
      userTwoObject: null,
      targetIdTree: [],
      targetIdList: [],
      shareTargetIdTree: [],
      targetIdArr: [],//来源下拉树默认选中的节点
      shareTargetIdArr: [],//来源下拉树默认选中的节点
      targetIdExpandArr:[],//数据共享下拉树默认展开的节点
      shareTargetIdExpandArr:[],//数据共享下拉树默认展开的节点
      params: {
        target_id_list:[],
        share_target_id_list:[],
      },
      rules: {
        from_type: [
          { required: true, message: "请选择数据来源", trigger: "change" },
        ],
        share_type: [
          { required: true, message: "请选择数据共享人", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      tableData: "basePermission/list/gridData",
    }),
    typeOne() {
      if (this.userOneObject) {
        return this.userOneObject.organization_select;
      } else {
        return true;
      }
    },
    typeTwo() {
      if (this.userTwoObject) {
        return this.userTwoObject.organization_select;
      } else {
        return true;
      }
    },
  },
  methods: {
    getRoleOne: function(value) {
      if (!value) return false;
      this.userOneObject = this.selectUserOneList[
        this.selectUserOneList.findIndex((each) => each.id == value)
      ];
      getShareTargetList({
        from_type: this.userOneObject.from_type ? this.userOneObject.id : 0,
        node_type: this.userOneObject.node_type ? this.userOneObject.id : 0,
      }).then((res) => {
        if (this.userOneObject.organization_select) {
          this.selectDataOneList = res.data.tree;
          this.targetIdExpandArr=res.data.unfold_id?res.data.unfold_id:[];
        } else {
          this.selectDataOneList = res.data;
        }
      });
    },
    getRoleTwo: function(value) {
      if (!value) return false;
      this.userTwoObject = this.selectUserTwoList[
        this.selectUserTwoList.findIndex((each) => each.id == value)
      ];
      getShareTargetList({
        from_type: this.userTwoObject.from_type ? this.userTwoObject.id : 0,
        node_type: this.userTwoObject.node_type ? this.userTwoObject.id : 0,
      }).then((res) => {
        if (this.userTwoObject.organization_select) {
          this.selectDataTwoList = res.data.tree;
           this.shareTargetIdExpandArr=res.data.unfold_id?res.data.unfold_id:[];
        } else {
          this.selectDataTwoList = res.data;
        }
      });
    },
    clearOne: function() {
      this.params.target_id_list = null;
      this.targetIdArr= [];
    },
    clearTwo: function() {
      this.params.share_target_id_list = null;
       this.shareTargetIdArr= [];
    },
    listChangeOne:function(value){
      if(!this.typeOne){
        this.params.target_id_list = value;
        this.$forceUpdate()        
      }
    },
    listChangeTwo:function(value){
      if(!this.typeTwo){
        this.params.share_target_id_list = value;
        this.$forceUpdate()
      }
    },
    handleConfirm: function(formName) {
      let params = {};
      if(this.userOneObject && this.userTwoObject){
        params = Object.assign({}, this.params, {
          resource_id: this.params.resource_id.join(","),
          target_id: this.userOneObject.organization_select
            ? this.params.target_id_tree
            : this.params.target_id_list.join(","),
          share_target_id: this.userTwoObject.organization_select
            ? this.params.share_target_id_tree
            : this.params.share_target_id_list.join(","),
        });
      }
      console.log('params:',params)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveShareData(params).then((res) => {
            this.$message(res.msg);
            this.$emit("updateList");
            this.$emit("update:dialogVisible", false);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },
  },
  created() {
    const orgArr = getFilterBaseConfig(
      "COMPETENCE_ORGANIZATION_TYPE",
      "competence_select"
    );
    this.selectUserOneList = orgArr;
    this.selectUserTwoList = orgArr;
  },
  watch: {
    targetIdTree: function(value) {
      console.log(value)
      if (!value || !value.length) return;
      let arr = [];
      value.forEach((item) => arr.push(item.id));
      this.params.target_id_tree = arr.join(",");
    },
    shareTargetIdTree: function(value) {
      if (!value || !value.length) return;
      let arr = [];
      value.forEach((item) => arr.push(item.id));
      this.params.share_target_id_tree = arr.join(",");
    },
  },
};
</script>

<style lang="scss">
.data-share-form {
  /deep/ .el-select {
    width: 100% !important;
  }
}
</style>
