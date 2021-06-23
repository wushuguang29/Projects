<?php

namespace app\common\model;

use service\rewrite\RewriteModel;
use think\Db;

/**
 * 用户管理
 * @package app\common\model
 */
class AppUsersModel extends RewriteModel
{
    /**
     * 用户信息
     */
    public function getUserInfo()
    {
        $userInfo = Db::table('app_users')->where('id', APP_USER_ID)->find();
        return $userInfo;
    }
}