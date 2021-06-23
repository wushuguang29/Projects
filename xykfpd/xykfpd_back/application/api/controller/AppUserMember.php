<?php

namespace app\api\controller;

use think\Controller;
use think\Db;
use app\common\model\AppUserMemberModel;

/**
 * 成员管理
 * @package app\api\controller
 */
class AppUserMember extends Controller
{
    /**
     * 成员信息【订阅人】
     */
    public function getMemberInfo()
    {
        $data = (new AppUserMemberModel())->getMemberInfo();
        return msgReturn(0, $data);
    }

    /**
     * 添加成员
     */
    public function add()
    {
        $data = input();
        return (new AppUserMemberModel())->add($data);
    }

    /**
     * 编辑成员
     */
    public function edit()
    {
        $data = input();
        return (new AppUserMemberModel())->edit($data);
    }

    /**
     * 预览成员
     */
    public function browse()
    {
        $data['id'] = input('id');
        return (new AppUserMemberModel())->browse($data);
    }

    /**
     * 获取领域下方面列表
     */
    public function getSideList()
    {
        $param['domain'] = input('domain');
        $data = (new AppUserMemberModel())->getSideList($param);
        return msgReturn(0, $data);
    }

    /**
     * 订阅
     */
    public function subscribe()
    {
        $param = input();
        return (new AppUserMemberModel())->subscribe($param);
    }
}