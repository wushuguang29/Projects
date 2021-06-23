<?php

namespace app\index\controller;

use app\common\model\DataPemissionCommonModel;
use app\common\model\DataPemissionShareModel;
use app\common\model\OrganizationModel;
use app\index\validate\DataPemissionValidate;
use think\Controller;
use think\facade\Config;
use think\Request;
use think\Db;

class DataPemission extends Controller
{

    /**
     * [setShareData 设置共享数据]
     * @param Request $request
     * @param DataPemissionValidate $validate
     * @param DataPemissionShareModel $model
     * @return array
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-09T13:55:15+0800
     */
    public function setShareData(Request $request, DataPemissionValidate $validate, DataPemissionShareModel $model): array
    {
        $validate->goCheck($request->param(), 'share_add');
        // $model = new DataPemissionShareModel();
        $params = [
            'resource_id'     => $request->resource_id,
            'from_type'       => $request->from_type,
            'target_id'       => $request->target_id,
            'share_type'      => $request->share_type,
            'share_target_id' => $request->share_target_id,
        ];
        return $model->addShareData($params);

    }

    /**
     * [getResourcesTree 获取公共权限列表]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-09T11:14:28+0800
     * @param Request $request
     * @param DataPemissionCommonModel $model
     * @return array [type]                   [description]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getResourcesTree(Request $request, DataPemissionCommonModel $model): array
    {
        $data = $model->alias('m')
            ->join('resources r', 'r.id=m.resources_id')
            ->field([
                'r.title',
                'm.id',
                'm.role',
                'm.resources_id'
            ])->select();
        return msgReturn(0, $data);
    }

    /**
     * [saveCommon 设置公共权限]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-09T11:18:32+0800
     * @param Request $request [description]
     * @param DataPemissionCommonModel $model [description]
     * @param DataPemissionValidate $validate [description]
     * @return array [type]                             [description]
     */
    public function saveCommon(Request $request, DataPemissionCommonModel $model, DataPemissionValidate $validate): array
    {
        // 设置公共权限
        $validate->goCheck($request->param(), 'common_add');
        $result = $model->where('id', $request->id)->setField('role', $request->role);
        if ($result !== false) {
            return msgReturn(45003);
        }
        return msgReturn(45002);
    }

    /**
     * [delete 删除共享数据]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-09T14:46:43+0800
     * @param Request $request
     * @param DataPemissionValidate $validate
     * @param DataPemissionShareModel $model
     * @return array [type]                   [description]
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function delete(Request $request, DataPemissionValidate $validate, DataPemissionShareModel $model): array
    {
        $validate->goCheck($request->param(), 'id');
        $result = $model->where('id', $request->id)->delete();
        if ($result) {
            return msgReturn(45001);
        }
        return msgReturn(46001);
    }

    /**
     * [getShareList 获取共享数据列表]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-13T15:03:21+0800
     * @param Request $request
     * @param DataPemissionShareModel $model
     * @return array [type]                   [description]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getShareList(Request $request, DataPemissionShareModel $model): array
    {
        $params = [
            'resource_id' => $request->resource_id,
        ];
        $data = $model->getShareList($params);
        return msgReturn(0, $data);
    }

    /**
     * [getShareSelect 获取共享下拉框数据]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-13T16:30:41+0800
     * @return array [type]                   [description]
     */
    public function getShareSelectData(): array
    {
        $data = [

            ['label' => '个人', 'node_type' => 0, 'from_type' => 1],
            ['label' => '角色', 'node_type' => 0, 'from_type' => 2],
        ];
        $i                = 3;

        $organizationType = Config::get('config.COMPETENCE_ORGANIZATION_TYPE');
        foreach ($organizationType as $key => $value) {
            if ($value['person']) {
                array_push($data, ['label' => $value['title'], 'node_type' => $key, 'from_type'=>3]);
                $i++;
                continue;
            }
        }

        return msgReturn(0, $data);
    }

    /**
     * [getSearchTargetData 获取下拉搜索结果]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-13T17:03:32+0800
     * @param Request $request
     * @param OrganizationModel $organizationModel
     * @return array [type]                   [description]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getSearchTargetData(Request $request, OrganizationModel $organizationModel): array
    {
        $from_type = $request->from_type;
        $node_type = $request->node_type;
        $data = [];
        switch ((int)$from_type) {
            case 5: // 用户个人
                $data = Db::table('users')->where('status',1)->where('working_status',1)
                    ->field(['id','username AS name'])
                    ->select();
                break;
            case 6: // 角色
                $data = Db::table('role')
                    ->field([
                        'id',
                        'name'
                    ])
                    ->select();
                break;
            default: // 返回机构属性结构数据
                $data = $organizationModel->getTree($node_type);

                break;
        }
        return msgReturn(0,$data);
    }
}
