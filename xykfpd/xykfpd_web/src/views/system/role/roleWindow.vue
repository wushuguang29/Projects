<template>
  <el-dialog
    :visible="createDialog"
    :title="windowTitle"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form
      ref="roleFormRef"
      :model="roleForm"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="roleForm.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="机构" prop="region_id">
        <el-cascader
          :options="treeData"
          :props="treeProps"
          clearable
          v-model="roleForm.region_id"
        ></el-cascader>
      </el-form-item> -->
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="roleForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('roleFormRef')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { addRole, editRole } from "@/api/role.js";
export default {
  name: "roleWindow",
  props: {
    editStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    rowData: {
      type: Object,
    },
    createDialog: {
      type: Boolean,
      default: false,
    },
    windowTitle: {
      type: String,
    },
  },
  data() {
    return {
      treeProps: {
        label: "name",
        children: "children",
        checkStrictly: true,
        value: "id",
        emitPath: false,
      },
      treeData: [],
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        region_id: [{ required: true, message: "请选择机构", trigger: "blur" }],
      },
      roleForm: {
        id: 0,
        name: "",
        region_id: -1,
        remark: "",
      },
    };
  },
  methods: {
    handleAddConfirm: function (params) {
      addRole(params).then((res) => {
        this.suceessCallback(res);
      });
    },
    handleEditConfirm: function (params) {
      editRole(params).then((res) => {
        this.suceessCallback(res);
      });
    },
    suceessCallback(res) {
      this.$message(res.msg);
      this.$emit("updateList");
      this.handleClose();
    },
    handleConfirm: function (formName) {
      const params = this.roleForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editStatus) {
            this.handleEditConfirm(params);
          } else {
            this.handleAddConfirm(params);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose() {
      this.$emit("update:createDialog", false);
    },
    iterationDataRemoveEmptyChildren(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children.length === 0) {
          data[i].children = undefined;
        } else {
          this.iterationDataRemoveEmptyChildren(data[i].children);
        }
      }
      return data;
    },
  },
  created() {
    // getOrganizationList().then((res) => {
    //   const arr = this.iterationDataRemoveEmptyChildren(res.data);
    //   this.treeData = arr;
    // });
    if (this.editStatus) {
      Object.assign(this.roleForm, this.rowData);
    }
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  padding: 10px 20px;
  /deep/ .el-cascader {
    width: 100%;
  }
}
</style>