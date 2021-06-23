<?php
namespace app\common\behavior;
use think\Response;

class Cors {

    public function appInit(){
    	$origin = request()->server('HTTP_ORIGIN') ?: '';
    	$allow_origin = config('service.region');
        if (in_array($origin, $allow_origin)) {
	        header('Access-Control-Allow-Origin:'.$origin);
	        header('Access-Control-Allow-Headers: token, Origin, X-Requested-With, Content-Type, Accept, Authorization,Identifier');
	        header('Access-Control-Allow-Methods: POST,GET,PUT,DELETE,OPTIONS');
          header('Access-Control-Allow-Credentials: true'); //表示是否允许发送Cookie
          header('Access-Control-Expose-Headers:Authorization');
        }
        if(request()->isOptions()){
            exit();
        }
    }

}