<?php

namespace app\index\controller;

use think\Controller;
use think\Db;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\exception\ValidateException;
use think\facade\Response;
use think\Request;
use app\common\model\ResourceModel;
class Resource extends Controller
{
    protected $middlewareArr = ['JWTAuthAndRefresh','Competence','Config'];

    /**
     * [getTopMenu 获取顶部菜单]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-17T10:11:40+0800
     * @param Request $request [description]
     * @param ResourceModel $model [description]
     * @return array [type]                            [description]
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getTree(Request $request, ResourceModel $model)
    {

        $user_id = $request->user_id ? $request->user_id : USER_ID;
        $data    = $model->getTopMenu($user_id);
        return msgReturn(0, $data);
    }


    /**
     * [menuTree 资源菜单树生成]
     * @return void [type] [description]
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function menuTree()
    {
        $db        = db('resources');
        $directory = $db->select();
        $tree      = list_to_tree($directory);
        // dump($tree);
        $this->insertMenu($tree);
    }

    /**
     * [insertMenu 资源菜单树写入]
     * @param  [type]  $tree [树数据]
     * @param  integer $pid  [父级ID]
     * @return [type]        [description]
     */
    protected function insertMenu($tree, $pid = 0)
    {
        foreach ($tree as $value) {
            $menu = [
                'pid'               => $pid,
                'method'            => $value['method'],
                'title'             => $value['title'],
                'url'               => $value['url'],
                'router'            => $value['router'],
                'open_mode'         => $value['open_mode'],
                'front_router_name' => $value['front_router_name'],
                'identifier'        => $value['identifier'],
                'middleware'        => $value['middleware'],
                'status'            => $value['status'],
                'hidden'            => $value['hidden'],
                'type'              => $value['type'],
                'icon'              => $value['icon'],
                'sort'              => $value['sort'],
                'extra'             => $value['extra'],
                'create_time'       => $value['create_time'],
            ];
            $parent_id = db('resources_bak')->insertGetId($menu);
            if (!empty($value['children'])) {
                $this->insertMenu($value['children'], $parent_id);
            }

        }
    }


    /**
     * resources表列表
     * @param Request $request
     * @return array
     * @throws DbException
     * @author Zhang zw
     * @date 2020/9/28 17:23
     */
    public function getResourcesList(Request $request)
    {
        $search = [];

        if ($request->param('title')) {
            $search[] = ['title', 'LIKE', '%' . $request->param('title') . '%'];
        }

        $result = Db::table('resources')->json(['extra'])
            ->setJsonFieldType([
                'extra->competence' => 'int',
                'extra->annex' => 'int',
                'extra->business' => 'int',
                'extra->hot_key' => 'int',
            ])
            ->where($search)
            ->order('sort','ASC')
            ->select();

        return msgReturn(0,list_to_tree($result));
    }

    /**
     * 添加路由
     * @param Request $request
     * @param ResourceModel $resourceModel
     * @return array
     * @author Zhang zw
     * @date 2020/9/29 21:50
     */
    public function create(Request $request, ResourceModel $resourceModel)
    {
        try {
            $param = $request->param();

            $middleware = '';

            if (!empty($request->param('middleware'))) {
                $temMiddleware = explode(',', trim($param['middleware'], ','));
                foreach ($this->middlewareArr AS $k => $v) {
                    if (!empty(in_array($v,$temMiddleware))) {
                        $middleware .= $v . ',';
                    }
                }
            }

            $resourceModel->pid                     = $param['pid'];
            $resourceModel->attachment_folder_type  = empty($param['attachment_folder_type']) ? 0 : $param['attachment_folder_type'];
            $resourceModel->extra                   = !empty($param['extra']) ? json_encode($param['extra']) : '{"competence":0,"annex":0,"business":0,"hot_key":0,"review":0}';
            $resourceModel->method                  = $param['method'];
            $resourceModel->title                   = $param['title'];
            $resourceModel->url                     = trim($param['url'],'/');
            $resourceModel->router                  = trim($param['router'],'/');
            $resourceModel->open_mode               = $param['open_mode'];
            $resourceModel->front_router_name       = empty($param['front_router_name']) ? '' : $param['front_router_name'];
            $resourceModel->identifier              = empty($param['identifier']) ? '' : $param['identifier'];
            $resourceModel->middleware              = trim($middleware,',');
            $resourceModel->status                  = empty($param['status']) ? 1 : $param['status'];
            $resourceModel->hidden                  = $param['hidden'];
            $resourceModel->type                    = $param['type'];
            $resourceModel->icon                    = empty($param['icon']) ? '' : $param['icon'];
            $resourceModel->sort                    = empty($param['sort']) ? 0 : $param['sort'];
                $resourceModel->remark                  = !empty($param['remark']) ? $param['remark'] : '';
                $result = $resourceModel->save();
                $extraArr = json_encode($param['extra']);
                if($extraArr && isset($extraArr['competence']) && $extraArr['competence'] == 1){
                    db('data_pemission_common')->insert(['resources_id'=>$result['id']]);
                }
            if ($result) {
                return msgReturn(45003);
            } else {
                return msgReturn(46002);
            }
        } catch (ValidateException $validateException) {
            return msgReturn(-1,[],$validateException->getMessage());
        }

    }

    /**
     * 更新路由
     * @param Request $request
     * @param ResourceModel $resourceModel
     * @return array
     * @author Zhang zw
     * @date 2020/9/29 22:07
     */
    public function update(Request $request, ResourceModel $resourceModel)
    {

        try {
            $param = $request->param();

            $resource = $resourceModel->get($param['id']);

            $middleware = '';

            if (!empty($request->param('middleware'))) {
                $temMiddleware = explode(',', trim($param['middleware'], ','));
                foreach ($this->middlewareArr AS $k => $v) {
                    if (!empty(in_array($v,$temMiddleware))) {
                        $middleware .= $v . ',';
                    }
                }
            }
            $resource->pid                     = $param['pid'];
            $resource->attachment_folder_type  = $param['attachment_folder_type'];
            if (!empty($param['extra'])) {
                $extra = $param['extra'];
                $resource->extra->competence = $extra['competence'] ?? 0;
                $resource->extra->annex = $extra['annex'] ?? 0;
                $resource->extra->business = $extra['business'] ?? 0;
                $resource->extra->hot_key = $extra['hot_key'] ?? 0;
                $resource->extra->review = $extra['review'] ?? 0;
            }

            $resource->method                  = $param['method'];
            $resource->title                   = $param['title'];
            $resource->url                     = $param['url'];
            $resource->router                  = $param['router'];
            $resource->open_mode               = $param['open_mode'];
            $resource->front_router_name       = $param['front_router_name'];
            $resource->identifier              = $param['identifier'];
            $resource->middleware              = trim($middleware,',');
            $resource->status                  = $param['status'];
            $resource->hidden                  = $param['hidden'];
            $resource->type                    = $param['type'];
            $resource->icon                    = $param['icon'];
            $resource->sort                    = $param['sort'];
            $resource->remark                  = !empty($param['remark']) ? $param['remark'] : '';
            $result = $resource->save();

            // $extraArr = json_encode($param['extra']);
            if($resource->extra->competence == 1){
                $exist = db('data_pemission_common')->where('resources_id',$param['id'])->find();
                if(empty($exist)){
                    db('data_pemission_common')->insert(['resources_id'=>$param['id']]);
                }
            }else{
                db('data_pemission_common')->where('resources_id',$param['id'])->delete(true);
            }

            if ($result) {
                return msgReturn(45003);
            } else {
                return msgReturn(46002);
            }
        } catch (ValidateException $validateException) {
            return msgReturn(-1,[],$validateException->getMessage());
        }

    }

    /**
     * 删除路由
     * @param Request $request
     * @return array
     * @throws DbException
     * @author Zhang zw
     * @date 2020/9/29 22:12
     */
    public function destroy(Request $request)
    {
        // 判断子类是否都已删除
        $children = ResourceModel::where('pid', '=', $request->param('id'))->find();

        if (!empty($children)) {
            return msgReturn(-1,[],'请先删除所有的子类路由！');
        }

        $result = ResourceModel::destroy($request->param('id'));

        if ($result) {
            return msgReturn(45003);
        } else {
            return msgReturn(46002);
        }
    }

    /**
     * 所有资源的下拉列表数据
     * @param Request $request
     * @return array
     * @throws DbException
     * @author Zhang zw
     * @date 2020/9/30 11:06
     */
    public function getParentList(Request $request)
    {
        $result = Db::table('resources')->field('id, title AS name')->select();
        return msgReturn(0,$result);
    }

    /**
     * 返回勾选审核的路由
     * @throws DbException
     * @author Zhang zw
     * @date 2020/10/20 13:39
     */
    public function getReviewList()
    {
        $result = ResourceModel::field('id,title')->where('extra->review','=',1)->select();
        return msgReturn(0,$result);
    }
}
