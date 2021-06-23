<?php

namespace app\common\model;

use service\rewrite\RewriteModel;
use think\Db;
use think\exception\DbException;

class RoleModel extends RewriteModel
{
    protected $table = 'role';
    protected $hidden = ['update_time','delete_time'];

    /**
     * [getList 角色列表]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-02T13:41:38+0800
     * @param    [type]                   $request [description]
     * @param    integer                  $page    [description]
     * @param    integer                  $limit   [description]
     * @return   [type]                            [description]
     */
    public function getList($request, $page, $limit)
    {
        $fields = [
            'r.id',
            'r.name',
            'r.remark',
            'r.create_time',
            'us.usernames',
            'u.username AS handler_name',
            'aps.access_permission',
        ];
        $userSql = db('users_role')->alias('ur')
            ->join('users u','u.id= ur.users_id')
            ->field(['GROUP_CONCAT(u.username) AS usernames','role_id','0 AS delete_time'])
            ->group('ur.role_id')
            ->fetchSql(true)
            ->select();
        $accessPermissionSql = Db::table('access_permission')
            ->where('type',2)
            ->field([
                '0 AS delete_time',
                'target_id',
                'GROUP_CONCAT(resources_id)  AS access_permission'
            ])
            ->fetchSql(true)
            ->group('target_id')
            ->select();
        $where = [];
        if(!empty($request['name'])){
            $where[] = ['name','LIKE','%'.$request['name'].'%'];
        }
        if(!empty($request['id'])){
            $where[] = ['id','EQ',$request['id']];
        }

        // 非超级管理员查询当前区域的角色
        if (USER_ARR['is_root'] === 2) {
            $where[] = ['r.region_id', '=', USER_ARR['region_id']];
        }

        $db    = $this->alias('r')
            ->join('users u','u.id = r.handler_uid','LEFT')
            ->join(['('.$userSql.')' => 'us'],'us.role_id = r.id','LEFT')
            ->join(['('.$accessPermissionSql.')' => 'aps'],'aps.target_id = r.id','LEFT')
            ->where($where)
            ->field($fields);

        if(empty($page)){
            return $db->select();
        }

        $total = $db->count();
        $data  = $db->page($page, $limit)->select();
       
        return ['total' => $total, 'data' => $data];
    }

    /**
     * [add 添加角色]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-02T13:40:24+0800
     * @param array
     * @return bool
     * @throws \think\exception\PDOException
     */
    public function add($data): bool
    {
        $this->startTrans();

        $roleId = $this->insertGetId($data);
        if($roleId === 0)
        {
            $this->rollback();
            return false;
        }

        $this->commit();
        return true;
    }

    /**
     * [edit 编辑角色]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-02T17:01:58+0800
     * @param    [type]                   $data [description]
     * @return array
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function edit($data): array
    {
        try {

            $this->startTrans();

            $count = self::where('id','NEQ',$data['id'])->where('name',$data['name'])->count();

            if($count){
                return msgReturn(46002,[],'角色名称已存在');
            }
            $result = $this->isUpdate(true)->save($data);


            if($result === false ){
                $this->rollback();
                return msgReturn(46002);
            }

            $this->commit();
            return msgReturn(45003);

        } catch (\think\Exception $e) {
            $this->rollback();
            return msgReturn(46002 . '--' . $e->getMessage());
        }
    }

    
    //角色名搜索
    public function searchNameAttr($query, $value, $data): void
    {
        $query->where('name', 'LIKE', '%' . $value . '%');
    }

    //角色id搜索
    public function searchIdAttr($query,$value,$data): void
    {
        $query->where('id','EQ',$value);
    }


    public function users(): object
    {
        return $this->hasMany('UsersRoleModel','role_id');
    }

    /**
     * [deleteRole 删除角色]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-03T09:43:31+0800
     * @param    [type]                   $id [description]
     * @return array
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function deleteRole($id): array
    {
        try {

            $this->startTrans();

            //判断角色是否绑定用户
            $is_users = db('users_role')->where('role_id',$id)->count();

            if($is_users){
                return msgReturn(46001,[],'删除失败，该角色已绑定用户');
            }

            $result = self::where('id',$id)->delete();

            if($result === 0){
                $this->rollback();
                return msgReturn(46001);
            }
            $this->commit();
            return msgReturn(45001);

        } catch (\think\Exception $e) {
            $this->rollback();
            return msgReturn(46001 . '--' . $e->getMessage());
        }

    }

    /**
     * [getPersonnelByRole 获取权限中得人员]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-03T17:44:27+0800
     * @param $params
     * @param int $type
     * @return mixed
     * @throws DbException
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getPersonnelByRole($params,$type=1): array
    {//type =1  已绑定的人员  2 未绑定的人员
        $fields = [
            'u.id AS user_id',
            'ur.role_id',
            'u.username',
            'u.status',
            'ur.create_time',
            'u.account',
            'u.gender'
        ];
        $where=[];
        if(!empty($params['user_name'])){
            $where[] = ['u.username','LIKE','%'.$params['username'].'%'];
        }

        if(intval($type) ===2){
            $exist_personnel = db('users_role')->where('role_id',$params['id'])->distinct(true)->column('users_id');
            $field = [
                'u.id AS user_id',
                'u.username',
                'u.status',
                'u.account',
                'u.gender'
            ];
            $data = db('users')->alias('u')->where('u.id','NOT IN',$exist_personnel)->where($where)
                ->field($field)
                ->select();
            return $data;
        }
        $data = db('users_role')->alias('ur')
            ->join('users u','u.id = ur.users_id')
            ->where($where)
            ->where('ur.role_id',$params['id'])
            ->field($fields)
            ->select();

        return $data;

    }

    /**
     * 根据角色 ID 返回用户
     * @param $roles
     * @throws DbException
     * @return array
     * @author Zhang zw
     * @date 2020/10/22 17:09
     */
    public static function getReceiver($roles)
    {
        return self::where('id', 'IN', $roles)->field('id AS receiver_id,name AS receiver')->select()->toArray();
    }

    /**
     * 根据机构 ID 获取所有的角色 ID
     * @param $organizationId mixed
     * @return array
     * @author Zhang zw
     * @date 2020/11/28 14:15
     */
    public static function getRegionRoleId($organizationId): array
    {
        return Db::table('role_organization')
            ->alias('ro')
            ->join('role r','ro.role_id = r.id','LEFT')
            ->where('ro.organization_id','IN',$organizationId)
            ->column('r.id');
    }
}
