<?php

namespace app\index\controller;

use app\common\model\AccessPermissionModel;
use app\common\model\OrganizationModel;
use app\common\model\RoleModel;
use app\index\validate\RoleValidate;
use think\Controller;
use think\Request;

class Role extends Controller
{

    /**
     * [getList 获取角色列表]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-02T13:38:06+0800
     * @param Request $request
     * @param RoleModel $roleModel
     * @return array [type]                   [description]
     */
    public function getList(Request $request, RoleModel $roleModel): array
    {

        $result = $roleModel->getList([
            'name' => $request->param('name'),
            'id'   => $request->param('id'),
        ], $request->param('page'), $request->param('limit'));

        return msgReturn(45003, $result);
    }

    /**
     * [create 创建角色]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-02T11:31:19+0800
     * @param Request $request [description]
     * @param RoleValidate $roleValidate [description]
     * @param RoleModel $roleModel [description]
     * @return  array
     * @throws \think\exception\PDOException
     */
    public function create(Request $request, RoleValidate $roleValidate, RoleModel $roleModel): array
    {

        $param = $roleValidate->goCheck($request->param(), 'add');


        $result = $roleModel->add([
            'name'     => $param['name'],
            'remark'   => $param['remark'],
            'handler_uid' => USER_ID,
            'create_time' => date('Y-m-d H:i:s')
        ]);
        if ($result) {
            return msgReturn(45003);
        }
        return msgReturn(46002);
    }

    /**
     * [update 编辑角色]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-02T17:05:55+0800
     * @param Request $request
     * @param RoleValidate $roleValidate
     * @param RoleModel $roleModel
     * @return array
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function update(Request $request, RoleValidate $roleValidate, RoleModel $roleModel): array
    {
        $roleValidate->goCheck($request->param(), 'edit');
        $params = [
            'id'     => $request->id,
            'name'   => $request->name,
            'remark' => $request->remark,
        ];
        return $roleModel->edit($params);
    }

    /**
     * [delete 删除角色]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-03T09:48:56+0800
     * @param Request $request [description]
     * @param RoleValidate $roleValidate [description]
     * @param RoleModel $roleModel [description]
     * @return array
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function delete(Request $request, RoleValidate $roleValidate, RoleModel $roleModel): array
    {
        $param = $roleValidate->goCheck($request->param(), 'del');
        return $roleModel->deleteRole($param['id']);
    }

    /**
     * [editAccessPermissions 编辑访问权限]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-03T13:31:04+0800
     * @param Request $request [description]
     * @param AccessPermissionModel $accessPermissionModel
     * @param RoleValidate $roleValidate [description]
     * @return array
     * @throws \think\exception\PDOException
     */
    public function editAccessPermissions(Request $request, AccessPermissionModel $accessPermissionModel, RoleValidate $roleValidate): array
    {
        $param = $roleValidate->goCheck($request->param(), 'edit_per');
        return $accessPermissionModel->bindAccessPermission(2, explode(',', $param['resource_id']), $param['target_id']);
    }

    /**
     * [getInfo 获取角色信息]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-15T14:46:25+0800
     * @param    Request                  $request  [description]
     * @param    RoleValidate             $validate [description]
     * @param    RoleModel                $model    [description]
     * @return array
     */
    public function getInfo(Request $request,RoleValidate $validate,RoleModel $model): array
    {
        $param = $validate->goCheck($request->param(), 'id');
        $info = $model->get($param['id']);
        return msgReturn(0,$info);
    }

    /**
     * [getRolePrivilegesTree 获取角色权限树]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-15T14:48:55+0800
     * @param Request $request [description]
     * @param RoleValidate $validate [description]
     * @param AccessPermissionModel $model [description]
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getRolePrivilegesTree(Request $request,RoleValidate $validate,AccessPermissionModel $model): array
    {
        $param = $validate->goCheck($request->param(), 'id');
        $data = $model->getResourcesTree($param['id'],2);
        return msgReturn(0,list_to_tree($data));
    }

}
