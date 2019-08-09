<?php
header('Content-type:text/html;charset=utf-8');
//接收数据
$page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '';//页数，哪一页
$num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '';//一页数据有24条
$rank = isset($_REQUEST['rank']) ? $_REQUEST['rank'] : '';

$searchVal = isset($_REQUEST['searchVal']) ? $_REQUEST['searchVal'] : '';
$letter = isset($_REQUEST['letter']) ? $_REQUEST['letter'] : '';
$more = isset($_REQUEST['more']) ? $_REQUEST['more'] : '';
$id = isset($_REQUEST['id'])?$_REQUEST['id']:'';


// 链接数据库
include 'conn.php';

$sql3 = "SELECT * FROM jd WHERE id like $id";
$res3 = $conn->query($sql3);
if($id){
    $content1 = $res3->fetch_all(MYSQLI_ASSOC);
    $data = array(
        'data' => '',//想要的24条数据
        'pages' => '',//总条数num
        'page' => '',
        'num' => '',
        'list'=>$content1
    );

}else{
    $content1 = '';
    $index = ($page - 1) * $num;

    $sql ="SELECT * FROM jd WHERE (price BETWEEN $letter AND $more) AND title LIKE '%$searchVal%' ORDER BY price $rank LIMIT $index,$num";


    //执行sql语句
    $res = $conn->query($sql);

    $content = $res->fetch_all(MYSQLI_ASSOC);

    //查询总数
    // $sql2 = 'SELECT * FROM jd';
    $sql2 ="SELECT * FROM jd WHERE (price BETWEEN $letter AND $more) AND title LIKE '%$searchVal%' ORDER BY price $rank" ;
    
    $res2 = $conn->query($sql2);

    $data = array(
        'data' => $content,//想要的24条数据
        'pages' => $res2->num_rows,//总条数num
        'page' => $page,
        'num' => $num,
        'list'=>$content1
    );
}

echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>

