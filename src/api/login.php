<?php

    //接收用户名和密码，验证是否为已注册的用户，返回验证信息给前端

    $tel = isset($_POST['tel']) ? $_POST['tel'] : '';
    $pwd = isset($_POST['pwd']) ? $_POST['pwd'] : '';

    // echo $name,$pwd;
    include 'conn.php';//连接数据库
    $sql = "SELECT * from cheakname where name = $tel AND password = '$pwd'";

    //执行语句
    $res = $conn->query($sql);
    // var_dump($res);
    //查询到数据就是能登陆
    if($res->num_rows) {
        //查到数据：允许登陆
        echo 'yes';
    }else{
        echo 'no';
    }

    //关闭连接
    $res->close();
    $conn->close();
?>