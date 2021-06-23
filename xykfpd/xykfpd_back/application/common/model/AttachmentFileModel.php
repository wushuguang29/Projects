<?php

namespace app\common\model;

use app\common\service\ImgCompress;
use service\rewrite\RewriteModel;
use think\Db;
use zip\pclzip;
class AttachmentFileModel extends RewriteModel
{
    protected $table = 'attachment_file';
    protected $pk = 'id';
    public static $root_path;
    public static $view_file_path;
    public static $view_zip_path;
    public static $zip_path;
    public static $upload_path;
    public static $view_archives_file_path;
    public static $upload_config;
    public function initialize(){
        parent::initialize();
        $VIEW_FILE_PATH=ConfigurationModel::where("name","eq","VIEW_FILE_PATH")->value("value");
        $VIEW_FILE_PATH=trim($VIEW_FILE_PATH,"/");
        self::$upload_config=config("service.file");
        self::$upload_path=env("root_path")."/".config("service.file.upload_file_path")."/";
        self::$view_file_path=$VIEW_FILE_PATH."/". config("service.file.upload_file_path") ."/";

        self::$zip_path=env("root_path").config("service.file.download_file_path") .'/';
        self::$view_zip_path=$VIEW_FILE_PATH."/". config("service.file.download_file_path") . "/";

    }
    /**
     * 获取文件列表
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-02 15:52:48
     * @param integer $target_id 目标ID
     * @param integer $bound_folder_id 文件夹绑定ID
     * @param integer $resources_id 资源ID
     * @param integer $data_from 数据来源 1业务数据 2档案数据
     * @param integer $is_manually_create_archives 1手动创建 2自动创建
     * @param integer $project_id 项目ID
     * @return void
     */
    public function getList($target_id=0,$folder_id=0,$affiliation_type=0,$archives_type = 1,$bound_folder_id=0,$data_from =[],$is_manually_create_archives =2,$project_id=0,$start=0,$limit=25,$flag = false,$searchWhere=[]){
        $where=[];
        if(!is_null($project_id)){
            $where[]=array("af.project_id","eq",$project_id);
        }
        if(!is_null($target_id)){
            $where[]=array("af.target_id","eq",$target_id);
        }
        if(!empty($data_from)){
            $where[] = array('af.data_from','IN',$data_from);
        }
        if(!is_null($is_manually_create_archives)){
            $where[] = array('af.is_manually_create_archives','EQ',$is_manually_create_archives);
        }
        if(!empty($folder_id)){
            $where[] = array('af.folder_id','EQ',$folder_id);
        }
        if(!empty($affiliation_type)){
            $where[] = array('af.affiliation_type','EQ',$affiliation_type);
        }
        if(!empty($bound_folder_id)){
            if($flag){//不找下级文件
                $bound_folder_idArr[] = intval($bound_folder_id);
                $where[] = array('af.bound_folder_id','IN',$bound_folder_idArr);
            }else{
                $bound_folder_idArr = $this->getJuniorFolderBoundId($bound_folder_id);
                $bound_folder_idArr[] = intval($bound_folder_id);
                $where[] = array('af.bound_folder_id','IN',$bound_folder_idArr);
            }
            
        }
        if(!empty($archives_type)){
            $where[] = array('af.archives_type','EQ',$archives_type); 
        }
        $orderStr = $archives_type == 1 ? ['af.folder_id','af.id'=> 'DESC'] : ['arbf.id','af.id'=> 'DESC'];
        $field=array(
            'af.id AS attachment_file_id',
            'IFNULL(arbf.id,0) AS bound_folder_id',
            'f.height',
            'f.width',
            'f.ext',
            'af.file_name',
            'concat("'.self::$view_file_path.'","",f.savepath,"/",f.savename)  as path',
            'u.username AS create_user_name',
            'f.size',
            'af.create_time',
            'f.file_no',
            'af.folder_id',
            'aff.folder_name'
        );
        $imgType   = config('service.file.img_type');
        $wordType  = config('service.file.word_type');
        $excelType = config('service.file.excel_type');
        $pptType = config('service.file.ppt_type');
        $cadType = config('service.file.cad_type');
        $pdfType = config('service.file.pdf_type');
        // dump($where);die;
        $model=$this->alias("af")
            ->join("attachment_resources_bound_folder arbf","arbf.id=af.bound_folder_id",'LEFT')
            ->join("file f","f.id=af.file_id",'LEFT')
            ->join('users u','u.id = af.create_uid','LEFT')
            ->join('attachment_folder aff','aff.id = af.folder_id','LEFT')
            ->where($where)
            ->where($searchWhere)
            ->field($field);
            
        $total = $model->count();
        $result = $model
            ->limit($start,$limit)
            ->order($orderStr)
            // ->field($field)
            ->select()->toArray();
            // echo $this->getLastSql();die;
        foreach ($result as $k => $v) {
            if (strpos($imgType, strtolower($v["ext"])) !== false) {
                $result[$k]['type'] = 1;
            } else if (strpos($wordType, strtolower($v["ext"]))!== false) {
                $result[$k]['type'] = 2;
            } else if (strpos($excelType,strtolower($v["ext"])) !== false) {
                $result[$k]['type'] = 3;
            } else if (strpos($pptType,strtolower($v["ext"])) !== false) {
                $result[$k]['type'] = 4;
            } else if (strpos($cadType,strtolower($v["ext"])) !== false) {
                $result[$k]['type'] = 5;
            } else if (strpos($pdfType,strtolower($v["ext"])) !== false) {
                $result[$k]['type'] = 6;
            } else {
                $result[$k]['type'] = 7;
            }
        }
        return ['total'=>$total,'data'=>$result];
    }

    /**
     * 重名明
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-05 11:34:48
     * @param integer $attachment_file_id
     * @param string $file_name
     * @return void
     */
    public function rename($attachment_file_id=0,$file_name=""){
        //先去掉最后的后缀名
        $file_name=str_replace(strrchr($file_name, "."),"",$file_name);
        //补上后缀名
        $ext=self::ext($attachment_file_id);
        $result=$this->isUpdate(true)->save(array("file_name"=>$file_name.".".$ext,"id"=>$attachment_file_id));
        return $result;
    }
    /**
     * 获取后缀
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-05 11:34:55
     * @param integer $attachment_file_id
     * @return void
     */
    public static function ext($attachment_file_id=0){
        return  self::where("id","eq",$attachment_file_id)->value("ext");
    }


    public function info($attachment_file_id=0){
        $result=$this->find($attachment_file_id);
        return $result;
    }
    /**
     * 查看文件名是否重复
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-05 11:33:10
     * @param integer $bound_folder_id
     * @param string $file_name
     * @return boolean
     */
    public function isRepeat($bound_folder_id=0,$file_name=""){
        $result=$this->where("bound_folder_id","eq",$bound_folder_id)->where("file_name","eq",$file_name)->count();
        if($result>0){
            return true;
        }else{
            return false;
        }
    }
    /**
     * 构建下载数据
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-09 15:03:53
     * @return void
     */
    public function buildDownloadData($attachment_file_ids=""){
        if (is_numeric($attachment_file_ids)) {
            $fileArr[] = $attachment_file_ids;
        } else {
            if (is_null(json_decode($attachment_file_ids))) {
                $fileArr = explode(",", $attachment_file_ids);
            } else {
                $fileArr = json_decode($attachment_file_ids, true);
            }
        }
        $result = $this->alias("af")
            ->join("file f", "f.id=af.file_id")
            ->field(array("concat('".self::$view_file_path."','',f.savepath,'/',f.savename) as url", "f.savepath", "f.savename"))
            ->where("af.id","in",$fileArr)
            ->select();
        if(!empty($result)){
            return self::download($result,self::$upload_path);
        }else {
            return array("status" => false, "msg" => "未获取到相关数据！");
        }
    }

    /**
     * 下载
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-09 15:12:48
     * @param [type] $data 需要打包的数据
     * @param [type] $remove_path 不需要的前缀路径
     * @param string $zipName 压缩包名称
     * @return void
     */
    static function download($data, $remove_path,$zipName='')
    {
        $zipName=!empty($zipName) ? $zipName : date("Y-m-d") . ".zip";
        $zipPath=self::$zip_path.$zipName; //压缩包存放路径
        $zipViewPath=self::$view_zip_path.$zipName; //压缩包访问路径
        $archive = new pclzip($zipPath);
        foreach ($data as $file) {
            $path = self::$upload_path. $file["savepath"] . "/" . $file["savename"];
            $paths[] = str_replace('//', '/', $path);
        }
        dump($paths);die;
        $data = $archive->add(implode(",",$paths),PCLZIP_OPT_ADD_PATH, '',
            PCLZIP_OPT_REMOVE_PATH,$remove_path);
        if ($data == 0) {
            return array("status" => false, "msg" => $archive->errorInfo(true));
        } else {
            return array("status" => true,"data"=>$zipViewPath);
        }
    }

    /**
     * [upload 上传附件]
     * @param $file
     * @param $info
     * @param $user_id
     * @param $target_id
     * @param $bound_folder_id
     * @param $project_id
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     * @throws \think\exception\PDOException
     */
    public function upload($file,$info,$user_id,$target_id,$bound_folder_id,$folder_id,$affiliation_type=0,$project_id=0,$archives_type=1,$data_from=1,$is_manually_create_archives=2){
        $ext = str_replace('.','',strrchr($info["name"],'.'));
        $imgType = config('service.file.img_type');
        #给文件加密
        $encryptFile=array(
            "sha1"=>sha1_file($info['tmp_name']),
            "md5"=>md5_file($info['tmp_name'])
        );
        #构造附件数据
        $attachmentFileData = [
            'bound_folder_id' => $bound_folder_id,
            'target_id' => $target_id,
            'project_id' =>$project_id,
            'create_time' => date('Y-m-d H:i:s'),
            'update_time' => date('Y-m-d H:i:s'),
            'create_uid' => $user_id,
            'data_from' => $data_from,
            'is_manually_create_archives' => $is_manually_create_archives,
            'folder_id' => $folder_id,
            'affiliation_type' => $affiliation_type,
            'archives_type' => $archives_type
        ];
        // dump($attachmentFileData);die;
        #文件是否已存在
        $oldFileData=db("file")->where( array("md5"=>$encryptFile["md5"],"data_from"=>1))->field(array("savepath","savename","id","name","ext","width","height","size"))->find();
        if(empty($oldFileData)) {
            //判断是否为图片 如果是图片并且大于配置压缩大小就进行图片压缩 不是图片直接移动
            if(strpos($imgType, strtolower($ext)) !== false && ($file->getSize() >= config('service.file.IMG_COMPRESS_BEGIN_SIZE'))){
                $savename = md5(microtime(true)).'.'.$ext;
                $savepath = date('Ymd');
                $imgCompress = new ImgCompress();
                $comResult = $imgCompress->compressImg($info,self::$upload_path.$savepath,$savename);
                if($comResult == false){
                    return array(
                        'status' => false,
                        'data' => array(
                            'error_msg'=>$info['name'].'图片压缩失败'
                        )
                    );
                }
                $imgSrc = self::$upload_path.'/'.$savepath.'/'.$savename;
                $size = filesize($imgSrc);
                $mime = mime_content_type($imgSrc);
            } else {
                $moveResult=$file->move(self::$upload_path);
                if($moveResult==false){
                    return array(
                        "status"=>false,
                        "data"=>array(
                            "error_msg"=>$info["name"].$file->getError()
                        )
                    );
                }
                $savename = $moveResult->getFilename();
                $savepath = substr($moveResult->getSaveName(), 0, strpos($moveResult->getSaveName(), "/"));
                $mime = $moveResult->getMime();
                $size = $moveResult->getSize();
                $imgSrc = self::$upload_path.'/'.$savepath.'/'.$savename;
            }
            
            $imageInfo = @GetImageSize($imgSrc);
            $fileModel = new FileModel();
            $file_no = $fileModel->getFileNo();
            #构造file表数据
            $fileData=[
                'name' => $info["name"], //原始名称
                'savename' =>$savename,
                "savepath" => $savepath,
                'ext' => str_replace('.','',strrchr($info["name"],'.')), //后缀名
                'mime' => $mime, //
                'size' => $size, //大小
                'md5' => $encryptFile["md5"], //对原始附件md5
                'sha1' => $encryptFile["sha1"],//对原始附件sha1
                "data_from"=>1,
                "create_uid"=>$user_id,
                'create_time' => date('Y-m-d H:i:s'),
                'file_no' => $file_no
            ];
            #是否为图片
            if(!(false === $imageInfo)){
                $fileData["width"]  = $imageInfo[0];
                $fileData["height"]  = $imageInfo[1];
            }
            $attachmentFileData["file_name"]=$info["name"];
            $attachmentFileData["ext"]= $fileData["ext"];
            $attachmentFileData['size'] = $size;
            try{
                db()->startTrans();
                $file_id = db("file")->insertGetId($fileData);
                $attachmentFileData["file_id"]=$file_id;
                $this->insert($attachmentFileData);
                db()->commit();
                return array(
                    "status"=>true,
                    "data"=>array(
                        "error_msg"=>"",
                        "file_id"=>$file_id,
                        "visit_path"=>self::$view_file_path. $fileData["savepath"] . "/" . $fileData["savename"]
                    )
                );
            }catch (\Exception $e){
                db()->rollback();
                return array(
                    "status"=>false,
                    "data"=>array(
                        "error_msg"=>$info["name"].($e->getMessage())
                    )
                );
            }

        }else{
            $where = [
                'file_id'=> $oldFileData["id"],
                'bound_folder_id'  => $bound_folder_id,
                'target_id'            =>$target_id,
                'project_id'            =>$project_id,
            ];
            $attachmentFileId =$this->where($where)->value('id');
           if ($attachmentFileId > 0) {
                return array(
                    "status"=>true,
                    "data"=>array(
                        "error_msg"=>$info["name"]."文件已存在!",
                        "file_id"=>$oldFileData["id"],
                        "visit_path"=>self::$view_file_path.$oldFileData["savepath"]."/".$oldFileData["savename"]
                    )
                );
            }else{
                $attachmentFileData["file_id"]=$oldFileData["id"];
                $attachmentFileData["ext"]=$oldFileData["ext"];
                $attachmentFileData["file_name"]= $oldFileData["name"];
                $attachmentFileData["size"]= $oldFileData["size"];
                $this->insert($attachmentFileData);
                return array(
                    "status"=>true,
                    "data"=>array(
                        "error_msg"=>"",
                        "file_id"=>$oldFileData["id"],
                        "visit_path"=>self::$view_file_path.$oldFileData["savepath"]."/".$oldFileData["savename"]
                    )
                );
            }
        }

    }

    /**
     * 复制业务文件至档案
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-24 15:44:48
     * @return void
     */
    public function copyBusinessFileToArchives($target_id,$affiliation_type,$is_manually_create=2){
        $oldData = $this->where('archives_type',1)
            ->where('target_id',$target_id)
            ->where('affiliation_type',$affiliation_type)
            ->where('is_manually_create_archives',$is_manually_create)
            ->select();
        //构建新数据
        $newData = [];
        foreach ($oldData as $key => $value) {
            array_push($newData,[
                'bound_folder_id' => $value['bound_folder_id'],
                'target_id' => $value['target_id'],
                'file_id' => $value['file_id'],
                'project_id' => $value['project_id'],
                'archives_type' => $value['archives_type'],
                'affiliation_type' => $value['affiliation_type'],
                'file_name' => $value['file_name'],
                'size' => $value['size'],
                'ext' => $value['ext'],
                'is_manually_create_archives' => $value['is_manually_create_archives'],
                // TODO 修改创建人
                'create_uid' => 1,
                'data_from' => 2,
                'create_time' => date('Y-m-d H:i:s'),
                'folder_id' => $value['folder_id'],
            ]);
        }
        $result = $this->saveAll($newData);
        if($result){
            return true;
        }
        return false;
    }

    /**
     * 构建层级下载收据
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-25 13:43:34
     * @return void
     */
    public function buildTierDownloadData($final_target_id,$target_name,$archives_type,$is_manually_create,$data_from=[],$attachment_file_id=[]){
        $where = [];
        if(!empty($attachment_file_id)){
            $where[] = ['af.id','IN',$attachment_file_id];
        }
        if(!empty($data_from)){
            $where[] = ['af.data_from','IN',$data_from];
        }
        $field = [
            "concat('".self::$view_file_path."','',f.savepath,'/',f.savename) as url", 
            "f.savepath",
            "f.savename",
            "aff.folder_name",
            'aff.id AS folder_id',
            'IFNULL(arbf.pid,0) AS pid'
        ];
        $result = $this->alias("af")
            ->join("file f", "f.id=af.file_id",'left')
            ->join('attachment_folder aff','aff.id = af.folder_id','LEFT')
            ->join('attachment_resources_bound_folder arbf','arbf.id = af.bound_folder_id','LEFT')
            ->where('af.target_id',$final_target_id)
            ->where('af.archives_type',$archives_type)
            ->where('af.is_manually_create_archives',$is_manually_create)
            ->where($where)
            ->field($field)
            ->select()->toArray();
           
        foreach ($result as $key => $value) {
            $result[$key]['path'] = self::$upload_path. $value["savepath"] . "/" . $value["savename"];
            $result[$key]['remove_path'] = self::$upload_path. $value["savepath"];
            if($value['pid'] != 0){
                $folder_arr = array_reverse((array)$this->getSuperiorFolder($value['pid']));
                // dump($folder_arr);die;
                $result[$key]['add_path'] = $target_name . '/' . implode('/',$folder_arr) . '/' .$value['folder_name'];
            }else{
                $result[$key]['add_path'] = $target_name . '/' . $value['folder_name'];
            }
        }
        
        if(empty($result)){//为空  没有选中下载的数据
            return false;
        }
        $zipResult = $this->tierDownload($result,$target_name);
        return $zipResult;
       
    }

    /**
     * 层级下载
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-26 14:14:20
     * @param [type] $data
     * @return void
     */
    public function tierDownload($data,$zipName=''){
        $zipName=!empty($zipName) ? $zipName.'.zip' : date("Y-m-d") . ".zip";
        $zipPath=self::$zip_path.$zipName; //压缩包存放路径
        $zipViewPath=self::$view_zip_path.$zipName; //压缩包访问路径
        $archive = new pclzip($zipPath);
        $errorData = [];
        foreach ($data as $key => $value) {
            $zipAddResult = $archive->add($value['path'],
                PCLZIP_OPT_REMOVE_PATH, $value['remove_path'],
                PCLZIP_OPT_ADD_PATH, $value['add_path']
            );
            if($zipAddResult == 0){
                array_push($errorData,$archive->errorInfo(true));
            }
        }
        if(empty($errorData)){
            return ['status'=>true,'data'=>$zipViewPath];
        }
        return ['status'=>false,'data'=>$errorData];
    }

    /**
     * 获取上级名称
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-26 13:33:44
     * @param [type] $pid
     * @param array $data
     * @return void
     */
    public function getSuperiorFolder($pid,$data=[]){
        $result = db('attachment_resources_bound_folder')->alias('arbf')
            ->join('attachment_folder af','af.id = arbf.folder_id')
            ->where('arbf.id',$pid)
            ->field(['arbf.pid','af.folder_name'])
            ->find();
        if(!empty($result)){
            array_push($data,$result['folder_name']);
            $data = $this->getSuperiorFolder($result['pid'],$data);
        }
        return $data;
        
    }
    /**
     * 获取下级文件夹绑定ID
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-26 13:37:24
     * @param [type] $id
     * @param array $data
     * @return void
     */
    public function getJuniorFolderBoundId($id,$data = []){
        $result = db('attachment_resources_bound_folder')
            ->where('pid','IN',$id)
            ->column('id');
        if(!empty($result)){
            $data = array_merge($data,$result);
            $data = $this->getJuniorFolderBoundId($result,$data);
        }
        return $data;
    } 

    public function getSuperiorFolderBoundId($id,$data = []){
        $result = db('attachment_resources_bound_folder')
            ->where('id','IN',$id)
            ->column('pid');
        if(!empty($result)){
            $data = array_merge($data,$result);
            $data = $this->getSuperiorFolderBoundId($result,$data);
        }
        return $data;
    } 

    public function getArchivesFolderInPreview($final_target_id,$type,$archives_type,$is_manually_create=2,$affiliation_type=0,$bound_folder_id=0){
        $where[] = ['archives_type','EQ',$archives_type];
        if(!empty($affiliation_type)){
            $where[] = ['abf.affiliation_type','EQ',$affiliation_type];
        }
        if(!empty($bound_folder_id)){
            $sup = $this->getSuperiorFolderBoundId($bound_folder_id);
            $jun = $this->getJuniorFolderBoundId($bound_folder_id);
            $bound_folder_idArr = array_merge($sup,$jun,[$bound_folder_id]);
            $where[] = ['abf.id','IN',$bound_folder_idArr];
        }
        $data_from = [1];

        if($type == 3 && config('archives.ARCHIVE_SUBMIT_STATUS') == 2 ){
            $data_from = [1,2];
        }else if($type == 3 && config('archives.ARCHIVE_SUBMIT_STATUS') == 1){
            $data_from = [2];
        }

        if($archives_type == 1){
            $field = [
                'af.id AS folder_id',
                'af.folder_name'
            ];
        }else{
            $field = [
                'abf.id AS folder_id',
                'af.folder_name'
            ];
        }
        $list = db('attachment_resources_bound_folder')->alias('abf')
            ->join('attachment_folder af', 'abf.folder_id = af.id', 'LEFT')
            ->where($where)
            ->field($field)
            ->where($where)
            ->distinct(true)
            ->select();
        foreach($list AS $key => $value){
            if($archives_type == 1){
                $list[$key]['number'] = $this->getFileNumber($final_target_id,$archives_type,$is_manually_create,$affiliation_type,$data_from,0,$value['folder_id']);
            }else{
                $list[$key]['number'] = $this->getFileNumber($final_target_id,$archives_type,$is_manually_create,$affiliation_type,$data_from,$value['folder_id'],0);
            }
        }

        return $list;
        

        
    }

    /**
     * 删除文件
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-11-27 10:26:00
     * @param [type] $idArr
     * @return void
     */
    public function deleteFile($idArr){
        $result=$this->where("id","in",$idArr)->delete(true);
        if($result){
            return true;
        }
        return false;
    }

    public function getFileNumber($target_id,$archives_type,$is_manually_create,$affiliation_type=0,$data_from=[],$bound_folder_id = 0,$folder_id =0,$is_img=false){
        $where = [];
        if(!empty($affiliation_type)){
            $where[] = ['affiliation_type','EQ',$affiliation_type];
        }
        if(!empty($bound_folder_id)){
            $where[] = ['bound_folder_id','EQ',$bound_folder_id];
        }
        if(!empty($folder_id)){
            $where[] = ['folder_id','EQ',$folder_id];
        }
        if(!empty($data_from)){
            $where[] = ['data_from','IN',$data_from];
        }
        if($is_img){
            $where[] = ['ext','IN',explode(',',config('service.file.img_type'))];
        }
        $number = $this->where('target_id',$target_id)
            ->where('archives_type',$archives_type)
            ->where('is_manually_create_archives',$is_manually_create)
            ->where($where)
            ->count();
        // echo $this->getLastSql();
        // echo '</br>';
        return $number;
    }

    

    // $a = [0=>'aa',1=>bb];
    // $b = array_reverse($a);
    // echo implode('/',$b);
    // var_dump($b);

}