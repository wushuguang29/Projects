<template>
  <div>
    <el-form
      :model="formData"
      ref="ruleForm"
      :rules="rules"
      class="demo-form-inline"
      label-width="110px"
      :disabled="isLook"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户" prop="user_name">
            <el-input v-model="formData.user_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="formData.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="领域" prop="domain">
            <el-select
              style="width: 100%"
              v-model="formData.domain"
              @change="domainChange"
              placeholder="请选择领域"
            >
              <el-option
                v-for="item in domain"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="方面" prop="side">
            <el-input
              v-model="formData.side"
              placeholder="请输入方面"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="评测人" prop="member_name">
            <el-input v-model="formData.member_name" palceholder="请输入">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="推送状态" prop="push_status">
            <el-select
              style="width: 100%"
              v-model="formData.push_status"
              @change="typeChange"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in type"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="评测结果" prop="evaluating_result">
            <el-input
              v-model="formData.evaluating_result"
              style="height: 60px"
              palceholder="评测结果"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="推送内容" prop="push_message">
            <el-input
              type="textarea"
              v-model="formData.push_message"
              style="height: 60px"
              palceholder="推送内容"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="bottom-btn">
      <el-button @click="handleConfirm" type="primary" v-if="!isLook"
        >保存</el-button
      >
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getList, send, browse } from "@/api/information";
import { mapActions } from "vuex";
import { getBaseConfig } from "@/utils/common";
// import { getProjectLandArea,updateProjectLandArea } from "@/api/projectLandArea.js";
// import {
//   getProjectApprovalList
// } from "@/api/project.js";
// import { addInfo,editInfo } from "@/api/fund.js";

export default {
  name: "push",
  props: {
    editStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    isLook: {
      type: Boolean,
      default: false,
      required: true,
    },
    rowData: {
      type: Object,
    },
  },

  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      formData: {
        type: 2,
      },
      width: {
        width: "300px",
      },
      rules: {
        user_name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        domain: [{ required: true, message: "请选择领域", trigger: "blur" }],

        side: [{ required: true, message: "请输入方面", trigger: "blur" }],
        phone: [
          {
            required: true,
            validator: checkPhone,
            trigger: ["blur", "change"],
          },
        ],
        begin: [{ required: true, message: "请输入", trigger: "blur" }],
        side: [{ required: true, message: "请输入", trigger: "blur" }],
        push_message: [
          { required: true, message: "请输入推送内容", trigger: "blur" },
        ],
        evaluating_result: [
          { required: true, message: "请输入评测结果", trigger: "blur" },
        ],
      },

      questionType: [], //题目
      type: [], //状态
      domain: [], //领域
      options: [],
      optionsData: [],
      policy: [],
      formInline: {
        user: "",
        region: "",
      },
      isSee: {
        type: Boolean,
        default: true,
        required: true,
      },
    };
  },
  methods: {
    end_change: function (event) {
      //  var value = event.target.value;
      // if (!/^\+?[1-9][0-9]*$/.test(value)) {
      //   alert('只能正整数');
      //   event.target.value = '';
      // }
      console.log("进入", event);
      if (!/^\+?[1-9][0-9]*$/.test(event)) {
        return (event = "");
      }
    },
    typeChange(e) {
      console.log(e);
    },

    submit() {},
    cancel() {
      this.$emit("handleClose");
    },
    ...mapActions({
      getGridData: "evaluation/list/getGridData",
    }),
    domainChange(val) {},
    handleAddConfirm: function () {
      console.log("打印值", this.formData);
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          let a = {};
          a.id = this.formData.id + "";
          a.data = this.formData.push_message;
          const { code, msg } = await send(a);
          if (code == 0) {
            this.$message({
              message: msg,
              type: "success",
              duration: 3 * 1000,
            });
            this.loading = false;
            this.$parent.$emit("updateList");
            this.$parent.$emit("handleClose", false);
          } else {
            this.loading = false;
            this.$message({
              message: msg,
              type: "error",
              duration: 3 * 1000,
            });
          }
        } else {
        }
      });
    },

    async project_rangeChange(value) {
      console.log("value", value);
    },
    handleConfirm: function () {
      this.handleAddConfirm();
    },
  },

  async created() {
    console.log("进入", this.rowData);
    this.loading = true;
    //  const { data } = await getProjectApprovalList();
    this.domain = getBaseConfig("DOMAIN", true);
    this.type = getBaseConfig("PUSH_STATUS", true);
    console.log("data", this.editStatus, this.isLook);
    const { data } = await browse({ id: this.rowData.id });
    console.log("res", data);
    this.formData = data;
    this.loading = false;
  },
};
</script>
<style scoped>
/* .bottom-btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
} */
.ts >>> .el-input {
  width: 80%;
}
.tsa >>> .el-input {
  width: 40%;
  margin-left: 3px;
}
.el-input--mini {
  float: left;
}
</style>