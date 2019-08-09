<?php

//打开文件
include 'conn.php';
//sql查询
$sql = 'SELECT * from sheet2 LIMIT 0,3';
//执行sql
$res = $conn->query($sql);
// var_dump($res);
$content = $res->fetch_all(MYSQLI_ASSOC);
//传给前端
echo json_encode($content,JSON_UNESCAPED_UNICODE);
//关门
$res->close()
// $conn->close();
?>