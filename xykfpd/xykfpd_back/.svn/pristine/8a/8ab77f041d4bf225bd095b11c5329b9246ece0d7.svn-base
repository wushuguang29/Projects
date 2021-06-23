<?php

namespace app\http\middleware;

use service\exception\ConfigException;
use think\facade\Cache;

/**
 * 判断配置是否更新
 * @package app\http\middleware
 */
class Config
{

    public function handle($request, \Closure $next)
    {
        if (CONFIG_KEY == Cache::get('config_key')) {

            return $next($request);

        } else {
            throw new ConfigException(config('code.40005'), 40005);
        }
    }
}
