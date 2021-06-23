<template>
  <el-dialog
    :title="windowTitle"
    :before-close="handleClose"
    :class="dialogCommon"
    :width="windowWidth"
    :visible.sync="dialogVisible"
    @handleClose="handleClose"
    close-on-press-escape
    @updateList="updateList"
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" v-if="hasButton">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('submitForm')" v-if="hasButton">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
	export default {
		name: 'LhDialog',
		props: {
			dialogVisible: {
				type: Boolean,
				default: true
			},
			windowWidth: {
				type: String,
				default: '40%'
			},
			windowTitle: {
				type: String,
				default: '标题'
			},
			hasButton:{
				type:Boolean,
				default:true
      },
      dialogCommon:{
        type:String,
        default:''
      }
		},
		data() {
			return {};
		},
		methods: {
			handleClose(done) {
				this.$emit('update:dialogVisible', false);
      },
      updateList(){
        this.$emit('updateList')
      },
			handleConfirm: function(formName) {
        //todo：这里应该用具名插槽配对的方式查找。但是还没摸索出动态具名插槽的写入方式
        //优化：form表单和tree的表单，共用dialo时，提交的数据和方式，有没有可能统一？
        const _this = this.$slots.default[0].componentInstance;
        const form = _this.$refs.windowRef.$refs[formName];
        let params = null;
        console.log(_this,form)
        if(form){
          params = {
            form: form,
            params: form.model
          };
        }else{
          //树结构保存checkedIds
          params = {
            resource_id: _this.checkedIds
          }
        }
        //todo：这里应该用provide和inject，vue.observe来实现组件间跨层级的数据和方法的传递
        /*优化：组件间跨层级的获取实例，应该写自定义指令v-lh-ref
        *方式一：递归，缺陷：子组件更新的时候，父组件不能及时更新
        *方式二：用callback回调ref
        */
        this.bus.$emit('slotSubmit', params)
			}
		}
	};
</script>
<style lang="scss" scoped>
.dialog-common {
  /deep/ .el-dialog__wrapper {
    overflow: hidden !important;
  }
  /deep/ .el-dialog__body {
    padding-bottom: 80px !important;
    padding: 10px 5px;
    height: 280px;
    overflow: scroll;
  }
  /deep/ .el-dialog__footer {
    position: absolute;
    padding: 10px;
    bottom: 0;
    right: 0;
    z-index: 9999;
    width: 100%;
    background: #fff;
  }
}
</style>
