<?php
namespace app\common\service;
/*
 * @Author: your name
 * @Date: 2020-12-01 17:12:47
 * @LastEditTime: 2020-12-07 10:52:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lhsoft_back\application\common\service\ImgCompress.php
 */

class ImgCompress{
    private $src;
    private $image;
    private $imageInfo;
    private $percent = 1;
    private $quality = 3;

    /**
     * 压缩图片
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-12-02 10:56:51
     * @param [type] $fileInfo
     * @return void
     */
    public function compressImg($fileInfo,$savePath,$saveName)
    {
      $this->src = $fileInfo['tmp_name'];
      $this->openImage();
      if(!is_dir($savePath)){
        mkdir($savePath);
      }
      $result = $this->saveImage($savePath.'/'.$saveName);
      return $result;
    }

    /**
     * 打开图片
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-12-02 10:56:35
     * @return void
     */
    private function openImage(){
      list($width, $height, $type, $attr) = getimagesize($this->src);
      $this->imageInfo = [
        'width' => $width,
        'height' =>$height,
        'type' => image_type_to_extension($type,false),
        'attr' => $attr
      ];
      $fun = 'imagecreatefrom' . $this->imageInfo['type'];//创建图像资源函数 对应函数 imagecreatefrompng 或者 imagecreatefromjpeg 
      $this->image = $fun($this->src);//临时图片资源
      $this->thumpImage();
    }

    /**
     * 处理图片
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-12-02 10:56:24
     * @return void
     */
    private function thumpImage(){
      $new_width = $this->imageInfo['width'] * $this->percent;
      $new_height = $this->imageInfo['height'] * $this->percent;
      $image_thump = imagecreatetruecolor($new_width,$new_height);
      //将原图复制带图片载体上面，并且按照一定比例压缩,极大的保持了清晰度
      imagecopyresampled($image_thump,$this->image,0,0,0,0,$new_width,$new_height,$this->imageInfo['width'],$this->imageInfo['height']);
      imagedestroy($this->image);
      $this->image = $image_thump;
    }

    /**
     * 保存图片
     *
     * @Author Soultaker 461770336@qq.com
     * @DateTime 2020-12-02 14:33:37
     * @param [type] $dstImgName
     * @return void
     */
    public function saveImage($dstImgName){
      if(empty($dstImgName)) return false;
        $allowImgs = ['.jpg', '.jpeg', '.png', '.bmp', '.wbmp','.gif'];   //如果目标图片名有后缀就用目标图片扩展名 后缀，如果没有，则用源图的扩展名
        $dstExt =  strrchr($dstImgName ,".");
        $sourceExt = strrchr($this->src ,".");
        if(!empty($dstExt)) $dstExt =strtolower($dstExt);
        if(!empty($sourceExt)) $sourceExt =strtolower($sourceExt);

        //有指定目标名扩展名
        if(!empty($dstExt) && in_array($dstExt,$allowImgs)){
          $dstName = $dstImgName;
        }elseif(!empty($sourceExt) && in_array($sourceExt,$allowImgs)){
          $dstName = $dstImgName.$sourceExt;
        }else{
          $dstName = $dstImgName.$this->imageInfo['type'];
        }
        $funcs = "image".$this->imageInfo['type'];
        $result = $funcs($this->image,$dstName,$this->quality);
        return $result;        

    }

}