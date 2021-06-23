<?php

namespace app\index\controller;

use app\common\model\FolderModel;
use think\Controller;
use think\Db;
use think\Request;
use app\common\model\FileModel;

/**
 * 在线资源管理
 * @package app\index\controller
 */
class Folder extends Controller
{
    protected $fileId      = [];//文件id
    protected $visit_path = [];//访问路径
    protected $errorMsg    = [];//错误信息
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
     * 文件夹添加
     */
    public function add()
    {
        $param = input();
        return FolderModel::add($param);
    }

    /**
     * 文件夹重命名
     */
    public function rename()
    {
        $param = input();
        return FolderModel::rename($param);
    }

    /**
     * 文件夹删除
     */
    public function delete()
    {
        $id = input('ids');
        if (is_numeric($id)) {
            $FileIdArr[] = $id;
        } else {
            if (is_null(json_decode($id))) {
                $FileIdArr = explode(",", $id);
            } else {
                $FileIdArr = json_decode($id, true);
            }
        }
        Db::startTrans();
        try {
            Db::table('folder')->where("id", "in", $FileIdArr)->delete();
            Db::commit();
            return msgReturn(45001);
        } catch (\Exception $e) {
            Db::rollback();
            return msgReturn(46001);
        }
    }

    /**
     * 文件夹查看
     */
    public function browse()
    {
        $param['id'] = input('id');
        return FolderModel::browse($param);
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

    /*
     * 文件上传
     */
    public function upload(Request $request,FileModel $fileModel,FolderModel $model)
    {
        set_time_limit(0);
        // dump(111111);die;

        $files      = $request->file('file');
        $target_id  = $request->id;
        if (!is_array($files) && $files instanceof \think\File) {
            $filesObj = $files;
            unset($files);
            $files[] = $filesObj;
        }
        foreach ($files as $file) {
            $validate = $fileModel->validate($file);
            $info = $file->getInfo();
            if ($validate["status"] == false) {
                array_push($this->errorMsg,$info["name"].$validate["msg"]);
            }else {
                $result = $model->upload($file, $info, USER_ID, $target_id);
                if($result["status"] == false){
                    array_push($this->errorMsg,$result["data"]["error_msg"]);
                }else{
                    if(!empty($result["data"]["error_msg"])){
                        array_push($this->errorMsg,$result["data"]["error_msg"]);
                    }
                    array_push($this->fileId,(int)$result["data"]["file_id"]);
                    array_push($this->visit_path,$result["data"]["visit_path"]);
                }
            }
        }
        #上传成功
        if(empty($this->errorMsg)){
            return msgReturn(0,array( "file_id"=>array_unique($this->fileId), 'path'=>array_unique($this->visit_path)));
        }else{
            return msgReturn(0,array(
                "file_id"=>array_unique($this->fileId), 'path'=>array_unique($this->visit_path)
            ),$this->errorMsg);
        }
    }

    /**
     * 下载
     */
    public function download(Request $request,FolderModel $model){
        $file_ids = $request->file_ids;
        $result = $model->download($file_ids);
        if($result["status"]){
            return msgReturn(45014,$result["data"]);
        }else{
            return msgReturn(46012,"","下载失败，".$result["msg"]);
        }
    }

    /**
     * 文件删除
     */
    public function deleteFile()
    {
        $id = input('ids');
        if (is_numeric($id)) {
            $FileIdArr[] = $id;
        } else {
            if (is_null(json_decode($id))) {
                $FileIdArr = explode(",", $id);
            } else {
                $FileIdArr = json_decode($id, true);
            }
        }
        Db::startTrans();
        try {
            Db::table('file')->where("id", "in", $FileIdArr)->delete();
            Db::commit();
            return msgReturn(45001);
        } catch (\Exception $e) {
            Db::rollback();
            return msgReturn(46001);
        }
    }

    /**
     * 文件重命名
     */
    public function renameFile()
    {
        $param = input();
        return FolderModel::renameFile($param);
    }


    /**
     * @Note  获取有图片的文件夹列表
     * @User  Yqx
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public  function getImageFolder(){
        $imageType = config('service.file.img_type');
        $res = Db::table('folder')->alias('fo')
            ->join('file f','f.folder_id = fo.id')
            ->where('f.ext','in',$imageType)
            ->field([
            'fo.id',
            'fo.pid',
            'folder_name',
        ])->group('fo.id')->select();
        return msgReturn(0,$res,'获取成功！');
    }

    /**
     * @Note  根据文件夹id获取分页图片列表
     * @User  Yqx
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getImageByFolderId(){
        $folderId = input('folder_id');#文件夹id
        $start = input('start',0);
        $limit = input('limit',25);
        $imageType = config('service.file.img_type');
        if(empty($folderId)){
            return msgReturn(-1,[],'缺少重要参数！');
        }
        $where['folder_id'] = $folderId;
        $db = Db::table('file')->where($where)->where('ext','in',$imageType);
        $total = $db->count();
        $res = $db->field(['id','folder_id','name','savename','savepath','ext','ext','width','height'])->limit($start,$limit)->select();
        return msgReturn(0,['data'=>$res,'total'=>$total],'获取成功！');
    }


}