<?php


namespace app\common\service;

use Gregwar\Captcha\CaptchaBuilder;
use Gregwar\Captcha\PhraseBuilder;
use think\facade\Cache;

/**
 * 验证码类
 * @package app\common\service
 */
class Captcha
{
    /**
     * [getCaptcha 获取验证码]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-25T15:12:47+0800
     * @return   [type]                   [description]
     */
    public function getCaptcha()
    {

        $phrase = new PhraseBuilder;
        // 设置验证码位数
        $code = $phrase->build(4);
        // 生成验证码图片的Builder对象，配置相应属性
        $builder = new CaptchaBuilder($code, $phrase);
        // 设置背景颜色
        $builder->setBackgroundColor(220, 210, 230);
        $builder->setMaxAngle(25);
        $builder->setMaxBehindLines(0);
        $builder->setMaxFrontLines(0);
        // 可以设置图片宽高及字体
        $builder->build($width = 100, $height = 40, $font = null);
        // 获取验证码的内容
        $phrase = $builder->getPhrase();
        //缓存过期时间
        $expired_at = 3600; //120

        //缓存键
        $captcha_key = 'captcha_' . str_random(15);
        // 把内容存入缓存
        Cache::set($captcha_key, $phrase, $expired_at);
        $captcha_image_content = $builder->inline();
        return msgReturn(45003, [
            'captcha_key' => $captcha_key,
            'captcha_image_content' => $captcha_image_content,
            'expired_at' => $expired_at,
            'captcha_code' => $phrase,
        ]);
    }
}