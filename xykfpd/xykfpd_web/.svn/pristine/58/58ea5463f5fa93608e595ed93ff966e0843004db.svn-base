<template>
  <el-form
    :model="windowData"
    label-position="right"
    :label-width="labelWidth"

    inline
    ref="submitForm"
    @slotSubmit="slotSubmit"
    :rowData="rowData"
  >
    <el-form-item
      v-for="(item, index) in windowItem"
      :key="index"
      :label="item.label"
      :prop="item.name"
      :rules="item.rules"
      v-show="item.hidden ? !item.hidden : true"
      class="form-item-width"
    >
      <FormItem :formItemOptions="item" :formData="windowData"></FormItem>
    </el-form-item>
  </el-form>
</template>
<script>
import FormItem from '../../LhSearchBar/src/FormItem';
const errorReg = new Error('密码长度 6 -18 位,必须包含字母、数字');
const errorDiff = new Error('新密码不能与原密码一致!');
const errorSame = new Error('两次输入密码不一致!');
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
//todo：校验一致和不一致，应该单独独立出去一个文件
function validatePassword(rule, value, callback) {
	if (this.windowThis.editStatus) {
		callback();
		return;
  }
	let submitForm = this.windowThis.$refs.submitForm;
	if (!value) {
		callback(errorReg);
	} else {
    //新密码规则校验
    if(passwordReg.test(value)){
      //确认密码是否存在
      if (submitForm.model.password_confirm) {
        submitForm.validateField('password_confirm');
        callback();
      }
      //校验原密码不等于新密码
      if (submitForm.model.old_password) {
        if (value === submitForm.model.old_password) {
          callback(errorDiff);
        }
      }
    }else{
		  callback(errorReg);
    }
	}
}
function validatePasswordConfirm(rule, value, callback) {
	if (this.windowThis.editStatus) {
		callback();
		return;
	}
	let submitForm = this.windowThis.$refs.submitForm;
	if (!value) {
		callback(errorReg);
	}else{
    //确认密码规则校验
    let flag = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(value)
    if(flag){
      if (value !== submitForm.model.password) {
        callback(errorSame);
      } else {
        callback();
      }      
    }else{
      callback(errorReg)
    }
  }
}
function validateOldPassword(rule, value, callback) {
	if (this.windowThis.editStatus) {
		callback();
		return;
	}
	let submitForm = this.windowThis.$refs.submitForm;
	if (!value) {
		callback(new Error('请输入原密码'));
  }
  callback();
}
export default {
	name: 'LhWindow',
	components: { FormItem },
	props: {
		editStatus: {
			type: Boolean,
			default: false
		},
		windowItem: {
			type: Array,
			requeried: true
    },
    rowData:{
      type:Object,
      default:()=>{}
    },
    labelWidth:{
      type:String,
      default:'80px'
    },
	},
	data() {
		return {
			//表单键值对
			windowData: {}
		};
	},
	created() {
    //构面要显示的formitem
    this.resetForm();
    //注册插槽提交事件
    this.bus.$on('slotSubmit',this.slotSubmit)
    //rowdata：编辑数据存在，则修改defaultValue，并把值写入表单windowData
    if(!this.rowData) return
    if(!(Object.keys(this.rowData).length === 0 && this.rowData.constructor === Object)){
      this.windowItem.forEach(v=>{
        v.defaultValue = this.rowData[v.name]
      })
      this.setFormValues();
    }
  },
	methods: {
		//初始化、重置窗口
		resetForm: function() {
			const obj = {};
			this.windowItem.forEach(v => {
        obj[v.name] = v.defaultValue || '';
        //todo：同上，要优化独立校验文件
				if (v.type === 'password' && v.lhPassword) {
					switch (v.lhPassword) {
						case 'oldPassword':
							v.rules = [
								{
									validator: validateOldPassword,
									required: true,
									windowThis: this,
									trigger: 'change'
								}
							];
							break;
						case 'passwordConfirm':
							v.rules = [
								{
									validator: validatePasswordConfirm,
									required: true,
									windowThis: this,
									trigger: 'change'
								}
							];
							break;
						default:
							v.rules = [
								{
									validator: validatePassword,
									windowThis: this,
									required: true,
									trigger: 'change'
								}
							];
					}
        }
        if ('hidden' in v && !v.hiddenfield) {
					v.hidden = this.editStatus;
				}
			});
      this.windowData = obj;
    },
    //优化：表单校验，一致性与不一致性的校验要提出来，做一个文件
    //以及动态写入表单校验函数的关联怎么匹配，要想一下
    slotSubmit:function(config){
      let {form,params} = config;
			form.validate((valid, error) => {
				if (valid) {
          this.$emit('handleConfirm',params)
				} else {
					console.log('error submit!!');
					return false;
				}
			});      
    },
    //赋值
		setFormValues: function() {
			this.windowItem.forEach(v => {
				this.windowData[v.name] = v.defaultValue;
      });      
		},
  },
  beforeDestroy () {
    //注销插槽提交事件
    this.bus.$off('slotSubmit');
  },
};
</script>
<style lang="scss">
.form-item-width {
  width: 100%;
  .el-form-item__content {
    width: 70%;
    .el-select {
      width: 100%;
    }
    .el-input-number {
      width: 100%;
    }
  }
}
</style>
