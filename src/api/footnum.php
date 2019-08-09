<?php
header('Content-type:text/html;charset=utf-8');

$name = isset($_POST['name']) ? $_POST['name'] : '';
$id = isset($_POST['id']) ? $_POST['id'] : '';
$price = isset($_POST['price']) ? $_POST['price'] : '';
$title = isset($_POST['title']) ? $_POST['title'] : '';
$a = isset($_POST['a']) ? $_POST['a'] : '';

include 'conn.php';

$sql ="SELECT * from footnum WHERE id=$id AND name='$name' AND price='$price' AND title='$title'";
$res = $conn->query($sql);

if($a == 0){
    $sql2 = "SELECT * FROM footnum,jd WHERE  name = $name AND jd.id = footnum.id";
    $res2 = $conn->query($sql2);
    $content = $res2->fetch_all(MYSQLI_ASSOC);
}else if($a == 1){
    if($res->num_rows == 0){
        //不存在

        $sql1 = "INSERT INTO footnum(id,name,title,price) VALUES($id,'$name','$title',$price)";
        $res1 = $conn->query($sql1);
    }
}

echo json_encode($content, JSON_UNESCAPED_UNICODE);

?>