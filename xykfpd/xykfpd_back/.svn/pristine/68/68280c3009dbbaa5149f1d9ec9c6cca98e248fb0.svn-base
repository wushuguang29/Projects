<?php
/*
 * @Author: your name
 * @Date: 2020-12-22 13:42:49
 * @LastEditTime: 2020-12-22 16:16:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_back\application\common\model\UsersRoleModel.php
 */

namespace app\common\model;

use app\index\controller\Users;
use service\rewrite\RewriteModel;
use think\model\Collection;

class UsersRoleModel extends RewriteModel
{
    protected $table = 'users_role';
    protected $hidden = ['id','create_time','update_time','delete_time','users_id','role_id'];

    public function user(): \think\model\relation\HasOne
    {
    	return $this->hasOne('UsersModel','id')->bind(['username'=>'username','user_id'=>'id']);
    }

    /**
     * [add 角色绑定人员]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-07T10:15:17+0800
     * @param    $params
     * @return \think\Collection|Collection
     * @throws \Exception
     */
    public function add($params)
    {
    	$data = [];
    	foreach (explode(',',$params['users_id']) as $key => $value) {
    		array_push($data,['role_id'=>$params['id'],'users_id'=>$value]);
    	}
        return $this->saveAll($data);
    }

    /**
     * [del 角色人员解绑]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-07T10:18:36+0800
     * @param    [type]                   $params [description]
     * @return int
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function del($params): int
    {
    	$users_id = explode(',',$params['users_id']);


        $result = $this->where('role_id',$params['id'])->where('users_id','IN',$users_id)->delete(true);


        return $result;
    }
}
