<?php

namespace app\api\controller;

use app\common\model\FolderModel;
use think\Controller;
use think\Db;

/**
 * 在线资源管理
 * @package app\api\controller
 */
class Folder extends Controller
{
    /**
     * 文件夹列表
     */
    public function getList()
    {
        $start = input('start') ? input('start') : 0;
        $limit = input('limit') ? input('limit') : 25;
        $db = Db::table('folder')->field([
            'id',
            'pid',
            'folder_name',
        ]);
        $data  = $db->limit($start, $limit)->select();
        $total = $db->count();
        foreach ($data as $ko => $vo) {
            $data[$ko]['number'] = db('file')->where('folder_id', $vo['id'])->count();//文件个数
        }
        return msgReturn(0, [
            'total' => $total,
            'data' => $data
        ]);
    }

    /**
     * 文件列表
     */
    public function getFileList()
    {
        $param['id'] = input('id');
        return (new FolderModel())->getFileList($param);
    }

    /**
     * 文件预览
     */
    public function browseFile()
    {
        $param['id'] = input('id');
        return FolderModel::browseFile($param);
    }
}