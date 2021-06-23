<template>
  <div>
    <el-form
      :model="formData"
      ref="ruleForm"
      :rules="rules"
      class="demo-form-inline"
      label-width="110px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="领域" prop="field">
           <el-select style="width:100%" v-model="formData.field"   @change="fieldChange" placeholder="请选择领域">
            <el-option
          
              v-for="item in field"
              :key="item.id"
              :label="item.project_approval_name"
              :value="item.id"
              
            >
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>
          <el-col :span="12">
          <el-form-item label="方面" prop="finance_money">
            <el-input
              
              v-model="formData.finance_money"
              placeholder="请输入方面"
            ></el-input>
          </el-form-item>
        </el-col>
      
      </el-row>
      <el-row>
      
         <el-col :span="12">
          <el-form-item label="标识码" prop="finance_money">
            <el-input
              
              v-model="formData.finance_money"
              placeholder="请输入标识码"
            ></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="12">
            <el-form-item label="题目类型" prop="topic">
          <el-select style="width:100%"   v-model="formData.topic" placeholder="请选择资金类型">
            <el-option
          
              v-for="item in topic"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
            </el-form-item>
        </el-col>
      </el-row>
  
     
    </el-form>
    <div class="bottom-btn">
      <el-button @click="handleConfirm" type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
// import { getProjectLandArea,updateProjectLandArea } from "@/api/projectLandArea.js";
// import {
//   getProjectApprovalList
// } from "@/api/project.js";
// import { addInfo,editInfo } from "@/api/fund.js";

export default {
  name: "projectWindow",
  props: {
    editStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    rowData: {
      type: Object,
    },
  },

  data() {
    return {
     
      formData: {},
      width: {
        width: "300px",
      },
      rules: {
        project_id: [
          { required: true, message: "请输入项目名称", trigger: "change" },
        ],

        topic: [
          { required: true, message: "请输入资金类型", trigger: "change" },
        ],

        finance_money: [
         { required: true, message: "请输入金额", trigger: "blur" },
        ],
        finance_date: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
      finance_moneytype: [
        {
          id: "1",
          name: "收入",
        },
        {
          id: "2",
          name: "支出",
        },
      ],
      topic:[],//题目
      field:[],//领域
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
      addOptionsDomain(){
           this.OptionsForm.domains.push({
          value: '',
          df:'',
          key: Date.now(),
           btn:false
        });
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now(),
           btn:false
        });
        console.log("date",Date.now())
      },
    submit() {},
    cancel() {
      this.$emit("handleClose");
    },
    ...mapActions({
      getGridData: "project/list/getGridData",
    }),
    fieldChange(val){
       let obj = {};
  obj = this.projects.find((item)=>{
     return item.id === val;
  });
  
  this.formData.project_name = obj.project_approval_name;
 
    },
    handleAddConfirm: function () {
  
    
      console.log("打印值",this.formData,this.dynamicValidateForm,this.OptionsForm)
       
       
    //   addInfo(this.formData).then((res) => {
    //     this.loading = true;

    //     try {
    //       if (res.code == 0) {
    //         this.$message({
    //           type: "success",
    //           message: "添加成功",
    //         });
    //         this.loading = false;
    //         this.$emit("handleClose", false);
    //         this.$parent.$emit("updateList");
    //       }
    //     } catch (error) {}
    //   });
    },
    handleEditConfirm: function () {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
         
           
         
       
          const { code, msg } = await editInfo(this.formData);
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
          // this.$message({
          //     message: "填写信息格式错误！",
          //     type: "error",
          //     duration: 3 * 1000
          // })
        }
      });
    },
    async project_rangeChange(value) {
      console.log("value", value);
    },
    handleConfirm: function () {
      if (this.editStatus) {
        console.log("进入");
        this.handleEditConfirm();
      } else {
        console.log("进入2");
        this.handleAddConfirm();
      }
    },
  },

  async created() {
    console.log("进入", this.rowData);
    this.loading = true;
     const { data } = await getProjectApprovalList();
     this.field = data.data;
      
       console.log("data",this.editStatus)
    if (this.editStatus) {
    console.log("赋值",this.rowData)
     this.formData={...this.rowData}
    }
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
.ts>>>.el-input{
    width: 90%;
}
.tsa>>>.el-input{
    width: 40%;
    margin-left: 3px;
}
.el-input--mini{
    float: left
}
</style>