<?php
/*
 * @Author: your name
 * @Date: 2020-04-24 10:59:55
 * @LastEditTime: 2020-11-13 13:31:37
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \lhsoft_back\application\common\model\ConfigurationModel.php
 */
namespace app\common\model;

use Exception;
use service\rewrite\RewriteModel;
use think\facade\Cache;
use think\facade\Config;

class ConfigurationModel extends RewriteModel{

	protected $table = 'configuration';

    /**
     * [getConfigInfo 获取配置信息]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-26T16:13:57+0800
     * @param    [type]                   $name [description]
     * @return array|string|null [type]                         [description]
     * @throws Exception
     */
	public static function getConfigInfo($name){
		$result = self::where('name',$name)->find();

		if (!empty($result)) {
            return $result;
        } else {
		    throw new Exception('查询的配置不存在', -1);
        }
	}

    /**
     * [update 修改配置]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-26T17:57:46+0800
     * @param    [type]                   $data [description]
     * @return array [type]                         [description]
     */
	public function updateConfig($data){
		$result = $this->allowField(true)->isUpdate(true)->save($data);
		if($result !== false){
		    // 更新配置缓存
            $config = self::where('status', 1)->all();

            $baseConfig = Config::get('config.');

            $this->cacheConfig(['config' => $config, 'baseConfig' => $baseConfig]);

			return msgReturn(45003);
		}
		return msgReturn(46002);
	}

    /**
     * 获取缓存
     * @return array
     * @throws \think\Exception\DbException
     */
	public function getConfiguration()
    {
        $config = self::where('status', 1)->all();

        $baseConfig = Config::get('config.');

        $archivesConfig = COnfig::get('archives.');

        $data = ['config' => $config, 'base_config' => $baseConfig,'archives_config'=>$archivesConfig];

        // 判断缓存是否存在
        if (!Cache::get('config_key')) {
            $this->cacheConfig($data);
        }

        return $data;
    }

    /**
     * 创建配置缓存
     * @param $data
     */
    public function cacheConfig($data)
    {
        $key = md5(json_encode($data));

        Cache::set($key, $data,0);

        Cache::set('config_key',$key,0);
    }
}