<?php


namespace app\index\controller;


use think\Controller;
use think\Db;
use think\Request;

class Logs extends Controller
{
    public function logList(Request $request)
    {
        $where = [];

        $field = '';

        if ($request->param('users_name')) {
            $where[] = ['l.users_name', 'LIKE', '%' . $request->param('users_name') . '%'];
        }

        $db = Db::table('logs')
            ->alias('l')
            ->where($where);

        if ($request->param('type') == 1) {
            $db->field('l.id, l.users_name, l.activity AS resource_name, l.access_ip, l.create_time');
            $where[] = ['l.type', '=', '1'];
        } else {
            $db->field("l.id, l.users_name, l.activity AS resource_name, l.access_ip, l.create_time");
            if ($request->param('resource_name')) {
                $where[] = ['l.type', '=', $request->param('resource_name')];
            }else {
                $where[] = ['l.type', '>', '1'];
            }
        }



        $data = $db->limit($request->param('limit'))
            ->where($where)
            ->page($request->param('page'))
            ->order('l.create_time', 'DESC')
            ->select();

        $total = $db->removeOption('limit')->removeOption('page')->count('l.id');

        return msgReturn(0, [
            'total' =>  $total,
            'data'  =>  $data
        ]);
    }
}