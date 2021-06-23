<?php
/*
 * @Author: your name
 * @Date: 2021-01-25 16:33:51
 * @LastEditTime: 2021-02-20 09:28:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_back\application\index\controller\AutoResponse.php
 */
namespace app\index\controller;

use think\Controller;
use think\Request;
/**
 * 配置管理控制器
 */
class AutoResponse extends Controller
{
    public function getList(Request $request){
        $search  = $request->search;
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 25;
        $where = [];

        if(!empty($search)){
            $where[] = ['title|return_message','LIKE','%'.$search.'%'];
        }

        $model = db('auto_response')->where($where)->field(['id','identification','title','return_message']);
        $total = $model->count();
        $data = $model->limit($start,$limit)->select();
        return msgReturn(0,['total'=>$total,'data' => $data]);
        
    }

    public function create(Request $request){
        $title = $request->title;
        $return_message = $request->return_message;
        $identification = $request->identification;
        
        if(empty($title) || empty($return_message) || empty($identification)){ 
            return msgReturn('46002',[],'标识或问题关键字或回复内容不能为空');
        }

        $exist = db('auto_response')->where('identification',$identification)->count();
        if($exist){
            return msgReturn(46002,[],'标识'.$identification.'已存在，请重新输入');
        }
        $result = db('auto_response')->insert([
            'title' => $title,
            'return_message' => $return_message,
            'create_uid' => USER_ID,
            'identification'=> $identification,
        ]);

        if($result){
            return msgReturn(45003);
        }
        return msgReturn(46002);
    }

    public function update(Request $request){
        $id = $request->id;
        $title = $request->title;
        $return_message = $request->return_message;
        $identification = $request->identification;

        if(empty($id) || empty($title) || empty($return_message)||empty($identification)){
            return msgReturn('46002',[],'标识或问题关键字或回复内容不能为空');
        }
        $exist = db('auto_response')->where('identification',$identification)->where('id','NEQ',$id)->count();
        if($exist){
            return msgReturn(46002,[],'标识'.$identification.'已存在，请重新输入');
        }
        $result = db('auto_response')->where('id',$id)->update([
            'title' => $title,
            'return_message' => $return_message,
            'identification' => $identification
        ]);

        if($result != false){
            return msgReturn(45003);
        }
        return msgReturn(46002);
    }

    public function delete(Request $request){
        $id = $request->id;
        if(empty($id)){
            return msgReturn(46002,[],'参数错误ID不能为空');
        }
        $result = db('auto_response')->where('id',$id)->delete();
        if($result){
            return msgReturn(45001);
        }
        return msgReturn(46001);
    }
}