<?php
/*
 * @Author: your name
 * @Date: 2020-04-20 10:34:08
 * @LastEditTime: 2020-12-01 16:49:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lhsoft_back\application\common\model\FileModel.php
 */

namespace app\common\model;

use service\rewrite\RewriteModel;
use think\file;
/**
 * 文件模型
 * @package app\common\model
 */
class FileModel extends RewriteModel
{
    protected $table = 'file';
    #获取文件信息
    public function info($param=[]){
        $where=[];
        if(isset($param["file_md5"])){
            $where[]=array("md5","eq",$param["file_md5"]);
        }
        if(isset($param["data_from"])){
            $where[]=array("data_from","eq",$param["data_from"]);
        }
        if(isset($param["uid"])){
            $where[]=array("handler_id","eq",$param["uid"]);
        }
        if(!empty($file_id)){
            $where[]=array("id","eq",$file_id);
        }
        $result=$this->where($where)->field(array("savepath","savename","id","name","ext","width","height"))->find();
        return $result;
    }

    /**
     * 上传验证
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-02 16:07:02
     * @param [type] $file
     * @return void
     */
    public function validate($file){
        $config= config("service.file");//所有上传的配置
        $type       = $config['upload_file_ext'];//上传文件的类型限制
        $size       = $config['upload_file_size']; #上传文件大小限制
        $validate_info = $file->check(array('size'=>$size,'ext'=>$type,"type"=>$config['upload_file_type']));
        if (empty($validate_info)) {
            return array(
                "status"=>false,
                "msg"=>$file->getError()
            );
        }else{
            return array(
                "status"=>true
            );
        }
    }

    /**
     * 获取文件编号
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-27 09:50:12
     * @return void
     */
    public function getFileNo(){
        $max_no = $this->max('file_no',false);
        if($max_no){
            $max_no++;
        }else{
            $max_no = 'F00000001';
        }
        return $max_no;
    }
}