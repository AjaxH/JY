<?php
header('Content-type:text/html;charset=utf-8');

$name = isset($_POST['name']) ? $_POST['name'] : '';
$gid = isset($_POST['gid']) ? $_POST['gid'] : '';
$collocation = isset($_POST['collocation']) ? $_POST['collocation'] : '';
$num = isset($_POST['num']) ? $_POST['num'] : '';
$standard = isset($_POST['standard']) ? $_POST['standard'] : '';
$a = isset($_POST['a']) ? $_POST['a'] : '';

include 'conn.php';

if ($a == 1) {
    $sql3 = "SELECT SUM(num) FROM goods WHERE name=$name";
    $res3 = $conn->query($sql3);
    $sum = $res3->fetch_all(MYSQLI_ASSOC);

    $data = array(
        'sum' => $sum
    );
} else if ($a == 2) {
    //查询是否有此条数据
    $sql = "SELECT * from goods WHERE gid=$gid AND name='$name' AND collocation='$collocation' AND standard='$standard'";
    $res = $conn->query($sql);


    if ($res->num_rows) {
        //有就更改数量
        $sql1 = "UPDATE goods SET num=(num + $num) WHERE gid=$gid";
        $res1 = $conn->query($sql1);
    } else {
        //没有就插入购物车
        $sql1 = "INSERT INTO goods(gid,name,collocation,num,standard) VALUES($gid,'$name','$collocation',$num,'$standard')";
        $res1 = $conn->query($sql1);
    }


    $sql3 = "SELECT SUM(num) FROM goods WHERE name=$name";
    $res3 = $conn->query($sql3);
    $sum = $res3->fetch_all(MYSQLI_ASSOC);

    $data = array(
        'message' => 1,
        'sum' => $sum
    );
} else if ($a == 0) {
    //根据传入用户名找到队对应的购物车信息(购物车独自存在)
    $sql2 = "SELECT * from goods,jd WHERE name=$name AND jd.id = goods.gid";
    $res2 = $conn->query($sql2);
    $content = $res2->fetch_all(MYSQLI_ASSOC);

    $data = array(
        'list' => $content,
    );
}

echo json_encode($data, JSON_UNESCAPED_UNICODE);
