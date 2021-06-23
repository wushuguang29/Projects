<?php

namespace app\common\service;


/**
 * 文件处理公共类
 * @package app\common\service
 */
class File
{
    /**
     * 系统函数：                filesize(),file_exists(),pathinfo(),rname(),unlink(),filemtime(),is_readable(),is_wrieteable();
     * 获取文件详细信息        file_info($fileName)
     * 获取文件夹详细信息        path_info($dir)
     * 递归获取文件夹信息        path_info_more($dir,&$fileCount=0,&$pathCount=0,&$size=0)
     * 获取文件夹下文件列表    path_list($dir)
     * 路径当前文件[夹]名        get_path_this($path)
     * 获取路径父目录            get_path_father($path)
     * 删除文件                del_file($file)
     * 递归删除文件夹            del_dir($dir)
     * 创建目录                mk_dir($dir, $mode = 0777)
     * 文件大小格式化            size_format($bytes, $precision = 2)
     * 判断是否绝对路径        path_is_absolute( $path )
     * 扩展名的文件类型        ext_type($ext)
     * 获取文件(夹)权限        get_mode($file)  //rwx_rwx_rwx [文件名需要系统编码]
     */
	/**
	 * @param $dir
	 * @param $is_break
	 * @return array
	 * 获取某路径下的文件夹及文件
	 */
    public function get_folder_file($dir, $is_break = false)
    {
        $files = [];
        if (@$handle = opendir($dir)) {
            while (($file = readdir($handle)) !== false) {
                if ($file != ".." && $file != ".") {
                    if ($is_break) {
                        $files[] = $file;
                    } else {
                        if (is_dir($dir . "/" . $file)) { //如果是子文件夹，进行递归
                            $files[$file] = get_folder_file($dir . "/" . $file);
                        } else {
                            $files[] = $file;
                        }
                    }

                }
            }
            closedir($handle);
        }
        return $files;
    }
	/**
	 * @param $dir 包含结尾/   d:/wwwroot/test/ 传入需要读取的文件夹路径,为程序编码
	 * @param bool $listFile 是否列出文件
	 * @param bool $checkChildren 是否要检索下级
	 * @return array
	 * 获取文件夹下列表信息
	 */
    public function path_list($dir, $listFile = true, $checkChildren = false)
    {
        $dir = rtrim($dir, '/') . '/';
        if (!is_dir($dir) || !($dh = @opendir($dir))) {
            return array('folderList' => array(), 'fileList' => array());
        }
        $folderList = array();
        $fileList   = array(); //文件夹与文件
        while (($file = readdir($dh)) !== false) {
            if ($file == '.' || $file == '..' || $file == ".svn") {
                continue;
            }

            $fullpath = $dir . $file;
            if (is_dir($fullpath)) {
                $info = $this->folder_info($fullpath);
                if ($checkChildren) {
                    $info['isParent'] = path_haschildren($fullpath, $listFile);
                }
                $folderList[] = $info;
            } else if ($listFile) { //是否列出文件
                $info = file_info($fullpath);
                if ($checkChildren) {
                    $info['isParent'] = false;
                }

                $fileList[] = $info;
            }
        }
        closedir($dh);
        return array('folderList' => $folderList, 'fileList' => $fileList);
    }
	/**
	 * @param $path
	 * @return array|bool
	 * 获取文件夹详细信息,文件夹属性时调用，包含子文件夹数量，文件数量，总大小
	 */
    public function path_info($path)
    {
        if (!file_exists($path)) {
            return false;
        }

        $pathinfo   = _path_info_more($path); //子目录文件大小统计信息
        $folderinfo = folder_info($path);
        return array_merge($pathinfo, $folderinfo);
    }

	/**
	 * @param $dir
	 * @param int $fileCount
	 * @param int $pathCount
	 * @param int $size
	 * @return array
	 * 递归获取文件夹信息： 子文件夹数量，文件数量，总大小
	 */
    public function _path_info_more($dir, &$fileCount = 0, &$pathCount = 0, &$size = 0)
    {
        if (!$dh = @opendir($dir)) {
            return array('fileCount' => 0, 'folderCount' => 0, 'size' => 0);
        }

        while (($file = readdir($dh)) !== false) {
            if ($file == '.' || $file == '..') {
                continue;
            }

            $fullpath = $dir . "/" . $file;
            if (!is_dir($fullpath)) {
                $fileCount++;
                $size += get_filesize($fullpath);
            } else {
                _path_info_more($fullpath, $fileCount, $pathCount, $size);
                $pathCount++;
            }
        }
        closedir($dh);
        $pathinfo['fileCount']   = $fileCount;
        $pathinfo['folderCount'] = $pathCount;
        $pathinfo['size']        = $size;
        return $pathinfo;
    }

	/**
	 * @param $list
	 * @param $timeType
	 * @return array|bool
	 * 获取多选文件信息,包含子文件夹数量，文件数量，总大小，父目录权限
	 */
    public function path_info_muti($list, $timeType)
    {
        if (count($list) == 1) {
            if ($list[0]['type'] == "folder") {
                return path_info($list[0]['path'], $timeType);
            } else {
                return file_info($list[0]['path'], $timeType);
            }
        }
        $pathinfo = array(
            'fileCount'   => 0,
            'folderCount' => 0,
            'size'        => 0,
            'father_name' => '',
            'mod'         => '',
        );
        foreach ($list as $val) {
            if ($val['type'] == 'folder') {
                $pathinfo['folderCount']++;
                $temp = $this->path_info($val['path']);
                $pathinfo['folderCount'] += $temp['folderCount'];
                $pathinfo['fileCount'] += $temp['fileCount'];
                $pathinfo['size'] += $temp['size'];
            } else {
                $pathinfo['fileCount']++;
                $pathinfo['size'] += get_filesize($val['path']);
            }
        }
        $father_name      = $this->get_path_father($list[0]['path']);
        $pathinfo['mode'] = $this->get_mode($father_name);
        return $pathinfo;
    }

	/**
	 * @param $path
	 * @return array
	 * 获取文件夹细信息
	 */
    public function folder_info($path)
    {
        $info = array(
            'name'        => ($this->get_path_this($path)),
            'path'        => (rtrim($path, '/') . '/'),
            'type'        => 'folder',
            'mode'        => $this->get_mode($path),
            'atime'       => @fileatime($path), //访问时间
            'ctime'       => @filectime($path), //创建时间
            'mtime'       => @filemtime($path), //最后修改时间
            'isReadable'  => $this->path_readable($path),
            'isWriteable' => $this->path_writeable($path),
        );
        return $info;
    }

	/**
	 * @param $dir
	 * @param bool $checkFile
	 * @return bool
	 * 判断文件夹是否含有子内容【区分为文件或者只筛选文件夹才算】
	 */
    public function path_haschildren($dir, $checkFile = false)
    {
        $dir = rtrim($dir, '/') . '/';
        if (!$dh = @opendir($dir)) {
            return false;
        }

        while (($file = readdir($dh)) !== false) {
            if ($file == '.' || $file == '..') {
                continue;
            }

            $fullpath = $dir . $file;
            if ($checkFile) { //有子目录或者文件都说明有子内容
                if (@is_file($fullpath) || is_dir($fullpath . '/')) {
                    return true;
                }
            } else { //只检查有没有文件
                if (@is_dir($fullpath . '/')) { //解决部分主机报错问题
                    return true;
                }
            }
        }
        closedir($dh);
        return false;
    }

	/**
	 * @param $path
	 * @return array
	 * 获取文件详细信息
	 */
    public function file_info($path)
    {
        $info = array(
            'name'        => ($this->get_path_this($path)),
            'path'        => ($path),
            'ext'         => get_path_ext($path),
            'type'        => 'file',
            'mode'        => get_mode($path),
            'atime'       => @fileatime($path), //最后访问时间
            'ctime'       => @filectime($path), //创建时间
            'mtime'       => @filemtime($path), //最后修改时间
            'isReadable'  => $this->path_readable($path),
            'isWriteable' => $this->path_writeable($path),
            'size'        => get_filesize($path),
        );
        return $info;
    }

	/**
	 * @param $path
	 * @return bool|float|int|string
	 *filesize 解决大于2G 大小问题
	 *http://stackoverflow.com/questions/5501451/php-x86-how-to-get-filesize-of-2-gb-file-without-external-program
	 */
    public function get_filesize($path)
    {
        $result = false;
        $fp     = fopen($path, "r");
        if (!$fp = fopen($path, "r")) {
            return $result;
        }

        if (PHP_INT_SIZE >= 8) { //64bit
            $result = (float) (abs(sprintf("%u", @filesize($path))));
        } else {
            if (fseek($fp, 0, SEEK_END) === 0) {
                $result = 0.0;
                $step   = 0x7FFFFFFF;
                while ($step > 0) {
                    if (fseek($fp, -$step, SEEK_CUR) === 0) {
                        $result += floatval($step);
                    } else {
                        $step >>= 1;
                    }
                }
            } else {
                static $iswin;
                if (!isset($iswin)) {
                    $iswin = (strtoupper(substr(PHP_OS, 0, 3)) == 'WIN');
                }
                static $exec_works;
                if (!isset($exec_works)) {
                    $exec_works = (function_exists('exec') && !ini_get('safe_mode') && @exec('echo EXEC') == 'EXEC');
                }
                if ($iswin && class_exists("COM")) {
                    try {
                        $fsobj = new COM('Scripting.FileSystemObject');
                        $f     = $fsobj->GetFile(realpath($path));
                        $size  = $f->Size;
                    } catch (Exception $e) {
                        $size = null;
                    }
                    if (is_numeric($size)) {
                        $result = $size;
                    }
                } else if ($exec_works) {
                    $cmd = ($iswin) ? "for %F in (\"$path\") do @echo %~zF" : "stat -c%s \"$path\"";
                    @exec($cmd, $output);
                    if (is_array($output) && is_numeric($size = trim(implode("\n", $output)))) {
                        $result = $size;
                    }
                } else {
                    $result = filesize($path);
                }
            }
        }
        fclose($fp);
        return $result;
    }

	/**
	 * @param $path
	 * @return bool|int
	 * 所传路径是否可读
	 */
    public function path_readable($path)
    {
        $result = intval(is_readable($path));
        if ($result) {
            return $result;
        }
        $mode = get_mode($path);
        if ($mode &&
            strlen($mode) == 18 &&
            substr($mode, -9, 1) == 'r') { // -rwx rwx rwx(0777)
            return true;
        }
        return false;
    }

	/**
	 * @param $path
	 * @return bool|int
	 * 所传路径是否可写
	 */
    public function path_writeable($path)
    {
        $result = intval(is_writeable($path));
        if ($result) {
            return $result;
        }
        $mode = $this->get_mode($path);
        if ($mode &&
            strlen($mode) == 18 &&
            substr($mode, -8, 1) == 'w') { // -rwx rwx rwx (0777)
            return true;
        }
        return false;
    }

	/**
	 * @return int
	 * 获取PHP.INI中的可以上传的最大值
	 */
    public function get_post_max()
    {
        $upload  = ini_get('upload_max_filesize');
        $upload  = $upload == '' ? ini_get('upload_max_size') : $upload;
        $post    = ini_get('post_max_size');
        $upload  = intval($upload) * 1024 * 1024 * 0.8;
        $post    = intval($post) * 1024 * 1024 * 0.8;
        $the_max = $upload < $post ? $upload : $post;
        return $the_max == 0 ? 1024 * 1024 * 0.5 : $the_max; //获取不到则500k
    }

	/**
	 * @param $file
	 * @return string
	 * 获取文件(夹)权限 rwx_rwx_rwx
	 */
    public function get_mode($file)
    {
        $Mode    = @fileperms($file);
        $theMode = ' ' . decoct($Mode);
        $theMode = substr($theMode, -4);
        $Owner   = array();
        $Group   = array();
        $World   = array();
        if ($Mode & 0x1000) {
            $Type = 'p';
        }
        // FIFO pipe
        elseif ($Mode & 0x2000) {
            $Type = 'c';
        }
        // Character special
        elseif ($Mode & 0x4000) {
            $Type = 'd';
        }
        // Directory
        elseif ($Mode & 0x6000) {
            $Type = 'b';
        }
        // Block special
        elseif ($Mode & 0x8000) {
            $Type = '-';
        }
        // Regular
        elseif ($Mode & 0xA000) {
            $Type = 'l';
        }
        // Symbolic Link
        elseif ($Mode & 0xC000) {
            $Type = 's';
        }
        // Socket
        else {
            $Type = 'u';
        }
        // UNKNOWN
        // Determine les permissions par Groupe
        $Owner['r'] = ($Mode & 00400) ? 'r' : '-';
        $Owner['w'] = ($Mode & 00200) ? 'w' : '-';
        $Owner['x'] = ($Mode & 00100) ? 'x' : '-';
        $Group['r'] = ($Mode & 00040) ? 'r' : '-';
        $Group['w'] = ($Mode & 00020) ? 'w' : '-';
        $Group['e'] = ($Mode & 00010) ? 'x' : '-';
        $World['r'] = ($Mode & 00004) ? 'r' : '-';
        $World['w'] = ($Mode & 00002) ? 'w' : '-';
        $World['e'] = ($Mode & 00001) ? 'x' : '-';
        // Adjuste pour SUID, SGID et sticky bit
        if ($Mode & 0x800) {
            $Owner['e'] = ($Owner['e'] == 'x') ? 's' : 'S';
        }

        if ($Mode & 0x400) {
            $Group['e'] = ($Group['e'] == 'x') ? 's' : 'S';
        }

        if ($Mode & 0x200) {
            $World['e'] = ($World['e'] == 'x') ? 't' : 'T';
        }

        $Mode = $Type . $Owner['r'] . $Owner['w'] . $Owner['x'] . ' ' .
            $Group['r'] . $Group['w'] . $Group['e'] . ' ' .
            $World['r'] . $World['w'] . $World['e'];
        return $Mode . '(' . $theMode . ')';
    }

	/**
	 * @param $path
	 * @return string
	 * 获取文件的后缀名
	 */
    public function get_path_ext($path)
    {
        $name = $this->get_path_this($path);
        $ext  = '';
        if (strstr($name, '.')) {
            $ext = substr($name, strrpos($name, '.') + 1);
            $ext = strtolower($ext);
        }
        if (strlen($ext) > 3 && preg_match("/([\x81-\xfe][\x40-\xfe])/", $ext, $match)) {
            $ext = '';
        }
        return htmlspecialchars($ext);
    }
	/**
	 * @param $path
	 * @return mixed|string
	 * 获取一个路径(文件夹&文件) 当前文件[夹]名
	 * test/11/ ==>11 test/1.c  ==>1.c
	 */
    public function get_path_this($path)
    {
        $path = str_replace('\\', '/', rtrim($path, '/'));
        $pos  = strrpos($path, '/');
        if ($pos === false) {
            return $path;
        }
        return substr($path, $pos + 1);
    }
	/**
	 * @param $path
	 * @return mixed|string
	 * 获取一个路径(文件夹&文件) 父目录
	 * /test/11/==>/test/   /test/1.c ==>/www/test/
	 */
    public function get_path_father($path)
    {
        $path = str_replace('\\', '/', rtrim($path, '/'));
        $pos  = strrpos($path, '/');
        if ($pos === false) {
            return '/';
        }
        return substr($path, 0, $pos + 1);
    }
	/**
	 * @param $path  文件夹 $dir ——返回的文件夹array files ——返回的文件array
	 * @param $dir
	 * @param $file
	 * @param int $deepest  是否完整递归；$deep 递归层级
	 * @param int $deep
	 * @return bool
	 *获取文件&文件夹列表(支持文件夹层级)
	 */
    public function recursion_dir($path, &$dir, &$file, $deepest = -1, $deep = 0)
    {
        $path = rtrim($path, '/') . '/';
        if (!is_array($file)) {
            $file = array();
        }

        if (!is_array($dir)) {
            $dir = array();
        }

        if (!$dh = opendir($path)) {
            return false;
        }

        while (($val = readdir($dh)) !== false) {
            if ($val == '.' || $val == '..') {
                continue;
            }

            $value = strval($path . $val);
            if (is_file($value)) {
                $file[] = $value;
            } else if (is_dir($value)) {
                $dir[] = $value;
                if ($deepest == -1 || $deep < $deepest) {
                    $this->recursion_dir($value . "/", $dir, $file, $deepest, $deep + 1);
                }
            }
        }
        closedir($dh);
        return true;
    }

	/**
	 * @param $path
	 * @return array
	 * 合并文件夹及文件，组织成为一个一维数组
	 */
    public function dir_list($path)
    {
        $this->recursion_dir($path, $dirs, $files);
        return array_merge($dirs, $files);
    }

	/**
	 * @param $ext
	 * @return bool
	 * 判断是否是文本文件（禁止上传的东西）
	 */
    public function is_text_file($ext)
    {
        $ext_arr = array(
            "txt", "textile", 'oexe', 'inc', 'csv', 'log', 'asc', 'tsv', 'lnk', 'url', 'webloc', 'meta', "localized",
            "xib", "xsd", "storyboard", "plist", "csproj", "pch", "pbxproj", "local", "xcscheme", "manifest", "vbproj",
            "strings", 'jshintrc', 'sublime-project', 'readme', 'changes', "changelog", 'version', 'license', 'changelog',
            "abap", "abc", "as", "asp", 'aspx', "ada", "adb", "htaccess", "htgroups", "htgroups",
            "htpasswd", "asciidoc", "adoc", "asm", "a", "ahk", "bat", "cmd", "cpp", "c", "cc", "cxx", "h", "hh", "hpp",
            "ino", "c9search_results", "cirru", "cr", "clj", "cljs", "cbl", "cob", "coffee", "cf", "cson", "cakefile",
            "cfm", "cs", "css", "curly", "d", "di", "dart", "diff", "patch", "dockerfile", "dot", "dummy", "dummy", "e",
            "ge", "ejs", "ex", "exs", "elm", "erl", "hrl", "frt", "fs", "ldr", "ftl", "gcode", "feature", ".gitignore",
            "glsl", "frag", "vert", "gbs", "go", "groovy", "haml", "hbs", "handlebars", "tpl", "mustache", "hs", "hx",
            "html", "hta", "htm", "xhtml", "eex", "html.eex", "erb", "rhtml", "html.erb", "ini", 'inf', "conf", "cfg", "prefs", "io",
            "jack", "jade", "java", "ji", "jl", "jq", "js", "jsm", "json", "jsp", "jsx", "latex", "ltx", "bib",
            "lean", "hlean", "less", "liquid", "lisp", "ls", "logic", "lql", "lsl", "lua", "lp", "lucene", "Makefile", "makemakefile",
            "gnumakefile", "makefile", "ocamlmakefile", "make", "md", "markdown", "mask", "matlab", "mz", "mel",
            "mc", "mush", "mysql", "nix", "nsi", "nsh", "m", "mm", "ml", "mli", "pas", "p", "pl", "pm", "pgsql", "php",
            "phtml", "shtml", "php3", "php4", "php5", "phps", "phpt", "aw", "ctp", "module", "ps1", "praat",
            "praatscript", "psc", "proc", "plg", "prolog", "properties", "proto", "py", "r", "cshtml", "rd",
            "rhtml", "rst", "rb", "ru", "gemspec", "rake", "guardfile", "rakefile", "gemfile", "rs", "sass",
            "scad", "scala", "scm", "sm", "rkt", "oak", "scheme", "scss", "sh", "bash", "bashrc", "sjs", "smarty",
            "tpl", "snippets", "soy", "space", "sql", "sqlserver", "styl", "stylus", "svg", "swift", "tcl", "tex",
            "toml", "twig", "swig", "ts", "typescript", "str", "vala", "vbs", "vb", "vm", "v", "vh",
            "sv", "svh", "vhd", "vhdl", "wlk", "wpgm", "wtest", "xml", "rdf", "rss", "wsdl", "xslt", "atom", "mathml",
            "mml", "xul", "xbl", "xaml", "xq", "yaml", "yml",

            "cer", "reg", "config",
        );
        if (in_array($ext, $ext_arr)) {
            return true;
        } else {
            return false;
        }
    }
	/**
	 * @param $path 指定路径
	 * @param $search 搜索的内容，为包含的字符串
	 * @param bool $is_content 表示是否搜索文件内容;默认不搜索
	 * @param string $file_ext 文件后缀
	 * @param bool $is_case 表示区分大小写,默认不区分
	 * @return array
	 * 在某个路径下搜索
	 */
    public function path_search($path, $search, $is_content = false, $file_ext = '', $is_case = false)
    {
        $result               = array();
        $result['fileList']   = array();
        $result['folderList'] = array();
        if (!$path) {
            return $result;
        }

        $ext_arr = explode("|", $file_ext);
        $this->recursion_dir($path, $dirs, $files, -1, 0);
        $strpos = 'stripos'; //是否区分大小写
        if ($is_case) {
            $strpos = 'strpos';
        }

        $result_num     = 0;
        $result_num_max = 2000; //搜索文件内容，限制最多匹配条数
        foreach ($files as $f) {
            if ($result_num >= $result_num_max) {
                $result['error_info'] = $result_num_max;
                break;
            }
            //若指定了扩展名则只在匹配扩展名文件中搜索
            $ext = get_path_ext($f);
            if ($file_ext != '' && !in_array($ext, $ext_arr)) {
                continue;
            }
            //搜索内容则不搜索文件名
            if ($is_content) {
                if (!$this->is_text_file($ext)) {
                    continue;
                }
                //在限定中或者不在bin中
                $search_info = $this->file_search($f, $search, $is_case);
                if ($search_info !== false) {
                    $result_num += count($search_info['searchInfo']);
                    $result['fileList'][] = $search_info;
                }
            } else {
                $path_this = $this->get_path_this($f);
                if ($strpos($path_this, $search) !== false) { //搜索文件名;
                    $result['fileList'][] = file_info($f);
                    $result_num++;
                }
            }
        }
        if (!$is_content && $file_ext == '') { //没有指定搜索文件内容，且没有限定扩展名，才搜索文件夹
            foreach ($dirs as $f) {
                $path_this = $this->get_path_this($f);
                if ($strpos($path_this, $search) !== false) {
                    $result['folderList'][] = array(
                        'name' => ($this->get_path_this($f)),
                        'path' => ($f),
                    );
                }
            }
        }
        return $result;
    }
	/**
	 * @param $path
	 * @param $search
	 * @param $is_case
	 * @return array
	 * 文件搜索；返回行及关键词附近行
	 */
    public function file_search($path, $search, $is_case)
    {
        $strpos = 'stripos'; //是否区分大小写
        if ($is_case) {
            $strpos = 'strpos';
        }

        //文本文件 超过40M不再搜索
        if (@filesize($path) >= 1024 * 1024 * 40) {
            return false;
        }
        $content = file_get_contents($path);
        if ($strpos($content, "\0") > 0) { // 不是文本文档
            unset($content);
            return false;
        }

        //文件没有搜索到目标直接返回
        if ($strpos($content, $search) === false) {
            unset($content);
            return false;
        }

        $pose       = 0;
        $file_size  = strlen($content);
        $arr_search = array(); // 匹配结果所在位置
        while ($pose !== false) {
            $pose = $strpos($content, $search, $pose);
            if ($pose !== false) {
                $arr_search[] = $pose;
                $pose++;
            } else {
                break;
            }
        }

        $arr_line = array();
        $pose     = 0;
        while ($pose !== false) {
            $pose = strpos($content, "\n", $pose);
            if ($pose !== false) {
                $arr_line[] = $pose;
                $pose++;
            } else {
                break;
            }
        }
        $arr_line[] = $file_size; //文件只有一行而且没有换行，则构造虚拟换行
        $result     = array(); //  [2,10,22,45,60]  [20,30,40,50,55]
        $len_search = count($arr_search);
        $len_line   = count($arr_line);
        for ($i = 0, $line = 0; $i < $len_search && $line < $len_line; $line++) {
            while ($arr_search[$i] <= $arr_line[$line]) {
                //行截取字符串
                $cur_pose = $arr_search[$i];
                $from     = $line == 0 ? 0 : $arr_line[$line - 1];
                $to       = $arr_line[$line];
                $len_max  = 300;
                if ($to - $from >= $len_max) { //长度过长处理
                    $from = $cur_pose - 20;
                    $from = $from <= 0 ? 0 : $from;
                    $to   = $from + $len_max;
                    //中文避免截断；（向前 向后找到分隔符后终止）
                    $token = array("\r", "\n", " ", "\t", ",", "/", "#", "_", "[", "]", "(", ")", "+", "-", "*", "/", "=", "&");
                    while (!in_array($content[$from], $token) && $from >= 0) {
                        $from--;
                    }
                    while (!in_array($content[$to], $token) && $to <= $file_size) {
                        $to++;
                    }
                }
                $line_str = substr($content, $from, $to - $from);
                if ($strpos($line_str, $search) === false) { //截取乱码避免
                    $line_str = $search;
                }

                $result[] = array('line' => $line + 1, 'str' => $line_str);
                if (++$i >= $len_search) {
                    break;
                }
            }
        }

        $info               = file_info($path);
        $info['searchInfo'] = $result;
        unset($content);
        return $info;
    }

	/**
	 * @param $path
	 * @return bool
	 * 检查名称是否合法
	 */
    public function path_check($path)
    {
        $check = array('/', '\\', ':', '*', '?', '"', '<', '>', '|');
        $path  = rtrim($path, '/');
        $path  = $this->get_path_this($path);
        foreach ($check as $v) {
            if (strstr($path, $v)) {
                return false;
            }
        }
        return true;
    }

	/**
	 * @param $path
	 * 判断路径是不是绝对路径
	 * 返回true('/foo/bar','c:\windows').
	 * @return 返回true则为绝对路径，否则为相对路径
	 */
    public function path_is_absolute($path)
    {
        if (realpath($path) == $path) // *nux 的绝对路径 /home/my
        {
            return true;
        }

        if (strlen($path) == 0 || $path[0] == '.') {
            return false;
        }

        if (preg_match('#^[a-zA-Z]:\\\\#', $path)) // windows 的绝对路径 c:\aaa\
        {
            return true;
        }

        return (bool) preg_match('#^[/\\\\]#', $path); //绝对路径 运行 / 和 \绝对路径，其他的则为相对路径
    }

	/**
	 * @param $fullpath
	 * @return bool
	 * 删除文件
	 */
    public function del_file($fullpath)
    {
        if (!@unlink($fullpath)) { // 删除不了，尝试修改文件权限
            @chmod($fullpath, 0777);
            if (!@unlink($fullpath)) {
                return false;
            }
        } else {
            return true;
        }
    }

	/**
	 * @param $dir
	 * @return bool
	 * 删除目录
	 */
    public function del_dir($dir)
    {
        if (!file_exists($dir) || !is_dir($dir)) {
            return true;
        }

        if (!$dh = opendir($dir)) {
            return false;
        }

        @set_time_limit(0);
        while (($file = readdir($dh)) !== false) {
            if ($file == '.' || $file == '..') {
                continue;
            }

            $fullpath = $dir . '/' . $file;
            if (!is_dir($fullpath)) {
                if (!unlink($fullpath)) { // 删除不了，尝试修改文件权限
                    chmod($fullpath, 0777);
                    if (!unlink($fullpath)) {
                        return false;
                    }
                }
            } else {
                if (!$this->del_dir($fullpath)) {
                    chmod($fullpath, 0777);
                    if (!$this->del_dir($fullpath)) {
                        return false;
                    }

                }
            }
        }
        closedir($dh);
        if (rmdir($dir)) {
            return true;
        } else {
            return false;
        }
    }
/**
 * @param $path
 * @param string $file_add
 * @param string $same_file_type
 * @return string
 * 自动获取不重复文件(夹)名
 * 如果传入$file_add 则检测存在则自定重命名  a.txt 为a{$file_add}.txt
 * $same_file_type  rename,replace,skip,folder_rename
 */
    public function get_filename_auto($path, $file_add = "", $same_file_type = 'replace')
    {
        if (is_dir($path) && $same_file_type != 'folder_rename') { //文件夹则忽略
            return $path;
        }
        //重名处理
        if (file_exists($path)) {
            if ($same_file_type == 'replace') {
                return $path;
            } else if ($same_file_type == 'skip') {
                return false;
            }
        }

        $i      = 1;
        $father = $this->get_path_father($path);
        $name   = $this->get_path_this($path);
        $ext    = $this->get_path_ext($name);
        if (is_dir($path)) {
            $ext = '';
        }
        if (strlen($ext) > 0) {
            $ext  = '.' . $ext;
            $name = substr($name, 0, strlen($name) - strlen($ext));
        }
        while (file_exists($path)) {
            if ($file_add != '') {
                $path = $father . $name . $file_add . $ext;
                $file_add .= '-';
            } else {
                $path = $father . $name . '(' . $i . ')' . $ext;
                $i++;
            }
        }
        return $path;
    }

}
