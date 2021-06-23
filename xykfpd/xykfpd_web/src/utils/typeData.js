
export default{
    resources: {
        open_mode: [{id: 1, name: '弹框'}, {id: 2, name: '打开新页面'}],
        status: [{id: 1, name: '启用'}, {id: 2, name: '禁用'}],
        type:[{id:1,name:'菜单'},{id:2,name:'按钮'}],
        hidden:[{id:1,name:'是'},{id:2,name:'否'}],
        middleware:[{id:'JWTAuthAndRefresh', name:'JWTAuthAndRefresh'},{id:'Competence',name:'Competence'},{id:'Config',name:'Config'}],
        extra:[{id:'competence',name:"数据权限模块"},{id:'annex',name:"附件模块"},{id:'business',name:"业务模块"},{id:'hot_key',name:"快捷键"},{id:'review',name:"审批流"}]


    },
}
