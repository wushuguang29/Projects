<?php

namespace app\index\controller;

use app\common\model\RoleModel;
use app\common\model\UsersRegionModel;
use app\common\model\UsersRoleModel;
use app\index\validate\UserRoleValidate;
use http\Exception\RuntimeException;
use think\Controller;
use think\Exception;
use think\Request;
use think\Db;

class UserRole extends Controller
{
    /**
     * [bindRole 用户绑定角色]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-14T10:55:15+0800
     * @param    Request                  $request  [description]
     * @param    UsersRoleModel           $model    [description]
     * @param    UserRoleValidate             $validate [description]
     * @return   array
     */
    public function bindRole(Request $request, UsersRoleModel $model, UserRoleValidate $validate): array
    {
        try {
            Db::startTrans();

            $param = $validate->goCheck($request->param(), 'bind');

            $result = $model->add([
                'id' => $param['id'],
                'users_id' => $param['users_id']
            ]);

            if ($result) {
                Db::commit();
                return msgReturn(45003);
            }

            throw new Exception("");

        } catch (\Exception $exception) {
            dump($exception);die;
            Db::rollback();
            return msgReturn(46002);
        }
    }

    /**
     * [unbindRole 用户解绑角色]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-14T11:02:50+0800
     * @param Request $request [description]
     * @param UsersRoleModel $model [description]
     * @param UserRoleValidate $validate [description]
     * @return   array
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function unbindRole(Request $request, UsersRoleModel $model, UserRoleValidate $validate): array
    {

        $param = $validate->goCheck($request->param(), 'bind');

        try {
            Db::startTrans();
            $result = $model->del([
                'id'       => $param['id'],
                'users_id' => $param['users_id'],
            ]);

            if ($result) {
                Db::commit();
                return msgReturn(45003);
            }
            throw new Exception("");

        } catch (Exception $e) {
            Db::rollback();
            return msgReturn(46002);
        }



    }

    /**
     * [getRoleDataByUser 获取用户角色列表]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-14T17:57:59+0800
     * @param Request $request [description]
     * @param UserRoleValidate $validate
     * @return array [type]                            [description]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getRoleDataByUser(Request $request,UserRoleValidate $validate): array
    {
        $param = $validate->goCheck($request->param(),'users_id');

        $allRole = Db::table('role')->field(['id','name'])->select();

        $userRole = Db::table('users_role')->where('users_id',$param['users_id'])->column('role_id');

        foreach ($allRole as $key => &$value) {
            if(in_array($value['id'], $userRole, false)){
                $value['status'] = true;
            }else{
                $value['status'] = false;
            }
        }
        return msgReturn(0,$allRole);
    }


    /**
     * [rolePersonnel 查看角色下面的人员]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-03T14:28:51+0800
     * @param Request $request
     * @param UserRoleValidate $roleValidate
     * @param RoleModel $roleModel
     * @return   array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function rolePersonnel(Request $request, UserRoleValidate $roleValidate, RoleModel $roleModel): array
    {
        $param = $roleValidate->goCheck($request->param(), 'id');

        $type = empty($param['type']) ? 1 : $param['type'];

        $data = $roleModel->getPersonnelByRole([
            'id'       => $param['id'],
            'username' => $request->param('username'),
        ], $type);

        return msgReturn(0, $data);
    }
}
