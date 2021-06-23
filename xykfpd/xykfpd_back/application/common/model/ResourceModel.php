<?php

namespace app\common\model;

use service\rewrite\RewriteModel;
use think\Db;

class ResourceModel extends RewriteModel
{
    protected $table = 'resources';

    // 设置json类型字段
    protected $json = ['extra'];

    // 设置JSON字段的类型
    protected $jsonType = [
        'extra->competence'	=>	'int',
        'extra->annex'	=>	'int',
        'extra->business' => 'int',
        'extra->hot_key' => 'int',
        'extra->review' => 'int',
    ];

    protected $field = [
        'id', 'attachment_folder_type', 'pid', 'method', 'title', 'url', 'router',
        'open_mode', 'front_router_name', 'identifier', 'middleware', 'status',
        'hidden', 'type', 'icon', 'sort', 'extra',
    ];

    public function getLabelAttr($value, $data)
    {
        return $data['title'];
    }

    /**
     * [getTopMenu 获取顶部菜单]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-15T15:53:32+0800
     * @param    [type]                   $user_id [description]
     * @return array [type]                            [description]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getTopMenu($user_id)
    {
        $model = new AccessPermissionModel();

        $user_permission = $model->getUserUltimatelyHaveResources(intval($user_id));
        //上级ID
        $superior_id = $this->getSuperiorResourceId($user_permission);
        $user_permission = array_unique(array_merge($user_permission,$superior_id));
        // $where[] = ['pid', 'EQ', 0];
        $where[] = ['hidden', 'EQ', 2];
        $where[] = ['status', 'EQ', 1];
        // $where[] = ['type', 'EQ', 1];
        $where[] = ['id', 'IN', $user_permission];

        $data    = $this->field($this->field)->where($where)->where('type',1)->select()->order('sort')->toArray();
        $btn = $this->field($this->field)->where($where)->where('type',2)->select()->toArray();
        foreach ($data as $key => $value) {
            $meta = [];
            $button = [];
            foreach ($btn as $k => $v) {
                if($value['id'] === $v['pid']){
                    $button[] = $v;
                }
            }
            $meta['button'] = $button;
            $data[$key]['meta'] = $meta;
        }
        return list_to_tree($data,'id','pid','children',0,false);
    }

    /**
     * [getChildTreeNodesByPid 获取子节点数]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-15T16:55:48+0800
     * @param integer $pid [description]
     * @param integer $user_id [description]
     * @return array [type]                            [description]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getChildTreeNodesByPid($pid = 0, $user_id = 0)
    {
        $child = [];
        //获取下属所有资源
        $allResources  = $this->getResourcesChildIds($pid);
        $model         = new AccessPermissionModel();
        $haveResources = $model->getUserUltimatelyHaveResources($user_id);
        $intersect     = array_intersect($allResources, $haveResources);
        // dump($intersect);die;
        if (!empty($intersect)) {
            $where = [
                ['hidden', 'EQ', 2],
                ['type', 'EQ', 1],
                ['status', 'EQ', 1],
                ['id', 'IN', $intersect],
            ];
            $data = Db::table('resources')->field($this->field)->where($where)->order('sort')->select();
            // dump($data);die;
            $child = list_to_tree($data,'id','pid','children',1);
        }
        return $child;

    }

    /**
     * [getResourcesChildIds 获取下属所有资源]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-15T17:13:28+0800
     * @param integer $current_id [description]
     * @return array [type]                               [description]
     */
    public function getResourcesChildIds($current_id = 0)
    {
        //初始化ID数组
        $array = [];
        do {
            $ids   = [];
            $where = array(
                ['pid', 'IN', $current_id],
                ['hidden', 'EQ', 2],
                ['type', 'EQ', 1],
                ['status', 'EQ', 1],
            );
            $resources = Db::table('resources')
                ->where($where)
                ->order('sort')
                ->column("id");
            foreach ($resources as $key => $value) {
                $array[] = $value;
                $ids[]   = $value;
            }
            $current_id = $ids;
        } while (!empty($resources));
        return $array;
    }

    /**
     * [getResourcesTree 获取资源树]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-20T17:27:24+0800
     * @return array [type]                   [description]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getResourcesTree(){
        $where[] = ['hidden', 'EQ', 2];
        $where[] = ['status', 'EQ', 1];
        $data = $this->field($this->field)->where($where)->where('type',1)->append(['label'])->select()->toArray();
        return list_to_tree($data,'id','pid','children',0,false);
    }

    /**
     * [getSuperiorResourceId 获取上级资源ID]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-20T11:02:14+0800
     * @param    [type]                   $ids [description]
     * @return array [type]                        [description]
     */
    public function getSuperiorResourceId($ids): array
    {
        if(empty($ids)){
            return array();
        }
        //初始化ID数组
        $array = [];
        do {
            $pids   = [];
            $where = array(
                ['id', 'IN', $ids],
                ['hidden', 'EQ', 2],
                ['status', 'EQ', 1],
            );
            $resources = Db::table('resources')
                ->where($where)
                ->order('sort')
                ->column('pid');
            foreach ($resources as $key => $value) {
                $array[] = $value;
                $pids[]   = $value;
            }
            $ids = $pids;
        } while (!empty($resources));
        return array_unique($array);
    }

    /**
     * [getArchivesTree 获取档案树]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-22T16:03:49+0800
     * @return array [type]                   [description]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getArchivesTree($resource_id = 0){
        $where = [];
        if($resource_id > 0){
            $where[] = ['id','NOT IN',$resource_id];
        }
        //获取档案资源
        $archive_resources =$this->where('extra->annex', '>', 0)
            ->where('status',1)
            ->where('hidden',2)
            ->where('type',1)
            ->where($where)
            ->field(['id', 'title', 'extra->annex' => 'annex_id'])
            ->column('id');
        //上级ID
        $superior_id = $this->getSuperiorResourceId($archive_resources);
        $ids = array_merge($archive_resources,$superior_id);
        $data = $this->where('id','IN',$ids)->field(['id','title','pid'])->append(['label'])->select()->toArray();
        return $data;

    }
}
