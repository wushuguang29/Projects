<template>
  <el-container class="main-container role-set">
    <lh-table :table="table" :gridData="gridData" style='width:100%' :needPaging="false" :loading="loading"
    @handleBind="handleBind"
    @handleUnbind="handleUnbind"
    ></lh-table>
  </el-container>
</template>

<script>
import { getUserRoleList ,bindUserRole,unbindUserRole} from '@/api/user.js'
import { mapActions, mapGetters } from "vuex";
export default {
  name:'roleSet',
  data(){
    return {
			table: {
				// hasSelect: false,
        hasOperation: true,
        hasRowsNumber:true,
        green:'green',
				columns: [
					{
						text: '角色名称',
						dataIndex: 'name'
					},
					{
						text: '状态',
            dataIndex: 'status',
            render: (h, params) => {
              if(params.row.status){
                return h('span',{
                  style:{color:'#32b16c'},
                  domProps:{innerHTML:'已绑定'}
                });
              }else{
                return h('span','未绑定');
              }
						}
					}
				],	
				operation: {
					width: 100,
					data: [
						{
							text: '绑定',
							Fun: 'handleBind',
              type: 'success',
              controlBtnFun:this.controlBindBtn
            },
            {
							text: '解绑',
							Fun: 'handleUnbind',
              type: 'primary',
              controlBtnFun:this.controlUnbindBtn
						},
					]
				}
      }
    }
  },
  computed:{
    ...mapGetters({
      gridData: "baseUser/roleList/gridData",
      loading: "baseUser/roleList/loading",
    }),
  },
  methods:{
    ...mapActions({
      getGridData: "baseUser/roleList/getGridData",
    }),
    //绑定点击事件
    handleBind:function(options){
      const { row } = options;
      const user_id = Number(this.$route.query.user_id);
      bindUserRole({id:row.id,users_id:user_id}).then(res=>{
        this.$message(res.msg);
        this.getGridData({ list: getUserRoleList ,params:{users_id:user_id}});
      })
    },
    handleUnbind:function(options){
      const { row } = options;
      const user_id = Number(this.$route.query.user_id);
      unbindUserRole({id:row.id,users_id:user_id}).then(res=>{
        this.$message(res.msg);
        this.getGridData({ list: getUserRoleList ,params:{users_id:user_id}});
      })
    },
    controlBindBtn:function(row){
      return !row.status?true:false;
    },
    controlUnbindBtn:function(row){
      return row.status?true:false;
    },
  },
  created(){
    //获取列表数据
    this.getGridData({ list: getUserRoleList ,params:{users_id:this.$route.query.user_id}});
  }
}
</script>

<style lang="scss" scoped>
.role-set{
  margin-bottom:10px!important;
}
</style>