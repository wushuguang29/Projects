<?php
/**
 * 匹配资源路由
 */

    //     获取到当前的请求的url
    $router = trim(mb_strtoupper(\think\facade\Request::baseUrl()), "/");

    //     使用查询缓存获取
    $resources = \app\common\model\ResourceModel::
//    cache('resources')
    where('status', 'eq', 1)
    ->where('method', 'neq', '')
    ->where('url', 'neq', '')
    ->where('router', 'neq', '')
    ->column("id, method, TRIM(BOTH '/' FROM url) AS url, TRIM(BOTH '/' FROM router) AS router, middleware", "TRIM(BOTH '/' FROM UPPER(router))");

    //     匹配路由
    if (array_key_exists($router, $resources))
    {
        $option = [];

        if (mb_strlen($resources[$router]['middleware']) > 0) {
            $option['middleware'] = explode(',', $resources[$router]['middleware']);
        }

        // 路由ID添加至常量 中间件需要使用
        define('RESOURCES_ID', $resources[$router]['id']);

        Route::rule($resources[$router]['router'] , $resources[$router]['url'], $resources[$router]['method'], $option);
    }
