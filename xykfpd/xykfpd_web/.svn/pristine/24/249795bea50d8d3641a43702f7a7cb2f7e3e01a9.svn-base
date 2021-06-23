<template>
  <el-dialog
    :visible="createDialog"
    :title="windowTitle"
    :before-close="handleClose"
    class="system-config"
    width="40%"
    :close-on-click-modal="false"
  >
    <el-form
      ref="systemConfigFormRef"
      :model="systemConfigForm"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="配置标识" prop="name">
        <el-input v-model="systemConfigForm.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="配置标题" prop="title">
        <el-input v-model="systemConfigForm.title"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input
          v-model="systemConfigForm.sort"
          type="number"
          min="0"
        ></el-input>
      </el-form-item>
      <el-form-item label="作用域" prop="scope">
        <el-select v-model="systemConfigForm.scope">
          <el-option
            v-for="item in scopeData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            >{{ item.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配置类型" prop="type">
        <el-select v-model="systemConfigForm.type">
          <el-option
            v-for="item in typeData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            >{{ item.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配置分组" prop="group">
        <el-select v-model="systemConfigForm.group">
          <el-option
            v-for="item in groupData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            >{{ item.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配置值" prop="value">
        <el-input v-model="systemConfigForm.value" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="配置项" prop="extra">
        <el-input
          v-model="systemConfigForm.extra"
          type="textarea"
          :rows="3"
          placeholder="1:四舍五入;2:奇进偶不进;3:奇偶不进"
        ></el-input>
      </el-form-item>
      <el-form-item label="配置说明" prop="remark">
        <el-input
          v-model="systemConfigForm.remark"
          type="textarea"
          :rows="2"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('systemConfigFormRef')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { getBaseConfig } from "../../../utils/common";
import { editSystemConfig } from "@/api/systemConfig.js";
export default {
  name: "systemConfigWindow",
  props: {
    createDialog: {
      type: Boolean,
      default: false,
    },
    rowData: {
      type: Object,
    },
    windowTitle: {
      type: String,
    },
  },
  data() {
    return {
      scopeData: getBaseConfig("CONFIG_SCOPE", true),
      typeData: getBaseConfig("CONFIG_TYPE", true),
      groupData: getBaseConfig("CONFIG_GROUP", true),
      rules: {
        name: [{ required: true, trigger: "blur" }],
        title: [{ required: true, trigger: "blur" }],
        sort: [{ required: true, message: "请选择排序", trigger: "blur" }],
        scope: [{ required: true, message: "请选择作用域", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        group: [{ required: true, message: "请选择分组", trigger: "blur" }],
        value: [{ required: true, message: "请输入配置值", trigger: "blur" }],
        extra: [{ required: true, message: "请输入配置项", trigger: "blur" }],
      },
      systemConfigForm: {
        id: 0,
        name: "",
        title: "",
        sort: 0,
        scope: "",
        type: "",
        group: "",
        value: "",
        extra: "",
        remark: "",
      },
    };
  },
  methods: {
    handleConfirm(formName) {
      const params = this.systemConfigForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editSystemConfig(params).then((res) => {
            this.$message(res.msg);
            this.$emit("updateList");
            this.handleClose();
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
  created() {
    Object.assign(this.systemConfigForm, this.rowData);
  },
};
</script>

<style lang="scss" scoped>
.system-config {
  /deep/ .el-dialog__body {
    overflow: scroll;
    padding: 10px 20px;
  }
  /deep/ .el-select {
    width: 100%;
  }
}
</style>