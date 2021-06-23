<?php

namespace app\common\service;

use think\Db;

/**
 * 日志类
 * @package app\common\service
 */
class Logs
{
    public static function setLog($userId, $userName, $type, $activity)
    {
        Db::table('logs')->insert([
            'users_id' => $userId, 'users_name' => $userName,
            'activity' => $activity, 'access_ip' => request()->server('REMOTE_ADDR'),
            'type' => $type, 'create_time' => date('Y-m-d H:i:s')
        ]);
    }
}