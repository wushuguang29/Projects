<?php

namespace app\common\model;

// use think\Model;
use service\rewrite\RewriteModel;
use think\facade\Config;
use think\Db;

class AccessPermissionModel extends RewriteModel
{

    protected $table = 'access_permission';

    /**
     * [bindAccessPermission 绑定使用权限]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-03T10:26:42+0800
     * @param    [int]                   $type         [类型 1组织机构 2角色 3 个人]
     * @param    [array]                 $resources_id [资源 ID]
     * @param    [int]                   $target_id    [目标 ID（组织机构 ID/角色 ID/用户 ID）]
     * @return   [type]                                [description]
     * @throws \think\exception\PDOException
     */
    public function bindAccessPermission($type, $resources_id=[], $target_id)
    {   
        //已经存在的资源ID
    	$exist_resources_id = $this->where('type',$type)->where('target_id',$target_id)->distinct(true)->column('resources_id');
        $this->startTrans();
        try {
            //需要新增的
            $new = array_diff($resources_id, $exist_resources_id);
            if(!empty($new)){
                $data = [];
                foreach ($new as $key => $value) {
                    array_push($data,[
                        'type' => $type,
                        'resources_id' => $value,
                        'target_id' => $target_id
                    ]);
                }
                $result = $this->saveAll($data);
            }
            
            //需要删除的
            $old = array_diff($exist_resources_id,array_intersect($exist_resources_id,$resources_id));
            if(!empty($old)){
                $this->where('type',$type)->where('target_id',$target_id)->where('resources_id','IN',$old)->delete();
            }
            $this->commit();
            return msgReturn(45005);
        } catch (\Exception $e) {
            $this->rollback();
            return msgReturn(46003);
        }
        

    }

    /**
     * [getUserUltimatelyHaveResources 获取用户最终权限]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-14T16:00:28+0800
     * @param    [type]                   $user_id [description]
     * @return array [type]                            [description]
     */
    public function getUserUltimatelyHaveResources($user_id,$type=1): array
    {
        if($type ==2){
            $is_root = db('users')->where('id',$user_id)->value('is_root');
        }else{
            $is_root = USER_ARR['is_root'];
        }
        // 用户为最高管理员
        if (intval($is_root) === 1) {
            // 返回所有权限
            return $this->getResources();
        }
        // 普通管理员只能获得当前区域内的最高权限
        // if (USER_ARR['is_administrator'] === 1 && USER_ARR['is_root'] === 2) {
        //     // 得到区域内所有的机构
        //     $organizationId = OrganizationModel::getRegionOrganizationId(REGION_ID);
        //     $organizationResourceId = $this->getHaveResources($organizationId, 1);
        //     // 得到区内所有的角色
        //     $roleId = RoleModel::getRegionRoleId($organizationId);
        //     $roleResourceId = $this->getHaveResources($roleId, 2);
        //     return array_unique(array_merge($organizationResourceId,$roleResourceId));
        // }

        // 普通用户权限查询 机构->角色->个人
        // 机构权限
        // $organizationResourceId = $this->getOrganizationPermissionByUser($user_id);

        //查看用户所属角色
        $roleId = Db::table('users_role')
            ->where('users_id', $user_id)
            ->column('role_id');
        $roleResourceId = $this->getHaveResources($roleId, 2);
        //个人权限
        $userResourceId = $this->getHaveResources($user_id,3);
        return array_unique(array_merge($roleResourceId, $userResourceId));

    }

    /**
     * [getOrganizationPermissionByUser 获取用户的机构权限]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-20T15:58:39+0800
     * @param    [type]                   $user_id [description]
     * @return array [type]                            [description]
     */
    public function getOrganizationPermissionByUser($user_id): array
    {
        $haveDepartment=Db::table("users_organization")->where('users_id',$user_id)->column("organization_id");

        if($haveDepartment){
            return $this->getOrganizationSuperiorPermission($haveDepartment);
        }
        return array();
    }

    /**
     * [getOrganizationSuperiorPermission 递归获取上级机构权限]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-20T15:59:05+0800
     * @param    [type]                   $orgaization [description]
     * @param array $result_resource
     * @return array [type]                             [description]
     */
    public function getOrganizationSuperiorPermission($organization, $result_resource=[]): array
    {
        $resource_id = $this->getHaveResources($organization,1);

        if(!empty($resource_id)){

            $target_id = Db::table('access_permission')->where('type',1)
                ->where('target_id','IN',$organization)
                ->distinct(true)
                ->column('target_id');

            $new = array_diff($organization,$target_id);

            if(empty($new)){

                return array_merge($resource_id,$result_resource);

            }

            $pid = Db::table('organization')->where('id','IN',$new)->column('pid');
            $result_resource = array_merge($resource_id,$result_resource);
            return $this->getOrganizationSuperiorPermission($pid,$result_resource);

        }

        $pid = Db::table('organization')->where('id','IN',$organization)->column('pid');

        if (!empty($pid)) {
            $result_resource = array_merge($resource_id,$result_resource);
            return $this->getOrganizationSuperiorPermission($pid,$result_resource);
        }

        return $resource_id;
    }

    /**
     * [getResources 获取资源ID]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-14T16:04:09+0800
     * @return array [type]                   [description]
     */
    public function getResources()
    {
        $where[] = ['status', 'EQ', 1];
        $where[] = ['hidden', 'EQ', 2];

        $result = Db::table("resources")
            ->where($where)
            ->distinct(true)
            ->column("id");
        return $result;

    }

    /**
     * [getHaveResources 获取角色、个人、机构资源ID]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-14T16:17:15+0800
     * @param $target_ids
     * @param $type
     * @return array [type]                               [description]
     */
    public function getHaveResources($target_ids,$type){
        return Db::table('access_permission')->where('type','IN',$type)
            ->where('target_id','IN',$target_ids)
            ->distinct(true)
            ->column('resources_id');
    }

    /**
     * [getResourcesTree 获取权限树]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-15T14:19:24+0800
     * @param $target_id
     * @param $type
     * @return array [type]                              [description]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getResourcesTree($target_id,$type){
        $model = new ResourceModel();
        $allResource =  $model->where('status', 1)->where('hidden', 2)->append(['label'])->select()->toArray();
        $selectResource = [];
        switch ($type) {
            case 1://机构
            case 2://角色
                $selectResource = $this->getHaveResources($target_id,$type);
                break;
            case 3://个人
                $selectResource = $this->getUserUltimatelyHaveResources($target_id,2);
                break;
            default:
                # code...
                break;
        }
        // dump($selectResource);die;
        //获取上级资源ID
        $superior = $model->getSuperiorResourceId($selectResource);
        $allow_id = array_unique(array_merge($selectResource,$superior));
        foreach ($allResource as $key => $value) {
            if (empty($selectResource)) {
                $allResource[$key]['checked'] = false;
            } else {
                //包含某个 ID 则标记选中
                if (in_array($value["id"], $selectResource)) {
                    $allResource[$key]['checked'] = true;
                } else {
                    $allResource[$key]['checked'] = false;
                }
            }

            if(empty($allow_id)){
                $allResource[$key]['allow_status'] = false;
            }else{
                if(in_array($value['id'],$allow_id)){
                    $allResource[$key]['allow_status'] = true;

                }else{
                    $allResource[$key]['allow_status'] = false;

                }
            }
        }

        return $allResource;
    }


    


    
}
