<template>
  <el-dialog
    :visible.sync="createDialog"
    title="修改密码"
    :before-close="handleClose"
    class="reset-password-form"
    :close-on-click-modal="false"
  >
    <el-form
      ref="resetPasswordFormRef"
      :model="resetPasswordForm"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="原密码" prop="old_password">
        <el-input
          type="password"
          v-model="resetPasswordForm.old_password"
          autocomplete="off"
          :show-password="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input
          type="password"
          v-model="resetPasswordForm.password"
          autocomplete="off"
          :show-password="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password_confirm">
        <el-input
          type="password"
          v-model="resetPasswordForm.password_confirm"
          autocomplete="off"
          :show-password="true"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('resetPasswordFormRef')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import { changePassword } from "@/api/user.js";
const errorReg = new Error("密码长度 6 -18 位,必须包含字母、数字");
const errorDiff = new Error("新密码不能与原密码一致!");
const errorSame = new Error("两次输入密码不一致!");
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;

export default {
  name: "resetPasswordWindow",
  props: {
    rowData: {
      type: Object,
      default: () => {},
    },
    createDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    var validatePassword = (rule, value, callback) => {
      let submitFormValues = this.resetPasswordForm;
      if (!value) {
        callback(errorReg);
      } else {
        //新密码规则校验
        if (passwordReg.test(value)) {
          //校验原密码不等于新密码
          if (submitFormValues.old_password) {
            if (value === submitFormValues.old_password) {
              callback(errorDiff);
            }
          }
          callback();
        } else {
          callback(errorReg);
        }
      }
    };
    var validatePasswordConfirm = (rule, value, callback) => {
      let submitFormValues = this.resetPasswordForm;
      if (!value) {
        callback(errorReg);
      } else {
        //确认密码规则校验
        console.log(passwordReg.test(value), value);
        if (passwordReg.test(value)) {
          if (value != submitFormValues.password) {
            callback(errorSame);
          } else {
            console.log("here");
            console.log(callback);
            callback();
          }
        } else {
          callback(errorReg);
        }
      }
    };
    var validateOldPassword = (rule, value, callback) => {
      let submitFormValues = this.resetPasswordForm;
      console.log(this.resetPasswordForm);
      if (!value) {
        callback(new Error("请输入原密码"));
      }
      callback();
    };
    return {
      rules: {
        old_password: [
          {
            // validator: validateOldPassword,
            message: "请输入原密码",
            required: true,
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePassword,
            required: true,
            trigger: "blur",
          },
        ],
        password_confirm: [
          {
            validator: validatePasswordConfirm,
            required: true,
            trigger: "blur",
          },
        ],
      },
      resetPasswordForm: {
        user_id: this.$store.state.user.userInfo.user_id,
        old_password: "",
        password: "",
        password_confirm: "",
      },
    };
  },
  methods: {
    handleConfirm: function (formName) {
      const params = this.resetPasswordForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePassword(params).then((res) => {
            this.$message(res.msg);
            this.$router.push({
          path: "/login",
        });
          });
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
};
</script>

<style></style>
