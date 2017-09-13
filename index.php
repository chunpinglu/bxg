<?php


    $path="/dashboard/index";

    if(array_key_exists("PATH_INFO",$_SERVER)){
        $path=$_SERVER['PATH_INFO'];
    }

    
    // echo $path;
    $path=substr($path,1,strlen($path));

    $path=explode("/",$path);
    // var_dump($path);

    //用户要请求的文件夹名称
    $directoryname=$path[0];

    //这是用户要请求的文件名
    $filename=$path[1];

    // echo $directoryname;
    // echo "<br>";
    // echo $filename;

    $path="views/".$directoryname."/".$filename.".html";

    if(file_exists($path)){
        //通过php代码，找到用户要请求的文件，给用户返回即可
        include $path;
    }else {
        header("HTTP/1.1 404 NotFound");
        echo "<img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504932103322&di=610ecc775692665290e952b32f6fe594&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Df81faa0867224f4a43947b50619efa27%2F21a4462309f79052d2c69b1006f3d7ca7acbd5c7.jpg'>";
    }
    





?>