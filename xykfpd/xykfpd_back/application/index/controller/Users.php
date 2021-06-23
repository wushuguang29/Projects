<?php

namespace app\index\controller;

use app\common\model\AccessPermissionModel;
use app\common\model\DataPemissionShareModel;
use app\common\model\OrganizationModel;
use app\common\model\UsersModel;
use app\index\validate\UserValidate;
use http\Exception\RuntimeException;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\Request;
use think\Db;

class Users extends Controller
{
    /**
     * [getList 获取所有用户列表]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-24T09:57:16+0800
     * @param Request $request
     * @param UsersModel $usersModel
     * @return array [type]                   [description]
     */
    public function getList(Request $request, UsersModel $usersModel)
    {
        $params = [
            'username' => $request->username,
        ];

        $page  = $request->page ? $request->page : 1;
        $limit = $request->limit ? $request->limit : 25;
        return msgReturn(45003, $usersModel->getList($params, $page, $limit));
    }

    /**
     * [getUser 获取用户详情]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-24T09:57:30+0800
     * @param Request $request
     * @param UserValidate $userValidate
     * @return array [type]                   [description]
     */
    public function getUser(Request $request, UserValidate $userValidate)
    {
        // $userValidate = new UserValidate();
        // dump($request->param());
        $userValidate->goCheck($request->param(), 'id');
        $info = UsersModel::getUserInfo($request->id);
        return $info;
    }

    /**
     * [create 新增用户]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-24T09:57:41+0800
     * @param Request $request
     * @param UsersModel $UsersModel
     * @param UserValidate $userValidate
     * @return array [type]                   [description]
     */
    public function create(Request $request, UsersModel $UsersModel, UserValidate $userValidate)
    {
        $userValidate->goCheck($request->param(), 'add');
        //判断用户名或账号是否存在
        $data = [
            'username'          => $request->username,
            'account'           => $request->account,
            'password'          => password_hash($request->password, PASSWORD_BCRYPT),
            'gender'            => $request->gender,
            'mobile'            => $request->mobile,
            'handle_id'         => USER_ID,
            // 'status' => $request->status,
        ];

        return $UsersModel->addUser($data);

    }

    /**
     * [edit 编辑用户]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-24T09:57:52+0800
     * @param Request $request
     * @param UsersModel $UsersModel
     * @param UserValidate $userValidate
     * @return array [type]                   [description]
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function edit(Request $request, UsersModel $UsersModel, UserValidate $userValidate)
    {
        $userValidate->goCheck($request->param(), 'edit');

        $data = [
            'username'       => $request->username,
            'account'        => $request->account,
            // 'password' => encryptPwd($request->password),
            'password'       => password_hash($request->password, PASSWORD_BCRYPT),
            'gender'         => $request->gender,
            'mobile'         => $request->mobile,
            'email'          => $request->email,
            'id'             => $request->id,
            'working_status' => $request->working_status,
            'status'         => $request->status,
        ];
        return $UsersModel->editUser($data);

    }

    /**
     * [delete 删除用户]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-24T09:58:05+0800
     * @param Request $request
     * @param UserValidate $userValidate
     * @return array [type]                   [description]
     */
    public function delete(Request $request, UserValidate $userValidate)
    {
        $userValidate->goCheck($request->param(), 'id');

        return UsersModel::deleteUser($request->id);
    }

    /**
     * [unlockUser 解除被锁定的账户]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-24T09:58:17+0800
     * @param Request $request
     * @param UserValidate $userValidate
     * @return array [type]                   [description]
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function unlockUser(Request $request, UserValidate $userValidate)
    {
        $userValidate->goCheck($request->param(), 'id');

        return UsersModel::unlock($request->id);

    }

    /**
     * [resetPassword 重置账户密码]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-24T09:58:39+0800
     * @param Request $request
     * @param UserValidate $userValidate
     * @return array [type]                   [description]
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function resetPassword(Request $request, UserValidate $userValidate)
    {
        $userValidate->goCheck($request->param(), 'id');

        return UsersModel::reset($request->id);
    }

    /**
     * [changePassowrd 修改密码]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-02T09:47:16+0800
     * @param Request $request
     * @param UsersModel $UsersModel
     * @param UserValidate $userValidate
     * @return array [type]                   [description]
     */
    public function changePassowrd(Request $request, UsersModel $UsersModel, UserValidate $userValidate): array
    {
        $userValidate->goCheck($request->param(), 'change');
        $params = [
            'id'           => USER_ID,
            'password'     => password_hash($request->password, PASSWORD_BCRYPT),
            'old_password' => $request->old_password,
        ];
        return $UsersModel->change($params);

    }

    /**
     * [bindAccessPermission 绑定操作权限]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-14T10:43:38+0800
     * @param Request $request [description]
     * @param AccessPermissionModel $model [description]
     * @param UserValidate $validate
     * @return array [type]                            [description]
     * @throws \think\exception\PDOException
     */
    public function bindAccessPermission(Request $request, AccessPermissionModel $model, UserValidate $validate): array
    {
        $validate->goCheck($request->param(), 'edit_per');

        return $model->bindAccessPermission(3, explode(',', $request->resource_id), $request->target_id);
    }

    /**
     * [getUserDataPremissionData 获取用户数据权限]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-14T15:31:34+0800
     * @param Request $request
     * @param UserValidate $validate
     * @param DataPemissionShareModel $model
     * @return array [type]                   [description]
     */
    public function getUserDataPemissionData(Request $request,UserValidate $validate,DataPemissionShareModel $model): array
    {
        $validate->goCheck($request->param(),'get_dp');
        $users_id = $request->users_id;
        $resource_id = $request->resource_id;
        $data = $model->getUserDataPermissionData($users_id,$resource_id);
        return msgReturn(0,$data);
    }

    //获取用户操作权限
    public function getUserPrivilegesTree(Request $request,UserValidate $validate,AccessPermissionModel $model){
        $validate->goCheck($request->param(),'users_id');
        $userResource = $model->getResourcesTree($request->users_id,3);
        $data = list_to_tree($userResource);
        return msgReturn(0,$data);

    }

    /**
     * [getOrganizationByUser 获取机构树]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-15T10:10:13+0800
     * @param Request $request [description]
     * @param UserValidate $validate [description]
     * @param OrganizationModel $organizationModel
     * @return array [type]                             [description]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getOrganizationByUser(Request $request,UserValidate $validate,OrganizationModel $organizationModel): array
    {
        $param = $validate->goCheck($request->param(),'users_id');

        $field = [
            'name',
            'code',
            'node_type',
            'create_time',
            'id',
            'pid',
        ];

        $where[] = ['organization.region_id', '=', USER_ARR['region_id']];

        if (USER_ARR['is_root'] === 1) {
            $where = [];
        }

        $data =  $organizationModel->field($field)->where($where)->append(['person','addType','label'])->select()->toArray();

        $userOrganization = Db::table('users_organization')->alias('us')
            ->join('organization','us.organization_id = organization.id','LEFT')
            ->where('us.users_id',$param['users_id'])
            ->where($where)
            ->distinct(true)
            ->column('organization.id');

        foreach ($data as $key => $value) {
            if(in_array($value['id'], $userOrganization,false)){
                $data[$key]['checked'] = true;
            }else{
                $data[$key]['checked'] = false;
            }
        }

        return msgReturn(0,list_to_tree($data));
    }

    /**
     * [getInfo 获取用户信息]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-16T11:08:47+0800
     * @param Request $request [description]
     * @param UsersModel $model [description]
     * @param UserValidate $validate [description]
     * @return array [type]                             [description]
     */
    public function getInfo(Request $request ,UsersModel $model ,UserValidate $validate): array
    {
        $validate->goCheck($request->param(),'id');
        $info = $model->get($request->id);
        return msgReturn(0,$info);
    }

    /**
     * 查询用户已经关联的区域
     * @param array $users 用户 ID
     * @param int $regionId 区域 ID
     * @param bool $type 状态 true:新增  false:删除
     * @return array
     * @author Zhang zw
     * @date 2020/12/1 14:14
     */
    public static function getUserAssociated(array $users,int $regionId,bool $type): array
    {

        $result = [];

        // 查询关联表内的所有数据
        foreach ($users AS $key => $value) {
            $usersRole = Db::table('users_role')->alias('ur')
                ->join('role r','ur.role_id = r.id','LEFT')
                ->where('ur.users_id','=',$value)
                ->column('r.region_id');

            $usersOrganization = Db::table('users_organization')->alias('uo')
                ->join('organization o','uo.organization_id = o.id','LEFT')
                ->where('uo.users_id','=',$value)
                ->column('o.region_id');

            if ($type) {
                $regionIdArr = array_unique(array_merge($usersRole,$usersOrganization));

                if (count($regionIdArr) === 0) {
                    $result[] = ['users_id' => $value, 'organization_id' => $regionId, 'create_time' => date('Y-m-d H:i:s'), 'update_time' => date('Y-m-d H:i:s')];
                }

                if (count($regionIdArr) !== 0 && !in_array($regionId,$regionIdArr,false)) {
                    $result[] = ['users_id' => $value, 'organization_id' => $regionId, 'create_time' => date('Y-m-d H:i:s'), 'update_time' => date('Y-m-d H:i:s')];
                }

            }
            if ($type === false) {
                if (count(array_keys(array_merge($usersRole,$usersOrganization),$regionId)) === 1) {
                    $result[] = [['users_id','=', $value], ['organization_id','=', $regionId]];
                }
            }
        }

        return $result;
    }

    /**
     * 查询机构或者角色的区域 ID
     * @param int $type
     * @param array $associatedId
     * @return array
     * @author Zhang zw
     * @date 2020/12/6 16:34
     */
    public static function getRoleOrganizationRegionId(int $type, array $associatedId): array
    {
        $table = '';

        if ($type === 1) {
            $table = 'organization';
        }

        if ($type === 2) {
            $table = 'role';
        }

        return Db::table($table)->group('region_id')->column('region_id');

    }

    /**
     * 查询出用户关联的所有区域
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     * @author Zhang zw
     * @date 2020/12/2 9:51
     */
    public function getRegionList(): array
    {
        $where = USER_ARR['is_root'] === 1 ? [] : [['ur.users_id','=',USER_ID]];

        $data = Db::table('users_region')->alias('ur')
            ->join('organization o','ur.organization_id = o.id','LEFT')
            ->where($where)
            ->field('ur.id,ur.users_id,ur.organization_id AS region_id,o.name')
            ->group('ur.organization_id')
            ->select();

        if (is_array($data) && count($data) > 0) {
            $data[] = ['id' => 0, 'name' => '未选择区域', 'region_id' => 0, 'users_id' => USER_ID];
        }

        return msgReturn(0,$data);
    }

    /**
     * 根据区域查询项目
     * @param Request $request
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     * @author Zhang zw
     * @date 2020/12/2 9:56
     */
    public function getRegionProject(Request $request): array
    {
        $regionId = $request->param('region_id') ?? REGION_ID;

        $data = Db::table('projects')->where('region_id', '=', $regionId)->field('id,project_name')->select();

        if (is_array($data) && count($data) > 0) {
            $data[] = ['id' => 0, 'project_name' => '未选择区域'];
        }

        return msgReturn(0,$data);
    }

    /**
     * 用户切换区域和项目
     * @param Request $request
     * @return array
     * @author Zhang zw
     * @date 2020/12/2 14:44
     */
    public function setUserRegionProject(Request $request): array
    {
        if ($request->param('project_id') || $request->param('region_id')) {

            UsersModel::update($request->param(), ['id' => USER_ID]);

            return msgReturn(45003);
        }

        return msgReturn(46002,null,'缺少必要参数');
    }
}
