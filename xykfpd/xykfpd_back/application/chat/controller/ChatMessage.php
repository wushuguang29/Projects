<?php
namespace app\chat\controller;
use think\Controller;
use GatewayClient\Gateway;
use think\Request;
use think\Db;
// require_once 
/*
 * @Author: your name
 * @Date: 2020-12-26 13:12:30
 * @LastEditTime: 2021-03-03 10:09:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_back\application\chat\controller\ChatMessage.php
 */
class ChatMessage extends Controller{
    protected $admin_id = 999999;
    // public function _initialize()
    // {
    //     Gateway::$registerAddress = '127.0.0.1:1238';

    // }

    public function __construct()
    {
        Gateway::$registerAddress = '120.24.26.46:1238';
        // Gateway::$registerAddress = '127.0.0.1:1238';
        
    }
    
    /**
     * 绑定客户端
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-12-26 16:15:56
     * @param Request $request
     * @return void
     */
    public function boundClient(Request $request){
        $client_id = $request->client_id;
        $unique_uid = $request->unique_uid;
        $boundParams = [
            'client_id' => $client_id,
            'unique_uid' => $unique_uid,
        ];
        try{
            //用户与客户端绑定
            Gateway::bindUid($client_id,$unique_uid);

            //如果不是后台聊天窗口绑定
            if(intval($unique_uid) != $this->admin_id){
                //判断之前是否建立关系
                $exist = Db::table('dialog_relation')->where('app_user_id',$unique_uid)->count();
                if(!$exist){
                    Db::table('dialog_relation')->insert([
                        'app_user_id' => $unique_uid,
                        'user_id' => $this->admin_id,
                        'create_dialog_time' => date('Y-m-d H:i:s'),
                        'near_time' => date('Y-m-d H:i:s'),
                        'create_time'=>date('Y-m-d H:i:s')
                    ]);
                }

                //绑定客户端后 发送消息给客户端
                $autoResponseList = $this->getAutoResponseList();
                if(!empty($autoResponseList['data'])){
                    $message = '您好，由于咨询人数较多,请选择您想咨询的内容：'.'<br />';
                    foreach ((array)$autoResponseList['data'] as $key => $value) {
                        $message.= $value['title'].'----回复：'.$value['identification'].'<br />';
                    }
                    $sender = $this->admin_id;
                    $sender_name = '湘雅康复评定中心';
                    
                    $receiver = $unique_uid;
                    $receiver_name = db('app_users')->where('id',$unique_uid)->value('name');
                    $this->send($sender,$sender_name,$receiver,$receiver_name,$message);
                }

            }
            return msgReturn(0);

        }catch (\Exception $e){
            dump($e);die;
            return msgReturn(-1,$e);
        }
        return msgReturn(0,$boundParams);
    }

    /**
     * 发送消息
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-12-26 17:20:48
     * @param Request $request
     * @return void
     */
    public function sendMessage(Request $request){
        $sender = $request->sender;
        $sender_name = $request->sender_name;

        $receiver = $request->receiver;
        $receiver_name = $request->receiver_name;
        return $this->send($sender,$sender_name,$receiver,$receiver_name,$request->message);
       
    }

    /**
     * 发送
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2021-02-20 09:46:32
     * @return void
     */
    public function send($sender,$sender_name,$receiver,$receiver_name,$sender_message){
         // $message = $request->message ? $request->message :  $sender.'给管理员发送消息'.$nowDate;
        $nowDate = date('Y-m-d H:i:s');

         $clientArr = [];
         $message = [
             'type' => 'message',
             'sender' => $sender,
             'sender_name' => $sender_name,
             'message' => $sender_message ? $sender_message :  $sender.'给管理员发送消息'.$nowDate
         ];
         try{
             Db::startTrans();
             //根据用户ID 获取客户端ID
             $clientArr = Gateway::getClientIdByUid($receiver);
 
             //发送消息
             Gateway::sendToUid(intval($receiver),json_encode($message));
 
             //自动回复
             $autoMessage = $this->getAutoMsg($sender_message);
             $autoMsg = [];
             if($sender != $this->admin_id && !empty($autoMessage)){
                 $autoMsg = [
                     'type' => 'message',
                     'sender' => $receiver,
                     'sender_name' => $receiver_name,
                     'message' => $autoMessage ? $autoMessage :  $receiver_name.'自动回复'.$nowDate
                 ];
                 Gateway::sendToUid(intval($sender),json_encode($autoMsg));
             }
             $dialog_user_id = $sender;
             if(intval($sender) === $this->admin_id){
                 $dialog_user_id = $receiver;
             }
             //找到对话关系ID
             $dialog_id = Db::table('dialog_relation')->where('app_user_id',$dialog_user_id)->value('id');
             //修改最后对话时间
             Db::table('dialog_relation')->where('id',$dialog_id)->setField('near_time',$nowDate);
 
             $content = [
                 'dialog_id' => $dialog_id,
                 'from_id' => $sender,
                 'from_name' => $sender_name,
                 'to_id' => $receiver,
                 'to_name' => $receiver_name,
                 'content' => $message['message'],
                 'is_read' => 2,
                 'send_time' => $nowDate,
                 'create_time' => $nowDate,
             ];
             //插入聊天记录
             Db::table('dialog_content')->insert($content);
             //插入自动回复数据
             if(!empty($autoMsg)){
                 $autoContent = [
                     'dialog_id' => $dialog_id,
                     'from_id' => $receiver,
                     'from_name' => $receiver_name,
                     'to_id' => $sender,
                     'to_name' => $sender_name,
                     'content' => $autoMsg['message'],
                     'is_read' => 2,
                     'send_time' => date('Y-m-d H:i:s'),
                     'create_time' => date('Y-m-d H:i:s'),
                 ];
                 Db::table('dialog_content')->insert($autoContent);
             }
             Db::commit();
         }catch(\Exception $e){
             Db::rollback();
             // dump($e);
             return msgReturn(-1,$e->getMessage());
         }
         return msgReturn(0,$clientArr);
    }
    /**
     * 获取用户列表
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-12-27 14:42:29
     * @return void
     */
    public function getUserList(){
        try{
            $data = Db::table('dialog_relation')->alias('dr')
            ->join('app_users ap','ap.id = dr.app_user_id')
            ->join('dialog_content dc','dc.dialog_id = dr.id and is_read = 2 and dc.to_id = 999999','LEFT')
            ->field([
                'ap.id AS uid',
                'IFNULL(COUNT(dc.id),0) AS unread_num',
                'ap.name',
                'ap.avatar',
                'ap.phone'
            ])->group('dr.id')
            ->select();
            $onLineUser = Gateway::getAllUidList();
            // //在线用户标识
            foreach($data AS $key => $value){
                if(!empty($onLineUser[$value['uid']])){
                    $data[$key]['is_onLine'] = 1;
                }else{
                    $data[$key]['is_onLine'] = 2;
                }
            }
            return msgReturn(0,$data);
        }catch(\Exception $e){
            dump($e);
            return msgReturn(-1,$e->getMessage());
        }
        
    }

    /**
     * 获取用户发送的消息
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-12-27 16:32:26
     * @return void
     */
    public function getUserMessage(Request $request){
        $app_user_id = $request->app_user_id;
        $page = $request->page ? $request->page : 1;
        $limit = $request->limit ? $request->limit : 10;
        $model = db('dialog_relation')->alias('dr')
            ->join('dialog_content dc','dc.dialog_id = dr.id')
            ->where('app_user_id',$app_user_id)
            ->field([
                'from_id',
                'from_name',
                'to_id',
                'to_name',
                'content',
                'send_time',
                'is_read',
            ]);
        $total = $model->count();
        $start = 0;
        if($total > $limit){
            $start = $total - $page-$limit+1;
        }


        $data = $model->order('send_time asc')
            // ->limit($start,$limit)
            ->select();
        return msgReturn(0,['total'=>$total,'data'=>$data]);
    }

    /**
     * 标记已读
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-12-28 11:18:24
     * @param Request $request
     * @return void
     */
    public function markRead(Request $request){
        $app_user_id = $request->app_user_id;
        $type = $request->type;
        //type 1 是用户标记已读   2是管理员标记已读
        $where = [];
        if(intval($type) == 2){
            $where[] = ['from_id','EQ',$app_user_id];
        }else{
            $where[] = ['to_id','EQ',$app_user_id];

        }
        $content_ids = Db::table('dialog_relation')->alias('dr')
            ->join('dialog_content dc','dc.dialog_id = dr.id')
            ->where('dr.app_user_id',$app_user_id)
            ->where($where)
            ->distinct(true)
            ->column('dc.id');

        $result = Db::table('dialog_content')->where('id','IN',$content_ids)->setField('is_read',1);
        if($result !== false){
            return msgReturn(0);
        }
        return msgReturn(46002);
    }

    /**
     * 获取用户成员列表
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2021-01-27 09:36:13
     * @return void
     */
    public function getUserMemberList(Request $request){
        $app_user_id = $request->id;
        if(empty($app_user_id)){
            return msgReturn(46002,[],'操作失败，缺少用户ID参数');
        }
        $data = Db::table('app_user_member')->where('app_user_id',$app_user_id)
            ->select();
        return msgReturn(0,$data);
    }

    /**
     * 获取自动回复列表
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2021-02-04 10:14:28
     * @return void
     */
    public function getAutoResponseList(){
        $data = db('auto_response')->field(['identification','title'])->order('identification ASC')->select();
        return msgReturn(0,$data);
    }
    
    public function getAutoMessage(Request $request){
        $message = $request->message;
        $result = db('auto_response')->where('concat(identification)',$message)->value('return_message');
        
        if(!empty($result)){
            return msgReturn(0,[],$result);
        }
        return msgReturn(0,[],'',false);
    }

    public function getAutoMsg($msg){
        try {
            $where = "concat(identification) = ".$msg;
            $result = db('auto_response')->where($where)->value('return_message');

            if(!empty($result)){
                return $result;
            }
            return '';
        } catch (\Exception $e) {
            return '';
        }
        
    }
}
