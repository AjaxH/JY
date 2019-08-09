<?php

    //接收到前端传过来的用户名和密码，存到用户信息表里面，注册功能

    $tel = isset($_REQUEST['tel']) ? $_REQUEST['tel'] : '';
    $pwd = isset($_POST['password']) ? $_POST['password'] : '';

    include 'conn.php';//连接数据库



    //验证用户名是否存在
    $sql2 = "SELECT * FROM cheakname where name = '$tel'";
    $res2 = $conn->query($sql2);

    if($tel && $pwd){//插入信息
        $sql1 = "INSERT INTO cheakname(name,password) VALUES('$tel','$pwd')";
        $res1 = $conn->query($sql1);//得到布尔值
        // var_dump($res1);
        if($res1){
            echo 'yes';
        }else{
            echo 'no';
        }
    }else{
        if($res2->num_rows){
            echo '1';
        }else{
            echo '0';
        }
    };

    






    // $res->close();
    // $conn->close();

?>