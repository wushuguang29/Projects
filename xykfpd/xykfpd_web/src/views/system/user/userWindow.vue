<template>
  <el-dialog
    :visible="createDialog"
    :title="windowTitle"
    :before-close="handleClose"
    class="user-form"
    :close-on-click-modal="false"
    width="60%"
  >
    <el-form
      ref="userFormRef"
      :model="userForm"
      label-width="120px"
      :rules="rules"
      style="overflow: hidden"
    >
      <el-form-item label="姓名" prop="username">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="userForm.gender">
          <template v-for="item in sexConfig">
            <el-radio :label="item.id" :value="item.id">{{
              item.name
            }}</el-radio>
          </template>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账户状态" prop="status">
        <el-radio-group v-model="userForm.status">
          <template v-for="item in statusConfig">
            <el-radio :label="item.id" :value="item.id">{{
              item.name
            }}</el-radio>
          </template>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="在职状态" prop="working_status">
        <el-radio-group v-model="userForm.working_status">
          <template v-for="item in workingStatusConfig">
            <el-radio :label="item.id" :value="item.id">{{
              item.name
            }}</el-radio>
          </template>
        </el-radio-group>
      </el-form-item>
      <template v-if="isRoot">
        <el-form-item label="区域管理员" prop="is_administrator">
          <el-radio-group v-model="userForm.is_administrator">
            <template v-for="item in isOrNotConfig">
              <el-radio :label="item.id" :value="item.id">{{
                item.name
              }}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="超级管理员" prop="is_root">
          <el-radio-group v-model="userForm.is_root">
            <template v-for="item in isOrNotConfig">
              <el-radio :label="item.id" :value="item.id">{{
                item.name
              }}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
      </template>
      <el-form-item label="账号" prop="account">
        <el-input v-model="userForm.account"></el-input>
      </el-form-item>
      <template v-if="!editStatus">
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="userForm.password"
            autocomplete="off"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_confirm">
          <el-input
            type="password"
            v-model="userForm.password_confirm"
            autocomplete="off"
            :show-password="true"
          ></el-input>
        </el-form-item>
      </template>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="userForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('userFormRef')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import { addUser, editUser } from "@/api/user.js";
import { getBaseConfig } from "@/utils/common";
import { mapActions } from "vuex";
const errorReg = new Error("密码长度 6 -18 位,必须包含字母、数字");
const errorDiff = new Error("新密码不能与原密码一致!");
const errorSame = new Error("两次输入密码不一致!");
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
export default {
  name: "userWindow",
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
    let validatePass = (rule, value, callback) => {
      if (this.editStatus) {
        callback();
        return;
      }
      let submitForm = this.$refs.userFormRef;
      if (!value) {
        callback(errorReg);
      } else {
        //新密码规则校验
        if (passwordReg.test(value)) {
          //确认密码是否存在
          if (this.userForm.password_confirm) {
            submitForm.validateField("password_confirm");
            callback();
          }
        } else {
          callback(errorReg);
        }
      }
    };
    let validatePassAgain = (rule, value, callback) => {
      if (this.editStatus) {
        callback();
        return;
      }
      let submitForm = this.$refs.userFormRef;
      if (!value) {
        callback(errorReg);
      } else {
        //确认密码规则校验
        let flag = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(value);
        if (flag) {
          if (value !== this.userForm.password) {
            callback(errorSame);
          } else {
            callback();
          }
        } else {
          callback(errorReg);
        }
      }
    };
    return {
      isRoot: this.$store.state.user.userInfo.is_root === 1,
      sexConfig: getBaseConfig("SEX", true),
      statusConfig: getBaseConfig("ACCOUNT_STATUS", true),
      workingStatusConfig: getBaseConfig("WORKING_STATUS", true),
      isOrNotConfig: getBaseConfig("IS_STATUS", true),
      rules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          {
            validator: validatePass,
            required: true,
            trigger: "blur",
          },
        ],
        password_confirm: [
          {
            validator: validatePassAgain,
            required: true,
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
      },
      userForm: {
        id: 0,
        username: "",
        gender: 1,
        status: 1,
        working_status: 1,
        is_administrator: 2,
        is_root: 2,
        account: "",
        password: "",
        password_confirm: "",
        mobile: "",
        email: "",
      },
    };
  },
  methods: {
    ...mapActions({
      getGridData: "baseUser/list/getGridData",
    }),
    handleAddConfirm: function (params) {
      addUser(params).then((res) => {
        this.suceessCallback(res);
      });
    },
    handleEditConfirm: function (params) {
      editUser(params).then((res) => {
        this.suceessCallback(res);
      });
    },
    suceessCallback(res) {
      this.$message(res.msg);
      this.$emit("updateList");
      this.handleClose();
    },
    handleConfirm: function (formName) {
      const params = this.userForm;
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
  },
  created() {
    if (this.editStatus) {
      Object.assign(this.userForm, this.rowData);
    }
  },
};
</script>

<style lang="scss" scoped>
.user-form {
  /deep/ .el-dialog__body {
    overflow: scroll;
    padding: 10px 20px;
  }
}
</style>
